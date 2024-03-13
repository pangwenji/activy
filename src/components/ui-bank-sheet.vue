<template>
  <transition @after-leave="afterLeave">
    <div class="ios-actionsheet-overlay" v-if="showModal" @click="deactivate">

      <div class="ios-actionsheet">
        <div class="vip-sheet-title">
          <span>{{ title }} </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" 
              d="M4.39052 4.89052C4.91122 4.36983 5.75544 4.36983 6.27614 4.89052L16 14.6144L25.7239 4.89052C26.2446 4.36983 27.0888 4.36983 27.6095 4.89052C28.1302 5.41122 28.1302 6.25544 27.6095 6.77614L17.8856 16.5L27.6095 26.2239C28.1302 26.7446 28.1302 27.5888 27.6095 28.1095C27.0888 28.6302 26.2446 28.6302 25.7239 28.1095L16 18.3856L6.27614 28.1095C5.75544 28.6302 4.91122 28.6302 4.39052 28.1095C3.86983 27.5888 3.86983 26.7446 4.39052 26.2239L14.1144 16.5L4.39052 6.77614C3.86983 6.25544 3.86983 5.41122 4.39052 4.89052Z"
              fill="#ffffff" />
          </svg>
        </div>
        <scroll-view style="height:50vh;overflow: hidden;" :scroll-y="true">
          <div class="vip-actionsheet-group">
            <div class="bank-card" v-for="(item, index) in buttons" @click.stop="onClick(item, index)">
              <div class="info-box">
                <div class="info">
                        <div>{{ item.type }}</div>
                        <div v-if="item.real_name">{{ item.real_name }}</div>
                        <div v-if="item.bank_code">{{ item.bank_code }}</div>
                        <div v-if="item.bank_name">{{ item.bank_name }}</div>
                    </div>
                    <div class="numbers">{{  showIndex.indexOf(index) > -1 ? item.bank_account : hiddenNumbers(item.bank_account) }}</div>

              </div>
              <div class="btns">
                <div class="icon-btn" v-if="showIndex.indexOf(index) > -1" @click.stop="showCilke(index,0)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M0.542766 26.8464C-0.0869687 27.3667 -0.182688 28.3077 0.328971 28.9481C0.84063 29.5884 1.76591 29.6858 2.39565 29.1655L31.4572 5.15357C32.087 4.63326 32.1827 3.69233 31.671 3.05195C31.1594 2.41156 30.2341 2.31422 29.6044 2.83454L25.4423 6.2734C22.7983 4.34895 19.5005 3.05194 15.9258 3.05194C7.35832 3.05194 0.394643 10.5062 0.328885 16.2211C0.433229 18.5487 1.88885 21.3828 4.24775 23.7852L0.542766 26.8464ZM6.51985 21.9079L10.5281 18.5961C9.94972 17.7112 9.61373 16.7602 9.57928 15.9256C9.48052 13.5309 12.2598 10.1779 15.9258 10.1779C17.2029 10.1779 18.3979 10.6034 19.4068 11.2602L23.1482 8.16884C21.1644 6.88079 18.776 6.03549 16.2467 6.03549C9.24618 6.03549 3.25955 11.8071 3.27844 16.137C3.28677 17.9157 4.51989 20.078 6.51985 21.9079ZM16.8129 13.4033C16.5879 13.351 16.3568 13.3224 16.1233 13.3224C13.9289 13.3224 12.343 14.8508 12.3483 16.0824C12.3496 16.3178 12.4469 16.5886 12.626 16.8627L16.8129 13.4033Z"
                                fill="#FFFFFF" />
                            <path
                                d="M15.9258 28.9481C13.2022 28.9481 10.6572 28.1805 8.44513 26.9685L11.0857 24.7867C12.6778 25.4328 14.4267 25.8228 16.2467 25.8228C22.84 25.8228 28.4894 20.0689 28.4825 16.137C28.4804 14.7342 27.895 13.1877 26.8818 11.7354L29.1284 9.87906C30.6836 11.9412 31.61 14.1951 31.6709 16.2211C31.6052 21.3769 24.5117 28.9481 15.9258 28.9481Z"
                                fill="#FFFFFF" />
                            <path
                                d="M14.9511 21.5929L22.4005 15.438C22.4256 15.6037 22.4387 15.7667 22.4387 15.9256C22.4423 18.3303 19.5026 21.6733 15.9258 21.6733C15.5915 21.6733 15.2663 21.6454 14.9511 21.5929Z"
                                fill="#FFFFFF" />
                        </svg>
                    </div>
                    <div class="icon-btn" v-if="showIndex.indexOf(index) === -1" @click.stop="showCilke(index,1)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M15.9244 30C7.1769 30 0.235171 22.3749 0 17.222C0.0671916 11.4842 7.1769 4 15.9244 4C24.6904 4 31.8249 11.512 32 17.222C31.9328 22.3985 24.6904 30 15.9244 30ZM16.252 6.99552C9.10446 6.99552 2.99213 12.7903 3.01144 17.1376C3.03034 21.0675 9.10446 26.8623 16.252 26.8623C22.9837 26.8623 28.7517 21.0852 28.7446 17.1376C28.7378 12.7625 22.9837 6.99552 16.252 6.99552ZM15.9244 22.696C12.1814 22.696 9.54541 19.3296 9.44462 16.9253C9.34383 14.521 12.1814 11.1546 15.9244 11.1546C19.5763 11.1546 22.5701 14.505 22.5739 16.9253C22.5776 19.3397 19.5763 22.696 15.9244 22.696ZM16.126 14.3117C13.8856 14.3117 12.2662 15.8462 12.2717 17.0827C12.2767 18.0382 13.8856 19.5727 16.126 19.5727C17.8675 19.5727 19.4835 18.0428 19.4814 17.0827C19.4797 15.839 17.8675 14.3117 16.126 14.3117Z"
                                fill="#FFFFFF" />
                        </svg>
                    </div>
                <div class="icon-btn" v-if="selectedIndex == index">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M5.62976 5.62925C8.28247 2.97658 11.951 1.3335 16.0007 1.3335C20.0503 1.3335 23.7188 2.97658 26.3715 5.62926C29.0242 8.28197 30.6673 11.9505 30.6673 16.0002C30.6673 20.0499 29.0242 23.7183 26.3715 26.371C23.7188 29.0237 20.0503 30.6668 16.0007 30.6668C11.951 30.6668 8.28246 29.0237 5.62975 26.371C2.97708 23.7184 1.33398 20.0499 1.33398 16.0002C1.33398 11.9505 2.97709 8.28197 5.62976 5.62925ZM23.6101 12.943C24.1308 12.4223 24.1308 11.5781 23.6101 11.0574C23.0894 10.5367 22.2452 10.5367 21.7245 11.0574L14.6673 18.1145L11.6101 15.0574C11.0894 14.5367 10.2452 14.5367 9.72451 15.0574C9.20381 15.5781 9.20381 16.4223 9.72451 16.943L13.7245 20.943C14.2452 21.4637 15.0894 21.4637 15.6101 20.943L23.6101 12.943Z"
                      fill="#14D03D" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </scroll-view>
        <div class="submit-btn" @click="submintFn">
          <text>{{ submintBtn }}</text>
        </div>
      </div>
    </div>
  </transition>
</template>
  
<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import { hiddenNumbers } from '../uilts/base';
import ScrollView from './scroll-view.vue'

const props = defineProps<{
  selectedIndex: number,
  title: string,
  closeAfter?: Function;
  isShow?: boolean;
  buttons: Array<Bank>;
  selectOk: Function;
  submintBtn: string;
  submintFn: (payload: MouseEvent) => void;
}>()

const showModal = ref(props.isShow || false);
const showIndex = ref<Array<number>>([])

const showCilke = (index:number,type:number) => {
    if(type){
        showIndex.value.push(index)
    }else{
        showIndex.value.splice(showIndex.value.indexOf(index),1)
    }
}
// console.log(props.buttons,'GGG')
const deactivate = () => {
  showModal.value = false;
}
const onClick = (button: Bank, selectedIndex: number) => {
  props.selectOk({ button, selectedIndex });
  showModal.value = false;
}
const afterLeave = () => {
  if (props.closeAfter) {
    props.closeAfter();
  }
}
</script>
  
<style lang="scss" scoped>
@import '../scss/public.scss';

.ios-actionsheet {
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  background: #1f1f1f;;
  padding: 0 0.75rem;
  @include pc {
    transform: translateY(-50%);
    border-radius: 0.5rem;
    overflow: hidden;
    bottom: auto;
  }
}

.vip-sheet-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  // color: #8E90CD;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 700;

  svg {
    width: 1rem;
    height: 1rem;
  }
}


.bank-card {
  padding: 1rem;
  border-radius: 0.5rem;
  background: #494949;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;
  margin-bottom: 0.75rem;

  .info-box {
    width: 70%;
  }

  .info {
    display: flex;
    align-items: center;
    // justify-content: space-between;
    padding-bottom: 0.25rem;
    div{
      margin-right: 2.5rem;
    }
  }

  .numbers {
    color: #ffffff;
    text-shadow: 0px 1px 0px #000;
    font-size: 1.25rem;
    font-weight: 700;
  }

  .btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;

    .icon-btn {
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
}

.submit-btn {
  @extend %button;
  height: 3.125rem;
  margin: 1.8rem 0;
  background: #009d81;
  @include pc {
    display: flex;
    height: 60px;
    border: none;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background: #009d81;
  }

  &.disabled {
    filter: brightness(0.5);
    pointer-events: none;
  }
}</style>
