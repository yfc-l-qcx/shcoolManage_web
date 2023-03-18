<template>
  <div>
    <side-bar></side-bar>
  </div>
</template>

<script>
  import sideBar from "@/view/sideBar/SideBar.vue";
  export default {
    name: 'layout',
    components: { sideBar },
    computed: {
      sideBar() {
return this.$store.state.app.sideBar
      }
    }

  }
</script>

<style>


</style>