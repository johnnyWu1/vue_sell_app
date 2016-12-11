<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span class="block all" :class="{'active': selectType == 2}" @click="select(2)">{{desc.all}}<span
        class="count">99</span></span>
      <span class="block positive" :class="{'active': selectType == 0}" @click="select(0)">{{desc.positive}}<span
        class="count">85</span></span>
      <span class="block negative" :class="{'active': selectType == 1}" @click="select(1)">{{desc.negative}}<span
        class="count">20</span></span>
    </div>
    <div class="switch">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // const POSITIVE = 0;
  // const NEGATIVE = 1;
  const ALL = 2;

  export default {
    methods: {
      select (type) {
        // this.selectType = type;
      }
    },
    props: {
      ratings: {
        type: Array,
        default () {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .ratingselect
    padding: 20px
    .rating-type
      padding: 18px 0
      margin: 0 18px
      border-1px(rgba(7, 17, 27, .1))
      font-size: 0
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        color: rgb(77, 85, 93)
        font-size: 12px
        &.active
          color: #fff
        .count
          margin-left: 2px
          font-size: 8px
        &.all
          background-color: rgba(0, 160, 220, .2)
          &.active
            background-color: rgb(0, 160, 220)
        &.positive
          background-color: rgba(0, 160, 220, .2)
          &.active
            background-color: rgb(0, 160, 220)
        &.negative
          background-color: rgba(77, 85, 93, .2)
          &.active
            background-color: rgb(77, 85, 93)


    .switch
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7,17,27,0.1)
      color: rgb(147,153,159)
</style>
