import * as React from 'react';
import Lobby from './pages/lobby.page';
import Table from './table';
import NotFound from './not.found';
import NewPlayerPage from './pages/new.player.page';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App: React.SFC = () => {

	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Lobby} />
				<Route exact path="/new-player" component={NewPlayerPage} />
				<Route path="/table/:id" component={Table} />
				<Route component={NotFound} />
			</Switch>
		</Router>
	);
}

export default App;
