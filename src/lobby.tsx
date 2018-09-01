import * as React from 'react';
import io from 'socket.io-client';
import config from './config';

interface ICard {
	value: number;
	suit: string;
}
interface IProps { };
interface IState {
	tableId: string | null;
	onlineCount: number;
};
const socket = io(config.localServer);

export default class Lobby extends React.Component<IProps, IState> {

	public constructor(props: IProps) {
		super(props);
		this.state = {
			tableId: null,
			onlineCount: 0
		}
		this.newTable = this.newTable.bind(this);
	}

	public componentDidMount() {
		socket.on('newTable', (tableId: string) => {
			this.setState({ tableId });
		});
		socket.on('onlineCount', (onlineCount: number) => {
			this.setState({ onlineCount });
		});
	}

	public newTable() {
		socket.emit('newTable');
	}

	public render(): React.ReactElement<any> {
		const { onlineCount } = this.state;
		const count = <h2>{onlineCount} are online</h2>

		if (this.state.tableId) {
			return (
				<>
					{count}
					<h1>Table Id: {this.state.tableId}</h1>
				</>
			)
		}
		return (
			<section>
				<h1>Welcome to PookerKit</h1>
				{count}
				<div>
					<button onClick={this.newTable}>Create new table</button>
				</div>
				<div>
					<h3>Join existing table</h3>
					<label htmlFor="tableId">Table id:</label>
					<input type="text"/>
				</div>
			</section>
		)
	}
}