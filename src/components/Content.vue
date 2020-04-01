<template>
  <twitch-player channel="nickmercs" height="100%" width="100%" />
</template>

<script>
import TwitchPlayer from 'vue-twitch-player'
export default {
  name: 'Content',
  components: {
    TwitchPlayer
  }
}
</script>
