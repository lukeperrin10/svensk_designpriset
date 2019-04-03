import * as React from 'react';
import Registration from './webapp/pages/registration'
import {Provider} from 'react-redux'
import {store} from './webapp/config/store'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/css/bootstrap-theme.css'

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
