<template>
    <span class="username" :style="userStyling">{{user.username}}</span>
</template>

<script>
import { computed } from 'vue'


export default {
  props: {
      user: Object
  },
  name: 'UsernameLabel',
  setup (props) {
    const GOLD_MEMBER_GROUPS = [2, 3, 4, 5, 6];
    const MODERATOR_GROUPS = [3, 4, 5, 6];

    const USER_GROUPS = {
      BANNED_USER: 0,
      REGULAR_USER: 1,
      GOLD_MEMBER: 2,
      MODERATOR: 3,
      ADMIN: 4,
      STAFF: 5,
      MODERATOR_IN_TRAINING: 6,
    };


    const userStyling = computed(() => {
      switch (props.user.role.code) {
        case 'limited-user':
        case 'basic-user':
          return {
            'color': '#3facff'
          }
        case 'banned-user':
          return {
            'color': '#e04545'
          }
        case 'gold-user':
        case 'paid-gold-user':
          return {
            'color': 'transparent',
            'text-shadow': 'unset',
            'background': 'linear-gradient(375deg, #fcbe20, #fcbe20, #ffe770, #fcbe20, #fcbe20)',
            'background-clip': 'text',
            '-webkit-background-clip': 'text',
            'filter': 'drop-shadow(0px 0px 2px #ffcc4a)'
          }
        case 'moderator-in-training':
          return {
            'color': '#30b655'
          }
        case 'moderator':
          return {
            'color': '#1dd626'
          }
        case 'admin':
          return {
            'color': 'transparent',
            'text-shadow': 'unset',
            'background': 'linear-gradient(375deg, #fcbe20, #fcbe20, #ffe770, #fcbe20, #fcbe20)',
            'background-clip': 'text',
            '-webkit-background-clip': 'text',
            'filter': 'drop-shadow(0px 0px 2px #ffcc4a)'
          }
      }
      return {}
    })

    return {
      userStyling
    }
  }
}

</script>

<style lang="scss" scoped>
</style>
