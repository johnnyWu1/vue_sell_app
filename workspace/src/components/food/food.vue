<template>
  <transition name="move">
    <div class="food" ref="food" v-show="showFlag">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div v-show="food.count && food.count>0" class="cartcontrol-wrapper">
            <cartcontrol @cart-add="_drop" :food="food"></cartcontrol>
          </div>
          <transition name="fade">
            <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0">
              <span>加入购物车</span>
            </div>
          </transition>
        </div>
        <split v-if="food.info"></split>
        <div class="info" v-if="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect @ratingtype-select="ratingTypeChange" @content-toggle="onlyContentChange"
                        :select-type="selectType" :only-content="onlyContent" :desc="desc"
                        :ratings="food.ratings"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings"
                  class="rating-item border-1px">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <div class="text">
                  <span :class="{'icon-thumb_down':rating.rateType===1,'icon-thumb_up':rating.rateType===0}"></span>{{rating.text}}
                </div>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Cartcontrol from 'components/cartcontrol/cartcontrol';
  import Ratingselect from 'components/ratingselect/ratingselect';
  import Split from 'components/split/split';
  import {formatDate} from 'common/js/date';

  // const POSITIVE = 0;
  // const NEGATIVE = 1;
  const ALL = 2;

  export default {
    props: {
      food: {
        type: Object
      }
    },
    created () {
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: false,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    methods: {
      ratingTypeChange (type) {
        this.selectType = type;
        this.$nextTick(() => this.scroll.refresh());
      },
      onlyContentChange (isOnlyContent) {
        this.onlyContent = isOnlyContent;
        this.$nextTick(() => this.scroll.refresh());
      },
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
      _drop (el) {
        this.$emit('cart-add', el);
      },
      addFirst (event) {
        if (event._contructed) {
          return;
        }
        this._drop(event.target);
        this.$set(this.food, 'count', 1);
      },
      show () {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = false;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide () {
        this.showFlag = false;
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      Cartcontrol,
      Split,
      Ratingselect
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    width: 100%
    background-color: #fff
    &.move-enter-active, &.move-leave-active
      transform: translate3d(0, 0, 0)
      transition: all .3s
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 10px
          font-size: 20px
          color: #fff
          text-shadow: 3px 3px 3px rgba(0, 0, 0, .3);
    .content
      position: relative
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        font-size: 0
        .sell-count, .rating
          font-size: 10px
          color: rgb(147, 153, 159)
        .sell-count
          margin-right: 12px
      .price
        line-height: 24px
        .now
          font-weight: 700
          margin-right: 8px
          font-size: 14px
          color: rgb(240, 20, 20);
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)

      .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        border-radius: 12px
        font-size: 10px
        color: #fff
        background: rgb(0, 160, 220)
        &.fade-enter-active, &.fade-leave-active
          opacity: 1
          transition: all .5s
        &.fade-enter, &.fade-leave-active
          opacity: 0

    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7, 17, 27)
      .text
        padding: 0 8px
        line-height: 24px
        font-size: 12px
        color: rgb(77, 85, 93);
    .rating
      padding-top: 18px;
      .title
        line-height: 14px
        margin-left: 18px
        font-size: 14px
        color: rgb(7, 17, 27)
      .rating-wrapper
        padding: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          border-1px(rgba(7, 17, 27, .1))
          .user
            position: absolute
            right: 0
            top: 16px
            line-height: 12px
            font-size: 0
            .name
              display: inline-block
              margin-right: 6px
              vertical-align: top
              font-size: 10px
              color: rgb(147, 153, 159)
            .avatar
              border-radius: 50%
          .time
            margin-bottom: 6px
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
          .text
            line-height: 16px
            font-size: 12px
            color: rgb(7, 17, 27)
            .icon-thumb_up, .icon-thumb_dowm
              margin-right: 4px
              line-height: 16px
              font-size: 12px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(147, 153, 159)

        .no-rating
          padding: 16px 0
          font-size: 12px
          color: rgb(147, 153, 159);
</style>
