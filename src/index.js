import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { AppLayout } from './appLayout';

const Root = () => {
  return (
    <AppLayout></AppLayout>
  );
}

ReactDOM.render(Root(), document.getElementById('root'));
