import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hydrate, render } from "react-dom";
import App from './App';
import './index.css';
// import registerServiceWorker from './registerServiceWorker';
import {unregister} from './registerServiceWorker'


/* Without react-snap:  */

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);


unregister();
// registerServiceWorker();



/* With react-snap:  */

// const rootElement = document.getElementById("root");
// if (rootElement && rootElement.hasChildNodes()) {
//   hydrate(<App />, rootElement);
// } else {
//   render(<App />, rootElement);
//}
