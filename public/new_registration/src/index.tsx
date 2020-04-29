import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hydrate, render } from "react-dom";
import App from './App';
import './index.css';
// import registerServiceWorker from './registerServiceWorker';
import {unregister} from './registerServiceWorker'


const isProd = process.env.NODE_ENV === "production"

const rootElement = document.getElementById("root");
if (isProd && rootElement && rootElement.hasChildNodes()) {
	hydrate(<App />, rootElement);
} else {
	render(<App />, rootElement);
}

unregister();
// registerServiceWorker();
