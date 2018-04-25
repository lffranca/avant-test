import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReduxPromise from 'redux-promise';
import AppBar from 'material-ui/AppBar';

import reducers from './reducers';
import News from './News';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(ReduxPromise)
));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <div style={{
            height: '100%',
            width: '100%',
            padding: 0,
            margin: 0
          }}>
            <AppBar
              title="Title"
              iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
            <div style={{
              height: 'calc(100% - 64px)',
              // backgroundColor: 'black',
              width: '80%',
              margin: '0 10% 0 10%',
            }}>

              <News />




            </div>
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
