<template lang="pug">
  #--ID--
    p {{ time }}
</template>

<script>
const moment = require("moment")

export default {
  data() {
    return {
      time: "",
      config: null,
    }
  },

  methods: {
    updateTime() {
      if (this.config && this.config.format) {
        this.time = moment().format(this.config.format)
      } else {
        this.time = moment().format("hh : mm : ss A")
      }
    },
  },

  mounted() {
    this.updateTime()
    setInterval(() => {
      this.updateTime()
    }, 1000)
  },
}
</script>

<style lang="sass">
#--ID--
  font-size: 80px
  font-family: "Roboto", sans-serif
  color: #FFFFFF
</style>
