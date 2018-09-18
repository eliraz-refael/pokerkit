import * as React from 'react';
import { RouteProps, match, Redirect } from 'react-router-dom';
import { inject } from 'mobx-react';
import MetaStore from './stores/meta.store';
import ServicesStore from './stores/services.store';
import OnlineCountComponent from './components/online.count.component';

interface IProps extends RouteProps {
	match: match<IParams>;
}

interface Injected extends IProps {
	services: ServicesStore;
}

interface IParams {
	id: string;
}
interface IState {
	checking: boolean;
	exists: boolean;
}

@inject('services')
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
		if (this.state.checking) {
			return <h1>Checking if room exists...</h1>;
		}
		if (!this.state.exists) {
			return <Redirect to="/" />;
		}
		return (
			<>
				<OnlineCountComponent />
				<div>Table id: {match.params.id}</div>
				<div>
					<label htmlFor="name">Your Name:</label>
					<input type="text" name="name" id="name"/>
				</div>
			</>
		);
	}
}