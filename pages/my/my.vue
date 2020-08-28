<template>
	<view>
      <!-- 人物 -->
	  <uni-popup ref="popup" type="center">底部弹出 Popup</uni-popup>
		<view v-if="arr===''">
			<view class="from">
        <view class="from_left">
          <image src="../../static/image/touxiang.png" mode="" class="img"></image>
          <view class="login" @click="login">点击登录</view>
        </view>
				<image src="../../static/image/jiantou.png" mode="" class="img2"></image>
			</view>
		</view>
		<view v-else>
			<view class="from">
        <view class="from_left">
          <image src="../../static/image/touxiang-active.png" mode="" class="img"></image>
          <view class="login">{{arr}}</view>
        </view>
				<image src="../../static/image/jiantou.png" mode="" class="img2"></image>
			</view>
		</view>
		<!-- 九宫格 -->
		 <view class="fromone">
		 	<view class="dev" @click="noNavgateTo">
		 		<image src="../../static/image/dingdan.png" mode="" class="icon"></image>
				<view class="size">我的订单</view>
		 	</view>
			<view class="dev_mid" @click="noNavgateTo">
				<image src="../../static/image/jingpai.png" mode="" class="icon"></image>
				<view class="size">优惠卷</view>
			</view>
			<view class="dev" @click="noNavgateTo">
				<image src="../../static/image/hongbao.png" mode="" class="icon"></image>
				<view class="size">礼品卡</view>
			</view>
			<view class="dev" @click="collect">
				<image src="../../static/image/aixin.png" class="icon"></image>
				<view class="size">我的收藏</view>
			</view>
			<view class="dev_mid" @click="noNavgateTo">
				<image src="../../static/image/yanjing.png" mode="" class="icon"></image>
				<view class="size">我的足迹</view>
			</view>
			<view class="dev" @click="noNavgateTo">
				<image src="../../static/image/vip.png" mode="" class="icon"></image>
				<view class="size">会员福利</view>
			</view>
			<view class="dev" @click="address">
				<image src="../../static/image/dingwei.png" mode="" class="icon"></image>
				<view class="size">地址管理</view>
			</view>
			<view class="dev_mid" @click="noNavgateTo">
				<image src="../../static/image/xiaoxi.png" mode="" class="icon"></image>
				<view class="size">账号安全</view>
			</view>
			<view class="dev" @click="noNavgateTo">
				<image src="../../static/image/phone.png" mode="" class="icon"></image>
				<view class="size">联系客服</view>
			</view>
			<view class="devss" @click="noNavgateTo">
				<image src="../../static/image/wenhao.png" mode="" class="icon"></image>
				<view class="size">帮助中心</view>
			</view>
			<view class="dev_mids" @click="noNavgateTo">
				<image src="../../static/image/benzi.png" mode="" class="icon"></image>
				<view class="size">意见反馈</view>
			</view>
      <view class="devs"></view>
		 </view>
	</view>
</template>

<script>
	import uniPopup from '../../components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '../../components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '../../components/uni-popup/uni-popup-dialog.vue'
	export default {
		name: "",
		components: {
		uniPopup,
		uniPopupMessage,
		uniPopupDialog
		},
		props: {},
		data() {
			return {
				arr: ''
			}
		},
		methods: {
		login(){
			uni.navigateTo({
				url:'../login/login'
			})
		},
		collect(){
			uni.navigateTo({
				url:'../collect/collect'
			})
		},
		address(){
			uni.navigateTo({
				url:'../address/address'
			})
		},
    noNavgateTo() {
      uni.showToast({
        title:'该功能正在开发中...',
        duration:2000,
        icon:'none'
      })
    }
		},
		mounted() {

		},
		onLoad() {
			this.arr = uni.getStorageSync("data")
		},
		filters: {

		},
		computed: {

		},
		watch: {

		},
		directives: {

		}
	}
</script>

<style scoped lang="scss">
	.from {
		padding: 30rpx;
		background-color: #d81e06;
		display: flex;
    justify-content: space-between;
    align-items: center;
		width: 750rpx;
	}
.from_left {
  display: flex;
  align-items: center;
}
	.img {
		width: 150rpx;
		height: 150rpx;
		border-radius: 50%;
		z-index: 99;
	}

	.login {
		font-size: 34rpx;
		color: white;
		margin-left: 40rpx;
	}

	.img2 {
		width: 50rpx;
		height: 50rpx;
	}
	// .grid-text {
	// 		font-size: 28rpx;
	// 		margin-top: 4rpx;
	// 		color: $u-type-info;
	// 	}
		.fromone {
      display: flex;
			flex-wrap: wrap;
      background: #EEEEEE;
		}
		.dev {
			width: 248rpx;
			height: 220rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 3rpx;
      background: #FFFFFF;
		}
    .devss {
    	width: 248rpx;
    	height: 220rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #FFFFFF;
    }
    .dev_mid {
      background: #FFFFFF;
      width: 248rpx;
      height: 220rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0 3rpx 3rpx 3rpx;
    }
    .dev_mids {
      background: #FFFFFF;
      width: 248rpx;
      height: 220rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0 3rpx;
    }
    .devs {
      width: 248rpx;
      height: 220rpx;
      background: #FFFFFF;
    }
		.icon {
			width: 60rpx;
			height: 60rpx;
		}
		.size {
			font-size: 28rpx;
			margin-top: 20rpx;
		}
</style>
