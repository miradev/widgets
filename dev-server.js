import Vue from "vue"
const srcName = process.env.SRC
const Widget = require(`@/${srcName}/${srcName}.vue`).default

Vue.config.productionTip = false

new Vue({
  render: function(h) {
    return h(Widget)
  },
}).$mount("#app")
