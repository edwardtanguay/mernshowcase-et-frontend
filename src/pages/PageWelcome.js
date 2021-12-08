import { useContext } from 'react';
import AppContext from '../AppContext';

const PageWelcome = () => {
	const { currentUserIsInGroup } = useContext(AppContext);
	return (
		<>
			{currentUserIsInGroup('notYetApprovedUsers') && (
				<>
					<div className="panel">
						<h3>Thank you for registering!</h3>
						An administrator will approve your account as soon as possible.
					</div>
				</>
			)}
			{currentUserIsInGroup('loggedOutUsers') && (
				<>
<p>Welcome to this site.</p>
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
		</>
	)
}

export default PageWelcome;