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
      selectedSort: {
        type: '',
        direction: ''
      },
      filters: ['genres', 'subgenres', 'labels'],
      sorts: ['artist', 'title', 'year']
    }
  },
  methods: {
    applyFilter (filter) {
      this.selectedFilter = {
        type: filter ? this.selectingFilter : '',
        value: filter || ''
      }
      this.selectingFilter = ''
    },
    applySort (sort) {
      if (!this.selectedSort.type) { // if no sorts
        this.selectedSort = {
          type: sort,
          direction: 'asc'
        }
      } else if (this.selectedSort.type && this.selectedSort.direction === 'asc') { // if already sorting a-z
        this.selectedSort = {
          type: sort,
          direction: 'desc'
        }
      } else { // if sorting z-a
        this.selectedSort = {
          type: '',
          direction: ''
        }
      }
    }
  },
  computed: {
    records () {
      return this.releases.map(record => {
        const { artists, cover_image: coverImage, genres, id, labels, subgenres, title, year } = record.basic_information
        return {
          artist: artists.map(artist => artist.name).join(' &amp; '),
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
      // remove dupes
      let records = this.records.filter((record, index, arr) => arr.findIndex(r => (r.id === record.id)) === index)
      // return full list of records if no sorts or filters
      if (!this.selectedFilter.value && !this.selectedSort.type) return records
      // apply selected filter/filters
      if (this.selectedFilter.value) {
        records = records.filter(record => record[this.selectedFilter.type].includes(this.selectedFilter.value))
      }
      // apply selected sort
      if (this.selectedSort.type) {
        records = records.sort((a, b) => {
          if (this.selectedSort.direction === 'asc') {
            return a[this.selectedSort.type] > b[this.selectedSort.type] ? 1 : -1
          }
          return a[this.selectedSort.type] < b[this.selectedSort.type] ? 1 : -1
        })
      }
      return records
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
      <div class="flex flex-row items-center">sort by:
        <template v-for="sort in sorts">
          <a
            :key="sort"
            :class="selectedSort && selectedSort.type === sort ? 'text-green-500 hover:bg-blue-400 hover:text-white' : 'hover:bg-blue-800'"
            class="relative ml-4 block transition duration-150 ease-in-out bg-blue-700 text-center cursor-pointer rounded px-3 py-2"
            @click="applySort(sort)"
          >
            {{ sort }} {{ selectedSort.type === sort ? selectedSort.direction : '' }}
          </a>
        </template>
      </div>
      <div class="ml-10 flex flex-row items-center">filter by:
        <div v-for="filter in filters" :key="filter" class="relative ml-4">
          <a
            :class="selectedFilter.type === filter ? 'text-green-500 hover:bg-blue-400 hover:text-white' : 'hover:bg-blue-800'"
            class="block transition duration-150 ease-in-out bg-blue-700 text-center cursor-pointer rounded px-3 py-2"
            @click="selectingFilter = filter"
          >
            {{ filter }}{{ selectedFilter.type === filter ? ` (${selectedFilter.value})` : ''}}
          </a>
          <span
            v-if="selectedFilter.type === filter"
            class="text-green-500 hover:text-white text-xs bg-green-700 h-4 w-4 -mr-2 -mt-2 rounded-md inline-flex items-center justify-center font-semibold absolute cursor-crosshair top-0 right-0"
            @click="applyFilter('')"
          >
            x
          </span>
        </div>
      </div>
    </div>
    <div class="flex flex-row flex-wrap items-stretch justify-start">
      <template v-for="record in filteredRecords">
        <Record :record="record" :key="record.id" @itemSelected="$emit('itemSelected', $event)" />
      </template>
    </div>
    <SelectModal :options="options" :type="selectedFilter.type" @applyFilter="applyFilter" />
  </div>
</template>
