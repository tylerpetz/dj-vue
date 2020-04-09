<template>
  <div class="h-screen max-h-screen overflow-hidden w-full flex flex-col items-stretch">
    <Logo />
    <div class="h-full flex flex-row flex-no-wrap">
      <!-- <div class="w-full flex flex-col justify-between">
        <DJStream class="flex-grow" />
        <RecordStacks class="h-48 bg-black border-t border-green-500">
          {{ requests }}
        </RecordStacks>
      </div> -->
      <div class="w-full h-full">
        <RecordCabinet @itemSelected="sendMessage" class="max-h-full overflow-y-scroll" />
      </div>
    </div>
  </div>
</template>

<script>
// import DJStream from '@/components/DJStream'
// import RecordStacks from '@/components/RecordStacks'
import Logo from '@/components/Logo'
import RecordCabinet from '@/components/RecordCabinet'

export default {
  name: 'Home',
  components: {
    // DJStream,
    // RecordStacks,
    RecordCabinet,
    Logo
  },
  data () {
    return {
      client: null,
      requests: [],
      sidebarOpen: true,
      accessToken: null
    }
  },
  methods: {
    sendMessage (msg) {
      console.log(msg)
    }
  }
}
</script>
