<template>
  <div class="w-1/2 px-2 mb-6 flex flex-col items-center text-center">
    <div class="w-full pt-full bg-green-700 relative mb-2">
      <img :src="record.coverImage" class="block absolute inset-0 object-cover w-full h-full" />
    </div>
    <h4 class="text-xs">{{ record.artists[0] }} - {{ record.title }}</h4>
  </div>
</template>

<script>
export default {
  name: 'Record',
  props: {
    record: Object
  }
}
</script>
