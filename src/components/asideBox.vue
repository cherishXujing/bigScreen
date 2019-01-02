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
    padding: 12px 30px 12px 15px;
    border: 2px solid rgb(0,34,102);
    margin-bottom: 15px;
    &:after {
      position: absolute;
      top: -2px;
      left: 20px;
      content: '';
      width: 40px;
      height: 4px;
      background: #0055ff;
    }
    &:nth-child(even) {
      padding-bottom: 0px;
    }
  }
</style>
