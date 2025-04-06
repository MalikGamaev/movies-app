import axios from 'axios'

class MoviesService {
  #apiBase = 'https://api.themoviedb.org/3/search/movie'

  #apiBaseSession = 'https://api.themoviedb.org/3'

  #optionBaseGet = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzZjMThkYzVmMDcxN2ZkMWUyNmEyMzk5ZjUyZDBkNyIsIm5iZiI6MTc0MjA0Njc3OC40MTI5OTk5LCJzdWIiOiI2N2Q1ODYzYTE5MTg2OGM1NGZmMTU5NDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.G7Q2SQcBi_Ya-ghPjhD8cUx_lGpLoBml_FSjmuvuc_M',
    },
  }

  getSearchMovies = async (name, page) => {
    try {
      const response = await axios.get(
        `${this.#apiBase}?query=${name}&include_adult=false&language=en-US&page=${page}`,
        this.#optionBaseGet,
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  getPopularMovies = async (page = 1) => {
    try {
      const response = await axios.get(
        `${this.#apiBaseSession}/movie/popular?language=en-US&page=${page}`,
        this.#optionBaseGet,
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  getGenres = async () => {
    try {
      const response = await axios.get(`${this.#apiBaseSession}/genre/movie/list?language=en`, this.#optionBaseGet)
      return response.data.genres
    } catch (error) {
      throw error
    }
  }

  getRated = async (guestSessionId, page = 1) => {
    try {
      const response = await axios.get(
        `${this.#apiBaseSession}/guest_session/${guestSessionId}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`,
        this.#optionBaseGet,
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  createSessionId = async () => {
    try {
      const response = await axios.get(`${this.#apiBaseSession}/authentication/guest_session/new`, this.#optionBaseGet)
      localStorage.setItem('sessionKey', response.data.guest_session_id)
      return response.data.guest_session_id
    } catch (error) {
      throw error
    }
  }

  addRating = async (movieId, rating, sessionId) => {
    try {
      const response = await axios.post(
        `${this.#apiBaseSession}/movie/${movieId}/rating`,
        { value: `${rating}` },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzZjMThkYzVmMDcxN2ZkMWUyNmEyMzk5ZjUyZDBkNyIsIm5iZiI6MTc0MjA0Njc3OC40MTI5OTk5LCJzdWIiOiI2N2Q1ODYzYTE5MTg2OGM1NGZmMTU5NDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.G7Q2SQcBi_Ya-ghPjhD8cUx_lGpLoBml_FSjmuvuc_M',
          },
          params: { guest_session_id: `${sessionId}` },
        },
      )
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export default MoviesService
