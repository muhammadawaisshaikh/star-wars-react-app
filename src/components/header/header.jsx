import React from 'react';
import './header.scss';
import './header.js';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {

  componentDidMount() {
  }

  render() {
    return (
      <React.Fragment>
        <div className="top-bar">
          <div className="row">
            <div className="col-md-3">
              <h3>Star Wars <b>App</b></h3>
            </div> 
          </div>
        </div>
      </React.Fragment>
    )
  }
}