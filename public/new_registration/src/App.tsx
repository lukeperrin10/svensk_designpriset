import * as React from 'react';
import Registration from './webapp/pages/registration'
import {Provider} from 'react-redux'
import {store} from './webapp/config/store'

class App extends React.Component {
  	public render() {
    	return (
			<Provider store={store}>
				<Registration />
			</Provider>
    	);
  	}
}

export default App;
