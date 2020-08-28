<template>
	<view class="">
		<image src="../../static/image/lop.png" mode="" class="img"></image>
		<view class="loco">
			<image src="../../static/image/ssss.png" mode="" class="img1"></image>
		</view>
		<!-- 账号 -->
		<view class="locos">
			<view class="font1">账户</view>
			<input class="uni-input" v-model="username" focus placeholder="请输入用户名" />
		</view>
		<!-- 密码 -->
		<view class="locos">
			<view class="font1">密码</view>
			<input class="uni-input" v-model="password" focus placeholder="请输入密码" type="password"/>
		</view>
		<!-- 注册 -->
		<view class="box3">
			<button type="primary" @click="goto">注册/登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: "",
		components: {

		},
		props: {},
		data() {
			return {
				password: '',
				username: ''
			}
		},
		methods: {
		 goto(){
			 if(this.password==='' || this.username==='') {
				 uni.showToast({
				 	title:"账号或密码不能为空"
				 })
			 }else {
				 uni.setStorageSync("username",this.username)
				 uni.switchTab({
				 	url:'../my/my'
				 })
			 }
		 }
		},
		mounted() {

		},
		onLoad() {

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
	.img {
		width: 100%;
		height: 100%;
		position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
		z-index: -1;
	}

	.loco {
		width: 750rpx;
		height: 600rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 99;
	}

	.img1 {
		width: 250rpx;
		height: 250rpx;
		border-radius: 50%;
	}

	.locos {
		width: 630rpx;
		height: 100rpx;
		margin: 0 60rpx;
		display: flex;
		align-items: center;
		border-bottom: 2rpx solid #cccc;
	}

	.font1 {
		font-size: 34rpx;
		width: 120rpx;
	}

	.box3 {
		width: 550rpx;
    margin: 0 100rpx;
		margin-top: 80rpx;
	}

	.dev2 {
		width: 50%;
		height: 180rpx;
		margin-left: 25%;
		margin-top: 80rpx;
	}

	.font2 {
		width: 100%;
		text-align: center;
		font-size: 28rpx;
		color: #999;
	}

</style>
