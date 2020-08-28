<template>
  <view>
    <view class="special">专题推荐</view>
    <scroll-view scroll-x="true">
      <view class="scroll-view_H">
        <view class="scroll_item" v-for="item in topicList" :key="item.id">
          <image :src="item.item_pic_url" class="item_pic_url" @click="gotoDetail(item.id)"></image>
          <view class="title">{{item.title}}
            <text class="price_info">{{item.price_info | fixed}}</text>
          </view>
          <view class="subtitle">{{item.subtitle}}</view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    props: {
      topicList: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {

      };
    },
    methods: {
      gotoDetail(id) {
        uni.navigateTo({
          url: `/pages/detailaction/detailaction?id=${id}`
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
  .special {
    width: 750rpx;
    font-weight: 600;
    text-align: center;
    margin: 20rpx 0;
    font-size: 36rpx;
  }

  .scroll-view_H {
    display: flex;
    margin-bottom: 20rpx;
  }

  .scroll_item {
    width: 620rpx;
    margin-left: 20rpx;
  }

  .item_pic_url {
    width: 620rpx;
    height: 350rpx;
  }

  .title {
    width: 620rpx;
    margin: 10rpx 0;
    display: flex;
  }

  .price_info {
    color: #d81e06;
    margin-left: 10rpx;
  }

  .subtitle {
    color: #999999;
    font-size: 30rpx;
    width: 620rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
