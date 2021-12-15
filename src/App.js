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
import FadeIn from 'react-fade-in';
import { FaSpinner } from 'react-icons/fa';

function App() {
	const { setCurrentUser, currentUser, currentUserIsInGroup, appMessage, setAppMessage } = useContext(AppContext);

	useEffect(() => {
		(async () => {
			const requestOptions = {
				method: 'GET',
				credentials: 'include'
			};
			const url = `${process.env.REACT_APP_BACKEND_URL}/currentuser`;
			const response = await fetch(url, requestOptions);
			if (response.ok) {
				const data = await response.json();

				console.log(data);
				setCurrentUser(prev => ({ ...prev, ...data.user }));
			}
		})();
	}, []);

	const handleClickAppMessage = () => {
		setAppMessage(prev => ({...prev, ...{kind: 'none', message: ''}}))
	}

	return (
		<div className="App">
			<h1>MERN Showcase App</h1>
			{!currentUser.login && (
				<FadeIn transitionDuration="800">
					<div className="spinnerGroup"><FaSpinner className="spinner" /><span className="spinnerText"> Loading...</span></div>
				</FadeIn>
			)}
			{currentUser.login && (
				<>
					{currentUserIsInGroup('loggedInUsers') && (
						<h2>{currentUser.firstName} {currentUser.lastName}</h2>
					)}
					<FadeIn transitionDuration="200">
						<Nav />
						{appMessage.kind !== 'none' && (
							<div className="appMessage" title="close" onClick={handleClickAppMessage}>{appMessage.message}</div>
						)}
						<div className="content">
							<Routes>
								<Route path="/" element={<PageWelcome />} />
								<Route path="register" element={<PageRegister />} />
								<Route path="admin" element={<PageAdmin />} />
								<Route path="login" element={<PageLogin />} />
								<Route path="logout" element={<PageLogout />} />
							</Routes>
						</div>
					</FadeIn>
				</>
			)}
		</div>
	);
}

export default App;