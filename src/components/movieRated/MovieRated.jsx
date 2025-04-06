import { Pagination } from 'antd'
import React from 'react'

import MoviesService from '../../API/MoviesService'
import './MovieRated.css'
import { AppContext } from '../app/AppProvider'
import Error from '../error/Error'
import Loader from '../loader/Loader'
import Movie from '../movie/Movie'

class MovieRated extends React.Component {
  static contextType = AppContext

  state = {
    movies: [],
    loading: true,
    error: false,
    page: 1,
    totalPages: 0,
  }

  moviesService = new MoviesService()

  componentDidMount() {
    this.fetchMoviesRated()
  }

  fetchMoviesRated = async () => {
    try {
      const response = await this.moviesService.getRated(this.props.guestSessionId, this.state.page)

      this.setState({
        movies: [...this.state.movies, ...response.results],
        loading: false,
        error: false,
        page: 1,
        totalPages: response.total_pages,
      })
    } catch (error) {
      this.setState({
        movies: [],
        loading: false,
        error: true,
      })
    }
  }

  filteredGenres = (ids, allGenres) => {
    return allGenres.filter((genre) => ids.includes(genre.id))
  }

  render() {
    const { loading, error, movies, totalPages, page } = this.state
    const allGenres = this.context
    return (
      <div className="movie-rated">
        {loading ? (
          <Loader />
        ) : (
          <div className="movie-rated__items">
            {movies.map((movie) => (
              <Movie
                guestSessionId={this.props.guestSessionId}
                key={movie.id}
                genres={this.filteredGenres(movie.genre_ids, allGenres)}
                data={movie}
              />
            ))}
            {totalPages > 1 && (
              <Pagination
                current={page}
                onChange={this.onChangePage}
                pageSize={1}
                total={totalPages}
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

export default MovieRated
