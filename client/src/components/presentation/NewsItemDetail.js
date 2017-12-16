import React , {Component} from 'react';
import ProTypes from 'prop-types';



class NewsItemDetail extends Component {
	render () {
		return (
			<div>
			  <h2>{this.props.data.title}</h2>
			  <p>{this.props.data.body}</p>
			</div>
			)
	}
}

NewsItemDetail.propTypes = {

	data: ProTypes.shape({
		_id: ProTypes.string.isRequired,
		title: ProTypes.string.isRequired,
		body: ProTypes.string.isRequired
	})
}

export default NewsItemDetail;