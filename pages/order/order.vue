<template>
  <view>
    <image src="../../static/image/qqq.png" class="top_img"></image>
    <view class="addres">
      <view class="">
        <view class="left_top">
          <view class="left_name">{{address.name}}</view>
          <view class="mobile">{{address.mobile}}</view>
          <view class="default" v-if="address.is_default == 1">默认</view>
        </view>
        <view class="address">{{address.address}}{{address.address_detail}}</view>
      </view>
      <view>
        <image src="../../static/image/itum.png" class="img"></image>
      </view>
    </view>
    <view class="code"></view>
    <view class="top">
      <view class="">商品合计</view>
      <view class="">{{totalPrice | fixed}}</view>
    </view>
    <view class="mid top">
      <view class="">运费</view>
      <view class="">免运费</view>
    </view>
    <view class="top">
      <view class="">优惠券</view>
      <view class="">暂无</view>
    </view>
    <view class="code"></view>
    <view v-for="(item, index) in arr" :key="item.id">
      <view class="cartList">
        <view class="info">
          <image :src="item.list_pic_url" class="list_pic_url"></image>
          <view class="item u-border-bottom">
            <view class="">{{item.goods_name}}</view>
            <view class="retail_price">{{item.retail_price | fixed}}</view>
          </view>
        </view>
        <view>X{{item.number}}</view>
      </view>
    </view>
    <view class="footer">
      <view class="relyplay">实付：{{totalPrice | fixed}}</view>
      <view class="play">支付</view>
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
        addressList: [],
        address: {},
        arr: []
      }
    },
    methods: {
      getData() {
        uni.request({
          // #ifdef  H5
          url: `/api/address/getListAction?openId=${this.openId}`,
          // #endif
          // #ifndef  H5
          url: `${this.$api}/collect/listAction?openId=${this.openId}`,
          // #endif
          method: 'GET',
          data: {},
          success: res => {
            if (res.data.data.length > 0) {
              this.addressList = res.data.data
              let address = this.addressList.filter(item => {
                return item.is_default == 1
              })
              if (address) {
                this.address = address[0]
              } else {
                this.address = this.addressList[0]
              }
            } else {
              uni.showModal({
                title: '提示',
                content: '您好没设置地址，是否设置？',
                fail() {
                  uni.navigateBack()
                },
                success() {
                  uni.navigateTo({
                    url: '../address/address'
                  })
                }
              })
            }
          },
          fail: () => {},
          complete: () => {}
        });
      },
      editAddress(id) {
        uni.navigateTo({
          url: `/pages/editaddress/editaddress?id=${id}`
        })
      },
      addAddress() {
        uni.navigateTo({
          url: `/pages/editaddress/editaddress`
        })
      }
    },
    mounted() {

    },
    onShow() {
      this.getData()
    },
    onLoad(option) {
      this.arr = JSON.parse(option.arr)
    },
    filters: {
      fixed(val) {
        return "￥" + Number(val).toFixed(2);
      }
    },
    computed: {
      totalPrice() {
        let sum = 0;
        this.arr.map(item => {
          sum += item.retail_price * item.number;
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
  .addres {
    padding: 20rpx 30rpx;
    border-bottom: 1rpx solid #EEEEEE;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .top_img {
    width: 750rpx;
    height: 20rpx;
  }

  .left_top {
    display: flex;
    align-items: center;
    margin-bottom: 10rpx;
  }

  .left_name {
    font-size: 30rpx;
    font-weight: 600;
    width: 120rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .mobile {
    font-size: 30rpx;
    margin: 0 20rpx;
  }

  .default {
    font-size: 24rpx;
    color: #FFFFFF;
    padding: 4rpx 8rpx;
    background: red;
    border-radius: 8rpx;
  }

  .address {
    color: #808080;
    width: 580rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .img {
    width: 50rpx;
    height: 50rpx;
  }

  .code {
    width: 750rpx;
    height: 20rpx;
    background: #eee;
  }

  .top {
    padding: 30rpx;
    width: 750rpx;
    display: flex;
    justify-content: space-between;
  }

  .mid {
    border-top: 2rpx solid #EEEEEE;
    border-bottom: 2rpx solid #EEEEEE;
  }

  .cartList {
    border-top: 2rpx solid #EEEEEE;
    padding: 20rpx;
    width: 750rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .info {
    display: flex;
    align-items: center;
  }

  .list_pic_url {
    width: 120rpx;
    height: 120rpx;
    border: 1rpx solid #FFFFFF;
    border-radius: 10rpx;
    margin: 0 20rpx;
  }

  .retail_price {
    margin-top: 10rpx;
  }
  .footer{
    width: 750rpx;
    display:flex;
    justify-content: space-between;
    position: fixed;
    left: 0;
    bottom: 0;
  }
  .relyplay {
    padding: 20rpx;
  }
  .play{
    width: 150rpx;
    height: 78rpx;
    background: #d81e06;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
