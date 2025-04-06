import React, { createContext } from 'react'

import MoviesService from '../../API/MoviesService'

export const AppContext = createContext()

class AppProvider extends React.Component {
  state = {
    genres: [],
  }

  moviesService = new MoviesService()

  componentDidMount() {
    const fetchGenres = async () => {
      const resGenres = await this.moviesService.getGenres()
      this.setState({ genres: [...resGenres] })
    }
    fetchGenres()
  }

  render() {
    return <AppContext.Provider value={this.state.genres}>{this.props.children}</AppContext.Provider>
  }
}

export default AppProvider
