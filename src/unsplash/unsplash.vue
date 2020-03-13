<template lang="pug">
#--ID--
  .unsplash(v-if="imageData !== null")
    .image
      img(v-bind:src="imageData.image")
    p.location {{ imageData.location }}

</template>

<script>
const axios = require("axios").default

export default {
  data() {
    return {
      config: {
        accessKey: null,
      },
      imageData: null,
    }
  },

  methods: {
    update() {
      axios
        .get(`https://api.unsplash.com/photos/random?client_id=${this.config.accessKey}`)
        .then(resp => {
          const image = resp.data.urls.regular
          const location = resp.data.location.title
          this.imageData = {
            image,
            location,
          }
        })
    },
  },

  mounted() {
    this.update()
    setInterval(() => {
      this.update()
    }, 60 * 5 * 1000)
  },
}
</script>

<style lang="sass">
#--ID--
  box-sizing: border-box
  padding: 5rem
  height: 100%
  display: flex
  align-items: center
  justify-content: center
  font-size: 30px
  font-family: "Roboto", sans-serif
  color: #ffffff

  img
    vertical-align: middle
    width: 100%
    height: 100%
</style>
