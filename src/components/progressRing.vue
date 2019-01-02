<template>
  <div class='circle-container'>
    <div class="circle-item" :style="{ backgroundColor: bgColor}">
      <div class="circle-left-wrap">
        <div class="left_circle"></div>
      </div>
      <div class="circle-right-wrap">
        <!--<div class="right_circle" :style="{transform: rotate(rotateNum + 'deg')}"></div>-->
        <div class="right_circle" style="transform: rotate(70deg)"></div>
      </div>
      <div class='mask'>
        <span class="fs-09">{{ totalNum }}</span>
      </div>
    </div>
    <p class="title">{{ titleTxt }}</p>
  </div>
</template>
<script>
export default {
  name: 'progressRing',
  props: {
    rotateNum: {
      type: Number
    },
    bgColor: {
      type: String
    },
    titleTxt: {
      type: String
    },
    totalNum: {
      type: Number
    }
  },
  computed: {},
  data () {
    return {
    }
  }

}
</script>
<style lang="scss" scoped>
  $size: 100px;
  @mixin pos ($tp:0, $lt:0) {
    top: $tp;
    left: $lt;
  }
  @mixin positioning($pos: absolute, $width: 100px, $height: 100px) {
    position: $pos;
    height: $height;
    width: $width;
  }
  .circle-container{
    @include positioning(relative, $height: 150px);
  }
  .circle-item{
    @include positioning ($width: 100px, $height: 100px);
    @include pos($tp: 10px, $lt: 10px);
    border-radius: 50%;
    background-color: #59d;
  }
  .circle-left-wrap, .circle-right-wrap{
    @include positioning(absolute, $width: 50px, $height: 100px);
    @include pos;
    overflow: hidden;
  }
  .circle-right-wrap{
    left: 50px;
  }
  .left_circle, .right_circle {
    @include positioning;
    @include pos;
    border-radius: 50%;
    background: rgb(0,8,25);
  }
  .left_circle{
    clip: rect(0, 50px, auto, 0);
  }
  .right_circle{
    clip: rect(0, auto, auto, 50px);
    left: -50px;
  }
  .mask{
    @include positioning($width: 90px, $height: 90px);
    @include pos($tp: 5px, $lt: 5px);
    border-radius: 50%;
    background-color: #001133;
    span {
      display: inline-block;
      width: 100%;
      text-align: center;
      line-height: 90px;
      color: #fff;
    }
  }
  .title {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    font-size: 18px;
    left: 8px;
  }
</style>
