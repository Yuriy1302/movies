import React, { Component } from 'react';
import { List, Card, Pagination, Input } from 'antd';





import MovieService from './movieapi-service';

import 'antd/dist/antd.css';

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
		}
		
  }

  componentDidMount() {
    this.updateSearchMovies(this.state.searchMovie);
	}

	onSearchMoviesListLoaded = (moviesList) => {
		
		this.setState({
			moviesList,
		})
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
  }

  
  
  render() {

		console.log(this.state.moviesList);
		

		const { Search } = Input;

		

		return(
			<div>

		<Search
					placeholder="input search text"
					enterButton="Search"
					size="large"
					onSearch={value => {
						this.movieService
							.getSearchMovies(`https://api.themoviedb.org/3/search/movie?api_key=05f7db0eb20b02a8803d7f7d0f3fb520&language=en-US&query=${value}&page=1&include_adult=false`)
							.then(this.onSearchMoviesListLoaded);
					}}
				/>



			<List
					grid={{
						gutter: 16,
						md: 4,
					}}
					dataSource={this.state.moviesList}
					renderItem={item => (
						<List.Item>
							<Card title={item.title} style={{ width: 300 }}>
								
								{item.posterPath ? <img src={`http://image.tmdb.org/t/p/w185${item.posterPath}`} alt="Poster" /> : <span><i>'No poster'</i></span>}
								<p>{item.overview}</p>
							</Card>
						</List.Item>
					)}
				/>

				

			<Pagination defaultCurrent={1} total={50} onChange={this.onChange} />
				
			</div>
		);
	};
}


export default App;

/* {this.state.moviesList.map((el) => {
					const {
						id,
						popularity,
						voteAverage,
						title,
						originalTitle,
						overview,
						posterPath,
						release
					} = el;
					return (
						<span key={id}>
							<Card title={title} style={{ width: 300 }}>
								
								<img src={`http://image.tmdb.org/t/p/w185${posterPath}`} alt="Poster" />
								<p class="card-text">{el.overview}</p>
							</Card>
						</span>
					);
				})} */