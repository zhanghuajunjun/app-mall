<template>
  <view class="box" v-if="lists.length>0">
    <image src="../../static/image/back.png" class="title_img"></image>
    <view class="nav">
      <view :class="{'setcolor':num === 0}" @click="comprehensive">综合</view>
      <view class="paixu" :class="{'setcolor':num === 1}" @click="sorting">
        排序
        <image src="../../static/image/paixu.png" class="paixu_img"></image>
      </view>
      <view :class="{'setcolor':num === 2}" @click="classification">分类</view>
    </view>
    <view class="content">
      <scroll-view show-scrollbar="true" scroll-y="true">
        <view class="item" v-if="lists.length>0">
          <view v-for="(item,index) in lists" :key="index" class="item1" :class="{'active':index%2 == 0}" @click="goDetail(item.id)">
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
        flag: '',
        lists: [],
        num: 0,
        hnsfw: false
      }
    },
    methods: {
      // 综合
      getData() {
        uni.showLoading({
          title: "加载中",
          duration: 2000
        })
        if (this.flag == 'new') {
          uni.request({
            // #ifdef  H5
            url: `/api/goods/goodsList?isNew=1`,
            // #endif
            // #ifndef  H5
            url: `${this.$api}/goods/goodsList?isNew=1`,
            // #endif
            method: 'GET',
            data: {},
            success: res => {
              uni.hideLoading()
              this.lists = res.data.data
              console.log(res);
            },
          });
        } else if (this.flag == 'hot') {
          uni.request({
            // #ifdef  H5
            url: `/api/goods/goodsList?isHot=1`,
            // #endif
            // #ifndef  H5
            url: `${this.$api}/goods/goodsList?isHot=1`,
            // #endif
            method: 'GET',
            data: {},
            success: res => {
              uni.hideLoading()
              this.lists = res.data.data
              console.log(res);
            },
          });
        }
      },
      // 升序
      getSortingasc() {
        uni.showLoading({
          title: "加载中",
          duration: 2000
        })
        if (this.flag == 'new') {
          uni.request({
            // #ifdef  H5
            url: `/api/goods/goodsList?isNew=1&order=asc`,
            // #endif
            // #ifndef  H5
            url: `${this.$api}/goods/goodsList?isNew=1&order=asc`,
            // #endif
            method: 'GET',
            data: {},
            success: res => {
              uni.hideLoading()
              this.lists = res.data.data
              console.log(res);
            },
          });
        } else if (this.flag == 'hot') {
          uni.request({
            // #ifdef  H5
            url: `/api/goods/goodsList?isHot=1&order=asc`,
            // #endif
            // #ifndef  H5
            url: `${this.$api}/goods/goodsList?isHot=1&order=asc`,
            // #endif
            method: 'GET',
            data: {},
            success: res => {
              uni.hideLoading()
              this.lists = res.data.data
              console.log(res);
            },
          });
        }
      },
      // 降序
      getSortingdesc() {
        uni.showLoading({
          title: "加载中",
          duration: 2000
        })
        if (this.flag == 'new') {
          uni.request({
            // #ifdef  H5
            url: `/api/goods/goodsList?isNew=1&order=desc`,
            // #endif
            // #ifndef  H5
            url: `${this.$api}/goods/goodsList?isNew=1&order=desc`,
            // #endif
            method: 'GET',
            data: {},
            success: res => {
              uni.hideLoading()
              this.lists = res.data.data
              console.log(res);
            },
          });
        } else if (this.flag == 'hot') {
          uni.request({
            // #ifdef  H5
            url: `/api/goods/goodsList?isHot=1&order=desc`,
            // #endif
            // #ifndef  H5
            url: `${this.$api}/goods/goodsList?isHot=1&order=desc`,
            // #endif
            method: 'GET',
            data: {},
            success: res => {
              uni.hideLoading()
              this.lists = res.data.data
              console.log(res);
            },
          });
        }
      },
      // 综合
      comprehensive() {
        if (this.num !== 0) {
          this.num = 0
          this.getData()
        }
      },
      // 排序
      sorting() {
        this.num = 1
        if (this.hnsfw === false) {
          this.getSortingasc()
          this.hnsfw = true
        } else if (this.hnsfw === true) {
          this.getSortingdesc()
          this.hnsfw = false
        }

      },
      // 分类
      classification() {
        if (this.num !== 2) {
          this.num = 2
          this.getData()
        }
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
    onLoad(option) {
      this.flag = option.flag
      this.getData()
      if (this.flag == 'new') {
        uni.setNavigationBarTitle({
          title: '新品首发'
        })
      } else if (this.flag == 'hot') {
        uni.setNavigationBarTitle({
          title: '人气推荐·精选好物'
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
  .box {
    background: #EEEEEE;
  }

  .title_img {
    width: 750rpx;
    height: 250rpx;
  }

  .nav {
    background: #FFFFFF;
    padding: 20rpx 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: -10rpx;
  }

  .paixu {
    display: flex;
    align-items: center;
  }

  .paixu_img {
    width: 20rpx;
    height: 20rpx;
  }

  .content {
    margin-top: 10rpx;
    padding: 0 10rpx;
  }

  .item {
    display: flex;
    flex-wrap: wrap;
  }

  .item1 {
    width: 360rpx;
    height: 470rpx;
    margin-bottom: 10rpx;
    background: #FFFFFF;
  }

  .img {
    width: 360rpx;
    height: 350rpx;
  }

  .item1_name {
    width: 350rpx;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 10rpx 0;
  }

  .retail_price {
    width: 360rpx;
    text-align: center;
    font-size: 30rpx;
    color: #d81e06;
  }

  .active {
    margin-right: 10rpx;
  }

  .setcolor {
    color: #d81e06;
  }
</style>
