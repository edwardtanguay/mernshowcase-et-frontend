import { useContext } from 'react';
import AppContext from '../AppContext';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
	const { currentUserIsInGroup, setCurrentUser } = useContext(AppContext);
	const navigate = useNavigate();

	const handle_logoutLink = async (e) => {
		const requestOptions = {
			method: 'GET',
			credentials: 'include'
		};
		const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/logout`, requestOptions);
		if (response.ok) {
			const _currentUser = await response.json();
			setCurrentUser(prev => ({ ...prev, ..._currentUser }));
			navigate('/');
		}
	}

	return (
		<nav>
			<ul>
				<li><NavLink to="/">Welcome</NavLink></li>
				{currentUserIsInGroup('loggedOutUsers') && (
					<li><NavLink to="register">Register</NavLink></li>
				)}
				{currentUserIsInGroup('admins') && (
					<li><NavLink to="admin">Admin</NavLink></li>
				)}
				{currentUserIsInGroup('loggedOutUsers') && (
					<li><NavLink to="login">Login</NavLink></li>
				)}
				{currentUserIsInGroup('loggedInUsers') && (
					<li><span className="commandLink" onClick={handle_logoutLink}>Logout</span></li>
				)}
			</ul>
		</nav>
	)
}

export default Nav;