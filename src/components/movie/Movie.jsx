import { Button, Rate } from 'antd'
import { format, parseISO } from 'date-fns'
import React from 'react'

import './Movie.css'
import MoviesService from '../../API/MoviesService'
import trollface from '../../assets/trollface.png'

class Movie extends React.Component {
  state = {
    rated: Number(localStorage.getItem(this.props.data.id)) || 0,
  }

  moviesServices = new MoviesService()

  formatOverview = (desc, title, genres) => {
    const arrayDesc = desc.split(' ')
    const arrayTitle = title.split('')

    let maxLength = 30

    if (arrayDesc.length === 0) {
      return 'This is a cool and interesting movie, unfortunately there is no description for this movie, but we recommend watching it.'
    }

    if (window.innerWidth < 1119 && window.innerWidth > 500) {
      return desc
    }

    if (arrayTitle.length > 19 && genres.length > 3) {
      maxLength = 11
    } else if (
      arrayTitle.length > 19 ||
      genres.length > 3 ||
      (genres.length === 3 && genres.some((obj) => obj.name === 'Science Fiction'))
    ) {
      maxLength = 22
    }

    return `${arrayDesc
      .slice(0, maxLength)
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
          <img
            className="movie__image-item"
            src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : trollface}
            alt={poster_path || 'заглушка'}
          />
        </div>
        <div className="movie__main">
          <div className="movie__content">
            <div className="movie__title">
              <img
                className="movie__image-m"
                src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : trollface}
                alt={poster_path || 'заглушка'}
              />
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
