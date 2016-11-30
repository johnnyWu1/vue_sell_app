<template>
  <span class="type-icon" :class="type-class"></span>
</template>

<script type="text/ecmascript-6">

  const CLASS_MAP = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

  export default {
    props: {
      size: {
        type: Number
      },
      type: {
        type: Number
      }
    },
    computed: {
      'type-class' () {
        return 'star-' + this.size;
      },
      itemClasses () {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0;
        let integer = Math.floor(score);
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }
        if (hasDecimal) {
          result.push(CLS_HALF);
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }
        return result;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

  @import "../../common/stylus/mixin.styl"
  .type-icon



</style>
