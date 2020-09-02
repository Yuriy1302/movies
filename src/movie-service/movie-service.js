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
      const totalResults = body.total_results;
      const results = body.results.map(this.transformSearchMovies);
      return { totalResults, results };
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
      rating: movie.rating,
    };
  };

  // Get Rated Movies
  async getRatedMovies(guestSessionID, page) {
    try {
      const body = await this.getResource(
        `${this.baseApi}/guest_session/${guestSessionID}/rated/movies${this.apiKey}&language=en-US&page=${page}&sort_by=created_at.desc`
      );
      const totalResults = body.total_results;
      const results = body.results.map(this.transformSearchMovies);
      return { totalResults, results };
    } catch (error) {
      throw new Error(`There is an error in get rated movies -> `, error);
    }
  }

  // Rated Movies
  async postRateMovie(movieId, value, guestSessionID) {
    try {
      const resolve = await fetch(
        `${this.baseApi}/movie/${movieId}/rating${this.apiKey}&guest_session_id=${guestSessionID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify({ value }),
        }
      );
      if (!resolve.ok) {
        throw new Error(`Could not fetch RATE received ${resolve.status}`);
      }
      const result = await resolve.json();
      return result;
    } catch (error) {
      throw new Error(`There is an error in post rate movie -> `, error);
    }
  }

  // Create Guest Session
  async createGuestSession() {
    try {
      const resolve = await fetch(`${this.baseApi}/authentication/guest_session/new${this.apiKey}`);

      if (!resolve.ok) {
        throw new Error(`Could not fetch 'Create Guest Session' received ${resolve.status}`);
      }

      const result = await resolve.json();
      return result.guest_session_id;
    } catch (error) {
      throw new Error(`There is an error in creating new guest session -> `, error);
    }
  }
}
