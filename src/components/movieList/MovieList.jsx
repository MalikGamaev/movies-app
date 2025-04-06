import { Pagination } from 'antd'
import { debounce } from 'lodash'
import React from 'react'

import MoviesService from '../../API/MoviesService'
import { AppContext } from '../app/AppProvider'
import Error from '../error/Error'
import Loader from '../loader/Loader'
import Movie from '../movie/Movie'
import './MovieList.css'
import SearchForm from '../searchForm/SearchForm'

class MovieList extends React.Component {
  static contextType = AppContext

  moviesService = new MoviesService()

  fetchDebounce = debounce((searchName) => {
    this.fetchMovies(searchName, 1)
  }, 2000)

  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      loading: true,
      error: false,
      total: 0,
      page: 1,
      searchName: '',
    }
  }

  componentDidMount() {
    this.fetchMovies('', this.page)
  }

  componentWillUnmount() {
    this.fetchDebounce.cancel()
  }

  fetchMovies = async (searchName, page) => {
    this.setState({ loading: true })
    try {
      const res = searchName
        ? await this.moviesService.getSearchMovies(searchName, page)
        : await this.moviesService.getPopularMovies(page)
      this.setState({
        movies: res.results,
        loading: false,
        total: res.total_pages,
      })
    } catch (err) {
      this.setState({ error: true, loading: false, movies: [] })
    }
  }

  onChangePage = (p) => {
    this.setState({ page: p })
    this.fetchMovies(this.state.searchName, p)
  }

  onHandlerSearch = (e) => {
    const { value } = e.target
    this.setState({ searchName: value })
    this.fetchDebounce(value)
  }

  filteredGenres = (ids, allGenres) => {
    return allGenres.filter((genre) => ids.includes(genre.id))
  }

  render() {
    const { movies, total, loading, error, page, searchName } = this.state
    const allGenres = this.context
    return (
      <div className="movie-search">
        <SearchForm searchName={searchName} onChange={(e) => this.onHandlerSearch(e)} />
        {loading ? (
          <Loader />
        ) : (
          <div className="movie-search__items">
            {movies.map((movie) => (
              <Movie
                guestSessionId={this.props.guestSessionId}
                key={movie.id}
                genres={this.filteredGenres(movie.genre_ids, allGenres)}
                data={movie}
              />
            ))}
            {total > 1 && (
              <Pagination
                current={page}
                onChange={this.onChangePage}
                pageSize={1}
                total={total}
                showSizeChanger={false}
              />
            )}
          </div>
        )}
        {error && <Error />}
      </div>
    )
  }
}

export default MovieList
