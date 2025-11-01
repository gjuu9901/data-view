<template>
  <div class="view-data">
    view-data
    <div class="bar-data">
      <bar-data ref="bar" chartId="bar"> </bar-data>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  // import API from '@api'
  import BarData from '@components/bar-data/bar-data'
  const PAGE_NAME = 'VIEW_DATA'
  const TITLE = '总数据中台'

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    components: {
      BarData
    },
    data() {
      return {

      }
    },
    computed: {
      // ...Helpers.computed,
    },
    created() {

    },
    mounted() {
      this.draw()
    },
    methods: {
      // ...Helpers.methods,
      draw() {
        this.$refs.bar && this.$refs.bar.drawBar({xAx: [], series: []})
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .view-data
    width: 100%
    background: #0e1024
    min-height: 100vh
    .bar-data
      width: 800px
      height: 408px

    .bottom
      bottom: 20px
</style>
