<template>
    <form @submit.prevent="onSubmit" class="messageBox">
        <input v-model="message" type="text" placeholder="Tapez votre message" v-on:keyup.enter="onSubmit">
    </form>
</template>
<script>
export default {
  data () {
    return {
      message: ''
    }
  },
  methods: {
    onSubmit (text) {
      // console.log('send message:', this.message);
      this.$emit('sendMessage', this.message)
      this.message = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.messageBox

    margin-left 10vw
    display flex
    justify-content center
    align-items center
    border none
    background transparent

    & input
      color white
      width 60vw
      height 5vh
      border none
      font-size: 18px
      position: absolute;
      margin-bottom: 10vh;
      background none
      z-index 5
      color: #BBBBBB
      border-bottom: 1px solid white

</style>
