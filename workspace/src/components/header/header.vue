<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <type-icon :size=1 :type="seller.supports[0].type" ></type-icon>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDeails">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDeails">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">

      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="item in seller.supports">
                <type-icon :size=2 :type="item.type" ></type-icon>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDeails">
          <i class="icon-close"></i>
        </div>
      </div>

    </transition>

  </div>
</template>

<script type="text/ecmascript-6">
  import Star from 'components/star/star';
  import TypeIcon from 'components/typeicon/typeicon';

  export default {
    name: 'header',
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        'detailShow': false
      };
    },
    methods: {
      showDeails () {
        this.detailShow = true;
      },
      hideDeails () {
        this.detailShow = false;
      }
    },
    created () {
    },
    components: {
      Star,
      TypeIcon
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .header
    position: relative
    overflow: hidden
    color: #fff
    background-color: rgba(7, 17, 27, 0.5)
    .content-wrapper
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px;
      .content
        display: inline-block
        margin-left: 16px
        .title
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            bg-image('brand')
            background-size: 30px 18px
          .name
            margin-left: 6px
            font-size: 16px
            font-weight: bold
        .description
          margin-bottom: 10px
          line-height: 12px
          font-size: 12px
        .support
          .text
            margin-left: 4px
            line-height 12px
            font-size: 10px
      .support-count
        position: absolute
        right: 12px
        bottom: 14px
        padding: 0 8px
        height: 24px
        line-height: 24px
        border-radius: 14px
        background: rgba(0, 0, 0, 0.2)
        text-align: center
        .count
          vertical-align: top
          font-size: 10px
        .icon-keyboard_arrow_right
          margin-left: 2px
          line-height: 24px
          font-size: 10px
    .bulletin-wrapper
      position: relative;
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background-color: rgba(7, 17, 27, .2)
      .bulletin-title
        display: inline-block
        vertical-align: middle
        width: 22px
        height: 12px
        bg-image('bulletin')
        background-size: 22px 12px
      .bulletin-text
        margin: 0 4px
        vertical-align: middle
        font-size: 10px
      .icon-keyboard_arrow_right
        position: absolute
        top: 8px
        font-size: 10px
        right: 12px
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
    .detail
      position: fixed
      z-index: 100
      top: 0
      left: 0
      width: 100%
      height: 100%
      overflow: auto
      background: rgba(7, 17, 27, 0.8)
      backdrop-filter: blur(10px)
      &.fade-enter-active, &.fade-leave-active
        transition: all .5s
      &.fade-enter, &.fade-leave-active
        opacity: 0
        // transform: scale(3)
      .detail-wrapper
        width: 100%
        min-height: 100%
        .detail-main
          margin-top: 64px
          padding-bottom: 64px
          .name
            line-height: 16px
            text-align: center
            font-size: 16px
            font-weight: 700
          .star-wrapper
            margin-top: 18px
            padding: 2px 0
            text-align: center
          .title
            display: flex
            width: 80%
            margin: 28px auto 24px auto
            .line
              flex: 1
              position: relative
              top: -6px
              border-bottom: 1px solid rgba(255, 255, 255, .2)
            .text
              margin: 0 12px
              line-height: 14px
              font-size: 14px
              font-weight: 700
          .supports
            width: 80%
            margin: 0 auto
            .support-item
              padding: 0 12px
              margin-bottom: 12px
              font-size: 0
              &:last-child
                margin-bottom: 0
              .text
                margin-left: 6px
                line-height: 16px
                font-size: 12px
                font-weight: 200
          .bulletin
            width: 80%
            margin: 0 auto
            .content
              padding: 0 12px
              line-height: 24px
              font-size: 12px
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto
        clear: both
        font-size: 32px

</style>
