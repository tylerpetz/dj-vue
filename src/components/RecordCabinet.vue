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
      selectingFilter: '',
      selectedFilter: {
        type: '',
        value: ''
      },
      filters: ['genres', 'subgenres', 'labels']
    }
  },
  methods: {
    applyFilter (filter) {
      if (filter) {
        this.selectedFilter = {
          type: this.selectingFilter,
          value: filter
        }
      }
      this.selectingFilter = ''
    }
  },
  computed: {
    records () {
      return this.releases.map(record => {
        const { artists, cover_image: coverImage, genres, id, labels, subgenres, title, year } = record.basic_information
        return {
          artists: artists.map(artist => artist.name),
          coverImage,
          genres,
          id,
          labels: labels.map(label => label.name),
          subgenres,
          title,
          year
        }
      })
    },
    filteredRecords () {
      if (!this.selectedFilter.value) return this.records

      return this.records.filter(record => record[this.selectedFilter.type].includes(this.selectedFilter.value))
    },
    options () {
      if (!this.selectingFilter && !this.selectedFilter.type) return []
      return this[this.selectingFilter]
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
    subgenres () {
      if (this.records.length === 0) return []
      let subgenres = []
      this.records.forEach(record => {
        subgenres = [...subgenres, ...record.subgenres]
      })
      const styleObj = {}
      subgenres.forEach(style => {
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
    }
  }
}
</script>

<template>
  <div class="h-full w-full py-6 px-2">
    <div class="flex flex-row items-center justify-end px-2 mb-8">
      <span>sort by: artist, album title, year</span>
      <span class="ml-8">filter by:
        <template v-for="filter in filters">
          <strong :key="filter" class="hover:text-green-300 cursor-pointer" :class="selectedFilter && selectedFilter.type === filter ? 'text-green-500' : ''" @click="selectingFilter = filter">
            {{filter}}<span v-if="selectedFilter && selectedFilter.type === filter">{{ selectedFilter.value }}</span>
          </strong>
        </template>
      </span>
    </div>
    <div class="flex flex-row flex-wrap items-stretch justify-start">
      <template v-for="(record, index) in filteredRecords">
        <Record @click="$emit('itemSelected', record.id)" :record="record" :key="record.id + index" />
      </template>
    </div>
    <SelectModal :options="options" :type="selectedFilter.type" @applyFilter="applyFilter" />
  </div>
</template>
