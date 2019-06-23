import { socket, PLAYER_ID_KEY } from '../config';

type Action<T> = React.Dispatch<React.SetStateAction<T>>;

export const checkPlayerEffect = (setToPlayerCreationPage: Action<boolean>) => () => {
	const playerId = sessionStorage.getItem(PLAYER_ID_KEY);
	if (!playerId) {
		console.log('redirecting');
		setToPlayerCreationPage(true);
	}
	socket.emit('checkPlayerId', playerId);
	socket.on('playerNotExists', () => {
		sessionStorage.removeItem(PLAYER_ID_KEY);
		setToPlayerCreationPage(true);
	});
	return () => {
		socket.off('playerNotExists');
	};
}