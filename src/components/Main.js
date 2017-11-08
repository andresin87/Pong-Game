require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let yeomanImage = require('../images/yeoman.png');

import Pong from './Pong';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <div className="pong-wrapper">
          <Pong width={800} height={600}/>
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
