import Vue from 'vue'
import Vuex from 'vuex'
import cookies from 'vue-cookies'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: require('@/data/articles.json'),
    drawer: false,
    items: [
      {
        text: 'Pinstagram',
        href: '/#/',
      },
      {
        text: 'Login',
        href: '/#/login',
      },
      {
        text: 'Signin',
        href: '/#/signin',
      },
      {
        text: 'Posts',
        href: '/#/posts',
      },
    ],
    user_idx : cookies.get('user_idx'),
    IMG_URL: 'http://localhost:8090/post/image',
  },
  getters: {
    categories: state => {
      const categories = []
      return categories.sort().slice(0, 4)
    },
    links: (state, getters) => {
      return state.items.concat(getters.categories)
    },
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer),
  },
  actions: {

  },
})
