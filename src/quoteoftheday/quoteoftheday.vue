<template lang="pug">
  #--ID--
    h4 Quote of the Day:
    <div style="width=100">
    h9 "{{ quoteText }}"
    h9  - {{quoteAuthor}}
    </div>
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
    const url = "http://quotes.rest/qod.json"
    const result = await makeRequest("GET", url)
    const data = JSON.parse(result)
    const quote = data.contents.quotes[0].quote
    const author = data.contents.quotes[0].author
    this.quoteText = quote
    this.quoteAuthor = author
  },
}
</script>

<style lang="sass">
@import url("https://fonts.googleapis.com/css?family=Roboto")

#--ID--
  font-size: 30px
  font-family: "Times New Roman"
  color: #daf6ff
  text-shadow: 0 0 20px rgba(10, 175, 230, 1),  0 0 20px rgba(10, 175, 230, 0)
</style>
