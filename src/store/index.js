import { createStore } from 'vuex'
import http from '@/http'


// Estado inicial
const state = {

  //localStorage: busca usuario logado ou não
  token: localStorage.getItem('token') || null,
  usuario: JSON.parse(localStorage.getItem('usuario')) || {}
}

// Getters
const getters = {

  //estado do token: true ou null
  //uso no component: AppHeader: NavbarLogged ou NavbarLoggedOut
  //Uso no components: Loggin e NewUser, direciona o usuario se logado
  userLogged: state => Boolean(state.token),

  //uso no component: NavbarLogged: uso variável 'usuario.nome' 
  nameUser(state) {
    return state.usuario.nome;
  }
}

// Setters
const mutations = {

  lOGIN_USER(state, { token, usuario }) {
    state.token = token
    state.usuario = usuario

    //enviar usuário para o localStorage
    localStorage.setItem('token', token)
    localStorage.setItem('usuario', JSON.stringify(usuario))

  },
  LOGOUT_USER(state) {
    state.token = null
    state.usuario = {}

    //limpar localStorage
    localStorage.clear()
  }
}

//Methods: Vuex requisições http são feitas no actions
//commit: chama uma mutation do Vuex
const actions = {

  doLoginStore({ commit }, usuario) {
    return new Promise((resolve, reject) => {
      http.post('auth/login', usuario)
       
        .then(response => {
          commit('lOGIN_USER', {
            token: response.data.access_token,
            usuario: response.data.user
          })
          resolve(response.data)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }
}

// Config
export default createStore({
  state,
  mutations,
  actions,
  getters,

})

