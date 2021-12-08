import { useContext } from 'react';
import AppContext from '../AppContext';

const PageRegister = () => {
	const { siteStatus} = useContext(AppContext);
	return (
		<>
			<p>This is the register page. </p>
			<p>The current status is: <span className="highlight">{siteStatus}</span></p>
		</>
	)
}

export default PageRegister;