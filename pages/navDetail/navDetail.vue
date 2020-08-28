<template>
  <view class="box" v-if="subLists.length>0">
    <u-tabs :list="subLists" :current="current" @change="change" active-color="#d81e06" bar-width="60" bar-height="4"></u-tabs>
    <view class="title">
      <view class="name">{{subLists[current].front_name}}</view>
      <view class="ront_desc">{{subLists[current].front_desc}}</view>
    </view>
    <scroll-view show-scrollbar="true" scroll-y="true">
      <view class="item" v-if="goodsLists.length>0">
        <view v-for="(item,index) in goodsLists" :key="index" class="item1" :class="{'active':index%2 == 0}" @click="goDetail(item.id)">
          <image :src="item.list_pic_url" mode="" class="img"></image>
          <view class="item1_name">{{item.name}}</view>
          <view class="retail_price">{{item.retail_price | fixed}}</view>
        </view>
      </view>
      <view class="null" v-else>
        暂无数据
      </view>
    </scroll-view>
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
        currentOne: {},
        subLists: [],
        current: 0,
        cid: '',
        categoryId: '',
        goodsLists: []
      }
    },
    methods: {
      // 获取分类
      getcategoryNav() {
        uni.request({
          // #ifdef  H5
          url: `/api/category/currentaction?id=${this.cid}`,
          // #endif
          // #ifndef  H5
          url: `${this.$api}/category/currentaction?id=${this.cid}`,
          // #endif
          method: 'GET',
          data: {},
          success: res => {
            console.log(res);
            this.currentOne = res.data.data.currentOne
            this.subLists = res.data.data.currentOne.subList
            if (this.subLists.length > 0) {
              this.categoryId = this.subLists[this.current].id
              this.goodsList()
            }
          },
          fail: () => {},
          complete: () => {}
        });
      },
      change(index) {
        this.current = index;
        if (this.subLists.length > 0) {
          this.categoryId = this.subLists[this.current].id
          this.goodsList()
        }
      },
      // 获取分类商品
      goodsList() {
        uni.showLoading({
          title: '加载中...'
        })
        uni.request({
          // #ifdef  H5
          url: `/api/goods/goodsList?categoryId=${this.categoryId}`,
          // #endif
          // #ifndef  H5
          url: `${this.$api}/goods/goodsList?categoryId=${this.categoryId}`,
          // #endif
          method: 'GET',
          data: {},
          success: res => {
            uni.hideLoading()
            console.log(res);
            this.goodsLists = res.data.data
          },
          fail: () => {},
          complete: () => {}
        });
        setTimeout(() => {
          uni.hideLoading()
        }, 2000)
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
      this.cid = options.cid
      if (options.index) {
        this.current = options.index
      }
      this.getcategoryNav()
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
  .box {
    background: #EEEEEE;
  }

  .title {
    width: 750rpx;
    background: #FFFFFF;
    margin-top: 20rpx;
    margin-bottom: 10rpx;
  }

  .name {
    font-size: 34rpx;
    padding-top: 30rpx;
    padding-bottom: 20rpx;
    text-align: center;
  }

  .ront_desc {
    font-size: 30rpx;
    padding-bottom: 20rpx;
    text-align: center;
    color: #999999;
  }

  .item {
    display: flex;
    flex-wrap: wrap;
  }

  .item1 {
    width: 370rpx;
    height: 480rpx;
    margin-bottom: 10rpx;
    background: #FFFFFF;
  }

  .img {
    width: 370rpx;
    height: 360rpx;
  }

  .item1_name {
    width: 360rpx;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 10rpx 0;
  }

  .retail_price {
    width: 370rpx;
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
  }
</style>
