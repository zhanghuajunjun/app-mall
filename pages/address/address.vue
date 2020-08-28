<template>
  <view>
    <view v-if="addressList.length > 0">
      <view class="address_item" v-for="(item, index) in addressList" :key="item.id">
        <view v-if="pindex == index">
          <image src="../../static/image/true.png" class="true_img"></image>
        </view>
        <view class="">
          <view class="left_top">
            <view class="left_name">{{item.name}}</view>
            <view class="mobile">{{item.mobile}}</view>
            <view class="default" v-if="item.is_default == 1">默认</view>
          </view>
          <view class="address">{{item.address}}{{item.address_detail}}</view>
        </view>
        <view @click="editAddress(item.id)">
          <image src="../../static/image/itum.png" class="img"></image>
        </view>
      </view>
      <view class="code"></view>
      <view class="footer">
        <view class="newaddress" @click="addAddress">+ 新建收货地址</view>
      </view>
    </view>
    <view class="else" v-else>
      <view class="else">暂无收货地址</view>
      <view class="footer">
        <view class="newaddress" @click="addAddress">+ 新建收货地址</view>
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
        openId: "wx09adfeb7d1629322",
        addressList: [],
        pindex:-1,
        pid: ''
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
            console.log(res)
            if (res.data.data.length > 0) {
              this.addressList = res.data.data
              this.pindex = this.addressList.findIndex(item => {
                return item.id == this.pid
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
      if(option.id){
        this.pid = option.id
      }
    },
    filters: {},
    computed: {

    },
    watch: {

    },
    directives: {

    }
  }
</script>

<style scoped lang="scss">
  .address_item {
    padding: 20rpx;
    border-bottom: 1rpx solid #EEEEEE;
    display: flex;
    align-items: center;
    justify-content: space-between;
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

  .footer {
    width: 750rpx;
    background: #FFFFFF;
    padding: 20rpx 0;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99;
  }

  .newaddress {
    width: 400rpx;
    color: #FFFFFF;
    background: #ff0000;
    padding: 20rpx;
    border-radius: 20rpx;
    text-align: center;
    margin: 0 175rpx;
  }

  .code {
    height: 120rpx;
  }

  .else {
    width: 750rpx;
    text-align: center;
    padding-top: 20rpx;
  }
  .true_img {
    width: 50rpx;
    height: 50rpx;
  }
</style>
