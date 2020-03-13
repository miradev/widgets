<template lang="pug">
#--ID--

  h1.title Stock Indexes


  ul(v-for='stock in stocks')
    h4 {{ stock.symbol }}   Price {{ stock.price }}
    h5 High: {{ stock.high}} Low: {{stock.low}} Open: {{stock.open}}
    br

  //- h4.author - {{quoteAuthor}}
</template>

<script>
const axios = require("axios").default

export default {
  data() {
    return {
      stocks: [],
    }
  },

  methods: {
    update() {
      var indexes = ["^VIX", "^RUT", "GSPC", "DJIA"]
      const mapper = {"^VIX":"VIX", "^RUT":"Russell 2000", "INX":"S&P 500",  "DJIA": "Dow Jones"}
      for (var idx in indexes) {
        var stk = indexes[idx]
        var url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+stk+"&apikey=KM0MIHNEG08W6SJ2"
        axios.get(url).then(resp => {
          var symbol = mapper[resp["data"]["Global Quote"]["01. symbol"]]
          const open = resp["data"]["Global Quote"]["02. open"]
          const high = resp["data"]["Global Quote"]["03. high"]
          const low = resp["data"]["Global Quote"]["04. low"]
          const price = resp["data"]["Global Quote"]["05. price"]
          this.stocks.push({symbol: symbol, open: open, high: high, low: low, price: price})
        })
      }
      console.log(stocks)
    },
  },

  mounted() {
    // Update every 3 hours
    this.update()
    setInterval(() => {
      this.update()
    }, 3600 * 300)
  },
}
</script>

<style lang="sass">
#--ID--
  padding: 2rem
  font-size: 30px
  font-family: "Vectora Roman", sans-serif
  color: #ffffff

  .title
    margin-bottom: 1rem
    margin-left: 7rem

  .author
    text-align: right
</style>
