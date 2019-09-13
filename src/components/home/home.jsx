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

  // mark favourite
  items = [];
  markFav(event) {
    this.items.push(event);
    localStorage.setItem('items', JSON.stringify(this.items));
    console.log(this.items);

    alert(event.title+' Film Marked as Favourite');

    // update state with newly marked favourite films 
    this.setState(prevState => ({
      data: [ event, ...prevState.data]
    }));

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
                  <div className="film border-bottom" key={index}>
                    <a onClick={() => this.markFav(value)} className="badge badge-pill badge-success py-2 px-4 mt-2 float-right">Mark Favourite</a>
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