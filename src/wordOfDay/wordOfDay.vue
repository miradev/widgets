<template lang="pug">
#--ID--

  <center>
  h1.title Word of the Day
  p {{date}}
  <br>
  h1 "{{ word }}"
  <br>
  p {{ definition }}
  <br>
  p {{ note }}  
  </center>

  //- h4.author - {{quoteAuthor}}
</template>

<script>
const axios = require("axios").default

export default {
  data() {
    return {
      currentArticle: "https://source.unsplash.com/collection/347929/",
      word: "",
      definition: "",
      date: "",
      note: "",
    }
  },

  methods: {
    update() {
      axios.get("http://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5").then(resp => {
        console.log(resp["data"])
        const word = resp["data"]["word"]
        const definition = resp["data"]["definitions"][0]["text"]
        const note = resp["data"]["note"]
        // const quote = resp.data.contents.quotes[0].quote
        // const author = resp.data.contents.quotes[0].author
        const currentDate = new Date();
        this.word = word
        this.definition = definition
        this.note = "Note: " + note
        this.date = currentDate.toJSON().slice(0,10).replace(/-/g,'/');
        // this.quoteAuthor = author
      })
    },
  },

  mounted() {
    // Update every 3 hours
    this.update()
    setInterval(() => {
      this.update()
    }, 3600 * 3000)
  },
}
</script>

<style lang="sass">
#--ID--
  padding: 2rem
  font-size: 30px
  font-family: "Times New Roman", sans-serif
  color: #ffffff

  .title
    margin-bottom: 1rem

  .author
    text-align: right
</style>
