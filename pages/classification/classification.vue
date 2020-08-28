<template>
  <view v-if="categoryList.length>0">
    <view class="search">
      <view class="search_box" @click="onFocus">
        <image src="../../static/image/search.png" class="search_img"></image>
        <view class="placeholder">请输入关键字</view>
      </view>
      <view class="box">
        <view class="nav">
          <view class="nav_item" v-for="(item,index) in categoryList" :key="item.id" @click="change(index)">
            <view class="xian" :class="{'active':current==index}"></view>
            <view class="nav_name" :class="{'active_color':current==index}">{{item.name}}</view>
          </view>
        </view>
        <view class="">
          <view class="img">
            <image :src="currentOne.wap_banner_url" class="wap_banner_url">
            </image>
            <view class="front_desc">{{currentOne.front_desc}}</view>
          </view>
          <view class="name">---{{currentOne.name}}分类---</view>
          <scroll-view show-scrollbar="true" scroll-y="true">
            <view class="subLists">
              <view class="subList" v-for="(item,index) in currentOne.subList" :key="item.id" :class="{'marg' : (index+2)%3 == 0}"
                @click="categoryNav(index)">
                <image :src="item.wap_banner_url" class="banner_url"></image>
                <view class="subList_name">{{item.name}}</view>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
  } from 'vuex';
  export default {
    name: "",
    components: {},
    props: {},
    data() {
      return {
        keyword: '',
        categoryList: [],
        current: 0,
        id: '',
        currentOne: {}
      }
    },
    methods: {
      // 获取分类
      getCategory() {
        uni.request({
          // #ifdef  H5
          url: `/api/category/indexaction`,
          // #endif
          // #ifndef  H5
          url: `${this.$api}/category/indexaction`,
          // #endif
          method: 'GET',
          data: {},
          success: res => {
            uni.hideLoading()
            console.log(res);
            this.categoryList = res.data.categoryList
            if (this.index) {
              this.current = this.index
            }
            this.id = this.categoryList[this.current].id
            this.getCurrentaction()
          },
          fail: () => {},
          complete: () => {}
        });
      },
      change(index) {
        this.current = index
        this.id = this.categoryList[this.current].id
        this.getCurrentaction()
      },
      // 获取当前分类
      getCurrentaction() {
        uni.request({
          // #ifdef  H5
          url: `/api/category/currentaction?id=${this.id}`,
          // #endif
          // #ifndef  H5
          url: `${this.$api}/category/currentaction?id=${this.id}`,
          // #endif
          method: 'GET',
          data: {},
          success: res => {
            console.log(res);
            this.currentOne = res.data.data.currentOne
          },
          fail: () => {},
          complete: () => {}
        });
      },
      // 分类导航
      categoryNav(index) {
        uni.navigateTo({
          url: `/pages/navDetail/navDetail?index=${index}&cid=${this.id}`
        })
      },
      onFocus() {
        uni.navigateTo({
          url: '../search/search'
        })
      },
    },
    mounted() {

    },
    onLoad(options) {
      uni.showLoading({
        title: '加载中...'
      })
      setTimeout(() => {
        uni.hideLoading()
      }, 2000)
    },
    onShow() {
      this.getCategory()
    },
    filters: {

    },
    computed: {
      ...mapState(['index'])
    },
    watch: {

    },
    directives: {

    }
  }
</script>

<style scoped lang="scss">
  .search {
    padding: 20rpx;
  }
  .search_box {
    width: 710rpx;
    height: 64rpx;
    background: #f2f2f2;
    padding: 0 18rpx;
    border-radius: 40rpx;
    display: flex;
    align-items: center;
  }
  .search_img{
    width: 30rpx;
    height: 30rpx;
    margin-right: 16rpx;
  }
  .placeholder {
    color: #909399;
  }
  .box {
    margin-top: 20rpx;
    display: flex;
  }

  .nav {
    width: 150rpx;
    height: 900rpx;
    display: flex;
    flex-wrap: wrap;
  }

  .nav_item {
    width: 150rpx;
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .xian {
    width: 6rpx;
    height: 60rpx;
    background: #FFFFFF;
  }

  .nav_name {
    font-size: 34rpx;
    width: 140rpx;
    text-align: center;
  }

  .active {
    background: #d81e06;
  }

  .active_color {
    color: #d81e06;
    font-weight: 600;
  }

  .wap_banner_url {
    width: 560rpx;
    height: 250rpx;
    position: absolute;
    left: 0;
    top: 0;
  }

  .img {
    width: 560rpx;
    height: 250rpx;
    margin-top: 20rpx;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .front_desc {
    color: #FFFFFF;
    font-size: 36rpx;
    z-index: 99;
  }

  .name {
    font-size: 32rpx;
    width: 560rpx;
    text-align: center;
    margin: 20rpx 0;
  }

  .subLists {
    display: flex;
    flex-wrap: wrap;
  }

  .subList {
    width: 180rpx;
    height: 200rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 20rpx;
  }

  .banner_url {
    width: 180rpx;
    height: 180rpx;
  }

  .marg {
    margin: 0 10rpx;
  }

  .subList_name {
    font-size: 30rpx;
  }
</style>
