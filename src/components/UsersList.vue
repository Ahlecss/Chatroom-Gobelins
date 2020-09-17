<template>
    <ul class="userBox">
        <UsersListUser
            v-for="(user, i) in users"
            :key="i"
            :user="user"/>
    </ul>
</template>
<script>
import UsersListUser from './UsersListUser'
export default {
  props: {
    users: {
      type: Array
    }
  },
  components: {
    UsersListUser
  }
}
</script>

<style lang="stylus" scoped>
.userBox
    color white
    width: 20vw
    display flex
    flex-direction column
    justify-content space-around
    position: absolute;
    left: 0;
    bottom: 10vh;

</style>
