<template>
  <div class="chatbox">
    <UsersList :users="store.users" />
    <div class="messageListandBox">
      <MessagesList :messages="store.messages" :fonts="font" ref="draggableContainer"
@mousedown="dragMouseDown"/>
      <MessageBox @sendMessage="onSendMessage" />
    </div>
  </div>
</template>

<script>
import MessageBox from '../components/MessageBox'
import MessagesList from '../components/MessagesList'
import UsersList from '../components/UsersList'

import store from '../store'

export default {
  data () {
    return {
      store,
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0
      }
    }
  },
  methods: {
    onSendMessage (text) {
      store.messageNew(text)
    }
  },
  components: {
    MessageBox,
    MessagesList,
    UsersList
  }
}
</script>

<style lang="stylus" scoped>
.chatbox {
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.messageListandBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
    position: absolute;
  cursor: move;
  height: 100vh;
}
</style>
