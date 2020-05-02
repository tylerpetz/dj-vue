<script>
export default {
  name: 'Logo',
  data () {
    return {
      hoverLogo: false
    }
  }
}
</script>

<template>
  <div class="flex flex-row items-center absolute top-0 left-0 mt-4 ml-4 z-10" @mouseover="hoverLogo = true" @mouseout="hoverLogo = false">
    <h1 class="h-12 w-12 bg-green-500 flex items-center justify-center text-blue-500 text-xs font-semibold mr-1 z-10 ease-out duration-300 transition-transform transform shadow" :class="hoverLogo ? '-translate-x-1' : 'translate-x-0'">DJ Vue</h1>
    <div class="flex items-center justify-center h-12 w-12 rounded-full bg-dark mr-4 ease-out duration-150 transition-transform transform shadow" :class="hoverLogo ? '-translate-x-4' : '-translate-x-8'">
      <div class="flex items-center justify-center h-6 w-6 rounded-full bg-black">
        <div class="flex items-center justify-center h-4 w-4 rounded-full bg-green-700">
          <div class="block h-1 w-1 rounded-full bg-blue-400" />
        </div>
      </div>
    </div>
  </div>
</template>
