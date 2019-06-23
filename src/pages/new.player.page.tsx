import * as React from 'react';
import { socket, PLAYER_ID_KEY } from '../config';
import { Redirect } from 'react-router';

const { useState, useEffect } = React;

const NewPlayerPage: React.SFC = () => {
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);
	const [toLobby, setToLobby] = useState(false);

	const registerPlayer = () => {
		socket.emit('newPlayer', name);
		setLoading(true);
	}

	useEffect(() => {
		socket.once('playerRegistered', (playerId: string) => {
			sessionStorage.setItem(PLAYER_ID_KEY, playerId);
			setToLobby(true);
		});
		return () => { socket.off('playerRegistered') };
	}, []);
	
	if (toLobby) {
		return <Redirect to="/" />
	}

	if (loading) {
		return <section>Registering...</section>;
	}

	return (
		<section>
			<label htmlFor="playerName">Your Name:</label>
			<input type="text" onChange={e => setName(e.currentTarget.value)} />
			<button onClick={registerPlayer}>Next</button>
		</section>
	);
}

export default NewPlayerPage;
