import { createContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [siteStatus, setSiteStatus] = useState('development');

	const toggleStatus = () => {
		setSiteStatus(siteStatus === 'development' ? 'live' : 'development');
	}

	const [currentUser, setCurrentUser] = useState({});

	const currentUserIsInGroup = (accessGroup) => {
		const accessGroupArray = currentUser.accessGroups.split(',').map(m => m.trim());
		return accessGroupArray.includes(accessGroup);
	}

	return (
		<AppContext.Provider value={{
			siteStatus,
			setSiteStatus,
			toggleStatus,
			currentUser,
			setCurrentUser,
			currentUserIsInGroup
		}} >
			{children}
		</AppContext.Provider>
	);
};

export default AppContext;