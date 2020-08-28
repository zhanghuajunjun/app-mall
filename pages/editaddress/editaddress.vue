<template>
  <view>
    <view class="box">
      <view class="ipt">
        <input type="text" v-model="name" placeholder="姓名" />
      </view>
      <view class="ipt">
        <input type="number" v-model="mobile" placeholder="手机号码" />
      </view>
      <view class="ipt">
        <input type="text" v-model="address" placeholder="省份,城市区县" disabled="true" @click="onClick" />
      </view>
      <view class="ipt">
        <input type="text" v-model="address_detail" placeholder="详细地址,如街道,门牌号" />
      </view>
      <checkbox-group @change="checkedAll">
        <label>
          <checkbox value="cb" :checked='checkAll' />设置为默认地址
        </label>
      </checkbox-group>
      <selectAddress ref='selectAddress' @selectAddress="successSelectAddress"></selectAddress>
      <view class="code"></view>
      <view class="footer">
        <view class="newaddress" @click="saveAddress">保 存</view>
      </view>
    </view>
  </view>
</template>

<script>
  import selectAddress from '@/components/yixuan-selectAddress/yixuan-selectAddress.vue'
  export default {
    name: "",
    components: {
      selectAddress
    },
    props: {},
    data() {
      return {
        openId: "wx09adfeb7d1629322",
        id: '',
        name: '',
        mobile: '',
        address: '',
        address_detail: '',
        checkAll: false
      }
    },
    methods: {
      getData() {
        uni.request({
          // #ifdef  H5
          url: `/api/address/detailAction?id=${this.id}`,
          // #endif
          // #ifndef  H5
          url: `${this.$api}/address/detailAction?id=${this.id}`,
          // #endif
          method: 'GET',
          data: {},
          success: res => {
            this.name = res.data.data.name
            this.mobile = res.data.data.mobile
            this.address = res.data.data.address
            this.address_detail = res.data.data.address_detail
            if (res.data.data.is_default == 1) {
              this.checkAll = true
            }
          },
          fail: () => {},
          complete: () => {}
        });
      },
      checkedAll(e) {
        if (e.detail.value.length === 0) {
          this.checkAll = false
        } else {
          this.checkAll = true
        }
      },
      onClick() {
        this.$refs.selectAddress.show()
      },
      successSelectAddress(address) {
        this.address = address
      },
      saveAddress() {
        let mobileOne = this.mobile.substring(0, 1)
        if (this.name == '') {
          uni.showToast({
            title: "收货人不能为空",
            duration: 2000,
            icon: "none"
          })
        } else if (this.mobile == '') {
          uni.showToast({
            title: "手机号不能为空",
            duration: 2000,
            icon: "none"
          })
        } else if (this.address == '' || this.address_detail == '') {
          uni.showToast({
            title: "地址不能为空",
            duration: 2000,
            icon: "none"
          })
        } else if (this.name !== '' && this.mobile !== '' && this.address !== '' && this.address_detail !== '' && this.mobile
          .length == 11 && mobileOne == 1) {
          uni.request({
            // #ifdef  H5
            url: `/api/address/saveAction`,
            // #endif
            // #ifndef  H5
            url: `${this.$api}/address/saveAction`,
            // #endif
            method: 'POST',
            data: {
              address: this.address,
              addressId: this.id,
              checked: this.checkAll,
              detailadress: this.address_detail,
              openId: this.openId,
              telNumber: this.mobile,
              userName: this.name
            },
            success: res => {
              console.log(res)
              if (res.data.data == true) {
                uni.showToast({
                  title: "保存成功",
                  duration: 2000
                })
                uni.navigateTo({
                  url: '../address/address'
                })
              }
            },
            fail: () => {},
            complete: () => {}
          });
        } else if (this.name !== '' && this.mobile !== '' && this.address !== '' && this.address_detail !== '' && this.mobile
          .length !== 11 || mobileOne !== 1) {
          uni.showToast({
            title: "手机号码格式错误",
            duration: 2000,
            icon: "none"
          })
        } 
      }
    },
    mounted() {

    },
    onLoad(option) {
      if (option.id) {
        this.id = option.id
        this.getData()
      }
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
  .box {
    padding: 0 20rpx;
  }

  .ipt {
    padding: 30rpx;
    border-bottom: 1rpx solid #EEEEEE;
  }

  checkbox-group {
    margin-top: 30rpx;
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
</style>
