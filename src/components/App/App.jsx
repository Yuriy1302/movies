import React, { Component } from 'react';
import { debounce } from 'lodash';
import { Layout, List, Spin, Alert, Input } from 'antd';
import PropTypes from 'prop-types';

import CardMovie from '../CardMovie';

import MovieService from '../../movie-service/movie-service';

import 'antd/dist/antd.css';

import './App.css';

class App extends Component {
  movieService = new MovieService();

  static defaultProps = {
    defaultPage: 1,
    defaultSearchMovie: 'return',
  };

  static propTypes = {
    defaultPage: PropTypes.number,
    defaultSearchMovie: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      // searchMovie: '',
      moviesList: [],
      genreNames: [],
      error: false,
      loading: true,
    };
    this.debouncedUpdate = debounce((value) => this.handleChange(value), 1500);
  }

  componentDidMount() {
    const { defaultSearchMovie, defaultPage } = this.props;
    this.addGenreNames();
    this.updateSearchMovies(defaultSearchMovie, defaultPage);
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

  updateSearchMovies = (movie, page) => {
    this.movieService.getSearchMovies(movie, page).then(this.onSearchMoviesListLoaded).catch(this.onError);
  };

  handleChange = (value) => {
    if (value.length < 1) {
      return;
    }
    const { defaultPage } = this.props;
    this.updateSearchMovies(value, defaultPage);
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
          <Input
            placeholder="Type to search..."
            size="large"
            style={{ width: '100%', margin: '20px 0' }}
            onChange={({ target: { value } }) => this.debouncedUpdate(value)}
          />
        </Content>
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
