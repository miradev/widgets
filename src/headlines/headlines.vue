<template lang="pug">
#--ID--
  .article(v-if="currentArticle != null")
    img.img(v-bind:src="currentArticle.image")
    h4.title {{ currentArticle.title }}
    p.description  {{ currentArticle.description }} 
</template>

<script>
const axios = require("axios").default

const washingtonPostRegex = /(https?:).*.washingtonpost.com\/resizer.*smart\//g

export default {
  data() {
    return {
      articles: [],
      articleIndex: 0,
      currentArticle: null,
      intervalId: null,
      config: {
        country: "us",
        apiKey: "9505456c3079487d8e944eb9d07a84f8",
        switchTime: 10000,
      },
    }
  },

  watch: {
    config: function() {
      this.fetchNews()
    },
  },

  methods: {
    switchArticle() {
      this.articleIndex = (this.articleIndex + 1) % this.articles.length
      this.currentArticle = this.articles[this.articleIndex]
    },

    fetchNews() {
      if (this.config.apiKey) {
        axios
          .get(
            `https://newsapi.org/v2/top-headlines?country=${this.config.country}&apiKey=${this.config.apiKey}`,
          )
          .then(resp => {
            clearInterval(this.intervalId)
            this.articles = []
            this.articleIndex = 0

            const articleData = resp.data.articles

            for (let i = 0; i < 10; i++) {
              if (articleData[i].urlToImage && articleData[i].description) {
                if (this.articles.length == 4) {
                  break
                }

                const imageUrl = articleData[i].urlToImage.replace(washingtonPostRegex, "https://")
                this.articles.push({
                  title: articleData[i].title,
                  image: imageUrl,
                  description: articleData[i].description,
                })
              }
            }

            this.currentArticle = this.articles[this.articleIndex]
            this.intervalId = setInterval(() => {
              this.switchArticle()
            }, this.config.switchTime)
          })
      }
    },
  },

  mounted() {
    this.fetchNews()
    setInterval(() => {
      this.fetchNews()
    }, 3600 * 12 * 1000)
  },
}
</script>

<style lang="sass">
#--ID--
  font-size: 30px
  font-family: "Roboto", sans-serif
  color: #FFFFFF
  width: 720px

  img
    width: 720px
    height: 420px
    object-fit: cover
  .title
    margin: 0.5rem 0
</style>
