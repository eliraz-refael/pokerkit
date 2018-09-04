import * as React from 'react';
import Lobby from './lobby';
import Table from './table';
import NotFound from './not.found';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';
import MetaStore from './stores/meta.store';
import UserStore from './stores/user.store';
import ServicesStore from './stores/services.store';

const userStore = new UserStore();
const services = new ServicesStore();
const metaStore = new MetaStore(services);

export default class App extends React.Component<{}, {}> {

	public render(): React.ReactElement<any> {
		return (
			<Provider
				metaStore={metaStore}
				userStore={userStore}
				services={services}
			>
				<Router>
					<Switch>
						<Route exact path="/" component={Lobby} />
						<Route path="/table/:id" component={Table} />
						<Route component={NotFound} />
					</Switch>
				</Router>
			</Provider>
		);
	}
}