<template>
  <header class="bg-white w-full p-4 flex flex-row flex-no-wrap justify-between items-center absolute inset-x-0 top-0">
    <Logo />
    <!-- <Menu /> -->
  </header>
</template>

<script>
import Logo from '@/components/Logo'
// import Menu from '@/components/Menu'
export default {
  name: 'Header',
  components: {
    Logo
    // Menu
  }
}
</script>
