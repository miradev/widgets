<template lang="pug">
#--ID--
  h2  Top Headlines:
  div(style='width=100')
    ul(v-for='article in articles')
      h4 {{ article.title }}
      img(v-bind:src='article.image' height='250' width='500')
      p  {{article.description}} 
      br
</template>

<script>
async function makeRequest(method, url) {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.onload = function() {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response)
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        })
      }
    }
    xhr.onerror = function() {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      })
    }
    xhr.send()
  })
}

export default {
  data() {
    return {
      articles: [],
      quoteText: "",
      quoteAuthor: "",
    }
  },
  methods: {
    async makeRequest(method, url) {
      return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest()
        xhr.open(method, url)
        xhr.onload = function() {
          if (this.status >= 200 && this.status < 300) {
            resolve(xhr.response)
          } else {
            reject({
              status: this.status,
              statusText: xhr.statusText,
            })
          }
        }
        xhr.onerror = function() {
          reject({
            status: this.status,
            statusText: xhr.statusText,
          })
        }
        xhr.send()
      })
    },
  },
  async mounted() {
    const url =
      "http://newsapi.org/v2/top-headlines?country=us&apiKey=9505456c3079487d8e944eb9d07a84f8"
    const result = await makeRequest("GET", url)
    const data = JSON.parse(result)
    const article_data = data["articles"]
    console.log(article_data)
    for (let i = 0; i < 10; i++) {
      if (article_data[i].urlToImage == null || article_data[i].description == "") {
        continue
      }

      if (this.articles.length == 4) {
        break
      }
      this.articles.push({
        title: article_data[i].title,
        image: article_data[i].urlToImage,
        description: article_data[i].description,
      })
    }
  },
}
</script>

<style lang="sass">
@import url("https://fonts.googleapis.com/css?family=Roboto")

#--ID--
  font-size: 20px
  font-family: "Times New Roman"
  color: #daf6ff
  text-shadow: 0 0 20px rgba(10, 175, 230, 1),  0 0 20px rgba(10, 175, 230, 0)
</style>
