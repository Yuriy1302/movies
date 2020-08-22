import React, { Component } from 'react';
import { Layout, List, Spin, Alert, Empty, Tabs, notification } from 'antd';
import PropTypes from 'prop-types';

import CardMovie from '../CardMovie';
import SearchMovie from '../SearchMovie';
import PaginationMoviesList from '../PaginationMoviesList';

import { GenresProvider } from '../ContextGenres';

import MovieService from '../../movie-service/movie-service';

import 'antd/dist/antd.css';

import './App.css';

class App extends Component {
  movieService = new MovieService();

  static defaultProps = {
    defaultPage: 1,
    defaultSearchMovie: 'return',
    moviePage: this.defaultPage,
    ratePage: 1,
    guestSessionID: '73e66455e4e0df85aa0d12388cf9f527', // убрать при включении гостевой сессии
    // guestSessionID: 'ade831dc162d9f2b5b7f92021f4be6af'
    // guestSessionID: ''
  };

  static propTypes = {
    moviePage: PropTypes.number,
    ratePage: PropTypes.number,
    defaultPage: PropTypes.number,
    defaultSearchMovie: PropTypes.string,
    guestSessionID: PropTypes.string,
  };

  constructor(props) {
    super(props);
    const { defaultSearchMovie, defaultPage, ratePage, guestSessionID } = this.props;
    this.state = {
      searchMovie: defaultSearchMovie,
      moviePage: defaultPage,
      ratePage,
      moviesList: [],
      movieTotalResults: null,
      rateTotalResults: null,
      genreNames: [],
      error: false,
      loading: true,
      guestSessionID, // убрать при создании гостевой сессии
      // guestSessionID: null, // раскомментировать при включении гостевой сессии
      rateList: [],
    };
  }

  componentDidMount() {
    // handleCreateGuestSession вызывать через условие.
    // Времено отключено, для создания сессий при перезагрузке страницы.
    // НЕ УДАЛЯТЬ!!!
    // this.handleCreateGuestSession();

    this.addGenreNames(); // Закомментировано на время настройки провайдера
    const { defaultSearchMovie, defaultPage } = this.props;
    const { guestSessionID, ratePage } = this.state;
    this.updateSearchMovies(defaultSearchMovie, defaultPage);
    if (guestSessionID) {
      this.updateRatedMovies(guestSessionID, ratePage);
    } /* else {
      this.renderEmptyRate();
    } */
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { moviePage, searchMovie, ratePage, guestSessionID } = this.state;
    if (searchMovie !== prevState.searchMovie) {
      (() => this.setState({ moviePage: 1 }))();
    }

    if (moviePage !== prevState.moviePage) {
      this.updateSearchMovies(searchMovie, moviePage);
      window.scroll(0, 0);
    }

    if (ratePage !== prevState.ratePage) {
      this.updateRatedMovies(guestSessionID, ratePage);
      window.scroll(0, 0);
    }
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
      movieTotalResults: res.totalResults,
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
    const { moviePage } = this.props;
    this.setState({
      searchMovie: value,
    });
    this.updateSearchMovies(value, moviePage);
  };

  onMoviePageChange = (moviePage) => {
    this.setState({ moviePage });
  };

  onRatePageChange = (ratePage) => {
    this.setState({ ratePage });
  };

  renderEmpty = () => {
    return (
      <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg" imageStyle={{ height: 60 }}>
        <h6>The search did not return any results.</h6>
        <span>Try changing your request.</span>
      </Empty>
    );
  };

  renderEmptyRate = () => {
    return (
      <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg" imageStyle={{ height: 60 }}>
        <h6>You haven&apos;t rated movies yet.</h6>
        <span>Rate the movie and it will appear on this list.</span>
      </Empty>
    );
  };

  // getRatedMovies
  onRateListLoaded = (res) => {
    this.setState({
      rateList: res.results,
      rateTotalResults: res.totalResults,
    });
  };

  updateRatedMovies = (guestSessionID, page) => {
    this.movieService
      .getRatedMovies(guestSessionID, page)
      .then((res) => {
        this.onRateListLoaded(res);
      })
      .catch(this.onError);
  };

  // Rate Movie
  handleRateMovie = (id, value) => {
    const { guestSessionID } = this.state;
    this.movieService
      .postRateMovie(id, value, guestSessionID)
      .then(
        notification.success({
          message: 'Rating received',
          description: 'Movie added to the Rate tab',
          duration: 2,
        })
      )
      .catch(this.onError);
  };

  onChangeTabs = (key) => {
    const { guestSessionID, ratePage = '' } = this.state;
    if (key === '2' && guestSessionID) {
      this.updateRatedMovies(guestSessionID, ratePage);
    }
  };

  // Create Guest Session
  // Временно отключено
  // НЕ УАЛЯТЬ!!!
  /* 
  updateGuestSession = (guestSessionID) => {
    this.setState({ guestSessionID });
  }

  handleCreateGuestSession = () => {
    this.movieService
      .createGuestSession()
        .then(this.updateGuestSession)
        .then(() => console.log('this.state.guestSessionID -> ', this.state.guestSessionID))
        .catch(this.onError);
  }
*/

  render() {
    const { Content } = Layout;
    const { TabPane } = Tabs;

    const {
      error,
      loading,
      genreNames,
      moviePage,
      moviesList,
      movieTotalResults,
      ratePage,
      rateList,
      rateTotalResults,
    } = this.state;
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
        <GenresProvider value={genreNames}>
          <Tabs defaultActiveKey="1" size="large" centered onChange={this.onChangeTabs}>
            <TabPane tab="Search" key="1">
              <Content>
                <SearchMovie onDebounced={this.onDebounced} />
              </Content>
              <Content>
                {moviesList.length ? (
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
                        voteAverage={item.voteAverage}
                        handleRateMovie={this.handleRateMovie}
                      />
                    )}
                  />
                ) : (
                  this.renderEmpty()
                )}
              </Content>
              <Content className="centered">
                {movieTotalResults > 20 ? (
                  <PaginationMoviesList
                    defaultPage={defaultPage}
                    page={moviePage}
                    totalResults={movieTotalResults}
                    onPageChange={this.onMoviePageChange}
                  />
                ) : null}
              </Content>
            </TabPane>

            <TabPane tab="Rate" key="2">
              <Content>
                {rateList.length ? (
                  <List
                    className="list-align"
                    justify="space-around"
                    grid={{
                      gutter: 36,
                      md: 2,
                    }}
                    dataSource={rateList}
                    renderItem={(item) => (
                      <CardMovie
                        id={item.id}
                        title={item.title}
                        posterPath={item.posterPath}
                        overview={item.overview}
                        releaseDate={item.releaseDate}
                        genreIds={item.genreIds}
                        voteAverage={item.voteAverage}
                        rating={item.rating}
                        handleRateMovie={this.handleRateMovie}
                      />
                    )}
                  />
                ) : (
                  this.renderEmptyRate()
                )}
              </Content>
              <Content className="centered">
                {rateTotalResults > 20 ? (
                  <PaginationMoviesList
                    defaultPage={defaultPage}
                    page={ratePage}
                    totalResults={rateTotalResults}
                    onPageChange={this.onRatePageChange}
                  />
                ) : null}
              </Content>
            </TabPane>
          </Tabs>
        </GenresProvider>
      </Layout>
    );
  }
}

export default App;
