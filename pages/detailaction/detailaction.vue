<template>
  <view>
    <u-parse :html="content" class="content"></u-parse>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        content: ''
      }
    },
    methods: {
    },
    onLoad(options) {
      let id = options.id
      uni.request({
        // #ifdef  H5
        url: `/api/topic/detailaction?id=${id}`,
        // #endif
        // #ifndef  H5
        url: `${this.$api}/topic/detailaction?id=${id}`,
        // #endif
        method: 'GET',
        data: {},
        success: res => {
          this.content = res.data.data.content
        },
        fail: () => {},
        complete: () => {}
      });
    },
  }
</script>

<style lang="scss">
  .content {
    width: 750rpx;
  }

  .content /deep/ img {
    width: 750rpx;
    height: 700rpx;
    margin-bottom: -10rpx;
  }
</style>
