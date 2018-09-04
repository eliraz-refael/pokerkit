import * as React from 'react';
import { inject } from 'mobx-react';
import MetaStore from '../stores/meta.store';

interface IProps { }
interface Injected extends IProps {
	metaStore: MetaStore;
}

@inject('metaStore')
export default class OnlineCountComponent extends React.PureComponent {

	public get injected(): Injected {
		return this.props as Injected;
	}

	public render(): React.ReactElement<any> {
		const { onlineCount } = this.injected.metaStore;
		return <div>Players online: {onlineCount}</div>;
	}
}