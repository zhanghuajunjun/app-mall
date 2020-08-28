<template>
  <view class="box">
    <view class="search">
      <u-search :placeholder="defaultKeyword" v-model="keyword" shape="round" action-text="取消" @custom='onCustom'
        @search="onSearch"></u-search>
    </view>
    <view v-if="keyword === ''">
      <view class="del">
        <view class="history">搜索历史</view>
        <image src="../../static/image/del.png" class="del_img" @click="delect"></image>
      </view>
      <view class="" v-if="historyData.length == 0">暂无搜索历史</view>
      <view class="historyElse" v-else>
        <view class="item_box" v-for="(item,index) in historyData" :key="index" @click="hotkey(item.keyword)">
          {{item.keyword}}
        </view>
      </view>
      <view class="hot">热门搜索</view>
      <view class="historyElse">
        <view class="item_box" v-for="(item,index) in hotKeywordList" :key="index" :class="{'active':item.is_hot===1}"
          @click="hotkey(item.keyword)">
          {{item.keyword}}
        </view>
      </view>
    </view>
    <view v-else>
      <view v-if="flag == true">暂无数据，请重新搜索</view>
      <view v-else>
        <view class="searchItem" v-for="item in keywords" :key="item.id" @click="goDetail(item.id)">
          <image :src="item.list_pic_url" class="list_pic_url"></image>
          <view class="searchName" v-html="item.searchName"></view>
        </view>
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
        keyword: '',
        historyData: [],
        hotKeywordList: [],
        keywords: [],
        flag: false,
        defaultKeyword: ''
      }
    },
    methods: {
      // 取消
      onCustom() {
        this.keyword = ''
      },
      // 获取搜索历史，热搜
      getSearch() {
        uni.request({
          // #ifdef  H5
          url: `/api/search/indexaction?openId=${this.openId}`,
          // #endif
          // #ifndef  H5
          url: `${this.$api}/search/indexaction?openId=${this.openId}`,
          // #endif
          method: 'GET',
          data: {},
          success: res => {
            this.hotKeywordList = res.data.hotKeywordList
            this.historyData = res.data.historyData
            this.defaultKeyword = res.data.defaultKeyword.keyword
          },
          fail: () => {},
          complete: () => {}
        });
      },
      // 删除历史记录
      delect() {
        uni.showModal({
          content: '确认删除历史记录吗？',
          success: (res) => {
            if (res.confirm) {
              uni.request({
                // #ifdef  H5
                url: `/api/search/clearhistoryAction`,
                // #endif
                // #ifndef  H5
                url: `${this.$api}/search/clearhistoryAction`,
                // #endif
                method: 'POST',
                data: {
                  openId: this.openId
                },
                success: res => {
                  this.getSearch()
                  uni.showToast({
                    title: res.data.data,
                    duration: 2000
                  })
                },
              });
            }
          }
        })
      },
      // 搜索
      onSearch() {
        console.log(this.unm);
        uni.request({
          // #ifdef  H5
          url: `/api/search/helperaction?keyword=${this.keyword}`,
          // #endif
          // #ifndef  H5
          url: `${this.$api}/search/helperaction?keyword=${this.keyword}`,
          // #endif
          method: 'GET',
          data: {},
          success: res => {
            if (res.data.keywords.length === 0) {
              this.flag = true
            } else {
              this.flag = false
              res.data.keywords.map(item => {
                this.$set(item, "searchName", item.name);
              });
              this.keywords = res.data.keywords
              this.keywords.map(item => {
                let replaceReg = new RegExp(this.keyword, "g");
                let replaceString =
                  '<text class="highlights-text">' + this.keyword + "</text>";
                item.searchName = item.searchName.replace(
                  replaceReg,
                  replaceString
                );
              });
            }
          },
        });
        uni.request({
          // #ifdef  H5
          url: `/api/search/addhistoryaction`,
          // #endif
          // #ifndef  H5
          url: `${this.$api}/search/addhistoryaction`,
          // #endif
          method: 'POST',
          data: {
            keyword: this.keyword,
            openId: this.openId
          },
          success: res => {
            this.getSearch()
          },
          fail: () => {},
          complete: () => {}
        });
      },
      // 热搜
      hotkey(keyword) {
        this.keyword = keyword
        this.onSearch()
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
    onLoad() {
      this.getSearch()
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
    padding: 20rpx 0;
  }

  .box {
    padding: 0 20rpx;
  }

  .del {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10rpx;
  }

  .history {
    font-size: 34rpx;
    font-weight: 600;
    margin: 20rpx 0;
  }

  .del_img {
    width: 30rpx;
    height: 30rpx;
  }

  .historyElse {
    display: flex;
    flex-wrap: wrap;
  }

  .item_box {
    font-size: 28rpx;
    border: 1rpx solid #999;
    padding: 6rpx 10rpx;
    margin: 10rpx;
  }

  .active {
    color: #d81e06;
    border: 1rpx solid #d81e06;
  }

  .hot {
    margin: 30rpx 0;
    font-size: 34rpx;
    font-weight: 600;
  }

  .searchItem {
    margin-top: 20rpx;
    display: flex;
    align-items: center;
  }

  .list_pic_url {
    width: 100rpx;
    height: 100rpx;
    margin-right: 20rpx;
    border: 1rpx solid #EEEEEE;
  }

  .searchName {
    width: 588rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
