import { createStore, applyMiddleWare } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducers from './reducers';

const initialState = {};
const middleware = [thunk];

export const store = createStore(
  rootReducers,
  initialState,
  composeWithDevTools(applyMiddleWare(...middleware))
);

export default store;
