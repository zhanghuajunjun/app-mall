<script>
  export default {
    onLaunch: function() {

    },
    onShow: function() {

    },
    onHide: function() {

    }
  };
</script>

<style lang="scss">
  @import "uview-ui/index.scss";

  .highlights-text {
    color: #d81e06;
  }

  /* 解决头条小程序组件内引入字体不生效的问题 */
  /* #ifdef MP-TOUTIAO */
  @font-face {
    font-family: uniicons;
    src: url('/static/uni.ttf');
  }

  /* #endif */
</style>
