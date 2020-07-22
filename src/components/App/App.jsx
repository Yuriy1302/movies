import React, { Component } from 'react';
import { List, Pagination, Input } from 'antd';

import CardMovie from '../CardMovie'

import MovieService from '../../movieapi-service';

import 'antd/dist/antd.css';

import './App.css';

class App extends Component {

	movieService = new MovieService();

	static defaultProps = {
		defaultCurrent: 1,
	}

  constructor(props) {
    super(props);
    this.state = {
			searchMovie: `https://api.themoviedb.org/3/search/movie?api_key=05f7db0eb20b02a8803d7f7d0f3fb520&language=en-US&query=return&page=${this.props.defaultCurrent}&include_adult=false`,
			moviesList: [],
			genreNames: [],	
		}
  }

  componentDidMount() {
		this.addGenreNames();
		this.updateSearchMovies(this.state.searchMovie);
	}

	addGenreNames = () => {
		this.movieService
			.getGenreNames()
			.then((genreNames) => this.setState({ genreNames }) );
	}

	onSearchMoviesListLoaded = (moviesList) => {
		this.setState({ moviesList });
	}
	
	updateSearchMovies = (movie) => {
		this.movieService
			.getSearchMovies(movie)
			.then(this.onSearchMoviesListLoaded);
  }

  onChange = (pageNumber) => {
    this.movieService
			.getSearchMovies(`https://api.themoviedb.org/3/search/movie?api_key=05f7db0eb20b02a8803d7f7d0f3fb520&language=en-US&query=return&page=${pageNumber}&include_adult=false`)
			.then(this.onSearchMoviesListLoaded);
			window.scrollTo(0, 0);
  }
  
  render() {

		const { Search } = Input;

		return(
			<div className="container">
				<Search className="search-input"
					placeholder="Input search text"
					enterButton="Search"
					size="large"
					onSearch={value => {
						this.movieService
							.getSearchMovies(`https://api.themoviedb.org/3/search/movie?api_key=05f7db0eb20b02a8803d7f7d0f3fb520&language=en-US&query=${value}&page=1&include_adult=false`)
							.then(this.onSearchMoviesListLoaded);
					}}
				/>
				<List className="list-align"
						grid={{
							gutter: 16,
							md: 2,
						}}
						dataSource={this.state.moviesList}
						renderItem={item => (
							<CardMovie title={item.title}
												posterPath={item.posterPath}
												overview={item.overview}
												releaseDate={item.releaseDate}
												genreIds={item.genreIds}
												genreNames={this.state.genreNames} />
						)} />

				<Pagination className="pagination-align"
							defaultCurrent={1} total={50}
							onChange={this.onChange} />
			</div>
		);
	};
}

export default App;
