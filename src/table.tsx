import * as React from 'react';
import { RouteProps, match, Redirect } from 'react-router-dom';
import { inject } from 'mobx-react';
import MetaStore from './stores/meta.store';
import ServicesStore from './stores/services.store';

interface IProps extends RouteProps {
	match: match<IParams>;
}

interface Injected extends IProps {
	metaStore: MetaStore;
	services: ServicesStore;
}

interface IParams {
	id: string;
}

interface IState {
	checking: boolean;
	exists: boolean;
}

@inject('metaStore', 'services')
export default class Table extends React.PureComponent<IProps, IState> {

	public get injected(): Injected {
		return this.props as Injected;
	}

	public constructor(props: IProps) {
		super(props);
		this.state = {
			checking: true,
			exists: false
		};
	}

	public componentDidMount(): void {
		const { match } = this.props;
		const { socket } = this.injected.services;
		socket.emit('checkTable', match.params.id);
		socket.on('tableExists', (exists: boolean) => {
			if (exists) {
				this.setState({ checking: false, exists: true });
			} else {
				this.setState({ checking: false, exists: false });
			}
		});
	}

	public render(): React.ReactElement<any> {
		const { match } = this.props;
		const { onlineCount } = this.injected.metaStore;
		if (this.state.checking) {
			return <h1>Checking if room exists...</h1>;
		}
		if (!this.state.exists) {
			return <Redirect to="/" />;
		}
		return (
			<>
				<h1>Online players: {onlineCount}</h1>
				<div>this is working id: {match.params.id}</div>
			</>
		);
	}
}