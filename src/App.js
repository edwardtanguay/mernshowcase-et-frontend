import { useState, useEffect } from 'react';
import './App.scss';

function App() {
	const [loginFormField_login, setLoginFormField_login] = useState('');
	const [loginFormField_password, setLoginFormField_password] = useState('');
	const [currentUser, setCurrentUser] = useState({});

	useEffect(() => {
		(async () => {
			const requestOptions = {
				method: 'GET',
				credentials: 'include'
			};
			const response = await fetch('http://localhost:3003/currentuser', requestOptions);
			if (response.ok) {
				const data = await response.json();
				console.log(data);
				setCurrentUser(prev => ({ ...prev, ...data.user }));
			}
		})();
	}, []);

	const currentUserIsInGroup = (accessGroup) => {
		const accessGroupArray = currentUser.accessGroups.split(',').map(m => m.trim());
		return accessGroupArray.includes(accessGroup);
	}

	const handle_loginFormField_login = (e) => {
		let login = e.target.value;
		setLoginFormField_login(login);
	}

	const handle_loginFormField_password = (e) => {
		let password = e.target.value;
		setLoginFormField_login(password);
	}

	const handle_loginForm_loginButton = async (e) => {
		e.preventDefault();
		const requestOptions = {
			method: 'POST',
			credentials: "include",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ login: loginFormField_login, password: loginFormField_password }),
		};
		const response = await fetch('http://localhost:3003/login', requestOptions);
		if (response.ok) {
			const _currentUser = await response.json();
			setCurrentUser(prev => ({ ...prev, ..._currentUser }));
			setLoginFormField_login('');
			setLoginFormField_password('');
		}
	}

	const handle_logoutForm_logoutButton = async (e) => {
		const requestOptions = {
			method: 'GET',
			credentials: 'include'
		};
		const response = await fetch('http://localhost:3003/logout', requestOptions);
		if (response.ok) {
			const _currentUser = await response.json();
			setCurrentUser(prev => ({ ...prev, ..._currentUser }));
		}
	}

	return (
		<div className="App">
			{currentUser.login && (
				<>
					<h1>MERN Showcase App</h1>
					{currentUserIsInGroup('loggedInUsers') && (
						<h2>{currentUser.firstName} {currentUser.lastName}</h2>
					)}
					{currentUserIsInGroup('loggedInUsers') && (
						<div><button onClick={handle_logoutForm_logoutButton}>Logout</button></div>
					)}
					{currentUserIsInGroup('loggedOutUsers') && (
						<form>
							<fieldset>
								<legend>Login</legend>
								<div className="row">
									<label htmlFor="login">Login</label>
									<input type="text" id="login" value={loginFormField_login} 	onChange={handle_loginFormField_login} />
								</div>
								<div className="row">
									<label htmlFor="password">Password</label>
									<input type="password" id="password" value={loginFormField_password} onChange={handle_loginFormField_password} />
								</div>
								<div className="buttonRow">
									<button onClick={handle_loginForm_loginButton}>Submit</button>
								</div>
							</fieldset>
						</form>
					)}

					{currentUserIsInGroup('loggedOutUsers') && (
						<div className="panel">
							Welcome to this site.
						</div>
					)}
					{currentUserIsInGroup('notApprovedUsers') && (
						<>
							<div className="panel">
								<h3>Thank you for registering!</h3>
								An administrator will approve your account as soon as possible.
							</div>

						</>
					)}
					{currentUserIsInGroup('members') && (
						<>
							<div className="panel">
								<h3>Current Site News for Members</h3>
								<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque explicabo voluptate quia asperiores sit! Vel molestiae labore ratione non dolores? Exercitationem soluta quo id laboriosam, autem perferendis? Fuga, suscipit ipsa.</p>
							</div>
						</>
					)}
					{currentUserIsInGroup('contentEditors') && (
						<>
							<div className="panel">
								<h3>Content Editor Section:</h3>
								<div>
									<button>Edit Welcome Page</button>
								</div>
								<div>
									<button>Create New Page</button>
								</div>
							</div>
						</>
					)}
					{currentUserIsInGroup('admins') && (
						<>
							<div className="panel">
								<h3>Admin Section:</h3>
								<div>
									<button>Create users</button>
								</div>
								<div>
									<button>Edit users</button>
								</div>
								<div>
									<button>Delete users</button>
								</div>
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
}

export default App;