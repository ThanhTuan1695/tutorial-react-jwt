import actionTypes from '../constants/actionTypes';


function newsReceived(news) {
	return {
		type: actionTypes.NEWS_RECEIVED,
		news: news
	}
}


export function fetchNews(){
    return dispatch => {
        return fetch('http://localhost:5000/news')
        .then( (response) => response.json() )
        .then( (data) => dispatch(newsReceived(data.data)))
        .catch( (e) => console.log(e) );
    }    
}

function newsItemReceived (newsItem) {
	return {
		type: actionTypes.NEWSITEM_RECEIVED,
		newsItem: newsItem
	}
}


export function fetchNewsItem (id) {
	return dispatch => {
		return fetch(`/news/${id}`)
		.then((response) => response.json())
		.then(data => dispatch(newsItemReceived(data.data)))
		.catch(e => console.log(e))
	}
}

// function newsItemLoading() {
// 	return {
// 		type: actionTypes.NEWSITEM_LOADING
// 	}
// }


export function submitNewsStory(data){
    return dispatch => {
        return fetch('/news/', { 
            method: 'POST', 
             headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data), 
            mode: 'cors'})
            .catch( (e) => console.log(e) );
    }    
}


function userLoggedIn (username) {
	return {
		type: actionTypes.USER_REGISTERED,
		username: username
	}
}

// function userRegistered (username) {
// 	return {
// 		type: actionTypes.USER_LOGGEDIN,
// 		username: username
// 	}
// }


function logout () {
	return {
		type: actionTypes.USER_LOGOUT
	}
}


export function submitLogin(data){
	return dispatch => {
		return fetch(`http://localhost:5000/user/${data.username}`, { 
				method: 'POST', 
 				headers: {
    				'Accept': 'application/json',
    				'Content-Type': 'application/json'
  				},
				body: JSON.stringify(data), 
				mode: 'cors'})
			.then( (response) => {
		        if (!response.ok) {
		            throw Error(response.statusText);
		        }
        		return response.json();
			})
			.then( (data) => {
				localStorage.setItem('username', data.data.username);
				localStorage.setItem('token', data.data.tokenID);

				dispatch(userLoggedIn(data.data.username));
			})		
			.catch( (e) => console.log(e) );
	}	
}


export  function submitRegister (data) {
	return dispatch => {
		return fetch('/user', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
			mode: 'cors'
		})
		.then(response => {
			if (!response.success) {
				throw Error(response.statusText)
			}
			return response.json()
		})
		.then(data => {
			localStorage.setItem('username', data.data.username);
			localStorage.setItem('token', data.data.tokenID);

			dispatch(userLoggedIn (data.data.username))
		})
		.catch (e => console.log(e)) 
	}
}


export function logoutUser () {
	return dispatch => {
		localStorage.removeItem('username');
		localStorage.removeItem('token');

		dispatch(logout())
	}
}