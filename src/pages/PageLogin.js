/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import AppContext from '../AppContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PageLogin = () => {
	const { setCurrentUser, currentUserIsInGroup, setAppMessage, initializePage } = useContext(AppContext);
	const [loginFormField_login, setLoginFormField_login] = useState('');
	const [loginFormField_password, setLoginFormField_password] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		initializePage();
	}, []);

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
		const url = `${process.env.REACT_APP_BACKEND_URL}/login`;
		const response = await fetch(url, requestOptions);
		const _currentUser = await response.json();
		setCurrentUser(prev => ({ ...prev, ..._currentUser }));
		if (response.ok) {
			setLoginFormField_login('');
			setLoginFormField_password('');
			navigate('/');
		} else {
			const _appMessage = { kind: 'appMessageError', message: 'Bad login, please try again.' };
			setLoginFormField_password('');
			setAppMessage(prev => ({ ...prev, ..._appMessage }));
		}
	}
	const handle_logoutForm_logoutButton = async (e) => {
		const requestOptions = {
			method: 'GET',
			credentials: 'include'
		};
		const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/logout`, requestOptions);
		if (response.ok) {
			const _currentUser = await response.json();
			setCurrentUser(prev => ({ ...prev, ..._currentUser }));
		}
	}

	return (
		<>
			{currentUserIsInGroup('loggedInUsers') && (
				<div><button onClick={handle_logoutForm_logoutButton}>Logout</button></div>
			)}
			{currentUserIsInGroup('loggedOutUsers') && (
				<form>
					<fieldset>
						<div className="row">
							<label htmlFor="loginFormField_login">Login</label>
							<input autoFocus type="text" id="loginFormField_login" value={loginFormField_login} onChange={handle_loginFormField_login} />
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
			)}
		</>
	)
}

export default PageLogin;