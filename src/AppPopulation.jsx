import React, { Component } from 'react';
import { Pagination } from 'antd';

import 'antd/dist/antd.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      moviesList: [],
      defaultCurrent: 1
    }
  }

  componentDidMount() {
    this.getResource(this.state.defaultCurrent).then((result) => {
    console.log('result: ', result);
    const arr = result.results.map((el) => {
      return {
        id: el.id,
        title: el.title,
        overview: el.overview,
        posterPath: el.poster_path
      }
    });
    this.setState({ moviesList: arr });
    });
  }

  onChange = (pageNumber) => {
    this.getResource(pageNumber).then((result) => {
      console.log('result: ', result);
      const arr = result.results.map((el) => {
        return {
          id: el.id,
          title: el.title,
          overview: el.overview,
          posterPath: el.poster_path
        }
      });
      this.setState({ moviesList: arr });
      });
  }

  getResource = async (page) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=05f7db0eb20b02a8803d7f7d0f3fb520&language=ru-RU&page=${page}`);
    const result = await res.json();
    return result;
  }
  
  render() {

    console.log('moviesList: ', this.state.moviesList);
    return (
      <div>
        
        <div class="jumbotron">
          <h1 class="display-3">Hello, world!</h1>
          <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
          <hr class="my-4" />
          <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
          <p class="lead">
            <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
          </p>
        </div>
        <Pagination defaultCurrent={this.state.defaultCurrent} total={50} onChange={this.onChange}/>
        <ul class="list-group">
          {this.state.moviesList.map((el) => {
            return (
              <li class="list-group-item justify-content-between align-items-center" key={el.id}>
                <div style={{minWidth: 30+'%'}} class="card mb-3">
                  <h3 class="card-header">{el.title}</h3>
                  <div class="card-body">
                    <span style={{marginRight: 5+'px'}} class="badge badge-light">Жанр1</span>
                    <span class="badge badge-light">Жанр2</span>
                  </div>
                  <img style={{width: 185+'px'}} src={`http://image.tmdb.org/t/p/w185${el.posterPath}`} alt="Poster" />
                  <div class="card-body">
                    <p class="card-text">{el.overview}</p>
                  </div>
                  <div class="card-body">
                    <button type="button" class="btn btn-secondary">Подробнее</button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
}


export default App;





