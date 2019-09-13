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
        {
          films.map((value, index) => {
          return <div className="film border-bottom" key={index}>
                    <div className="companyLogo imageProps" style={{ backgroundImage: 'url('+value.imgUrl+')' }}></div>
                    <h3><b>{value.title}</b></h3>
                    <p className="py-2">{value.release_date}</p>
                    <p>{value.opening_crawl}</p>
                  </div>
          })
        }
        </div>

        </React.Fragment>
      );
  }
}