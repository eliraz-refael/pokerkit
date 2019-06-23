import * as React from 'react';
import { socket, PLAYER_ID_KEY } from '../config';
import { Redirect } from 'react-router';
import { checkPlayerEffect } from '../effects/check.player.effect';
import { onlineCountEffect } from '../effects/online.count.effect';

const { useState, useEffect } = React;

const Lobby: React.SFC = () => {
	const [onlineCount, setOnlineCount] = useState(0);
	const [tableId, setTableId] = useState('');
	const [toPlayerCreationPage, setToPlayerCreationPage] = useState(false);
	
	useEffect(checkPlayerEffect(setToPlayerCreationPage), []);

	useEffect(onlineCountEffect(setOnlineCount), []);

	if (toPlayerCreationPage) {
		return <Redirect to="/new-player" />;
	}

	return (
		<section>
			<h1>Welcome to PookerKit</h1>
			<h2>{onlineCount} are online</h2>
			<div>
				<button onClick={() => socket.emit('newTable')}>Create new table</button>
			</div>
			<div>
				<h3>Join existing table</h3>
				<label htmlFor="tableId">Table id:</label>
				<input type="text" />
			</div>
		</section>
	)
}

export default Lobby;
