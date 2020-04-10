import Vue from 'vue'
import App from './App.vue'

// include tailwindcss styles
import './assets/styles/index.css'

new Vue({
  render: h => h(App)
}).$mount('#app')
