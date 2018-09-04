import * as React from 'react';
import ServicesStore from './stores/services.store';
import { Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import OnlineCountComponent from './components/online.count.component';

interface IProps { }

interface Injected extends IProps {
	services: ServicesStore;
}
interface IState {
	tableId: string | null;
}

@inject('services')
@observer
export default class Lobby extends React.Component<IProps, IState> {

	public inputTableId: HTMLInputElement | null;

	public constructor(props: IProps) {
		super(props);
		this.state = {
			tableId: null
		};
		this.newTable = this.newTable.bind(this);
		this.joinTable = this.joinTable.bind(this);
	}

	public get injected(): Injected {
		return this.props as Injected;
	}

	public componentDidMount(): void {
		const { socket } = this.injected.services;
		socket.on('newTable', (tableId: string) => {
			this.setState({ tableId });
		});
		socket.on('joinedTable', (tableId: string) => {
			this.setState({ tableId });
		});
	}

	public newTable(): void {
		const { socket } = this.injected.services;
		socket.emit('newTable');
	}

	public joinTable(): void {
		const { socket } = this.injected.services;
		socket.emit('joinTable', this.inputTableId!.value);
	}

	public render(): React.ReactElement<any> {
		if (this.state.tableId) {
			const redirect = {
				pathname: `table/${this.state.tableId}`,
				state: { roomExists: true }
			};
			return <Redirect to={redirect} />;
		}
		return (
			<section>
				<h1>Welcome to PookerKit</h1>
				<OnlineCountComponent />
				<div>
					<button onClick={this.newTable}>Create new table</button>
				</div>
				<div>
					<h3>Join existing table</h3>
					<label htmlFor="tableId">Table id:</label>
					<input type="text" ref={(ref) => this.inputTableId = ref} />
					<button onClick={this.joinTable}>Join</button>
				</div>
			</section>
		);
	}
}