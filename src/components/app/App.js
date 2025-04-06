import { Alert, Tabs } from 'antd'
import React from 'react'
import './App.css'
import { Offline, Online } from 'react-detect-offline'

import MoviesService from '../../API/MoviesService'
import MovieList from '../movieList/MovieList'
import MovieRated from '../movieRated/MovieRated'

import AppProvider from './AppProvider'

class App extends React.Component {
  pageItems = [
    {
      key: 1,
      label: 'Search',
    },
    {
      key: 2,
      label: 'Rated',
    },
  ]

  state = {
    page: 1,
    guestSessionId: null,
  }

  moviesService = new MoviesService()

  componentDidMount() {
    const savedSessionId = localStorage.getItem('guestSessionId')

    if (savedSessionId) {
      this.setState({ guestSessionId: savedSessionId })
    } else {
      const fetchCreateSessionId = async () => {
        const sessionId = await this.moviesService.createSessionId()
        this.setState({ guestSessionId: sessionId })
        localStorage.setItem('guestSessionId', sessionId)
      }

      fetchCreateSessionId()
    }
  }

  onChangePage = (key) => {
    this.setState({ page: key })
  }

  render() {
    return (
      <div className="app">
        <AppProvider>
          <Online>
            <Tabs
              style={{ justifySelf: 'center' }}
              items={this.pageItems}
              defaultActiveKey={1}
              onChange={this.onChangePage}
            />
            {this.state.page === 1 ? (
              <MovieList guestSessionId={this.state.guestSessionId} />
            ) : (
              <MovieRated guestSessionId={this.state.guestSessionId} />
            )}
          </Online>
          <Offline>
            <div className="offline">
              <Alert type="error" message="Чувак, у тебя отсутвует интернет!" />
            </div>
          </Offline>
        </AppProvider>
      </div>
    )
  }
}

export default App
