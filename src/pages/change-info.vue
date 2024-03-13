<template>
	<page>
		<view class="banner-box">
			<img class="banner" src="@/assets/login/banner.png" mode="widthFix" />
			<view class="txt">
				WELCOME TO <text>PGNEW</text>
				<view>START YOUR GAME JOURNEY NOW!</view>
			</view>
		</view>
		<view class="content">
			<view class="title">
				{{$t("pageChangeInfo.name")}}
			</view>
			<input type="text" v-model="oldPassword" :placeholder="$t('pageChangeInfo.inputOldPassword')" placeholder-class="input-placeholder" />
			<view class="input-box">
				<input :type="showPassword ? 'text' : 'password'"  v-model="newPassword" :placeholder="$t('pageChangeInfo.inputNewPassword')" placeholder-class="input-placeholder" />
				<public-svg class="icon" @click="showPassword = !showPassword" :icon="(!showPassword? 'icon_Hide':'icon_View')"></public-svg>
			</view>
			<view class="input-box">
				<input :type="showPassword ? 'text' : 'password'" v-model="surePassword" :placeholder="$t('pageChangeInfo.inputSurePassword')" placeholder-class="input-placeholder" />
				<public-svg class="icon" @click="showPassword = !showPassword" :icon="(!showPassword? 'icon_Hide':'icon_View')"></public-svg>
			</view>
			
			
			<view class="input-box-flex">
				<input type="text" v-model="code" :placeholder="$t('pageChangeInfo.inputCode')" placeholder-class="input-placeholder" />
				<img class="code-img" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gOTAK/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/9sAQwEDBAQFBAUJBQUJFA0LDRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8AAEQgAKACWAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A/QCiqGqTahbhHsbeK6ABDxO+xieMEHp65zVAazrMa/vNCLEA5aO5XBPsOuCf09a8etmFKhNwqRlp1UJNfekz51tI2p7iK1iMs0qQxjGXkYKBk4HJ96krh/G4sPGHg3W/DniC1uNLt9Us5bKSVovNRfMQgMjAEFlyGHoR7V4J/wAE8/Ft4fA/ijwHqzt/anhbU3Ty3lDiOOQsCi47CWOU5HHz1nSzKjWrqlTd7/Jp+aeq8r2MXWtVjTtufWdc1oOuTax4z8UwJdZsNKNrYfZGRQyXJi+0SSBhyVaO4t1GejRPgdz5r8b/ANpHwn4Y+DfinW/DXi3RtX1SG3+y2i6ZqMM7rcy5WM4RjyvL49ENeJ/siftAfC/4WfBcXPirxoI/FGralcXOqJcwz3FyJBhIwdiMzJ5axsG5G53Gcgga1MXBV4001Zat39UkZTxEFUjG+m7d/kS/CH4ueNfFP7cni7w8fEF9L4Vtbq/ik0uWTzIESEGNNgbOz5wp+XGec9TX2tX5+/sD6jb+Lf2iviP4keeNpryC4uIldsO/nXQcsFPJwBz6ZHrX37dyyQWs0kULXMqIzJCrBTIQOFBJAGemTxXPlkm6MpPv+iIwTbpuTd7tktFfOnwI/bF0/wCMPxG1fwbqWgS+E9Xt932O3u598k7JnzY2G1drrjO3ngN/d5+i69KhXp4iPPTd0ddOrCrHmg7ow9a8d+GvDmqWum6t4h0rS9RugGt7O9vYoZpgTgFEZgW5BHA61uV+d/j23/4aB/4KA22iFzdaNotzHbNxwkVrH5kyn2M3mL/wIV+iFc+FxMsRKenup2T77/pZ/Myo1nVctNE7I+F/2rv2lfiX4f8Aj1F8P/AOrJpweO0tViS2hd5bmbkfPIp25EiDsBjPvS/8MUfGbx3mbxv8W2LZ8yOGO6ubwIT1GG2Kn/AcivN7qWPxl/wUTMk86JBa+IQ5kkcKqrapnqf+uNfcniX9pb4WeEULaj470XIJUpaXIunBHUFYtxB+orw6MaOKc5Ymel9Lvu33+R50FCtKcq8tL6a6f1sfD3i+x+KX7CXjTQ71PE58QaBqbO3kNI5gudhXzI5I2J2th1ww9eDwRX6I+CfFtl488IaP4i04k2Wp2sd1GD1UMMlT7g5B9xX54ftTfFi7/a38X+HfD/w60DU9X03TGlWO4W2YG5lk2AsR/AihOrY4JJxX3v8ABrwPL8NvhZ4Y8MzyLNcabZJDK69C/Vse2Sa6cuajXnTou9P9dP8Ag+qsaYN2qzjT1h0/r7zs6KKK+jPXCiiigAooooACMjB5FfEnibTj+z/+3Hp17pt1b6N4f8bWjNIblmW1WYgh1Y89ZURs9AZh0FfbdfL/APwUA8H3V/8ACnTPGWlu9vrHhHUYr2K5jfa8Ubsqkr7iQQt7bTXj5pQVWjzr4o63Wj89d13+Rx4qK5Of+V3/AMz5d/aZ8LeCLX4l+HvDngvwrYGGwtZdR1VvD961x9qhUGR13AyeXiOJzyMqHBIxivrGw+Hvg3wh8FoL26+F2kanPomghH1C40aATzPFEcybXj3fM2XLZP3icnqfHP2X7PVvjD4m8cfFrW0Q6jrWr2OkWsIYBGh+0QyXUKgnJVbaNUI53JvBzk5+yfixouo+Jfhf4u0jSI0l1S/0m6tbWN3CBpHiZVBY8Dk9TXz9DBTnCpKjUaSTtpF3302306Wun53OWlThNVKtOLV9tttdLW32/wAtbn5zfsefBbwD8YrDxRa+MxfwXqyQrp99YyPH9n+V2kJbBjGcL/rBjjjk19P3nwU+Pfgkx6V8NfitYz+EYEAs4vFMcc13EDyVaUWzlxknHIAGAAAK8D+GkvxO/ZH0vVtN8TfCKTXdAunN3cahabmkh+VVH+kxeYioMZ2sByTzzXqXhT9r34OmyLn/AIk6AhjZXVjLHcMTjd+9t1KsASTljkgdO1Z08THDStXg7d435kvNaael3psPDfUvZqFZyhNbtddX5q34nh/x9+APxg+HOozfFPXtU0m61SG9haTU9AJilMu3In8tYkUAEBSQASRkg5LHpfh94g8d/Fv4UXfiTWP2i5/DTaLDKv8AZUO2O7ZY0yC7LLE0hYY+Y7yc9ScivqrwH41+H/xq8P6lPoHhO08Q6ex/s+4nex+SUlQzxu8kYPAZTznqOlfBfxt8IeKf2afFfifSNH+3aZ4R8UwvBELhcie33Z8snGN6Zxkc4Po1Z1K1Bz/2eTd77xcdfNtd9e/3kVY4XDyVSnzTg079Nejum/69Uan7Jh+LEPirxF458A6Rpfi3WGja0vo9aux50vmusryLuljJbMYyxJ+90Oa+r7H9uzRfC13/AGL8T/Cmt+BPEsQ3S25h+0QMh6OjDDEHB6KRx941pfsS+EdGsf2c9CtpVjkvNQmm1CeNziSOUvsV0P3lIWOMhhgg8g5r1P4iaS2leCPEV++sXb2VlptxcfY7uKC4hwkbN83mRl26d2Ne7hYS+re2o1e7a0a/4Dtv1OzC0YfV4zjV5Xa7urr8Ff8Arc/JzSZvDHxF+Kmqaj4z8QT+G9Fvp7i8lvIbR7mVmJLKioueWOBk8DvXp+nxfs4WVo8snhv4narprt5EerSfZl3T/wBxApVPugn5iW46d60v2CfB+ieJ/iZ4hvdea2Wz03TTOr3UUDIrmVBuzKjbCBn5l2kZ619peKvjn8IvC8KNrHxLS4iU/uo9P1WWZowP4T9kO5v+2m4+prgwuGpzptzqqNtNfT1X9fI87C4ajOlz1aqj8rv8Wl+P6Hx9qmpav+xt4m8F+MPBl3qU/gfxbaLetoOs4WbyxsLwy4yA4WRSrqOCehGQf0g0PWbXxFothqtjJ5tlfW8dzA/95HUMp/Iivy0/aS+KMH7S/wATNE0jwFpF/c2dtm1s1mLvPdyuwy5VmO1eBjPYEnHQfpt8OvDD+CvAPhzQJJBLJpmnwWbyDozJGFJHtkV6GWvlqzp03eHfz/S+p1YVxVWcKLvBbX0169X1v17HRUUUV9EemFFFFABRRRQBT1i5u7LSL64sLL+0b6KB5Lez80RefIFJWPeeF3HA3HgZzXxr+158WviB4w+HyeCLH4W+KtGutSmgj1G4ktlurc5YFIIZoC6OWcJzlTxjHNFFeNmblGlpLR9NP+H/ABODGX9m7Pc+kPgT8JrX4UfCbwv4ZmggmvtPiE9xLtVv9LcEyurY7F2UN12gCvRqKK9SnTjSiox6HbGKhFRXQK858b/s6/DX4jTtceIPB2m3lyx3NcRIbeVz6s8RVm/E0UUTpU6uk4p+quKUIzVpK5u/Dn4X+F/hLoUuj+E9KTR9Nlna6eBJZJN0pVVLFnZj0RR17V83/tvfB34i/G7X/CWl+F/Dv27QdODzXN815bwgSyMFI2vIGO1UB4H8XeiiuevhoVaao7R8v676mVShCpT9lsvI+ltN8B6Vpmh6VpsUJVdNtY7WCaMlHVUUBTx34zWP418PatqfgzWfD88jajp2pWE9hLPEuLpFljaPIzkEjdnoaKK8/FZdQjTlVo3pySesdL2XVbP5psuUI8rSPkrw7/wTg0TVL3beeLtWtRGN8ls2norlSSBhy3t/cr1vwz/wT3+EOgtuvLLVfEJ6j+09QZQPwhEf60UVxZNQp18Nz1VdptXfk/u/A5qWFopX5f1PavA/wq8IfDWDyvDHhzT9GyuxpbaECVl9GkOWYcDqTXV0UV9NCnCmuWCSXkdkYqKtFWQUUUVoUFFFFAH/2Q==" 
				mode="aspectFit" />
				
			</view>
			<view class="forgot">
				{{$t("pageChangeInfo.tips")}}
			</view>
			
			<view class="btn" @click="submit()">
				{{$t("pageChangeInfo.submintButton")}}
			</view>
			<view class="create-account">
				New to PGNEW? <text @click="$open('/register',{ login : 0})">Greate account</text>
			</view>
			
			<view class="login-directly">
				<view>Login directly with</view>
			</view>
			<view class="icons">
				<view class="icon-1"></view>
				<view class="icon-2"></view>
				<view class="icon-3"></view>
				<view class="icon-4"></view>
				<view class="icon-5"></view>
			</view>
			
			
		</view>
		
	</page>
</template>

<script setup lang="ts">
import Page from '../components/page.vue'
	import { ref } from 'vue';
	// import { load } from '@/uilts/routes'
	let showPassword = ref(false);
	let oldPassword = ref('');
	let newPassword = ref('');
	let surePassword = ref('');
	let code = ref('');
	function submit(){
		
	}
	
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';
	page{
		color:#FFF;
	}
	.banner-box{
		position: relative;
		font-size:1.0625rem;
		font-weight:700;
		text-align:center;
		.txt{
			position: absolute;
			width:60%;
			top:55%;
			right:0;
			text{
				color:#2AE035;
			}
			view{
				font-size:0.7813rem;
				color:#9BA6B3;
				font-weight:normal;
			}
		}
	}
	.banner{
		display:block;
		margin:0 auto;
		width:16.7500rem;
		margin-bottom:-1.5625rem;
	}
	.content{
		padding:0 1.5625rem;
	}
	.title{
		font-size:0.7813rem;
		font-weight:700;
		padding-bottom:0.6250rem;
	}
	input{
		height:2.3750rem;
		width:100%;
		font-size:0.7500rem;
		box-sizing:border-box;
		padding:0 0.6250rem;
		background-color:#1A1C20;
		border:1px solid #1A1C20;
		margin-top:0.6250rem;
		border-radius:0.1250rem;
		&:active,&:focus,&.active{
			border:1px solid #2AE035;
		}
	}
	.input-placeholder{
		color:#9BA6B3;
		font-size:0.7813rem;
	}
	.btn{
		@include button(#2AE035);
		height:2.3750rem;
		margin-top:0.6250rem;
	}
	.input-box{
		position: relative;
		input{
			padding-right:2.1875rem;
		}
		.icon{
			position:absolute;
			right:0.6250rem;
			top:0;
			width:0.9375rem;
			height:2.3750rem;
			fill:#67707B;
		}
	}
	.input-box-flex{
		display:flex;
		align-items:center;
		margin-top:0.6250rem;
		input{
			margin:0;
			margin-right:0.6250rem;
		}
		.code-img{
			width:9.3750rem;
			height:2.3750rem;
		}
	}
	.forgot{
		font-size:0.7813rem;
		margin:1.2500rem 0;
		text-align:right;
	}
	.create-account,.login-directly{
		font-size:0.7813rem;
		color:#9BA6B3;
		margin:1.2500rem 0;
		text{
			color:#2AE035;
		}
	}
	.login-directly{
		text-align:center;
		@extend %flex-center;
		view{
			margin:0 0.6250rem;
		}
		&::before,&::after{
			content: '';
			flex:1;
			display:block;
			height:1px;
			background-color:#A6B2C0;
		}
	}
	.icons{
		@extend %flex-center;
		justify-content:space-between;
	}
	[class*='icon-']{
		width:3.4375rem;
		height:2.6250rem;
		border:1px solid #A6B2C0;
		border-radius:0.1250rem;
		box-sizing:border-box;
		background-repeat:no-repeat;
		background-position:center center;
		background-size:0.9375rem;
	}
	@for $i from 1 through 5 {
		.icon-#{$i}{
			background-image:url(@/assets/login/login-icon#{$i}.png);
		}
	}

</style>
