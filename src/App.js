/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import './App.scss';
import Nav from './components/Nav';
import PageWelcome from './pages/PageWelcome';
import PageRegister from './pages/PageRegister';
import PageAdmin from './pages/PageAdmin';
import PageLogin from './pages/PageLogin';
import PageLogout from './pages/PageLogout';

import { useContext } from 'react';
import AppContext from './AppContext';

function App() {
	const { setCurrentUser, currentUser, currentUserIsInGroup } = useContext(AppContext);

	useEffect(() => {
		(async () => {
			const requestOptions = {
				method: 'GET',
				credentials: 'include'
			};
			const response = await fetch(`${process.env.BACKEND_URL}/currentuser`, requestOptions); if (response.ok) {
				const data = await response.json();
				setCurrentUser(prev => ({ ...prev, ...data.user }));
			}
		})();
	}, []);

	return (
		<div className="App">
			<div>testing</div>
			{currentUser.login && (
				<>
					<h1>MERN Showcase App</h1>
					{currentUserIsInGroup('loggedInUsers') && (
						<h2>{currentUser.firstName} {currentUser.lastName}</h2>
					)}
					<Nav />
					<div className="content">
						<Routes>
							<Route path="/" element={<PageWelcome />} />
							<Route path="register" element={<PageRegister />} />
							<Route path="admin" element={<PageAdmin />} />
							<Route path="login" element={<PageLogin />} />
							<Route path="logout" element={<PageLogout />} />
						</Routes>
					</div>
				</>
			)}
		</div>
	);
}

export default App;