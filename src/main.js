import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
}).$mount('#app')
if('serviceWorker' in navigator && process.env.NODE_ENV !== 'development'){
  navigator.serviceWorker.register('/service-wroker.js');
}
