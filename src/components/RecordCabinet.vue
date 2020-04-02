<template>
  <div class="py-6 px-2">
    <div class="flex flex-row flex-wrap items-stretch justify-between">
      <template v-for="record in $store.getters['records/records']">
        <Record @click="$emit('itemSelected', record.id)" :record="record" :key="record.id" />
      </template>
    </div>
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
