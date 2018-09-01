import * as React from 'react';
import Lobby from './lobby';
import Table from './table';
import NotFound from './not.found';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// @ts-ignore
import { Provider } from 'react-mobx';

interface IProps { };
interface IState { };

export default class App extends React.Component<IProps, IState> {

	public render(): React.ReactElement<any> {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Lobby} />
					<Route path="/table/:id" component={Table} />
					<Route component={NotFound} />
				</Switch>
			</Router>
		);
	}
}