<script>
export default {
  name: 'SelectModal',
  props: {
    options: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <div class="h-screen w-screen fixed z-50 bg-black inset-0 flex items-center justify-center" v-if="options.length > 0">
    <ul class="flex flex-col items-stretch">
      <li v-for="[option, count] in options" :key="option" class="mb-4">
        <a class="bg-blue-900 block text-center px-4 py-2" @click="$emit('applyFilter', option)">{{ option }} - {{ count }}</a>
      </li>
    </ul>
  </div>
</template>
