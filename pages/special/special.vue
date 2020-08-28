<template>
	<view>
    <view v-if="flag == true">
      <view class="special" v-for="item in list" :key="item.id">
      	<image :src="item.scene_pic_url" class="scene_pic_url" @click="gotoDetail(item.id)" :id="item.id"></image>
      	<view>{{item.title}}</view>
      	<view class="subtitle">{{item.subtitle}}</view>
      	<view class="price_info">{{item.price_info | fixed}}</view>
      </view>
    </view>
		<view v-else>
		  <image src="../../static/image/erro.jpg" class="error_img"></image>
      <view class="fail">很抱歉，页面加载失败了，请稍后尝试刷新</view>
      <view class="button" @click="reload">刷新一下</view>
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
				page: 1,
				list: [],
				total: 0,
        flag: true
			}
		},
		methods: {
      // 获取专题信息
			getData() {
        uni.showLoading({
          title: '加载中...'
        })
				uni.request({
					// #ifdef  H5
					url: `/api/topic/listaction?page=${this.page}`,
					// #endif
					// #ifndef  H5
					url: `${this.$api}/topic/listaction?page=${this.page}`,
					// #endif
					method: 'GET',
					data: {},
					success: res => {
            uni.hideLoading()
            this.flag = true
						this.list = res.data.data
						this.total = res.data.total
						console.log(res);
					},
					fail: () => {},
					complete: () => {}
				});
			},
      // 查看专题详情
			gotoDetail(id) {
				uni.navigateTo({
					url: `/pages/detailaction/detailaction?id=${id}`
				})
			},
      reload() {
        this.getData()
      }
		},
		mounted() {

		},
		onLoad() {
			this.getData()
      // setTimeout(() => {
      //   if(this.total == 0){
      //    this.flag = false 
      //   }
      // }, 5000)
		},
    // 上拉触底加载
		onReachBottom() {
			if (this.page < this.total) {
				this.page++;
				uni.request({
					// #ifdef  H5
					url: `/api/topic/listaction?page=${this.page}`,
					// #endif
					// #ifndef  H5
					url: `${this.$api}/topic/listaction?page=${this.page}`,
					// #endif
					method: 'GET',
					data: {},
					success: res => {
						let list = res.data.data
						this.list = this.list.concat(list)
					},
					fail: () => {},
					complete: () => {}
				});
			} else {
				uni.showToast({
					title: "已加载全部数据",
					duration: 2000,
					icon: "none"
				})
			}
		},
		filters: {
      fixed(val) {
        return "￥" + Number(val).toFixed(2);
      }
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
	.special {
		width: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 40rpx;
	}

	.scene_pic_url {
		width: 750rpx;
		height: 450rpx;
		margin-bottom: 20rpx;
	}

	.subtitle {
		width: 710rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 30rpx;
		color: #666666;
		margin: 20rpx 0;
		text-align: center;
	}

	.price_info {
		font-size: 30rpx;
		color: #d81e06;
	}
  .error_img {
    width: 750rpx;
    height: 620rpx;
  }
  .fail {
    width: 750rpx;
    text-align: center;
    color: #888;
    margin-bottom: 40rpx;
  }
  .button {
    font-size: 30rpx;
    width: 430rpx;
    padding: 22rpx 0;
    color: #FFFFFF;
    background: #fe9b00;
    text-align: center;
    margin: 0 160rpx;
    border-radius: 10rpx;
  }
</style>