<template>
  <div class="h-screen max-h-screen w-full flex flex-col items-stretch">
    <Header />
    <div class="flex flex-row flex-no-wrap flex-grow">
      <div :class="sidebarOpen ? 'w-3/4' : 'w-full'" class="flex flex-col justify-between">
        <Content class="flex-grow" />
        <Footer class="h-48 bg-black border-t border-green-500" />
      </div>
      <div :class="sidebarOpen ? 'w-1/4' : 'w-0'" class="h-full bg-black border-l border-green-500">
        <Sidebar />
      </div>
    </div>
  </div>
</template>

<script>
import Content from '@/components/Content'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
export default {
  name: 'Home',
  components: {
    Content,
    Footer,
    Header,
    Sidebar
  },
  data () {
    return {
      sidebarOpen: true
    }
  }
}
</script>
