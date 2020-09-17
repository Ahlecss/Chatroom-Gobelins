<template>
<div ref="draggableContainer" id="draggable-container">
    <li id="draggable-header" class="floating" @mousedown="dragMouseDown">

    <div  class="messageText">
      {{message.text}}
      <div class="messageInfos">
        <em v-if="isCurrentUser">{{message.user.username}}:</em>
        <em v-else>{{message.user.username}}</em>
        <span>&nbsp; | {{formattedDate(message.created)}}</span>
      </div>
    </div>
  </li>
  </div>
</template>
<script>
import store from '../store'
import moment from 'moment'

// Sur le li :style="{fontFamily: message.font}"

export default {
  data () {
    return {
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0
      }
    }
  },
  computed: {
    isCurrentUser () {
      return this.message.user.username === store.$data.user.username
    }
  },
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  methods: {
    formattedDate (date) {
      return moment(date).format('HH:mm')
    },
    dragMouseDown: function (event) {
      event.preventDefault()
      // get mouse cursor position
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      document.onmousemove = this.elementDrag
      document.onmouseup = this.closeDragElement
    },
    elementDrag: function (event) {
      event.preventDefault()
      this.positions.movementX = this.positions.clientX - event.clientX
      this.positions.movementY = this.positions.clientY - event.clientY
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      // new position
      this.$refs.draggableContainer.style.top =
      this.$refs.draggableContainer.offsetTop - this.positions.movementY + 'px'
      this.$refs.draggableContainer.style.left =
      this.$refs.draggableContainer.offsetLeft -
      this.positions.movementX +
      'px'
    },
    closeDragElement () {
      document.onmouseup = null
      document.onmousemove = null
    }
  }
}
</script>

<style lang="stylus" scoped>
@font-face {
  font-family: Bodoni;
  font-style: normal;
  src: url('../assets/fonts/Bodoni72SmallcapsBook.ttf');
}

@font-face {
  font-family: PTMono;
  font-style: normal;
  src: url('../assets/fonts/PTMono-Regular.ttf');
}

#draggable-container {
  height 100%
  width 75%
  position: absolute;
  z-index: 9;
  left: 20%;
}
#draggable-header {
  z-index: 10;
}

.floating {
  color: white;
  max-width: 50%;
  max-height: 50%;
  font-family: PTMono;
  animation-name: float;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  margin-left: 30px;
  margin-top: 5px;
  list-style: none;
}

.messageText {
  display: flex;
  flex-direction: column;
  font-size: 85px;
}

.messageInfos {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 20px;

  & em {
    font-size: 16px;
    font-weight: 700
  }

  & span {
    font-size: 13.3px;
  }
}

@keyframes floating {
  from {
    transform: translate(0, 0px);
  }

  65% {
    transform: translate(0, 15px);
  }

  to {
    transform: translate(0, 0px);
  }
}

@keyframes float {
  0% {
    transform: translatey(0px);
  }

  50% {
    transform: translatey(-20px);
  }
}
</style>
