import React, { Component } from 'react';
import { Layout, List, Spin, Alert } from 'antd';
import PropTypes from 'prop-types';

import CardMovie from '../CardMovie';
import SearchMovie from '../SearchMovie';
import PaginationMoviesList from '../PaginationMoviesList';

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
    page: PropTypes.number.isRequired,
    defaultPage: PropTypes.number,
    defaultSearchMovie: PropTypes.string,
  };

  constructor(props) {
    super(props);
    const { defaultSearchMovie, defaultPage } = this.props;
    this.state = {
      searchMovie: defaultSearchMovie,
      page: defaultPage,
      moviesList: [],
      totalResults: null,
      genreNames: [],
      error: false,
      loading: true,
    };
  }

  componentDidMount() {
    const { defaultSearchMovie, defaultPage } = this.props;
    this.addGenreNames();
    this.updateSearchMovies(defaultSearchMovie, defaultPage);
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { page, searchMovie } = this.state;
    if (page !== prevState.page) {
      this.updateSearchMovies(searchMovie, page);
    }
    window.scroll(0, 0);
  };

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

  onSearchMoviesListLoaded = (res) => {
    this.setState({
      moviesList: res.results,
      totalResults: res.totalResults,
      loading: false,
    });
  };

  updateSearchMovies = (movie, page) => {
    this.movieService.getSearchMovies(movie, page).then(this.onSearchMoviesListLoaded).catch(this.onError);
  };

  onDebounced = (value) => {
    if (value.length < 1) {
      return;
    }
    const { page, defaultPage } = this.props;
    this.setState({
      searchMovie: value,
      page: defaultPage,
    });
    this.updateSearchMovies(value, page);
  };

  onPageChange = (page) => {
    this.setState({ page });
  };

  render() {
    const { Content } = Layout;

    const { error, loading, moviesList, genreNames, page, totalResults } = this.state;
    const { defaultPage } = this.props;

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
          <SearchMovie onDebounced={this.onDebounced} />
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
        {totalResults > 20 ? (
          <PaginationMoviesList
            defaultPage={defaultPage}
            page={page}
            totalResults={totalResults}
            onPageChange={this.onPageChange}
          />
        ) : null}
      </Layout>
    );
  }
}

export default App;
