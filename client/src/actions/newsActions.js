import actionTypes from '../constants/actionTypes';


function addComment (username, body) {
	return {
		type: actionTypes.NEWS_ADDCOMMENT,
		username: username,
		body: body
	}
}


export function submitComment (newsItemId, username, data) {

	var token = localStorage.getItem('token') || null;
	console.log(newsItemId)
	return dispatch => {
		return fetch(`/news/${newsItemId}/comment`, {
			method: 'Post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify(data),
			mode: 'cors'
		})
		.then(response => {
			if (!response.ok) {
		            throw Error(response.statusText);
		     }else{
				dispatch(addComment(username, data.body))
			}
		})
		.catch(e => console.log(e))
	}
}


