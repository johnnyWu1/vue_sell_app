<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click="removeCart"><span
        class="icon-remove_circle_outline"></span></div>
    </transition>
    <div class="cart-count" v-show="food.count&&food.count>0">{{food.count}}</div>
    <div class="cart-increase" @click="addCart"><span class="icon-add_circle"></span></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      removeCart (event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count > 0) {
          this.food.count--;
        }
      },
      addCart (event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          this.$set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$emit('cart-add', event.target);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    .cart-decrease, .cart-increase
      display: inline-block
      padding: 6px
      width: 24px
      height: 24px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      line-height: 36px
      font-size: 10px

  .cartcontrol
    .move-enter-active
      transform: translate3D(0, 0, 0) rotate(0)
      transition: all .4s linear
    .move-enter, .move-leave-active
      transform: translate3D(24px, 0, 0) rotate(180deg)
      opacity: 0

</style>
