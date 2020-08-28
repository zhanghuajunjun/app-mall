<template>
  <view v-if="banner.length>0">
    <view class="search">
      <view class="location" @click="location">{{poiName}}</view>
      <view class="search_box" @click="onFocus">
        <image src="../../static/image/search.png" class="search_img"></image>
        <view class="placeholder">请输入关键字</view>
      </view>
    </view>
    <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :circular="circular">
      <swiper-item v-for="item in banner" :key="item.id">
        <image :src="item.image_url" class="banner_img"></image>
      </swiper-item>
    </swiper>
    <view class="channel">
      <view v-for="item in channel" :key="item.id" class="channel_item" @click="toDetail(item.id)">
        <image :src="item.icon_url" class="icon_url"></image>
        <view>{{item.name}}</view>
      </view>
    </view>
    <brandList :brandList="brandList"></brandList>
    <newGoods :newGoods="newGoods"></newGoods>
    <hotGoods :hotGoods="hotGoods"></hotGoods>
    <topicList :topicList="topicList"></topicList>
    <newCategoryList class="newCategoryList" :newCategoryList="newCategoryList"></newCategoryList>
  </view>
</template>

<script>
  import hotGoods from '../../components/hotGoods.vue'
  import brandList from '../../components/brandList.vue'
  import newGoods from '../../components/newGoods.vue'
  import topicList from '../../components/topicList.vue'
  import newCategoryList from '../../components/newCategoryList.vue'
  export default {
    name: "",
    components: {
      hotGoods,
      brandList,
      newGoods,
      topicList,
      newCategoryList
    },
    props: {},
    data() {
      return {
        indicatorDots: true,
        autoplay: true,
        circular: true,
        keyword: '',
        banner: [],
        channel: [],
        brandList: [],
        newGoods: [],
        hotGoods: [],
        topicList: [],
        newCategoryList: [],
        poiName: '定位中···'
      }
    },
    methods: {
      // 获取首页数据
      getData() {
        uni.request({
          // #ifdef  H5
          url: `/api/index/index`,
          // #endif
          // #ifndef  H5
          url: `${this.$api}/index/index`,
          // #endif
          method: 'GET',
          data: {},
          success: res => {
            uni.hideLoading()
            console.log(res);
            this.banner = res.data.banner
            this.channel = res.data.channel
            this.brandList = res.data.brandList
            this.newGoods = res.data.newGoods
            this.hotGoods = res.data.hotGoods
            this.topicList = res.data.topicList
            this.newCategoryList = res.data.newCategoryList
            // #ifdef  APP-PLUS
            this.getLocation()
            // #endif
            // #ifdef  MP-WEIXIN
            this.getLocationInfo();
            // #endif
            // #ifdef  H5
            this.getFailpath()
            // #endif
          },
          fail: () => {},
          complete: () => {}
        });
      },
      // APP定位
      getLocation() {
        uni.showModal({
          title: '"应用"需要获取您的地理位置',
          content: '您的位置信息将用于位置接口的效果展示',
          success: (res) => {
            if (res.confirm) {
              uni.showLoading({
                title: '定位中...'
              })
              uni.getLocation({
                type: 'wgs84',
                geocode: true,
                success: (res) => {
                  uni.hideLoading()
                  this.poiName = res.address.poiName
                },
                fail: () => {
                  uni.hideLoading()
                  uni.showToast({
                    title: '获取信息失败，请重试',
                    duration: 2000,
                    icon: "none"
                  })
                  this.poiName = '定位失败'
                },
              });
            } else if (res.cancel) {
              this.getLocation()
            }
          }
        });
      },
      // 选择定位
      location() {
        uni.chooseLocation({
          success: (res) => {
            this.poiName = res.name
          }
        });
      },
      // 微信小程序定位
      getLocationInfo() {
        uni.showModal({
          title: '"应用"需要获取您的地理位置',
          content: '您的位置信息将用于位置接口的效果展示',
          success: (result) => {
            if (result.confirm) {
              uni.showLoading({
                title: '定位中...'
              })
              var _this = this;
              uni.getLocation({
                type: 'wgs84',
                success(res) {
                  let latitude, longitude;
                  latitude = res.latitude.toString();
                  longitude = res.longitude.toString();
                  uni.request({
                    header: {
                      "Content-Type": "application/text"
                    },
                    url: 'http://apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + ',' + longitude +
                      '&key=CFFBZ-2CLW3-2G33E-YKZBG-SDLXJ-NSFA2',
                    success(re) {
                      if (re.statusCode === 200) {
                        uni.hideLoading()
                        _this.poiName = re.data.result.address;
                      } else {
                        uni.hideLoading()
                        uni.showToast({
                          title: '获取信息失败，请重试',
                          duration: 2000,
                          icon: "none"
                        })
                        this.poiName = '定位失败'
                      }
                    }
                  });
                }
              });
            } else if (res.cancel) {
              this.getLocationInfo()
            }
          }
        })
      },
      // H5定位
      getFailpath(){
        uni.showModal({
          title: '"应用"需要获取您的地理位置',
          content: '您的位置信息将用于位置接口的效果展示',
          success: (res) => {
            if (res.confirm) {
              uni.showLoading({
                title: '定位中...'
              })
              setTimeout(() => {
                uni.showToast({
                  title: '获取信息失败，请重试',
                  duration: 2000,
                  icon: "none"
                })
                this.poiName = '定位失败'
              }, 3000)
            } else if (res.cancel) {
              this.getFailpath()
            }
          }
        })
      },
      // 搜索框
      onFocus() {
        uni.navigateTo({
          url:'../search/search'
        })
      },
      // 去分类详情
      toDetail(id){
        uni.navigateTo({
          url:`/pages/navDetail/navDetail?cid=${id}`
        })
      }
    },
    mounted() {

    },
    onLoad() {
      uni.showLoading({
        title:"加载中",
        duration:2000
      })
      this.getData()
    },
    filters: {

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
  .search {
    display: flex;
    align-items: center;
    padding: 20rpx;
  }

  .location {
    width: 180rpx;
    text-align: center;
    margin-right: 10rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .search_box {
    width: 520rpx;
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
  .swiper {
    width: 750rpx;
    height: 350rpx;
  }

  .banner_img {
    width: 750rpx;
    height: 350rpx;
  }

  .channel {
    display: flex;
    justify-content: space-around;
    margin: 30rpx 0;
  }

  .channel_item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .icon_url {
    width: 70rpx;
    height: 70rpx;
    margin-bottom: 10rpx;
  }

  .newCategoryList {
    background: rgb(238, 238, 238);
  }
</style>
