import React from "react";
import "./home.scss";

import axios from "axios";

export default class Home extends React.Component {

  state = {
    films : []        
  };

  componentDidMount() {
    axios.get(`https://swapi.co/api/films`).then(res => {
      const films = res.data.results;

      console.log(films);

      this.setState({
        films: films
      });

    });
  }

  render() {
    const films = this.state.films;
    return (
        <React.Fragment>
  
        <div className="home">
          <div className="row">
          {
            films.map((value, index) => {
            return <div className="col-sm-6 py-3" key={index}>
                      <div className="card text-center">
                        <div className="card-header">
                        {value.title} <b>Movie</b>
                        </div>
                        <div className="card-body">
                          <h5 className="card-title"><b>{value.title}</b></h5>
                          <p className="card-text">{value.opening_crawl}</p>
                          <a href="#" className="btn btn-primary">More Details</a>
                        </div>
                        <div className="card-footer text-muted">
                          <b>Release Date:</b> {value.release_date}
                        </div>
                      </div>
                    </div>
            })
          }
          </div>
        </div>

        </React.Fragment>
      );
  }
}