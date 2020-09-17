<template>
  <div class="loginPage">
      <div class="error" v-if="error">
        {{error}}
      </div>
      <form @submit.prevent="onSubmit" class="loginBox">
        <input type="text" v-model="username" placeholder="Entrez votre pseudo, et appuyez sur Enter" v-on:keyup.enter="onSubmit">
      </form>
  </div>
</template>

<script>
import store from '../store'

export default {
  data () {
    return {
      username: '',
      error: store.error
    }
  },
  methods: {
    onSubmit () {
      store.userRegister(this.username)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .loginPage
    height: 100vh
    width: 100vw
    background-image: url("../assets/loginBackground.png");
    background-repeat no-repeat
    background-size cover

    .loginBox
      height 100%
      width 100%
      display flex
      justify-content center
      align-items center
      border none
      background transparent

    & input
      width 60vw
      height 5vh
      border none
      font-size: 24px
      position: absolute;
      background none
      z-index 10
      color: #AAAAAA
      border-bottom: 1px solid white
</style>
