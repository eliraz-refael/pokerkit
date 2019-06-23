import * as React from 'react';
import { RouteProps, match } from 'react-router-dom';

interface IParams {
	id: string;
}

interface IProps extends RouteProps {
	match: match<IParams>;
};

const Table: React.SFC<IProps> = (props) => {
	const { match } = props;
	return (
		<div>this is working id: {match.params.id}</div>
	);
}

export default Table;