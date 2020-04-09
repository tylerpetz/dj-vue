<script>
import Record from '@/components/Record'
import SelectModal from '@/components/SelectModal'
import recordData from '../assets/json/recordData.json'

const sortObjectByCount = (obj) => Object.entries(obj).sort(function (a, b) {
  return b[1] - a[1]
})

export default {
  name: 'RecordCabinet',
  components: {
    Record,
    SelectModal
  },
  data () {
    return {
      releases: recordData.releases,
      displayModal: '',
      selectedFilter: ''
    }
  },
  methods: {
    applyFilter (filter) {
      if (filter) {
        this.selectedFilter = {
          type: this.displayModal,
          value: filter
        }
      }
      this.displayModal = ''
    }
  },
  computed: {
    records () {
      // flatten this array of objects a bit
      return this.releases.map(record => {
        const { artists, cover_image: coverImage, genres, id, labels, styles, title, year } = record.basic_information
        return {
          artists: artists.map(artist => artist.name),
          coverImage,
          genres,
          id,
          labels: labels.map(label => label.name),
          styles,
          title,
          year
        }
      })
    },
    filteredRecords () {
      if (!this.selectedFilter) return this.records
      return this.records.filter(record => record[this.selectedFilter.type].includes(this.selectedFilter.value))
    },
    genres () {
      if (this.records.length === 0) return []
      let genres = []
      this.records.forEach(record => {
        genres = [...genres, ...record.genres]
      })
      const genreObj = {}
      genres.forEach(genre => {
        if (Object.keys(genreObj).includes(genre)) {
          genreObj[genre] += 1
        } else {
          genreObj[genre] = 1
        }
      })
      return sortObjectByCount(genreObj)
    },
    styles () {
      if (this.records.length === 0) return []
      let styles = []
      this.records.forEach(record => {
        styles = [...styles, ...record.styles]
      })
      const styleObj = {}
      styles.forEach(style => {
        if (Object.keys(styleObj).includes(style)) {
          styleObj[style] += 1
        } else {
          styleObj[style] = 1
        }
      })
      return sortObjectByCount(styleObj)
    },
    labels () {
      if (this.records.length === 0) return []
      let labels = []
      this.records.forEach(record => {
        labels = [...labels, ...record.labels]
      })
      const labelObj = {}
      labels.forEach(label => {
        if (Object.keys(labelObj).includes(label)) {
          labelObj[label] += 1
        } else {
          labelObj[label] = 1
        }
      })
      return sortObjectByCount(labelObj)
    },
    options () {
      if (!this.displayModal) return []
      return this[this.displayModal]
    }
  }
}
</script>

<template>
  <div class="h-full py-6 px-2">
    <div class="flex flex-row items-center justify-end px-2 mb-8">
      <span>sort by: artist, album title, year</span>
      <span class="ml-8">filter by:
        <strong @click="displayModal = 'genres'">genre</strong>,
        <strong @click="displayModal = 'styles'">subgenre</strong>,
        <strong @click="displayModal = 'labels'">label</strong>
      </span>
      <SelectModal class="" :class="displayModal ? 'opacity-100  transition duration-300 ease-in-out' : 'opacity-0 pointer-events-none'" :options="options" :type="displayModal" @applyFilter="applyFilter" />
    </div>
    <div class="flex flex-row flex-wrap items-stretch justify-start">
      <template v-for="(record, index) in filteredRecords">
        <Record @click="$emit('itemSelected', record.id)" :record="record" :key="record.id + index" />
      </template>
    </div>
  </div>
</template>