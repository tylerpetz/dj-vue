<template>
  <div class="h-screen max-h-screen w-full flex flex-col items-stretch">
    <Header />
    <div class="flex flex-row flex-no-wrap flex-grow">
      <div :class="sidebarOpen ? 'w-3/4' : 'w-full'" class="flex flex-col justify-between">
        <Content class="flex-grow" />
        <Footer class="h-48 bg-black border-t border-green-500">
          {{ requests }}
        </Footer>
      </div>
      <div :class="sidebarOpen ? 'w-1/4' : 'w-0'" class="h-full bg-black border-l border-green-500">
        <Sidebar @itemSelected="sendMessage" />
      </div>
    </div>
  </div>
</template>

<script>
import Content from '@/components/Content'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

// pull environment variables from env file
// const { TWITCH_CHANNEL, TWITCH_CLIENT_ID } = process.env
// const tmi = require('tmi.js')

export default {
  name: 'Home',
  components: {
    Content,
    Footer,
    Header,
    Sidebar
  },
  data () {
    return {
      client: null,
      requests: [],
      sidebarOpen: true,
      accessToken: null
    }
  },
  computed: {
    // opts () {
    //   return {
    //     options: { debug: true },
    //     connection: {
    //       secure: true,
    //       reconnect: true
    //     },
    //     identity: {
    //       username: TWITCH_CHANNEL,
    //       password: this.accessToken
    //     },
    //     channels: [TWITCH_CHANNEL]
    //   }
    // }
  },
  async mounted () {
    this.$store.dispatch('records/getRecords')
    // this.accessToken = await this.getClientToken()
    // this.client = new tmi.Client(this.opts)
    // // Register our event handlers (defined below)
    // this.client.on('message', this.handleMessage)
    // this.client.on('connected', this.onConnectedHandler)

    // // Connect to Twitch:
    // this.client.connect()
    // console.log('client', this.client)
  },
  methods: {
    // async getClientToken () {
    //   const response = await fetch('https://api.twitch.tv/kraken/channels/twitch', {
    //     method: 'GET',
    //     mode: 'no-cors',
    //     headers: {
    //       'Client-ID': TWITCH_CLIENT_ID
    //     }
    //   })
    //   console.log(response)
    //   return response
    // },
    // handleMessage (target, context, msg, self) {
    //   if (self) { } // Ignore messages from the bot

    //   // Remove whitespace from chat message
    //   const commandName = msg.trim()
    //   this.client.say(commandName)
    //   // // If the command is known, let's execute it
    //   // if (commandName === '!dice') {
    //   //   const num = rollDice()
    //   //   client.say(target, `You rolled a ${num}`)
    //   //   console.log(`* Executed ${commandName} command`)
    //   // } else {
    //   //   console.log(`* Unknown command ${commandName}`)
    //   // }
    // },
    sendMessage (msg) {
      console.log(msg)
    }
    // onConnectedHandler (addr, port) {
    //   console.log(`* Connected to ${addr}:${port}`)
    // }
  }
}
</script>
