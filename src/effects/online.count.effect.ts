import { socket } from '../config';

type Action<T> = React.Dispatch<React.SetStateAction<T>>;

export const onlineCountEffect = (setOnlineCount: Action<number>) => () => {
	socket.on('onlineCount', (count: number) => {
		setOnlineCount(count);
	});
	return () => {
		socket.off('onlineCount');
	};
}