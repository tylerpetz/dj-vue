const baseUrl = 'https://api.discogs.com/users/tylerpetz'
export default {
  namespaced: true,
  state: {
    loading: false,
    pagination: {
      per_page: 20,
      page: 1
    },
    records: []
  },
  getters: {
    records: state => {
      // flatten this array of objects a bit
      return state.records.map(record => {
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
    }
  },
  actions: {
    async getRecords ({ state, commit }, sort = false) {
      // todo: create qs from an object
      let queryString = `?per_page=${state.pagination.per_page}&page=${state.pagination.page}`

      if (sort) {
        queryString += `&sort=${sort.by}&sort_order=${sort.direction}`
      }

      try {
        commit('TOGGLE_LOADING', true)
        const res = await fetch(`${baseUrl}/collection/folders/0/releases${queryString}`, {
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Discogs token=${process.env.VUE_APP_DISCOGS_TOKEN || ''}`
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer'
        })
        const { releases, pagination } = await res.json()
        commit('SET_RECORDS', releases || [])
        commit('SET_PAGINATION', pagination || {
          per_page: 20,
          page: 1
        })
        commit('TOGGLE_LOADING', false)
      } catch (e) {}
    }
    // async getMoreRecords ({ state, commit }, direction) {
    //   let url = ''
    //   if (direction === 'end') {
    //     url = state.pagination.urls.next
    //   } else {
    //     url = state.pagination.urls.prev
    //   }

    //   try {
    //     const res = await axios.get(url, {
    //       headers: {
    //          Authorization: `Discogs token=${process.env.DISCOGS_TOKEN || ''}`
    //       }
    //     })
    //     console.log(res)
    //     commit('ADD_RECORDS', res.data.releases)
    //     commit('SET_PAGINATION', res.data.pagination)
    //   } catch (e) {}
    // }
  },
  mutations: {
    TOGGLE_LOADING (state, loading) {
      state.loadingRecords = loading
    },
    SET_RECORDS (state, records) {
      state.records = [...records]
    },
    ADD_RECORDS (state, records) {
      state.records = [...state.records, ...records]
    },
    SET_PAGINATION (state, pagination) {
      state.pagination = { ...pagination }
    }
  }
}
