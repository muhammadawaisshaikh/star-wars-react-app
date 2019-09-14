import React from "react";
import "./details.scss";

import axios from "axios";

export default class Details extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentWillMount() {
    axios.get(`https://swapi.co/api/films/1`).then(res => {
    const film = res.data;

    console.log(film);

    this.setState({
      data: film
    });
  });

}

  render() {
    const { data } = this.state.data;
    return (
        <React.Fragment>

        <div>

        </div>

        </React.Fragment>
      );
  }
}