import * as React from 'react';
import { RouteProps, match } from 'react-router-dom';

interface IProps extends RouteProps {
	match: match<IParams>;
};

interface IParams {
	id: string;
}

interface IState { };

export default class Table extends React.PureComponent<IProps, IState> {
	
	public render(): React.ReactElement<any> {
		const { match } = this.props;
		return (
			<div>this is working id: {match.params.id}</div>
		);
	}
}