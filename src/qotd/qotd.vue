<template lang="pug">
#--ID--
  h4.title Quote of the Day:
  h4.quote "{{ quoteText }}"
  h4.author - {{quoteAuthor}}
</template>

<script>
const axios = require("axios").default

export default {
  data() {
    return {
      quoteText: "",
      quoteAuthor: "",
    }
  },

  methods: {
    update() {
      axios.get("http://quotes.rest/qod.json").then(resp => {
        console.log()
        const quote = resp.data.contents.quotes[0].quote
        const author = resp.data.contents.quotes[0].author
        this.quoteText = quote
        this.quoteAuthor = author
      })
    },
  },

  mounted() {
    // Update every 3 hours
    this.update()
    setInterval(() => {
      this.update()
    }, 3600 * 3)
  },
}
</script>

<style lang="sass">
#--ID--
  padding: 2rem
  font-size: 30px
  font-family: "Roboto", sans-serif
  color: #ffffff

  .title
    margin-bottom: 1rem

  .author
    text-align: right
</style>
