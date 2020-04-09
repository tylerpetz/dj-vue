import recordData from '../assets/json/recordData.json'

const sortObjectByCount = (obj) => Object.entries(obj).sort(function (a, b) {
  return b[1] - a[1]
})

export default {
  namespaced: true,
  getters: {
    records (state) {
      // flatten this array of objects a bit
      return recordData.releases.map(record => {
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
    genres (state, getters) {
      if (getters.records.length === 0) return []
      let genres = []
      getters.records.forEach(record => {
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
    styles (state, getters) {
      if (getters.records.length === 0) return []
      let styles = []
      getters.records.forEach(record => {
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
    labels (state, getters) {
      if (getters.records.length === 0) return []
      let labels = []
      getters.records.forEach(record => {
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
