<template>
  <view class="">
    <view class="goodsList" v-if="collectGoodsList.length > 0">
      <view v-for="(item,index) in collectGoodsList" :key="index" class="item1" :class="{'active':index%2 == 0}" @click="goDetail(item.id)">
        <image :src="item.list_pic_url" mode="" class="img"></image>
        <view class="item1_name">{{item.name}}</view>
        <view class="retail_price">{{item.retail_price | fixed}}</view>
      </view>
    </view>
    <view class="null" v-else>
      暂无数据
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
        openId: "wx09adfeb7d1629322",
        collectGoodsList: []
      }
    },
    methods: {
      checkCollect() {
        uni.request({
          // #ifdef  H5
          url: `/api/collect/listAction?openId=${this.openId}`,
          // #endif
          // #ifndef  H5
          url: `${this.$api}/collect/listAction?openId=${this.openId}`,
          // #endif
          method: 'GET',
          data: {},
          success: res => {
            if (res.data.collectGoodsList.length > 0) {
              this.collectGoodsList = res.data.collectGoodsList
            }
          },
          fail: () => {},
          complete: () => {}
        });
      }
    },
    mounted() {

    },
    onLoad() {
      this.checkCollect()
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
  .goodsList {
    display: flex;
    flex-wrap: wrap;
    padding: 10rpx 10rpx 0 10rpx;
    background: #EEEEEE;
  }
  .item1 {
    width: 360rpx;
    margin-bottom: 10rpx;
    background: #FFFFFF;
  }
  .img{
    width: 360rpx;
    height: 350rpx;
  }
  .item1_name{
    width: 350rpx;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 10rpx 0;
  }
  .retail_price{
    width: 360rpx;
    text-align: center;
    font-size: 30rpx;
    color: #d81e06;
    margin-bottom: 10rpx;
  }
  .active {
    margin-right: 10rpx;
  }
  .null {
    margin-top: 20rpx;
    width: 750rpx;
    text-align: center;
  }
</style>
