<template>
  <view v-if="gallery.length>0">
    <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :circular="circular">
      <swiper-item v-for="item in gallery" :key="item.id">
        <image :src="item.img_url" class="gallery_img"></image>
      </swiper-item>
    </swiper>
    <view class="hhhh">
      <view class="discounts">
        <image src="../../static/image/delect.png" class="delect_img"></image>
        <view class="discount">30天无忧退货</view>
      </view>
      <view class="discounts">
        <image src="../../static/image/delect.png" class="delect_img"></image>
        <view class="discount">48小时快速退款</view>
      </view>
      <view class="discounts">
        <image src="../../static/image/delect.png" class="delect_img"></image>
        <view class="discount">满88元免邮费</view>
      </view>
    </view>
    <view class="name">{{info.name}}</view>
    <view class="goods_brief">{{info.goods_brief}}</view>
    <view class="retail_price">￥{{info.retail_price}}</view>
    <view class="parameter">
      <view class="parameter_title">商品参数</view>
      <view class="parameter_item" v-for="(item,index) in attribute" :key="index">
        <text class="attribute_name">{{item.name}}</text>
        <text class="value" v-html="item.value"></text>
      </view>
    </view>
    <view class="goods_desc" v-html="info.goods_desc"></view>
    <view class="questios">———常见问题———</view>
    <view class="questios_box">
      <view class="" v-for="item in issue" :key="item.id">
        <view class="questio">
          <text class="biaodian"></text>
          <text>{{item.question}}</text>
        </view>
        <view class="answer">{{item.answer}}</view>
      </view>
    </view>
    <view class="questios">———大家都在看———</view>
    <view class="productList_box">
      <view class="dd">
        <view class="" v-for="(item,index) in productList" :key="item.id" class="item1" :class="{'active':index%2 == 0}"
          @click="goDetail(item.id)">
          <image :src="item.list_pic_url" mode="" class="img"></image>
          <view class="item1_name">{{item.name}}</view>
          <view class="retail_pri">{{item.retail_price | fixed}}</view>
        </view>
      </view>
    </view>
    <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick"
      class="goods-nav" />
    <uni-popup ref="popup" type="bottom">
      <view class="box">
        <view class="confirm">
          <view class="flex">
            <image :src="info.list_pic_url" class="list_pic_url"></image>
            <view class="aaaa">
              <view class="price">价格：{{info.retail_price | fixed}}</view>
              <view class="counts">请选择数量</view>
            </view>
          </view>
          <image src="../../static/image/de.png" class="close" @click="close"></image>
        </view>
        <view class="count">数量</view>
        <view class="flex">
          <view class="control" @click="reduce">-</view>
          <view class="changecount">{{changecount}}</view>
          <view class="control" @click="add">+</view>
        </view>
      </view>
      <button type="warn" @click="confirm">确定购买</button>
    </uni-popup>
    <uni-popup ref="popupcart" type="bottom">
      <view class="box">
        <view class="confirm">
          <view class="flex">
            <image :src="info.list_pic_url" class="list_pic_url"></image>
            <view class="aaaa">
              <view class="price">价格：{{info.retail_price | fixed}}</view>
              <view class="counts">请选择数量</view>
            </view>
          </view>
          <image src="../../static/image/de.png" class="close" @click="clear"></image>
        </view>
        <view class="count">数量</view>
        <view class="flex">
          <view class="control" @click="reduceing">-</view>
          <view class="changecount">{{addcount}}</view>
          <view class="control" @click="adding">+</view>
        </view>
      </view>
      <button type="warn" @click="addcart">加入购物车</button>
    </uni-popup>
  </view>
</template>

<script>
  import {
    mapState,
  } from 'vuex';
  import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
  import uniPopup from '@/components/uni-popup/uni-popup.vue'
  import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
  import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
  export default {
    name: "",
    components: {
      uniGoodsNav,
      uniPopup,
      uniPopupMessage,
      uniPopupDialog
    },
    props: {},
    data() {
      return {
        openId: "wx09adfeb7d1629322",
        id: '',
        gallery: [],
        indicatorDots: true,
        autoplay: true,
        circular: true,
        info: {},
        attribute: [],
        issue: [],
        productList: [],
        options: [{
          icon: 'heart',
          text: '收藏'
        }, {
          icon: 'cart',
          text: '购物车',
          info: 0,
          infoBackgroundColor: '#d81e06',
          infoColor: "#fff"
        }],
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ],
        changecount: 1,
        addcount: 1,
        collectGoodsList: []
      }
    },
    methods: {
      // 获取商品详情
      getData() {
        uni.request({
          // #ifdef  H5
          url: `/api/goods/detailaction?id=${this.id}&openId=${this.openId}`,
          // #endif
          // #ifndef  H5
          url: `${this.$api}/goods/detailaction?id=${this.id}&openId=${this.openId}`,
          // #endif
          method: 'GET',
          data: {},
          success: res => {
            uni.hideLoading()
            console.log(res);
            this.gallery = res.data.gallery
            this.info = res.data.info
            this.attribute = res.data.attribute
            this.issue = res.data.issue
            this.productList = res.data.productList
          },
          fail: () => {},
          complete: () => {}
        });
      },
      // 收藏
      collect() {
        if (this.options[0].text == '收藏') {
          uni.request({
            // #ifdef  H5
            url: `/api/collect/addcollect`,
            // #endif
            // #ifndef  H5
            url: `${this.$api}/collect/addcollect`,
            // #endif
            method: 'POST',
            data: {
              goodsId: this.id,
              openId: this.openId
            },
            success: res => {
              if (res.data.data == "success") {
                uni.showToast({
                  title: '收藏成功',
                  duration: 2000,
                  icon: "none"
                });
              }
            },
            fail: () => {},
            complete: () => {}
          });
        } else {
          uni.showToast({
            title:'该商品已经收藏啦',
            duration:2000,
            icon:'none'
          })
        }
      },
      // 推荐商品详情
      goDetail(id) {
        uni.navigateTo({
          url: `/pages/detail/detail?id=${id}`
        })
      },
      // 获取购物车
      getCart() {
        uni.request({
          // #ifdef  H5
          url: `/api/cart/cartList?openId=${this.openId}`,
          // #endif
          // #ifndef  H5
          url: `${this.$api}/cart/cartList?openId=${this.openId}`,
          // #endif
          method: 'GET',
          data: {},
          success: res => {
            let arr = res.data.data
            if (arr) {
              this.options[1].info = arr.length
            }
          },
          fail: () => {},
          complete: () => {}
        });
      },
      // 加入购物车
      addGoods() {
        uni.request({
          // #ifdef  H5
          url: `/api/cart/addCart`,
          // #endif
          // #ifndef  H5
          url: `${this.$api}/cart/addCart`,
          // #endif
          method: 'POST',
          data: {
            goodsId: this.id,
            number: this.addcount,
            openId: this.openId
          },
          success: res => {
            console.log(res);
            if (res.data.data === "success") {
              uni.showToast({
                title: "加入购物车成功",
                icon: 'none'
              })
              this.getCart()
            }
          },
          fail: () => {},
          complete: () => {}
        });
      },
      // 商品导航左边按钮
      onClick(e) {
        if (e.index == 0) {
          this.collect()
        } else {
          uni.switchTab({
            url: '/pages/shoppingcart/shoppingcart'
          })
        }
      },
      // 商品导航右边按钮
      buttonClick(e) {
        if (e.index == 1) {
          this.$refs.popup.open()
        } else {
          this.$refs.popupcart.open()
        }
      },
      close() {
        this.$refs.popup.close()
      },
      clear() {
        this.$refs.popupcart.close()
      },
      // 购买数量减
      reduce() {
        if (this.changecount == 1) {
          uni.showToast({
            title: '至少购买1件商品',
            duration: 2000,
            icon: "none",
            position: 'bottom'
          })
        } else {
          this.changecount--
        }
      },
      // 购物车数量减
      reduceing() {
        if (this.addcount == 1) {
          uni.showToast({
            title: '至少选择1件商品',
            duration: 2000,
            icon: "none",
            position: 'bottom'
          })
        } else {
          this.addcount--
        }
      },
      // 购买数量加
      add() {
        this.changecount++
      },
      // 购物车数量加
      adding() {
        this.addcount++
      },
      // 立即购买
      confirm() {
        let allPrise = this.info.retail_price * this.addcount
        uni.request({
          // #ifdef  H5
          url: `/api/order/submitAction`,
          // #endif
          // #ifndef  H5
          url: `${this.$api}/order/submitAction`,
          // #endif
          method: 'POST',
          data: {
            allPrise: allPrise,
            goodsId: this.id,
            openId: this.openId
          },
          success: res => {
            console.log(res);
            if (res.data.data == true) {
              uni.showToast({
                title: `购买成功，共消费${allPrise}元`,
                duration: 3000
              })
            }
          },
          fail: () => {},
          complete: () => {}
        });
      },
      // 加入购物车
      addcart() {
        this.addGoods()
        this.$refs.popupcart.close()
      },
      // 查看收藏
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
            console.log(res);
            if (res.data.collectGoodsList.length > 0) {
              this.collectGoodsList = res.data.collectGoodsList
            }
            let index = this.collectGoodsList.findIndex(item => {
              return item.id == this.id
              
            })
            if (index >= 0) {
              this.options[0].icon = 'heart-filled'
              this.options[0].text = '已收藏'
            }
          },
          fail: () => {},
          complete: () => {}
        });
      }
    },
    mounted() {

    },
    onShow() {
      this.getCart()
    },
    onLoad(option) {
      uni.showLoading({
        title: '加载中...'
      })
      this.id = option.id
      this.getData()
      this.checkCollect()
    },
    filters: {
      fixed(val) {
        return "￥" + Number(val).toFixed(2);
      }
    },
    computed: {
      ...mapState(['cartCounts'])
    },
    watch: {

    },
    directives: {

    }
  }
</script>

<style scoped lang="scss">
  .swiper {
    width: 750rpx;
    height: 750rpx;
  }

  .gallery_img {
    width: 750rpx;
    height: 750rpx;
  }

  .action {
    width: 750rpx;
    height: 80rpx;
  }

  .hhhh {
    width: 750rpx;
    height: 80rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #EEEEEE;
  }

  .discount {
    font-weight: 600;
    font-size: 26rpx;
  }

  .delect_img {
    width: 10rpx;
    height: 10rpx;
    margin-right: 10rpx;
  }

  .discounts {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .name {
    font-size: 36rpx;
    margin-top: 30rpx;
    margin-bottom: 10rpx;
    text-align: center;
    width: 750rpx;
  }

  .goods_brief {
    text-align: center;
    width: 750rpx;
  }

  .retail_price {
    font-size: 32rpx;
    color: #d81e06;
    padding: 30rpx;
    text-align: center;
    width: 750rpx;
    border-bottom: 1rpx solid #999999;
  }

  .parameter {
    padding: 20rpx;
  }

  .parameter_title {
    padding-top: 20rpx;
    font-size: 36rpx;
    font-weight: 600;
  }

  .parameter_item {
    background: #EEEEEE;
    padding: 10rpx 20rpx;
    display: flex;
    margin-top: 20rpx;
  }

  .attribute_name {
    width: 170rpx;
    color: #999;
  }

  .value {
    width: 500rpx;
  }

  .goods_desc {
    width: 750rpx;
    margin-top: 20rpx;
  }

  .goods_desc /deep/ img {
    width: 750rpx;
    margin-top: -10rpx;
  }

  .questios {
    padding: 30rpx;
    font-size: 36rpx;
    text-align: center;
  }

  .questios_box {
    padding: 0 20rpx;
  }

  .questio {
    display: flex;
    align-items: center;
  }

  .biaodian {
    width: 10rpx;
    height: 10rpx;
    border-radius: 50%;
    background: #d81e06;
    margin-right: 10rpx;
  }

  .answer {
    padding: 20rpx 0;
    color: #999999;
  }

  .productList_box {
    padding: 0 20rpx;
  }

  .dd {
    background: #EEEEEE;
    display: flex;
    flex-wrap: wrap;
  }

  .item1 {
    width: 352rpx;
    margin-top: 6rpx;
    background: #FFFFFF;
  }

  .img {
    width: 352rpx;
    height: 340rpx;
  }

  .item1_name {
    width: 352rpx;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 10rpx 0;
  }

  .retail_pri {
    width: 352rpx;
    text-align: center;
    font-size: 30rpx;
    color: #d81e06;
  }

  .active {
    margin-right: 6rpx;
  }

  .goods-nav {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 99;
    width: 750rpx;
  }

  .box {
    width: 750rpx;
    background: #FFFFFF;
    padding: 20rpx 20rpx;
  }

  .confirm {
    display: flex;
    justify-content: space-between;
  }

  .list_pic_url {
    width: 150rpx;
    height: 150rpx;
    border-radius: 20rpx;
    margin-right: 30rpx;
    border: 1rpx solid #999999;
  }

  .flex {
    display: flex;
  }

  .aaaa {
    margin-top: 60rpx;
  }

  .price {
    color: #d81e06;
    font-size: 30rpx;
  }

  .counts {
    font-size: 30rpx;
    margin-top: 10rpx;
  }

  .close {
    width: 50rpx;
    height: 50rpx;
  }

  .count {
    margin: 20rpx;
  }

  .control {
    border: 1rpx solid #111111;
    width: 90rpx;
    height: 70rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40rpx;
  }

  .changecount {
    border-top: 1rpx solid #111111;
    border-bottom: 1rpx solid #111111;
    width: 120rpx;
    height: 70rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
