import React, { Component } from 'react';
import { Layout, List, Spin, Alert } from 'antd';
import PropTypes from 'prop-types';

import CardMovie from '../CardMovie';

import MovieService from '../../movie-service/movie-service';

import 'antd/dist/antd.css';

import './App.css';

class App extends Component {
  movieService = new MovieService();

  static defaultProps = {
    defaultCurrent: 1,
  };

  static propTypes = {
    defaultCurrent: PropTypes.number,
  };

  constructor(props) {
    super(props);
    const { defaultCurrent } = this.props;
    this.state = {
      searchMovie: `https://api.themoviedb.org/3/search/movie?api_key=05f7db0eb20b02a8803d7f7d0f3fb520&language=en-US&query=return&page=${defaultCurrent}&include_adult=false`,
      moviesList: [],
      genreNames: [],
      error: false,
      loading: true,
    };
  }

  componentDidMount() {
    const { searchMovie } = this.state;
    this.addGenreNames();
    this.updateSearchMovies(searchMovie);
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  addGenreNames = () => {
    this.movieService
      .getGenreNames()
      .then((genreNames) => this.setState({ genreNames }))
      .catch(this.onError);
  };

  onSearchMoviesListLoaded = (moviesList) => {
    this.setState({
      moviesList,
      loading: false,
    });
  };

  updateSearchMovies = (movie) => {
    this.movieService.getSearchMovies(movie).then(this.onSearchMoviesListLoaded).catch(this.onError);
  };

  render() {
    const { Content } = Layout;

    const { error, loading, moviesList, genreNames } = this.state;

    if (error) {
      return (
        <div className="alert_example">
          <Alert
            type="warning"
            message="Oops!"
            description="Something went wrong!"
            style={{ width: 300, fontSize: 18 }}
            showIcon
          />
        </div>
      );
    }

    if (loading) {
      return (
        <div className="example">
          <Spin size="large" />
        </div>
      );
    }

    return (
      <Layout className="container">
        <Content>
          <List
            className="list-align"
            justify="space-around"
            grid={{
              gutter: 36,
              md: 2,
            }}
            dataSource={moviesList}
            renderItem={(item) => (
              <CardMovie
                id={item.id}
                title={item.title}
                posterPath={item.posterPath}
                overview={item.overview}
                releaseDate={item.releaseDate}
                genreIds={item.genreIds}
                genreNames={genreNames}
              />
            )}
          />
        </Content>
      </Layout>
    );
  }
}

export default App;
