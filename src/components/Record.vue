<template>
  <div class="flex flex-col">
    <div></div>
    <h4>{{ record.title }}</h4>
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
