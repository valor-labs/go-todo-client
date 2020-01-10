import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { AppLayout } from './appLayout';

import { StoreProvider } from "./store";
import reducers from "./reducers"
import initialState from "./store/initialState"

const Root = () => {
  return (
    <StoreProvider initialState={initialState} reducer={reducers}>
      <AppLayout></AppLayout>
    </StoreProvider>
  );
}

ReactDOM.render(Root(), document.getElementById('root'));
