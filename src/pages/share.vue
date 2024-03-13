<template>
	<page :disable-scrollbar="true" :show-header="isPc ? false : true" :mouse-wheel="true">
    <view class="container page-pading">
			<view class="imgs-box" v-if="posterImgs.length">
				<swiper :style="isPc ? 'width: 523px;' : 'height:26.125rem;width: 21.9375rem;'" ref="imgsSwiper"
					:modules="[Controller]" :controller="{ control: controlledSwiper }" :slides-per-view="1"
					:space-between="0" @slideChange="currentChange" @swiper="setControlledSwiper">
					<swiper-slide v-for="src in posterImgs">
						<img class="imgs" :src="src" />
					</swiper-slide>
				</swiper>
				<view class="indicator-dots" v-if="posterImgs.length">
					<view class="indicator-dots-item" v-for="(_, i) in posterImgs" :class="{ active: current === i }"
						@click="current = i"></view>
				</view>
			</view>

			<public-loading v-else></public-loading>

			<view class="canvas-box imgs-box">
				<canvas canvas-id="canvas" ref="canvas" id="canvas"></canvas>
				<canvas canvas-id="canvasQRcode" ref="canvasQRcode" id="canvasQRcode"></canvas>
			</view>
			<view class="btsns">
				<view class="share-btn" @click="savePicture()">
					{{ $t('share.shareBtn') }}
				</view>
				<border-gradient class="copy-btn" :border="1" bgColor="transparent" @click="$copy(shareUrl)">{{ $t('share.copyBtn')
				}}</border-gradient>
			</view>
		</view>
	</page>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import type { Swiper as TypeSwiper } from 'swiper';
import { Controller } from 'swiper/modules';

import Page from '../components/page.vue';
import BorderGradient from '../components/border-gradient.vue';
import PublicLoading from '../components/public-loading.vue';
import { nextTick, ref, onMounted, watch } from 'vue';
import { t } from '../uilts/i18n';
import { dbGet } from '../uilts/db';
import QRcode from 'qrcode';
import { isPc } from "../uilts/async.var";

let controlledSwiper = ref<TypeSwiper>();
const setControlledSwiper = (swiper: TypeSwiper) => {
	controlledSwiper.value = swiper;
}

const canvas = ref<HTMLCanvasElement>();
const posterImgs = ref<Array<string>>([]);
const current = ref(0)

watch(current, (value, _oldVlaue) => {
	if (controlledSwiper) {
		controlledSwiper.value?.slideTo(value);
	}
})

interface ShapeAgr {
	x?: number | 'center';
	y?: number | 'center';
	width?: number;
	height?: number;
}
interface TextAgr {
	text: string;
	fontSize: number;
	color: string | Array<TextColor>;
	font?:string;
}
interface RectangleAgr {
	backgroundColor: string;
	borderRadius: number;
}

interface CanvasShape {
	x: number | 'center';
	y: number | 'center';
	width?: number;
	height?: number;
}
class CanvasShape {
	constructor(agr?: ShapeAgr) {
		agr = agr || {};
		this.x = agr.x || 0;
		this.y = agr.y || 0;
		this.width = agr.width;
		this.height = agr.height;
	}
}

interface CanvasImg extends CanvasShape {
	url: string;
	width: number;
	height: number;
}
class CanvasImg extends CanvasShape {
	constructor(url: string, agr?: ShapeAgr) {
		super(agr);
		this.url = url;
	}
}

interface CanvasRectangle extends CanvasShape {
	backgroundColor: string;
	borderRadius: number;
}
class CanvasRectangle extends CanvasShape {
	constructor(rect: RectangleAgr, agr: ShapeAgr) {
		super(agr);
		this.backgroundColor = rect.backgroundColor;
		this.borderRadius = rect.borderRadius;
	}
}
interface TextColor {
	offset:number;
	color:string;
}

class TextColor {
	constructor(offset:number, color:string) {
		this.offset = offset;
		this.color = color;
	}
}

interface CanvasText extends CanvasShape {
	text: string;
	fontSize: number;
	color: string | Array<TextColor>;
	font?:string;
}

class CanvasText extends CanvasShape {
	constructor(text: TextAgr, agr: ShapeAgr) {
		super(agr);
		this.text = text.text;
		this.fontSize = text.fontSize;
		this.color = text.color;
		this.font = text.font;
	}
}

const currentChange = (e: TypeSwiper) => {
	current.value = e.activeIndex;
}

const getImageInfo = (src: string) => {
	return new Promise<{
		width: number;
		height: number;
		path: string;
		image: HTMLImageElement
	}>((success, fail) => {
		try {
			const image = new Image();
			image.crossOrigin = 'anonymous';
			image.src = src;
			image.onload = function () {
				success({
					width: image.width,
					height: image.height,
					path: src,
					image
				})
			}
			image.onerror = function (_e) {
				fail('Check whether it is cross-domain or does not exist.');
			}
		} catch (e) {
		}
	})
}
/** 圆角矩形
 */
function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: any, height: any, radius: number, color: string) {
	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.lineTo(x + width - radius, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
	ctx.lineTo(x + width, y + height - radius);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	ctx.lineTo(x + radius, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
	ctx.lineTo(x, y + radius);
	ctx.quadraticCurveTo(x, y, x + radius, y);
	ctx.closePath();
	ctx.fillStyle = color; // 设置填充颜色
	ctx.fill(); // 填充颜色
}
/**
 * 创建海报
 */
const createDrawingBoard = (arr: Array<CanvasShape>) => {
	return new Promise<string>(async (ok, fail) => {
		try {
			// let canvas = document.getElementById(canvasId) as HTMLCanvasElement;
			const ctx = canvas.value!.getContext("2d") as CanvasRenderingContext2D;
			let canvasWidth = canvas.value!.offsetWidth;
			let canvasHeight = canvas.value!.offsetHeight;
			canvas.value!.width = canvasWidth;
			canvas.value!.height = canvasHeight;
			let maxWidth = 0;
			let maxHeight = 0;
			ctx.clearRect(0, 0, canvasWidth, canvasHeight);
			for (let item of arr) {
				if (item instanceof CanvasShape) {
					let ratio = 1;
					let x = item.x == 'center' ? (canvasWidth - (item.width ?? 0 * ratio)) / 2 : item.x;
					let y = item.y == 'center' ? (canvasHeight - (item.height ?? 0 * ratio)) / 2 : item.y;

					if (item instanceof CanvasImg) {
						try {
							let { width, height, image } = await getImageInfo(item.url);
							ratio = item.width || item.height ? 1 : canvasWidth / width;
							x = item.x == 'center' ? (canvasWidth - ((item.width || width) * ratio)) / 2 : item.x;
							if (x > canvasWidth / 2) {

								if (isPc.value) {
									x = canvasWidth - 35 - item.width * ratio
								} else {
									x = canvasWidth - 10 - item.width * ratio
								}
							}
							y = item.y == 'center' ? (canvasHeight - ((item.height || height) * ratio)) / 2 : item.y;
							if (y > canvasHeight / 2) {
								if (isPc.value) {
									y = canvasHeight - 35 - item.height * ratio
								} else {
									y = canvasHeight - 10 - item.height * ratio
								}
							}
							item.width = (item.width || width);
							item.height = (item.height || height);
							maxWidth = maxWidth || item.width * ratio;
							maxHeight = maxHeight || item.height * ratio;
							ctx.drawImage(image, x, y, item.width * ratio, item.height * ratio);
						} catch (e: any) {
							let msg = e.toString();
							maxWidth = canvasWidth;
							maxHeight = canvasHeight;
							roundedRect(ctx, 0, 0, canvasWidth, canvasHeight, 5, '#FFFFFF');
							let fontSize = 12;
							ctx.font = '12px Arial';
							ctx.fillStyle = "#F00";
							ctx.fillText(msg, (canvasWidth - (fontSize * (msg.length) / 2)) / 2, canvasHeight * 0.2, fontSize * (msg.length));
						}
					} else if (item instanceof CanvasRectangle) {
						roundedRect(ctx, x, y, item.width, item.height, item.borderRadius, item.backgroundColor);
					} else if (item instanceof CanvasText) {
						ctx.font = item.font || item.fontSize + 'px Arial';

						if(typeof item.color === 'string'){
							ctx.fillStyle = item.color;
						}else{
							let gradient = ctx.createLinearGradient(0, 0, item.fontSize * item.text.length, 0);
							for(let t of item.color){
								gradient.addColorStop(t.offset, t.color);
							}
							ctx.fillStyle = gradient;
						}
						ctx.textAlign = item.x == "center" ? "center" : 'left';
						x = item.x == 'center' ? (canvasWidth / 2) : item.x;
						if (x > canvasWidth / 2) x = canvasWidth - 10
						y = item.y == 'center' ? (canvasHeight - ((item.height ?? 0) * ratio)) / 2 : canvasHeight - item.y;
						// y = canvasHeight - y
						ctx.fillText(item.text, x, typeof item.y == 'string' ? 0 : y, item.fontSize * item.text.length);
					}
				}
			}
			var base64Arr = canvas.value!.toDataURL().split(',');
			var bytes = atob(base64Arr[1])
			let ab = new ArrayBuffer(bytes.length);
			let ia = new Uint8Array(ab);
			for (let i = 0; i < bytes.length; i++) {
				ia[i] = bytes.charCodeAt(i);
			}
			var blob = new Blob([ab], { type: 'application/octet-stream' });
			var url = URL.createObjectURL(blob);
			ok(url);

		} catch (e) {
			fail(e);
		}

	})
}

/**
 * 下载
 */
const savePicture = () => {
	let url = posterImgs.value[current.value];
	// #ifdef H5
	var a = document.createElement('a');
	a.href = url;
	a.download = new Date().valueOf() + ".jpg";
	var e = document.createEvent('MouseEvents');
	e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	a.dispatchEvent(e);
	URL.revokeObjectURL(url);
	// #endif
}
const createImg = (code: string, qrUrl: string, img: string) => {
	return new Promise<string>((ok, fail) => {
		// #ifdef H5
		nextTick(() => {
      //获取app的宽度
      const width = document.getElementById("app")?.clientWidth;
      if (width >= 600) {
				createDrawingBoard([
					new CanvasImg(img),
					new CanvasImg(qrUrl, {
						width: 142,
						height: 142,
            x: 284,
            y: 358
					}),
					new CanvasRectangle({
						borderRadius: 30,
            backgroundColor: "#494949"
					}, {
						width: 329,
						height: 55,
						x: 600,
						y: 460
					}),
					new CanvasText({
						text: t('share.referralCode'),
						fontSize: 21,
						color:'#fff'
					}, {
						x: 26,
						y: 50
					}),
					new CanvasText({
						text: code,
						fontSize: 21,
						font:'21px Akrobat-ExtraBold',
						color:'#FFF'
					}, {
						x: t('share.referralCode').length * 16 + 44,
						y: 50
					}),
					new CanvasText({
						text: t('share.fxshl'),
						fontSize: 30,
						font:'bold 30px Akrobat-ExtraBold',
						color: [new TextColor(0,'#fff'), new TextColor(1,'#fff')]
					}, {
						x: 26,
						y: 90
					}),
					new CanvasText({
						text: t('pageShare.t1'),
						fontSize: 30,
						font:'bold 30px Akrobat-ExtraBold',
						color: [new TextColor(0.16,'#fff'), new TextColor(0.9984,'#fff')]
					}, {
						x: 'center',
						y:580
					})

				]).then(ok).catch(fail);


			} else {
				createDrawingBoard([
					new CanvasImg(img),
					new CanvasImg(qrUrl, {
						width: 80,
						height: 80,
						x: 300,
						y: 358
					}),
					new CanvasRectangle({
						borderRadius: 27,
						backgroundColor: "#fff"
					}, {
						width: 329,
						height: 55,
						x: 600,
						y: 460
					}),
					new CanvasText({
						text: t('share.referralCode') + ':' + code,
						fontSize: 15,
						color: "#fff"
					}, {
						x: 10,
						y: 35
					}),
					new CanvasText({
						text: t('share.fxshl'),
						fontSize: 21,
						color: "#fff"
					}, {
						x: 10,
						y: 65
					}),
					new CanvasText({
						text: t('pageShare.t1'),
						fontSize: 30,
						font:'bold 30px sans-serif',
						color: [new TextColor(0.16,'#fff'), new TextColor(0.9984,'#fff')]
					}, {
						x: 'center',
						y: 360
					})

				]).then(ok).catch(fail);
			}
		})
	})
}

let shareUrl = ref('')
let imageRes: string[] = [];
let inviteCode = '';

const canvasQRcode = ref()
const generateQRCode = (text: string) => {
	return new Promise<string>((resolve, reject) => {
		QRcode.toCanvas(canvasQRcode.value, text, { width: 115 }, (err: any) => {
			if (err) {
				return reject(err);
			}
			var base64Arr = canvasQRcode.value.toDataURL().split(',');
			var bytes = atob(base64Arr[1])
			let ab = new ArrayBuffer(bytes.length);
			let ia = new Uint8Array(ab);
			for (let i = 0; i < bytes.length; i++) {
				ia[i] = bytes.charCodeAt(i);
			}
			var blob = new Blob([ab], { type: 'application/octet-stream' });
			let url = URL.createObjectURL(blob);
			resolve(url)
		});
	})

}

onMounted(() => {
	'/api/agent/team'.GET<UserTeam>(null, {
		Authorization: async () => await dbGet('token')
	}).then(async ret => {
		let url = ret.domain[0] || location.origin;
		shareUrl.value = url.url + '?invite_code=' + ret.inviteCode;
		let qrUrl = await generateQRCode(shareUrl.value);
		imageRes = ret.image;
		inviteCode = ret.inviteCode;
		let imgs = [];
		for (let src of imageRes) {
			imgs.push(await createImg(inviteCode, qrUrl, src));
		}
		posterImgs.value = imgs;
	})
})
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";

:deep(.page-head){
  background: var(--body-background-color);
  color: #FFFFFF;
}
.container {
  background: #1F1F1F;
}
page {
	height: 100%;
	box-sizing: border-box;
	padding: 0.6250rem;
	position: relative;
}

.icon {
	width: 2.5000rem;
	height: 2.5000rem;
	position: absolute;
	top: 40%;
	right: 0.6250rem;
	cursor: pointer;
	fill: #FFF;
	background-color: rgba(0, 0, 0, 0.5);
	border-radius: 0.1563rem;
	padding: 0.3125rem;
	z-index: calc(var(--I1) + 0);

	&.left {
		transform: rotateZ(180deg);
		left: 0.6250rem;
		right: auto;
	}

	&:active {
		fill: #FFF;
		fill: #824BF6;
	}
}

.container {
	height: 100%;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-bottom: 0.6250rem;
}

.canvas-box {
	box-sizing: border-box;
	overflow: hidden;
	position: absolute;
	opacity: 0;
	z-index: calc(var(--I1) + 0);
	pointer-events: none;
}

.imgs-box {
	// padding: 0.6250rem;
	height: calc(100% - 4.6875rem - 1.5rem);
	box-sizing: border-box;

	swiper,
	swiper-item,
	image {
		width: 100%;
		height: 100%;
	}
	@include pc {
		padding:0;
		height:auto;
	}
}

#canvas {
	width: 21.9375rem;
	height: 26.125rem;

	@include pc {
		width: 428px;
		height: 520px;
	}
}

// .container {
// 	// padding-top: 1.5625rem;
// }

.imgs {
	width: 100%;
	// height: 100%;
	display: block;
	border-radius: 1rem;

	@include pc {
		width: auto;
	}
}

.button-view {
	width: 100%;
	display: flex;
	color: #FFFFFF;
	text-align: center;
	// position: fixed;
	// bottom: 0;
	justify-content: center;
	margin-top: 0.6250rem;

	.button-team {
		margin: 0 1.0938rem;
	}

	image {
		width: 1.9688rem;
		height: 2.1250rem;
		margin-top: 1.1250rem;
	}

	.button-icon {
		width: 4.3750rem;
		height: 4.3750rem;
		text-align: center;
		background-color: red;
		border-radius: 50%;
	}


	.blue {
		background-color: #1f222d;
	}

	.gress {
		background-color: #2ae035;
	}
}

.btsns {
	display: flex;
	justify-content: space-between;
	padding: 0 0.6250rem;
	@include pc {
		padding:0;
	}
}

.share-btn,
.copy-btn {
	width: calc(50% - 0.6250rem);
	display: flex;
	align-items: center;
	justify-content: center;
	height: 2.5000rem;
  font-weight: 900;
	@include button(#824BF6);
	border-radius: 0.5000rem;
  background: #009D81;
  color: #fff;
	@include pc{
		height: 46px;
		border-radius: 16px;
		font-size: 18px;
	}
}

.copy-btn {
	color: #FFFFFF;
  background: transparent !important;
  border: 1px solid #999;
}

.copy-btn-pc {
	width: calc(50% - 0.6250rem);
	display: flex;
	align-items: center;
	justify-content: center;
	height: 46px;
	border-radius: 16px;
	border: 1px solid var(--Linear, #29ACC9);
	background: rgba(32, 30, 71, 0.36);
	color: #FFFFFF;
}

.indicator-dots {
	height: 1.8750rem;
	display: flex;
	align-items: center;
	justify-content: center;

	.indicator-dots-item {
		width: 0.6250rem;
		height: 0.6250rem;
		border-radius: 0.3125rem;
		background-color: #47494c;
		margin: 0 0.3125rem;
		transition: all 0.3s ease-out;
		cursor: pointer;

		&.active {
			width: 1.2500rem;
			// background-color: #8E90CD;
		}
	}
}
</style>