import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'mobx-react'
import { GeneralStore as generalStore } from './stores/GeneralStore'
import { ClientGeneralStore as clientGeneralStore } from './stores/ClientGeneralStore'
import { ActionsGeneralStore as actionsGeneralStore } from './stores/ActionsGeneralStore'
import { ClientStore as clientStore } from './stores/ClientStore'

const GeneralStore = new generalStore()
const ClientStore = new clientStore()
const ClientGeneralStore = new clientGeneralStore()
const ActionsGeneralStore = new actionsGeneralStore()

const stores = {
  GeneralStore,
  ClientStore,
  ClientGeneralStore,
  ActionsGeneralStore
}

ReactDOM.render(
  <React.StrictMode>
    <Provider {...stores}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
