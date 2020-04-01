<template>
  <div class="h-screen max-h-screen w-full flex flex-col items-stretch">
    <Header />
    <div class="flex flex-row flex-no-wrap flex-grow">
      <div :class="sidebarOpen ? 'w-3/4' : 'w-full'" class="flex flex-col justify-between">
        <DJStream class="flex-grow" />
        <RecordStacks class="h-48 bg-black border-t border-green-500">
          {{ requests }}
        </RecordStacks>
      </div>
      <div :class="sidebarOpen ? 'w-1/4' : 'w-0'" class="h-full bg-black border-l border-green-500">
        <RecordCabinet @itemSelected="sendMessage" />
      </div>
    </div>
  </div>
</template>

<script>
import DJStream from '@/components/DJStream'
import RecordStacks from '@/components/RecordStacks'
import Header from '@/components/Header'
import RecordCabinet from '@/components/RecordCabinet'

export default {
  name: 'Home',
  components: {
    DJStream,
    RecordStacks,
    Header,
    RecordCabinet
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
