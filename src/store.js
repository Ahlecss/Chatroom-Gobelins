import Vue from 'vue'
import io from 'socket.io-client'
import router from './router'

const socket = io('https://bddi-2019-chat.herokuapp.com')

const store = new Vue({
  data: {
    isRegistered: false,
    error: null,
    user: {},
    users: [],
    messages: [
    ]
    // fonts: {
    //    Michel: 'Arial'
    // }
  },
  watch: {
    isRegistered (registered) {
      if (registered) {
        router.push('/')
      } else {
        router.push('/login')
      }
    }
  },
  methods: {
    generatedRandomFonts () {
    },
    registerListeners () {
      socket.on('connect', () => {
        console.log('connected')
        const sessionUser = sessionStorage.getItem('user')
        if (sessionUser) {
          store.userRegister(JSON.parse(sessionUser).username)
        }
      })

      socket.on('disconnect', () => {
        this.isRegistered = false
      })

      socket.on('users update', ({ users, user, type }) => {
        /* if(this.users.length > 0) {
                    if (type === 'join') {
                        this.fonts[user.username] = this.generatedRandomFonts(user)
                    } else {
                        delete this.fonts[user.username]
                    }
                    } else {
                        users.forEach((user) => {
                        this.fonts[user.username] = this.generatedRandomFonts(user)
                    })
                } */
        this.users = users
      })

      socket.on('user registered', (user) => {
        this.isRegistered = true
        this.error = null
        this.user = user
        sessionStorage.setItem('users', JSON.stringify(user))
        console.log('Users Registered', user)
      })

      socket.on('messages update', ({ messages }) => {
        this.messages = messages
        console.log('Messages Update', messages)
      })

      socket.on('message new', ({ message }) => {
        // message.font = this.fonts[message.user.username]
        this.messages.push(message)
        console.log('Message New', message)
      })

      socket.on('chat error', (error) => {
        console.log('Chat Error', error)
      })
    },

    logout () {
      sessionStorage.clear()
      socket.disconnect()
      router.push('/login')
    },

    userRegister (username) {
      socket.emit('user register', { username })
    },

    userTyping () {
    },

    messageNew (message) {
      socket.emit('message new', message)
    }
  },

  created () {
    this.registerListeners()
  }
})

export default store
