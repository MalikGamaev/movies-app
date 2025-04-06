import { Button, Rate } from 'antd'
import { format, parseISO } from 'date-fns'
import React from 'react'
import './Movie.css'

import MoviesService from '../../API/MoviesService'

class Movie extends React.Component {
  state = {
    rated: Number(localStorage.getItem(this.props.data.id)) || 0,
  }

  moviesServices = new MoviesService()

  formatOverview = (desc, title, genres) => {
    const arrayDesk = desc.split(' ')
    const arrayTitle = title.split('')

    if (window.innerWidth < 1119 && window.innerWidth > 500) {
      return desc
    }
    if (arrayTitle.length > 19 && genres.length > 3) {
      return `${arrayDesk
        .slice(0, 15)
        .join(' ')
        .replace(/[,.!?]$/, '')}...`
    }
    if (arrayTitle.length > 19 || genres.lenght > 3) {
      return `${arrayDesk
        .slice(0, 25)
        .join(' ')
        .replace(/[,.!?]$/, '')}...`
    }

    return `${arrayDesk
      .slice(0, 30)
      .join(' ')
      .replace(/[,.!?]$/, '')}...`
  }

  onHandlerRated = (value) => {
    const {
      data: { id },
      guestSessionId,
    } = this.props
    localStorage.setItem(id, value)
    this.setState({ rated: Number(localStorage.getItem(id)) })
    this.moviesServices.addRating(id, value, guestSessionId)
  }

  render() {
    const {
      data: { poster_path, title, release_date, overview, vote_average },
      genres,
    } = this.props
    const rating = vote_average.toFixed(1)
    const { rated } = this.state

    return (
      <div className="movie">
        <div className="movie__image">
          <img className="movie__image-item" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
        </div>
        <div className="movie__main">
          <div className="movie__content">
            <div className="movie__title">
              <img className="movie__image-m" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
              <div className="movie__title-content">
                <div className="movie__title-text">{title}</div>
                <div className="movie__date">{format(parseISO(release_date), 'MMMM d, y')}</div>
                <div className="movie__categories">
                  {genres.map((ctg) => (
                    <Button key={ctg.id} className="movie__categories-item" variant="solid">
                      {ctg.name}
                    </Button>
                  ))}
                </div>
              </div>
              <div
                className="movie__title-raiting"
                style={{
                  border: `2px solid ${
                    rating < 3
                      ? '#E90000'
                      : rating > 3 && rating < 5
                        ? '#E97E00'
                        : rating > 5 && rating < 7
                          ? '#E9D100'
                          : '#66E900'
                  }`,
                }}
              >
                {rating}
              </div>
            </div>
            <div className="movie__description">{this.formatOverview(overview, title, genres)}</div>
          </div>
          <div className="movie__rate">
            <Rate style={{ fontSize: '15px' }} onChange={this.onHandlerRated} value={rated} allowHalf count={10} />
          </div>
        </div>
      </div>
    )
  }
}

export default Movie
