import { useState, useEffect } from 'react';
import './App.scss';

function App() {
	const [loginFormField_login, setLoginFormField_login] = useState('');
	const [loginFormField_password, setLoginFormField_password] = useState('');

	const [signupFormField_login, setSignupFormField_login] = useState('');
	const [signupFormField_password1, setSignupFormField_password1] = useState('');
	const [signupFormField_password2, setSignupFormField_password2] = useState('');
	const [signupFormField_firstName, setSignupFormField_firstName] = useState('');
	const [signupFormField_lastName, setSignupFormField_lastName] = useState('');
	const [signupFormField_email, setSignupFormField_email] = useState('');

	const [notYetApprovedUsers, setNotYetApprovedUsers] = useState([]);

	const [currentUser, setCurrentUser] = useState({});

	const loadNotYetApprovedUsers = async () => {
		const requestOptions = {
			method: 'GET',
			credentials: 'include'
		};
		const response = await fetch('http://localhost:3003/notyetapprovedusers', requestOptions);
		if (response.ok) {
			const data = await response.json();
			setNotYetApprovedUsers(prev => ([...data.users]));
		}
	}

	useEffect(() => {
		(async () => {
			const requestOptions = {
				method: 'GET',
				credentials: 'include'
			};
			const response = await fetch('http://localhost:3003/currentuser', requestOptions); if (response.ok) {
				const data = await response.json();
				setCurrentUser(prev => ({ ...prev, ...data.user }));
			}
			loadNotYetApprovedUsers();
		})();
	}, []);

	const currentUserIsInGroup = (accessGroup) => {
		const accessGroupArray = currentUser.accessGroups.split(',').map(m => m.trim());
		return accessGroupArray.includes(accessGroup);
	}

	// LOGIN FORM FIELD HANDLERS
	const handle_loginFormField_login = (e) => {
		let login = e.target.value;
		setLoginFormField_login(login);
	}
	const handle_loginFormField_password = (e) => {
		let password = e.target.value;
		setLoginFormField_password(password);
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
			loadNotYetApprovedUsers();
		}
	}

	// SIGNUP FORM FIELD HANDLERS
	const handle_signupFormField_login = (e) => {
		let login = e.target.value;
		setSignupFormField_login(login);
	}
	const handle_signupFormField_password1 = (e) => {
		let password1 = e.target.value;
		setSignupFormField_password1(password1);
	}
	const handle_signupFormField_password2 = (e) => {
		let password2 = e.target.value;
		setSignupFormField_password2(password2);
	}
	const handle_signupFormField_firstName = (e) => {
		let firstName = e.target.value;
		setSignupFormField_firstName(firstName);
	}
	const handle_signupFormField_lastName = (e) => {
		let lastName = e.target.value;
		setSignupFormField_lastName(lastName);
	}
	const handle_signupFormField_email = (e) => {
		let email = e.target.value;
		setSignupFormField_email(email);
	}
	const handle_signupForm_signupButton = async (e) => {
		e.preventDefault();
		const requestOptions = {
			method: 'POST',
			credentials: "include",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(
				{
					login: signupFormField_login,
					password1: signupFormField_password1,
					password2: signupFormField_password2,
					firstName: signupFormField_firstName,
					lastName: signupFormField_lastName,
					email: signupFormField_email,
				}
			),
		};
		const response = await fetch('http://localhost:3003/signup', requestOptions);
		if (response.ok) {
			const _currentUser = await response.json();
			setCurrentUser(prev => ({ ...prev, ..._currentUser }));
			setSignupFormField_login('');
			setSignupFormField_password1('');
			setSignupFormField_password2('');
			setSignupFormField_firstName('');
			setSignupFormField_lastName('');
			setSignupFormField_email('');
		}
	}

	const handle_approveUserButton = async (id) => {
		const requestOptions = {
			method: 'POST',
			credentials: "include",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({id}),
		};
		const response = await fetch('http://localhost:3003/approveuser', requestOptions);
		if (response.ok) {
			await response.json();
			loadNotYetApprovedUsers();
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
						<>
							<form>
								<fieldset>
									<legend>Login</legend>
									<div className="row">
										<label htmlFor="loginFormField_login">Login</label>
										<input type="text" id="loginFormField_login" value={loginFormField_login} onChange={handle_loginFormField_login} />
									</div>
									<div className="row">
										<label htmlFor="loginFormField_password">Password</label>
										<input type="password" id="loginFormField_password" value={loginFormField_password} onChange={handle_loginFormField_password} />
									</div>
									<div className="buttonRow">
										<button onClick={handle_loginForm_loginButton}>Submit</button>
									</div>
								</fieldset>
							</form>
							<form>
								<fieldset>
									<legend>Signup</legend>
									<div className="row">
										<label htmlFor="signupFormField_login">Login</label>
										<input type="text" id="signupFormField_login" value={signupFormField_login} onChange={handle_signupFormField_login} />
									</div>
									<div className="row">
										<label htmlFor="signupFormField_password1">Password 1</label>
										<input type="password" id="signupFormField_password1" value={signupFormField_password1} onChange={handle_signupFormField_password1} />
									</div>
									<div className="row">
										<label htmlFor="signupFormField_password2">Password 2</label>
										<input type="password" id="signupFormField_password2" value={signupFormField_password2} onChange={handle_signupFormField_password2} />
									</div>
									<div className="row">
										<label htmlFor="signupFormField_firstName">First Name</label>
										<input type="text" id="signupFormField_firstName" value={signupFormField_firstName} onChange={handle_signupFormField_firstName} />
									</div>
									<div className="row">
										<label htmlFor="signupFormField_lastName">Last Name</label>
										<input type="text" id="signupFormField_lastName" value={signupFormField_lastName} onChange={handle_signupFormField_lastName} />
									</div>
									<div className="row">
										<label htmlFor="signupFormField_email">E-Mail</label>
										<input type="text" id="signupFormField_email" value={signupFormField_email} onChange={handle_signupFormField_email} />
									</div>
									<div className="buttonRow">
										<button onClick={handle_signupForm_signupButton}>Submit</button>
									</div>
								</fieldset>
							</form>
						</>
					)}

					{currentUserIsInGroup('loggedOutUsers') && (
						<div className="panel">
							Welcome to this site.
						</div>
					)}
					{currentUserIsInGroup('notYetApprovedUsers') && (
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
								<h4>{notYetApprovedUsers.length} Users to Approve:</h4>
								<table className="minimalistBlack">
									<thead>
										<tr>
											<th>First Name</th>
											<th>Last Name</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{notYetApprovedUsers.map((user, index) => {
											return (
												<tr key={index}>
													<td>{user.firstName}</td>
													<td>{user.lastName}</td>
													<td><button onClick={() => handle_approveUserButton(user._id)}>Approve</button></td>
												</tr>
											)
										})}
									</tbody>
								</table>
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
}

export default App;