<template>
  <div>
    Peruse the collection and make a request:
    <div v-for="record in $store.getters['records/records']" :key="record.id">
      <div @click="$emit('itemSelected', `${record.artists[0]} - ${record.title}`)">
        {{ record.artists[0] }} - {{ record.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>
