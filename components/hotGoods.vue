<template>
	<view>
		<view class="recommend">
		  <view class="new">人气推荐·好物精选</view>
		  <view class="more" @click="toDetail">查看更多</view>
		</view>
		<scroll-view scroll-x="true">
		  <view class="scroll-view_H">
		    <view class="scroll_item" v-for="item in hotGoods" :key="item.id" @click="goDetail(item.id)">
		      <view class="img">
		        <image :src="item.list_pic_url" class="list_pic_url"></image>
		      </view>
		      <view class="name">{{item.name}}</view>
		      <view class="goods_brief">{{item.goods_brief}}</view>
		      <view class="retail_price">{{item.retail_price | fixed}}</view>
		    </view>
		  </view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
    props: {
      hotGoods: {
        type: Array,
        default: () => []
      }
    },
		data() {
			return {
				
			};
		},
    methods: {
      // 更多人气推荐
      toDetail() {
        let flag = 'hot'
        uni.navigateTo({
          url: `/pages/moreDetail/moreDetail?flag=${flag}`
        })
      },
      // 详情
      goDetail(id) {
        uni.navigateTo({
          url: `/pages/detail/detail?id=${id}`
        })
      }
    },
    filters: {
      fixed(val) {
        return "￥" + Number(val).toFixed(2);
      }
    },
	}
</script>

<style lang="scss">
  .recommend {
    width: 750rpx;
    height: 260rpx;
    background: rgb(252,244,221);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20rpx;
  }

  .new {
    font-size: 36rpx;
    margin-bottom: 10rpx;
  }

  .more {
    font-size: 30rpx;
    background: rgb(243,233,203);
    width: 200rpx;
    height: 50rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .scroll-view_H {
    display: flex;
    margin-bottom: 20rpx;
  }

  .scroll_item {
    width: 280rpx;
    margin: 0 20rpx;
  }

  .name {
    wwidth: 280rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 10rpx 0;
  }

  .img {
    width: 280rpx;
    height: 280rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .list_pic_url {
    width: 280rpx;
    height: 280rpx;
  }

  .goods_brief {
    width: 280rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #999999;
    font-size: 30rpx;
  }

  .retail_price {
    font-size: 30rpx;
    color: #d81e06;
    margin-top: 10rpx;
  }
</style>
