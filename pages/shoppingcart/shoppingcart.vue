<template>
  <view v-if="flag === true">
    <view v-if="cartList.length !== 0">
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
      <checkbox-group @change="checkboxChange">
        <label v-for="(item, index) in cartList" :key="item.id">
          <u-swipe-action @click="clickDel(item.id)" :options="options" class="mart">
            <view class="cartList">
              <view class="info">
                <checkbox :value="item.goods_name" :checked="item.checked" />
                <image :src="item.list_pic_url" class="list_pic_url"></image>
                <view class="item u-border-bottom">
                  <view class="">{{item.goods_name}}</view>
                  <view class="retail_price">{{item.retail_price | fixed}}</view>
                </view>
              </view>
              <view>X{{item.number}}</view>
            </view>
          </u-swipe-action>
        </label>
      </checkbox-group>
      <view class="llllll">
        <checkbox-group @change="checkedAll">
          <label>
            <checkbox value="cb" :checked='checkAll' />全选（{{count}}）
          </label>
        </checkbox-group>
        <view class="xiadan">
          <view class="total">{{totalPrice | fixed}}</view>
          <button type="warn" class="butt" @click="order">下单</button>
        </view>
      </view>
    </view>
    <view class="else" v-else>
      <image src="../../static/image/timg.gif" class="null"></image>
      <view class="">购物车是空的</view>
      <view class="toseesee" @click="toseesee">去逛逛</view>
    </view>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  export default {
    name: "",
    components: {

    },
    props: {},
    data() {
      return {
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#dd524d'
          }
        }],
        openId: "wx09adfeb7d1629322",
        cartList: [],
        count: 0,
        checkAll: true,
        total: 0,
        flag: false
      }
    },
    methods: {
      // 获取购物车数据
      getData() {
        uni.showLoading({
          title: '加载中...'
        })
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
            this.flag = true
            uni.hideLoading()
            console.log(res);
            if (res.data.data) {
              res.data.data.map(item => {
                this.$set(item, 'checked', true)
              })
            }
            this.cartList = res.data.data
            let arr = this.cartList.filter(item => {
              return item.checked === true
            })
            this.count = arr.length
            uni.setNavigationBarTitle({
              title: `购物车（${this.cartList.length}）`
            })
            this.$store.commit('setCartCounts', this.cartList.length)
          },
          fail: () => {},
          complete: () => {}
        });
      },
      // 删除商品
      clickDel(id) {
        console.log(id);
        uni.request({
          // #ifdef  H5
          url: `/api/cart/deleteAction?id=${id}`,
          // #endif
          // #ifndef  H5
          url: `${this.$api}/cart/deleteAction?id=${id}`,
          // #endif
          method: 'GET',
          data: {},
          success: res => {
            if (res.data.data == true) {
              this.getData()
            }
          },
          fail: () => {},
          complete: () => {}
        });
      },
      // 全选
      checkedAll(e) {
        if (e.detail.value.length === 0) {
          this.checkAll = false
        } else {
          this.checkAll = true
        }
        console.log(this.checkAll);
        this.cartList.map(item => {
          item.checked = this.checkAll;
        });
        let arr = this.cartList.filter(item => {
          return item.checked === true
        })
        this.count = arr.length
      },
      // 反选
      checkboxChange(e) {
        let value = e.detail.value
        this.cartList.map(item => {
          if (value.includes(item.goods_name)) {
            item.checked = true
          } else {
            item.checked = false
          }
        });
        this.checkAll = this.cartList.every(item => {
          return item.checked === true;
        })
        let arr = this.cartList.filter(item => {
          return item.checked === true
        })
        this.count = arr.length
      },
      // 去逛逛
      toseesee() {
        uni.switchTab({
          url: '../index/index'
        })
      },
      order() {
        let arr = this.cartList.filter(item => {
          return item.checked === true
        })
        if (arr.length>0) {
          uni.navigateTo({
            url: `/pages/order/order?arr=${JSON.stringify(arr)}`
          })
        } else {
          uni.showToast({
            title: '暂无结算的商品',
            duration: 2000,
            icon: 'none'
          })
        }
      }
    },
    mounted() {

    },
    onShow() {

    },
    onLoad() {
      this.getData()
    },
    filters: {
      fixed(val) {
        return "￥" + Number(val).toFixed(2);
      }
    },
    computed: {
      ...mapState(['cartCounts']),
      totalPrice() {
        let sum = 0;
        this.cartList.map(item => {
          if (item.checked === true) {
            sum += item.retail_price * item.number;
          }
        });
        return sum;
      }
    },
    watch: {

    },
    directives: {

    }
  }
</script>

<style scoped lang="scss">
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

  .list_pic_url {
    width: 120rpx;
    height: 120rpx;
    border: 1rpx solid #FFFFFF;
    border-radius: 10rpx;
    margin: 0 20rpx;
  }

  .cartList {
    padding: 20rpx;
    width: 750rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #EEEEEE;
  }

  .mart {
    margin-top: 2rpx;
  }

  .retail_price {
    color: #d81e06;
    margin-top: 10rpx;
  }

  .info {
    display: flex;
    align-items: center;
  }

  .xiadan {
    display: flex;
    align-items: center;
  }

  .total {
    color: #d81e06;
    margin-right: 20rpx;
  }

  .llllll {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 750rpx;
    padding-left: 20rpx;
    background-color: #EEEEEE;
    position: fixed;
    left: 0;
    bottom: 100rpx;
  }

  .butt {
    width: 150rpx;
  }

  .else {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .null {
    width: 300rpx;
    height: 150rpx;
    margin-top: 50rpx;
    margin-bottom: 20rpx;
  }

  .toseesee {
    padding: 10rpx 30rpx;
    border: 1rpx solid #999999;
    border-radius: 30rpx;
    margin-top: 20rpx;
  }
</style>
