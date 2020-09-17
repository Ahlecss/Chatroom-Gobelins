<template>
    <li class="user">
        <span class='user-firstletter'>{{user.username[0].toUpperCase()}}</span>
        <span class='user-fullname'>{{user.username}}</span>
    </li>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }

}
</script>

<style lang="stylus" scoped>
.user
  color white
  list-style none
  display flex
  flex-direction row
  justify-content flex-start

  & .user-firstletter
    font-size: 32px
    width: 50px;
  & .user-fullname
    margin-left 50px
    font-size: 24px
</style>
