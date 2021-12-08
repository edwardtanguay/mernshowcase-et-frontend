import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.scss';
import Nav from './components/Nav';
import PageWelcome from './pages/PageWelcome';
import PageRegister from './pages/PageRegister';
import PageLogin from './pages/PageLogin';

import { useContext } from 'react';
import AppContext from './AppContext';

function App() {
	const { setCurrentUser, currentUser, currentUserIsInGroup } = useContext(AppContext);

	const [notYetApprovedUsers, setNotYetApprovedUsers] = useState([]);


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




	const handle_approveUserButton = async (id) => {
		const requestOptions = {
			method: 'POST',
			credentials: "include",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id }),
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
					<Nav />
					<div className="content">
						<Routes>
							<Route path="/" element={<PageWelcome />} />
							<Route path="register" element={<PageRegister />} />
							<Route path="login" element={<PageLogin />} />
						</Routes>
					</div>



					{currentUserIsInGroup('loggedInUsers') && (
						<h2>{currentUser.firstName} {currentUser.lastName}</h2>
					)}
					{currentUserIsInGroup('loggedInUsers') && (
						<div><button onClick={handle_logoutForm_logoutButton}>Logout</button></div>
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