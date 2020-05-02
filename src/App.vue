<script>
import Logo from '@/components/Logo'
import RecordCabinet from '@/components/RecordCabinet'

export default {
  name: 'Home',
  components: {
    RecordCabinet,
    Logo
  },
  methods: {
    sendMessage (msg) {
      // console.log('cool', msg)
    }
  }
}
</script>

<template>
  <div id="app" class="bg-blue-500 text-white min-h-screen w-full">
    <div class="h-screen max-h-screen overflow-hidden w-full flex flex-col items-stretch">
      <header class="w-full p-4 flex flex-row flex-no-wrap justify-between items-center absolute inset-x-0 top-0">
        <Logo />
      </header>
      <div class="h-full flex flex-row flex-no-wrap">
        <RecordCabinet @itemSelected="sendMessage" class="max-h-full overflow-y-scroll" />
      </div>
    </div>
  </div>
</template>
