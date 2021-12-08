import { useContext, useState } from 'react';
import AppContext from '../AppContext';
import { NavLink } from 'react-router-dom';

const Nav = () => {
	const { currentUserIsInGroup } = useContext(AppContext);
	return (
		<nav>
			<ul>
				<li><NavLink to="/">Welcome</NavLink></li>
				<li><NavLink to="register">Register</NavLink></li>
				{currentUserIsInGroup('admins') && (
					<li><NavLink to="admin">Admin</NavLink></li>
				)}
				<li><NavLink to="login">Login</NavLink></li>
			</ul>
		</nav>
	)
}

export default Nav;