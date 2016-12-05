<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left" @click="toggleList">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight': totalPrice>0}">
            <span class="icon-shopping_cart"></span>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
      <div class="ball-container">
        <transition-group name="drop" @before-enter="drop_beforeEnter" @leave="drop_leave"
                          @after-enter="drop_afterEnter" @after-leave="drop_afterLeave">
          <div key="{{index}}" :data-index="index" class="ball" v-for="ball,index in balls" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition-group>
      </div>
      <transition name="bounce">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price"><span>￥{{food.price*food.count}}</span></div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol @cart-add="drop" :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div class="list-mask" v-show="listShow"></div>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Cartcontrol from 'components/cartcontrol/cartcontrol';
  import BScroll from 'better-scroll';

  export default {
    data () {
      return {
        balls: [{
          show: false,
          isBusy: false
        }, {
          show: false,
          isBusy: false
        }, {
          show: false,
          isBusy: false
        }, {
          show: false,
          isBusy: false
        }],
        fold: true
      };
    },
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    computed: {
      totalPrice () {
        let total = 0;
        this.selectFoods.forEach((food) => {
          if (food.count) {
            total += food.price * food.count;
          }
        });
        return total;
      },
      totalCount () {
        let count = 0;
        this.selectFoods.forEach((food) => {
          if (food.count) {
            count += food.count;
          }
        });
        return count;
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}起送`;
        } else {
          return '去结算';
        }
      },
      payClass () {
        return this.totalPrice < this.minPrice ? 'not-enough' : 'enough';
      },
      listShow () {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        return show;
      }
    },
    methods: {
      empty () {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      toggleList () {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      drop (el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.isBusy) {
            ball.show = true;
            ball.isBusy = true;
            ball.el = el;
            return;
          }
        }
      },
      drop_beforeEnter (el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      drop_leave (el) {
        el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webkitTransform = 'translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
      },
      drop_afterEnter (el) {
        let ball = this.balls[el.getAttribute('data-index')];
        if (ball) {
          ball.show = false;
        }
      },
      drop_afterLeave (el) {
        let ball = this.balls[el.getAttribute('data-index')];
        if (ball) {
          ball.isBusy = false;
          el.style.display = 'none';
        }
      }
    },
    components: {
      Cartcontrol
    },
    watch: {
      totalCount (count) {
        // if (count > 0 && this.listShow || (!this.listShow && !this.scroll)) {
        //   this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.listContent, {click: true});
        } else {
          this.scroll.refresh();
          //   }
          // });
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .shopcart
    .content
      .content-left
        .logo-wrapper
          .logo.highlight
            background-color: rgb(0, 160, 220)
            .icon-shopping_cart
              color: #fff
        .price
          color: #fff

  .shopcart
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    z-index: 300
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        z-index: 60
        flex 1
        .logo-wrapper
          display: inline-block
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          vertical-align: top
          border-radius: 50%
          background: #141d27
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background-color: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background: #2b343c
            text-align: center
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
        .price
          display: inline-block
          vertical-align: top
          line-height: 24px
          margin-top: 12px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        z-index: 60
        flex 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            color: #fff
            font-size: 16px
            background-color: #00b43c

    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
        &.drop-leave-active
          transition: all .4s cubic-bezier(.49, -0.29, 0.75, 0.41)
          .inner
            transition: all .4s linear

    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -20
      width: 100%
      transform: translate3d(0, -100%, 0);
      &.bounce-enter-active
        transform: translate3d(0, -100%, 0);
        transition: all .4s cubic-bezier(0.61, 0.16, 0.54, 1.38)
      &.bounce-enter, &.bounce-leave-active
        transition: all .4s linear
        transform: translate3d(0, 0, 0);
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)
      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: absolute
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, .1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0px
            bottom: 6px
            color: #333;

    .list-mask
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -40
      background-color: rgba(7, 17, 27, .6)
      backdrop-filter: blur(10px)
      &.fade-enter-active
        transition: all .4s linear
        background-color: rgba(7, 17, 27, .6)
        opacity: 1
      &.fade-enter, &.fade-leave-active
        transition: all .4s linear
        background-color: rgba(7, 17, 27, 0)
        opacity: 0

</style>
