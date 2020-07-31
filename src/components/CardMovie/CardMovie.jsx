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
    genreNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    posterPath: PropTypes.string,
    overview: PropTypes.string,
    releaseDate: PropTypes.string,
    genreIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  croppingText = (text) => {
    return `${text.slice(0, text.indexOf(' ', 200))} ...`;
  };

  transformGenreName = (genreId) => {
    const { genreNames } = this.props;
    const [el] = genreNames.filter(({ id }) => genreId === id);
    return el.name;
  };

  render() {
    const { Content } = Layout;

    const { id, title, posterPath, overview, releaseDate, genreIds } = this.props;

    const dateRelise = format(new Date(releaseDate), 'MMMM dd, yyyy');

    return (
      <List.Item key={id}>
        <Card
          className="card-movie"
          hoverable
          cover={
            posterPath ? (
              <img src={`http://image.tmdb.org/t/p/w185${posterPath}`} alt="Poster" />
            ) : (
              <span className="no-poster">
                <i>No poster</i>
              </span>
            )
          }
        >
          <Space direction="vertical">
            <h5 className="card-movie__title">{title}</h5>
            <span className="card-movie__date">{dateRelise}</span>
            <Content>
              {genreIds.map((item) => (
                <Tag>{this.transformGenreName(item)}</Tag>
              ))}
            </Content>
            <p className="card-movie__overview">{this.croppingText(overview)}</p>
          </Space>
        </Card>
      </List.Item>
    );
  }
}

export default CardMovie;
