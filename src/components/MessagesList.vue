<template>
    <ul class="messageArea">
        <MessagesListMessage
            v-for="(message, i) in messages"
            :key="i"
            :message="message"
            :is-current="index === 0"/>
    </ul>
</template>
<script>
import MessagesListMessage from './MessagesListMessage'

export default {
  props: {
    messages: {
      type: Array
    }
  },
  components: {
    MessagesListMessage
  }
}
</script>

<style lang="stylus" scoped>
.messageArea
    width 80vw
    height 70vh
</style>
