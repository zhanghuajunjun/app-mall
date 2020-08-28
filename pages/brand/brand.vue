<template>
  <view>
    <image :src="data.list_pic_url" class="list_pic_url"></image>
    <view class="box">
      <view class="name">--{{data.name}}--</view>
      <view class="simple_desc">{{data.simple_desc}}</view>
      <view class="goodsList" v-if="goodsList.length > 0">
        <view v-for="(item,index) in goodsList" :key="index" class="item1" :class="{'active':index%2 == 0}" @click="goDetail(item.id)">
          <image :src="item.list_pic_url" mode="" class="img"></image>
          <view class="item1_name">{{item.name}}</view>
          <view class="retail_price">{{item.retail_price | fixed}}</view>
        </view>
      </view>
      <view class="null" v-else>
        暂无数据
      </view>
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
        id: '',
        data: {},
        goodsList: []
      }
    },
    methods: {
      getData() {
        uni.request({
          // #ifdef  H5
          url: `/api/brand/detailaction?id=${this.id}`,
          // #endif
          // #ifndef  H5
          url: `${this.$api}/brand/detailaction?id=${this.id}`,
          // #endif
          method: 'GET',
          data: {},
          success: res => {
            uni.hideLoading()
            console.log(res);
            this.data = res.data.data
            this.goodsList = res.data.goodsList
          },
          fail: () => {},
          complete: () => {}
        });
      },
      // 详情
      goDetail(id) {
        uni.navigateTo({
          url: `/pages/detail/detail?id=${id}`
        })
      }
    },
    mounted() {

    },
    onLoad(options) {
      this.id = options.id
      this.getData()
      uni.showLoading({
        title: '加载中...'
      })
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
  .list_pic_url {
    width: 750rpx;
    height: 300rpx;
  }

  .box {
    padding: 0 20rpx;
    background: #EEEEEE;
  }

  .name {
    width: 710rpx;
    text-align: center;
    font-size: 34rpx;
  }

  .simple_desc {
    width: 710rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 10rpx;
    color: #666666;
    text-align: center;
  }
  .goodsList {
    display: flex;
    flex-wrap: wrap;
  }
  .item1 {
    width: 350rpx;
    margin-bottom: 10rpx;
    background: #FFFFFF;
  }
  .img{
    width: 350rpx;
    height: 340rpx;
  }
  .item1_name{
    width: 340rpx;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 10rpx 0;
  }
  .retail_price{
    width: 350rpx;
    text-align: center;
    font-size: 30rpx;
    color: #d81e06;
  }
  .active {
    margin-right: 10rpx;
  }
  .null {
    width: 750rpx;
    text-align: center;
    font-size: 32rpx;
    padding-top: 30rpx;
    margin: 0 -20rpx;
    background: #FFFFFF;
  }
</style>
