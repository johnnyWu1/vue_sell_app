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
          <div class="title">商品评价</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Cartcontrol from 'components/cartcontrol/cartcontrol';
  import Split from 'components/split/split';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false
      };
    },
    methods: {
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
    components: {
      Cartcontrol,
      Split
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
        color: rgb(7,17,27)
      .text
        padding: 0 8px
        line-height: 24px
        font-size: 12px
        color: rgb(77,85,93);
</style>
