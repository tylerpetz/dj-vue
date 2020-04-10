<script>
export default {
  name: 'Record',
  props: {
    record: Object
  }
}
</script>

<template>
  <div v-if="record.coverImage" class="w-1/6 px-2 mb-6 flex flex-col items-center text-center" @click="$emit('itemSelected', record.id)">
    <div class="w-full pt-full bg-green-700 relative mb-2 shadow-lg transform transition-transform duration-150 scale-100 hover:scale-105 cursor-pointer">
      <img :src="record.coverImage" class="block absolute inset-0 object-cover w-full h-full" />
    </div>
    <h4 class="text-xs">{{ record.artists[0] }} - {{ record.title }}</h4>
  </div>
</template>
