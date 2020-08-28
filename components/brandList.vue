<template>
  <view class="boxStyle">
    <view class="brand">品牌制造商直供</view>
    <view class="" v-for="(item,index) in brandList" :key="index" @click="goToDetail(item.id)">
      <view class="brandList_item" :class="{'active':(index+1)%2==0}">
        <image :src="item.new_pic_url" class="new_pic_url"></image>
        <view class="item">
          <view class="">{{item.name}}</view>
          <view class="floor_price">{{item.floor_price | fixed}}元起</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      brandList: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {

      };
    },
    methods: {
      goToDetail(id) {
        console.log(id);
        uni.navigateTo({
          url: `/pages/brand/brand?id=${id}`
        })
      }
    },
    filters: {
      fixed(val) {
        return Number(val).toFixed(2);
      }
    },
  }
</script>

<style lang="scss">
  .boxStyle {
    padding: 20rpx;
    display: flex;
    flex-wrap: wrap;
  }

  .brand {
    font-size: 36rpx;
    font-weight: 600;
    margin: 20rpx 0;
    width: 710rpx;
    text-align: center;
  }

  .brandList_item {
    width: 340rpx;
    height: 250rpx;
    margin-bottom: 30rpx;
    position: relative;
  }

  .new_pic_url {
    width: 340rpx;
    height: 250rpx;
  }

  .active {
    margin-left: 30rpx;
  }

  .item {
    position: absolute;
    left: 20rpx;
    top: 20rpx;
  }

  .floor_price {
    margin-top: 6rpx;
    font-size: 30rpx;
    color: #999999;
  }
</style>
