<template>
  <div class="aside-box">
    <slot></slot>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
  .aside-box {
    position: relative;
    // padding: 16px 20px;
    padding: 12px 16px;
    border: 2px solid rgb(0,34,102);
    &:after {
      position: absolute;
      top: -2px;
      left: 20px;
      content: '';
      width: 40px;
      height: 4px;
      background: #0055ff;
    }
  }
</style>
