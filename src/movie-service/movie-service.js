export default class MovieService {
  apiKey = '?api_key=05f7db0eb20b02a8803d7f7d0f3fb520';

  baseApi = 'https://api.themoviedb.org/3';

  async getResource(movie) {
    try {
      const resolve = await fetch(movie);

      if (!resolve.ok) {
        throw new Error(`Could not fetch ${movie} received ${resolve.status}`);
      }

      return await resolve.json();
    } catch (error) {
      throw new Error(`There is an error in getting resources -> `, error);
    }
  }

  async getSearchMovies(movie, page) {
    try {
      const body = await this.getResource(
        `${this.baseApi}/search/movie${this.apiKey}&language=en-US&query=${movie}&page=${page}&include_adult=false`
      );
      return body.results.map(this.transformSearchMovies);
    } catch (error) {
      throw new Error(`There is an error in search movies -> `, error);
    }
  }

  async getGenreNames() {
    try {
      const resolve = await fetch(`${this.baseApi}/genre/movie/list${this.apiKey}&language=en-US`);

      if (!resolve.ok) {
        throw new Error(`Could not fetch 'genre' received ${resolve.status}`);
      }

      const body = await resolve.json();
      return body.genres;
    } catch (error) {
      throw new Error(`There is an error in getting genres -> `, error);
    }
  }

  transformSearchMovies = (movie) => {
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
  };
}
