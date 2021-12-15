import { createContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {

	const [currentUser, setCurrentUser] = useState({});
	const [appMessage, setAppMessage] = useState({kind:"none", message: ""});

	const currentUserIsInGroup = (accessGroup) => {
		const accessGroupArray = currentUser.accessGroups.split(',').map(m => m.trim());
		return accessGroupArray.includes(accessGroup);
	};

	const initializePage = () => {
		setAppMessage(prev => ({ ...prev, ...{ kind: 'none', message: '' } }));
	}

	return (
		<AppContext.Provider value={{
			currentUser,
			setCurrentUser,
			currentUserIsInGroup,
			appMessage, 
			setAppMessage,
			initializePage
		}} >
			{children}
		</AppContext.Provider>
	);
};

export default AppContext;