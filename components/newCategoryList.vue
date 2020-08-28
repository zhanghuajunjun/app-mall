<template>
  <view class="boxStyle">
    <view v-for="(item,index1) in newCategoryList" :key="item.id">
      <view class="box_name">{{item.name}}</view>
      <view class="item">
        <view v-for="(item1,index) in item.goodsList" :key="index" class="item1" :class="{'active':index%2 == 0}" @click="goDetail(item1.id)">
          <image :src="item1.list_pic_url" mode="" class="img"></image>
          <view class="item1_name">{{item1.name}}</view>
          <view class="retail_price">{{item1.retail_price | fixed}}</view>
        </view>
        <view class="more" @click="toClassification(index1)">
          {{item.name}}
          <image src="../static/image/more.png" class="more_img"></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
   import {
    mapState
   } from 'vuex';
  export default {
    props: {
      newCategoryList: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {

      };
    },
    methods: {
      toClassification(index) {
        uni.switchTab({
          url: `/pages/classification/classification`
        })
        this.$store.commit('setIndex',index)
      },
      // 详情
      goDetail(id) {
        uni.navigateTo({
          url: `/pages/detail/detail?id=${id}`
        })
      }
    },
    computed: {
    ...mapState(['index'])
    },
    filters: {
      fixed(val) {
        return "￥" + Number(val).toFixed(2);
      }
    },
  }
</script>

<style lang="scss">
  .boxStyle {
    padding: 20rpx;
  }

  .box_name {
    font-size: 36rpx;
    padding: 20rpx 0;
    margin-bottom: 20rpx;
    text-align: center;
    font-weight: 600;
  }

  .item {
    display: flex;
    flex-wrap: wrap;
  }

  .item1 {
    width: 350rpx;
    margin-bottom: 10rpx;
    background: #FFFFFF;
  }

  .img {
    width: 350rpx;
    height: 340rpx;
  }

  .item1_name {
    width: 340rpx;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 10rpx 0;
  }

  .retail_price {
    width: 350rpx;
    text-align: center;
    font-size: 30rpx;
    color: #d81e06;
  }

  .more {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36rpx;
    width: 350rpx;
    height: 450rpx;
    background: #FFFFFF;
  }

  .more_img {
    width: 40rpx;
    height: 40rpx;
    margin-left: 30rpx;
  }

  .active {
    margin-right: 10rpx;
  }
</style>
