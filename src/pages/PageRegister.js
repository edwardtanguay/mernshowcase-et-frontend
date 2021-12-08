import { useContext, useState } from 'react';
import AppContext from '../AppContext';
import { useNavigate } from 'react-router-dom';

const PageRegister = () => {
	const { setCurrentUser, currentUserIsInGroup } = useContext(AppContext);
	const navigate = useNavigate();

	const [signupFormField_login, setSignupFormField_login] = useState('');
	const [signupFormField_password1, setSignupFormField_password1] = useState('');
	const [signupFormField_password2, setSignupFormField_password2] = useState('');
	const [signupFormField_firstName, setSignupFormField_firstName] = useState('');
	const [signupFormField_lastName, setSignupFormField_lastName] = useState('');
	const [signupFormField_email, setSignupFormField_email] = useState('');

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
					user: {
						login: signupFormField_login,
						password1: signupFormField_password1,
						password2: signupFormField_password2,
						firstName: signupFormField_firstName,
						lastName: signupFormField_lastName,
						email: signupFormField_email
					}
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
			navigate('/');
		}
	}
	return (
		<>
			{currentUserIsInGroup('loggedOutUsers') && (
				<>
					<form>
						<fieldset>
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

		</>
	)
}

export default PageRegister;