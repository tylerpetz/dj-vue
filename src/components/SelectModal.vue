<script>
export default {
  name: 'SelectModal',
  props: {
    options: {
      type: Array,
      default: () => [],
      required: true
    },
    type: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      currentOption: '',
      descriptions: {}
    }
  },
  methods: {
    async displayOptions (option) {
      this.currentOption = option
      if (this.descriptions[option]) return
      // fetch image from api
      const res = await fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=search&srlimit=1&srsearch=${option} genre`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
      })
      const { query } = await res.json()
      this.descriptions[option] = query.search[0].snippet
    }
  }
}
</script>

<template>
  <div
    :class="options.length > 0 ? 'opacity-100 transition duration-300 ease-in-out' : 'opacity-0 pointer-events-none'"
    class="h-screen w-screen fixed z-50 bg-black inset-0 flex flex-col items-center pt-16 px-8 overflow-y-scroll">
    <h2 class="mb-16 text-2xl">searching by {{ type }}, aren't you cool? <a class="ml-6 text-green-500 underline cursor-pointer" @click="$emit('applyFilter', '')">no not rly</a></h2>
    <ul class="flex flex-row flex-wrap items-stretch justify-center">
      <li v-for="[option, count] in options" :key="option" class="mb-6 mx-3" @mouseover="displayOptions(option)">
        <a class="transition duration-150 ease-in-out bg-blue-900 hover:bg-blue-600 block text-center px-4 py-2 cursor-pointer relative text-lg rounded" @click="$emit('applyFilter', option)">
          {{ option.toLowerCase() }}
          <span class="text-xs bg-green-700 h-5 px-1 -mr-2 -mt-2 rounded-md inline-flex items-center justify-center font-semibold absolute top-0 right-0">{{ count }}</span>
        </a>
      </li>
    </ul>
    <p v-show="descriptions[currentOption]" v-html="descriptions[currentOption]" />
  </div>
</template>
