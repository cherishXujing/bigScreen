<template>
  <div class="progress-ring">
    <!--<div class="color"></div>-->
    <div class="progress-track"></div>
    <div class="progress-left"></div>
    <div class="progress-right"></div>
    <div class="progress-cover"></div>
  </div>
</template>
<script>
export default {
  name: 'circles',
  components: {},
  data () {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
  $size: 80px; // 圆环宽高
  $borderWidth: ($size / 16); // 轨道宽度
  $fontColor: #fff;
  @mixin positioning($pos: absolute) {
    position: $pos;
    top: 0;
    left: 0;
    height: $size;
    width: $size;
  }

  /*.circle,.color {
    width: 80px;
    height: 80px;
    overflow: hidden;
    border: 5px solid rgb(0,8,25);
    border-radius: 50%;
    display: inline-block;
  }
  .circle {
    position: relative;
    .color {
      position: absolute;
      top: 0;
      left: 0;
    }
  }*/
  .progress-ring {
    @include positioning (relative);
    div {
      @include positioning;
      border: $borderWidth solid rgb(0,8,25);
      border-radius: 50%;
    }
    .progress-left, .progress-right, .progress-cover {
      clip: rect(0 ($size / 2) $size 0);
    }
    .progress-right {
      transform: rotate(180deg); /* 旋转到右边 */
      opacity: 0;
    }
    .progress-left, .progress-right {
      border-color: #ffaa05;
    }

    $precent: 5; // 进度百分比
    $duration: 2s; // 动画时长

    .progress-right {
      /*opacity: 0;*/
    }
    .progress-left {
      transform: rotate(3.6deg * $precent);
      transition: transform $duration linear;
    }
    @keyframes toggle {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    .progress-right {
      opacity: 1;
      animation: toggle($duration * 50 / $precent) step-end;
    }
    .progress-cover {
      opacity: 0;
      animation: toggle($duration * 50 / $precent) step-start;
    }
  }
</style>
