<!--菜单栏滚动条-->
<template>
  <div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll">
    <div class="scroll-wrapper" ref="scrollWrapper" :style="{top:top + 'px'}"></div>
  </div>
</template>
<script>
const delta = 15
export default {
  name: 'scrollBar',
  data() {
    return {
      top: 0
    }
  },
  methods: {
    handleScroll(e) {
      const evenDelta = e.wheelDelta || -e.deltaY * 3
      const $container = this.$refs.scrollContainer
      const $containerHeight = $container.offsetHeight
      const $wrapper = this.$refs.scrollContainer
      const $wrapperHeight = $wrapper.offsetHeight
      if(evenDelta > 0) {
        this.top = Math.min(0, this.top + evenDelta)
      } else {
        if($containerHeight - delta < $wrapperHeight) {
          if (this.top < -($wrapperHeight - $containerHeight + delta)){
            this.top = this.top
          } else {
            this.top = Math.max(this.top + evenDelta, $containerHeight - $wrapperHeight - delta)
          }
        } else {
          this.top = 0
        }
      }
    }
  }
}
</script>
<style ref="stylesheet/scss" lang="scss" scoped>
@import "../../styles/variables.scss";

.scroll-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: $menuBg;
  .scroll-wrapper {
    position: absolute;
    width: 100%!important;
  }
}
</style>