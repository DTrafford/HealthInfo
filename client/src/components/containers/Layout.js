import React, { Component } from 'react';
import './Layout.css';
imoort { Router } from 're'
import RegisterTabs from '../components/Tabs/RegisterTabs';

class Registration extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <RegisterTabs />
      </div>
    );
  }
}

export default App;
