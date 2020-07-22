import React from 'react';
import { Card, List } from 'antd';
import { format } from 'date-fns';

import './CardMovie.css';
import "../../../node_modules/typeface-inter";

class CardMovie extends React.Component {

	croppingText = (text) => {
		return text.slice(0, text.indexOf(' ', 200)) + '...';
	}

	transformGenreName = (genreId) => {
		const [el] = this.props.genreNames.filter((item) => genreId === item.id);
		return el.name;
	}

	render() {
		
		const { title, posterPath, overview, releaseDate, genreIds } = this.props;

		const dateRelise = format(new Date(releaseDate), 'MMMM dd, yyyy');

		return (
			<List.Item>
				<Card
					className="card-movie"
					hoverable
					cover={posterPath ? <img src={`http://image.tmdb.org/t/p/w185${posterPath}`} alt="Poster" /> : <span className="no-poster"><i>'No poster'</i></span>}
				>
					<h5>{title}</h5>
					<div>
						<span className="card-date">{dateRelise}</span> 
						<div className="genres">
							{genreIds.map((item) => <span className="card-genre">{this.transformGenreName(item)}</span>)}
						</div>
						<p className="card-desc">
							{this.croppingText(overview)}
						</p>
					</div>    
				</Card>
			</List.Item>
		);
	}
}

export default CardMovie;