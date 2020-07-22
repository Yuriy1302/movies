export default class MovieService {

  async getResource(movie) {
    const resolve = await fetch(movie);

    if (!resolve.ok) {
      throw new Error(`Could not fetch ${movie} received ${resolve.status}`);
    }
    
    return await resolve.json();
  };
  
  async getSearchMovies(searchMovie) {
    const body = await this.getResource(searchMovie);
    return body.results.map(this._transformSearchMovies);
  }

  async getGenreNames() {
    const resolve = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=05f7db0eb20b02a8803d7f7d0f3fb520&language=ru-RU');
    
    if (!resolve.ok) {
      throw new Error(`Could not fetch 'genre' received ${resolve.status}`);
    }

    const body = await resolve.json();
    const { genres } = body;
    return genres;
  }
  
  _transformSearchMovies = (movie) => {
    //console.log('transform movie: ', movie.genre_ids);
    return {
      id: movie.id,
      popularity: movie.popularity,
      voteAverage: movie.vote_average,
      title: movie.title,
      originalTitle: movie.original_title,
      overview: movie.overview,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      genreIds: movie.genre_ids,
    };
  }
      
}

/*    const m = new MovieService();
  m.getGenreNames().then(console.log);  */



/*getResource('https://api.themoviedb.org/3/movie/popular?api_key=05f7db0eb20b02a8803d7f7d0f3fb520&language=ru-RU&page=1')
  .then((body) => console.log(body)); */
  


/* fetch('https://api.themoviedb.org/3/movie/popular?api_key=05f7db0eb20b02a8803d7f7d0f3fb520&language=ru-RU&page=1')
  .then((res) => res.json())
  .then((body) => console.log(body.results)); */
  
  
  /* const encoded = encodeURI(movie);
  console.log(encoded); */

  
  /* fetch(`https://api.themoviedb.org/3/search/movie?api_key=05f7db0eb20b02a8803d7f7d0f3fb520&language=en-US&query=${encoded}&page=1&include_adult=false`)
  .then((res) => res.json())
  .then((body) => body.results)
  .then((obj) => {
    obj.map((el) => {
      console.log('Название: ', el.title);
      console.log('Оригинальное название: ', el.original_title);
      console.log('Описание: ', el.overview);
    })
    
  }); */

 
    /* _extractId(item) {
          const idRegExp = /\/([0-9]*)\/$/;
          return item.url.match(idRegExp)[1];
      } */


/* async buildGenresIds(genresData) {
      const body = await this.getGenresId();
      const {genres} = body;
      console.log(genres);
      let arr;
      for (let i = 0; i < genresData.length; i += 1) {
        for (let j = 0; j < genres.length; j += 1) {
          if (genres[j].id === genresData[i]) arr[i] = genres[j].name;
        }
        
      }
      console.log(arr);
      return arr;
    } */





/*   async function getResource(movie) {
    const resolve = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=05f7db0eb20b02a8803d7f7d0f3fb520&language=en-US&query=${movie}&page=1&include_adult=false`);
    const body = resolve.json();
    return body;
  };

  getResource(movie)
    .then((body) => body.results)
    .then((array) => {
      array.map((el) => {
        console.log('Название: ', el.title);
        console.log('Оригинальное название: ', el.original_title);
        console.log('Описание: ', el.overview);
      })}); */

//getResource - Ф. получения тела запроса

//getSearchMovies - Ф. получения массива из тела запроса



/* 
const movieService = new MovieService();

movieService.getSearchMovies(searchMovie).then((a) => console.log(a));
 */