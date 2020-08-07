import React from 'react';
import { Layout, List, Card, Space, Tag } from 'antd';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import './CardMovie.css';
import '../../../node_modules/typeface-inter/inter.css'; // font 'Inter'

class CardMovie extends React.Component {
  static defaultProps = {
    title: '',
    posterPath: '',
    overview: '',
    releaseDate: '',
  };

  static propTypes = {
    genreNames: PropTypes.arrayOf(PropTypes.object).isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    posterPath: PropTypes.string,
    overview: PropTypes.string,
    releaseDate: PropTypes.string,
    genreIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    voteAverage: PropTypes.number.isRequired,
  };

  croppingText = (text) => {
    if (text.length < 100) {
      return text;
    }
    return `${text.slice(0, text.indexOf(' ', 100))} ...`;
  };

  transformGenreName = (genreId) => {
    const { genreNames } = this.props;
    const [el] = genreNames.filter(({ id }) => genreId === id);
    return el.name;
  };

  ratingColor = (va) => {
    if (va > 7) return '#66e900';
    if (va > 5) return '#e9d100';
    if (va > 3) return '#e97e00';
    return '#e90000';
  };

  render() {
    const { Content } = Layout;

    const { id, title, posterPath, overview, releaseDate, genreIds, voteAverage } = this.props;

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
            <h5 className="card-movie__title">{title}</h5>
            <span className="card-movie__date">{dateRelise}</span>
            <Content>
              {genreIds.map((item) => (
                <Tag key={item}>{this.transformGenreName(item)}</Tag>
              ))}
            </Content>
            <p className="card-movie__overview">{this.croppingText(overview)}</p>
          </Space>
          <div className="rating" style={classRatingColor}>
            {voteAverage}
          </div>
        </Card>
      </List.Item>
    );
  }
}

export default CardMovie;
