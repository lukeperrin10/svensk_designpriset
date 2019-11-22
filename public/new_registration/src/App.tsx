import * as React from 'react';
// import Registration from './webapp/pages/registration'
import {Provider} from 'react-redux'
import {store} from './webapp/config/store'
import Navigation from './webapp/components/navigation';
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/css/bootstrap-theme.css'

class App extends React.Component {
  	public render() {
    	return (
			<Provider store={store}>
				{/* <Registration /> */}
				<Navigation />
			</Provider>
    	);
  	}
}

export default App;
