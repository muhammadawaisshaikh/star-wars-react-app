import React from "react";
import "./home.scss";

import axios from "axios";
import FilterResults from 'react-filter-search';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: ''
    };
  }
  componentWillMount() {
      axios.get(`https://swapi.co/api/films`).then(res => {
      const films = res.data.results;

      console.log(films);

      this.setState({
        data: films
      });
    });

  }

  handleChange = event => {
    const { value } = event.target;
    this.setState({ value });
  };

  render() {
    const { data, value } = this.state;
    return (
        <React.Fragment>

        <div>

        <div className="form-group">
          <input type="text" value={value} onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search Film" />
        </div>

          <FilterResults
            value={value}
            data={data}
            renderResults={results => (
              <div>
                {results.map((value, index) => (
                  <div  className="film border-bottom" key={index}>
                    <h3><b>{value.title}</b></h3>
                    <p className="py-2">{value.release_date}</p>
                    <p>{value.opening_crawl}</p>
                  </div>
                ))}
              </div>
            )}
          />
        </div>

        </React.Fragment>
      );
  }
}