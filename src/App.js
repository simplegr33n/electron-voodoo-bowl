import React, { Component } from 'react';
import react_logo from './react-logo.svg';
import firebase_logo from './firebase-logo.png'
import './App.css';
import Firebase from './config/firebaseConfig.js'


class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			submission: ''
		};

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)

		this.firebase = new Firebase()
	}

	handleChange = (event) => {
		this.setState({ submission: event.target.value });
	}

	handleSubmit = () => {
		console.log("submitPressed: " + this.state.submission)
		this.setState({ submission: '' });

		// Send to Firebase
		this.postToFirebase(777, "yarl", "no.jpg", "Mr.", this.state.submission)
	}

	postToFirebase(uid, username, picture, title, body) {
		// A post entry.
		var postData = {
			author: username,
			uid: uid,
			body: body,
			title: title,
			starCount: 0,
			authorPic: picture
		};

		// Get a key for a new Post.
		var newPostKey = this.firebase.db.ref().child('posts').push().key;

		// Write the new post's data simultaneously in the posts list and the user's post list.
		var updates = {};
		updates['/posts/' + newPostKey] = postData;
		updates['/user-posts/' + uid + '/' + newPostKey] = postData;

		return this.firebase.db.ref().update(updates);
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<div>
						<img src={react_logo} className="React-logo" alt="react-logo" />
						<img src={firebase_logo} className="Firebase-logo" alt="firebase-logo" />
					</div>
					<p>Post something to Firebase:</p>
					<div>
						<textarea id="submit-text-area" value={this.state.submission} onChange={this.handleChange} />
						<div id="post-button" onClick={this.handleSubmit}>
							<div id="post-button-text">
								Firebase Post
              		</div>
						</div>
					</div>
				</header>
			</div>
		);
	}
}

export default App;
