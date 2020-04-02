<template>
  <div class="h-screen max-h-screen overflow-hidden w-full flex flex-col items-stretch">
    <!-- <Header /> -->
    <div class="h-full flex flex-row flex-no-wrap">
      <div class="w-full flex flex-col justify-between">
        <DJStream class="flex-grow" />
        <RecordStacks class="h-48 bg-black border-t border-green-500">
          {{ requests }}
        </RecordStacks>
      </div>
      <div :class="sidebarOpen ? 'w-128' : 'w-0'" class="bg-black border-l border-green-500">
        <RecordCabinet @itemSelected="sendMessage" class="max-h-full overflow-y-scroll" />
      </div>
    </div>
  </div>
</template>

<script>
import DJStream from '@/components/DJStream'
import RecordStacks from '@/components/RecordStacks'
// import Header from '@/components/Header'
import RecordCabinet from '@/components/RecordCabinet'

export default {
  name: 'Home',
  components: {
    DJStream,
    RecordStacks,
    RecordCabinet
    // Header
  },
  data () {
    return {
      client: null,
      requests: [],
      sidebarOpen: true,
      accessToken: null
    }
  },
  async mounted () {
    this.$store.dispatch('records/getRecords')
  },
  methods: {
    sendMessage (msg) {
      console.log(msg)
    }
  }
}
</script>
