<template>
  <div>
    Peruse the collection and make a request:
    <template v-for="record in $store.getters['records/records']" >
      <Record @click="$emit('itemSelected', record.id)" :record="record" :key="record.id" />
    </template>
  </div>
</template>

<script>
import Record from '@/components/Record'
export default {
  name: 'RecordCabinet',
  components: {
    Record
  }
}
</script>
