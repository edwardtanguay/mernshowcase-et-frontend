import { useContext } from 'react';
import AppContext from '../AppContext';

const PageWelcome = () => {
	const { siteStatus, toggleStatus} = useContext(AppContext);
	return (
		<>
			<p>This is the welcome page. </p>
			<p>The current status is: <span className="highlight">{siteStatus}</span></p>
		<p><button onClick={toggleStatus}>Toggle Status</button></p>
		</>
	)
}

export default PageWelcome;