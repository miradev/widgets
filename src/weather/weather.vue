<template lang="pug">
#--ID--(v-if="currently !== null && daily !== null")
  .icon
    img(v-bind:src="icon")
    p.temp {{ Math.round(currently.temperature) }}°{{ this.config.units }}
  p.temp {{ Math.round(daily.temperatureLow) }}°/{{ Math.round(daily.temperatureHigh) }}° | Feels like {{ Math.round(currently.apparentTemperature) }}°{{ this.config.units }}
  p.forecast {{ currently.summary }}
</template>

<script>
const axios = require("axios").default

export default {
  data() {
    return {
      config: {
        secretKey: null,
        latitude: 43.4799,
        longitude: -80.5392,
        units: "C",
      },
      currently: null,
      daily: null,
    }
  },

  watch: {
    config: function() {
      this.update()
    },
  },

  methods: {
    units() {
      if (this.config.units && this.config.units.toLowerCase() === "f") {
        return "us"
      }
      return "ca"
    },

    cors(url) {
      return `https://cors-anywhere.herokuapp.com/${url}`
    },

    update() {
      if (this.config.secretKey) {
        axios
          .get(
            this.cors(
              `https://api.darksky.net/forecast/${this.config.secretKey}/${this.config.latitude},${
                this.config.longitude
              }?units=${this.units()}`,
            ),
          )
          .then(resp => {
            this.currently = resp.data.currently
            this.daily = resp.data.daily.data[0]
            this.icon = `https://darksky.net/images/weather-icons/${this.currently.icon}.png`
          })
      }
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
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  font-size: 40px
  font-family: "Roboto", sans-serif
  color: #ffffff

  .icon
    font-size: 128px
    display: flex
    align-items: center
    justify-content: center

  p
    margin: 1rem 0
</style>
