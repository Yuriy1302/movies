import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { Layout, List, Card, Space, Tag, Rate } from 'antd';

import { GenresConsumer } from '../ContextGenres';

import './CardMovie.css';
import '../../../node_modules/typeface-inter/inter.css'; // font 'Inter'

class CardMovie extends React.Component {
  static defaultProps = {
    title: '',
    posterPath: '',
    overview: '',
    releaseDate: '',
    rating: '',
  };

  static propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    posterPath: PropTypes.string,
    overview: PropTypes.string,
    releaseDate: PropTypes.string,
    genreIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    voteAverage: PropTypes.number.isRequired,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    handleRateMovie: PropTypes.func.isRequired,
  };

  croppingText = (text) => {
    if (text.length < 100) {
      return text;
    }
    return `${text.slice(0, text.indexOf(' ', 100))} ...`;
  };

  croppingTitle = (text) => {
    if (text.length < 30) {
      return text;
    }
    return `${text.slice(0, text.indexOf(' ', 30))} ...`;
  };

  renderGenres = (genreNames) => {
    const { genreIds } = this.props;
    const genres = genreIds
      .map((item) => {
        const [el] = genreNames.filter(({ id }) => item === id);
        return el;
      })
      .slice(0, 3);

    return (
      <>
        {genres.map((item) => (
          <Tag key={item.id}>{item.name}</Tag>
        ))}
      </>
    );
  };

  ratingColor = (va) => {
    if (va > 7) return '#66e900';
    if (va > 5) return '#e9d100';
    if (va > 3) return '#e97e00';
    return '#e90000';
  };

  render() {
    const { Content } = Layout;

    const { id, title, posterPath, overview, releaseDate, voteAverage, rating, handleRateMovie } = this.props;

    const dateRelise = releaseDate ? format(new Date(releaseDate), 'MMMM dd, yyyy') : '-';

    const classRatingColor = {
      borderColor: this.ratingColor(voteAverage),
    };

    return (
      <List.Item key={id}>
        <Card
          className="card-movie"
          hoverable
          cover={
            posterPath ? (
              <img src={`http://image.tmdb.org/t/p/w185${posterPath}`} alt="Poster" />
            ) : (
              <div className="no-poster">
                <i>No poster</i>
              </div>
            )
          }
        >
          <Space direction="vertical">
            <h5 className="card-movie__title">{this.croppingTitle(title)}</h5>
            <span className="card-movie__date">{dateRelise}</span>
            <Content>
              <GenresConsumer>{(genreNames) => this.renderGenres(genreNames)}</GenresConsumer>
            </Content>
            <p className="card-movie__overview">{this.croppingText(overview)}</p>
            <Rate
              onChange={(value) => handleRateMovie(id, value)}
              defaultValue={rating}
              count={10}
              allowHalf
              style={{ fontSize: 15 }}
              className="rate-stars"
            />
            <div className="rating" style={classRatingColor}>
              {voteAverage}
            </div>
          </Space>
        </Card>
      </List.Item>
    );
  }
}

export default CardMovie;
