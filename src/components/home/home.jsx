import React from "react";
import "./home.scss";

import axios from "axios";
import FilterResults from 'react-filter-search';
import { HashLink as Link } from 'react-router-hash-link';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      favourites: [],
      value: ''
    };
  }
  componentWillMount() {
      axios.get(`https://swapi.co/api/films`).then(res => {
      const films = res.data.results;

      console.log(films);

      this.setState({
        data: films,
        favourites: JSON.parse(localStorage.getItem("items"))
      });
      console.log(this.state.favourites);
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
    this.setState({
      favourites: JSON.parse(localStorage.getItem("items"))
    });
  }

  // remove favrourite
  removeFav(index){

      var items = JSON.parse(localStorage.getItem("items")).splice(index, 1);
      localStorage.setItem('items', JSON.stringify(items));
      
      // update state with newly marked favourite films
      this.setState({
        favourites: JSON.parse(localStorage.getItem("items"))
      });

    console.log(index);
  }

  passUrl(url) {
    localStorage.setItem('url', url);
  }

  render() {

    const { data, value } = this.state;
    const mainSlide = "https://www.movienewsletters.net/media/slider/1200x444/249997.jpg";
    const avatarFilm = "https://scitechdaily.com/images/Star-Wars-The-Rise-of-Skywalker.jpg";

    if (this.state.favourites !== null) {
      return (
        <React.Fragment>

        <div>

        <div className="main-slide">
          <img src={mainSlide} alt="Star Wars"/>
        </div>

        <div className="form-group">
          <input type="text" value={value} onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search Film" />
        </div>

          {
            this.state.favourites.map((value, index) => {
              return (
                  <div className="film border-bottom" key={index}>
                    <div className="container">
                      <div className="row">
                        <div className="col-3">
                          <img className="film-avatar" src={avatarFilm} alt="Star Wars"/>
                        </div>
                        <div className="col-9">
                          <a onClick={() => this.removeFav(index)} className="badge badge-pill badge-danger py-2 px-4 mt-2 float-right">Remove Favourite</a>
                          <h3><b>{value.title}</b></h3>
                          <p className="py-2">{value.release_date}</p>
                          <p>{value.opening_crawl}</p>
                          <Link className="btn btn-primary mt-3" to="/details" onClick={() => this.passUrl(value.url)}>View Details</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
          }

          <FilterResults
            value={value}
            data={data}
            renderResults={results => (
              <div>
                {results.map((value, index) => (
                  <div className="film border-bottom" key={index}>
                    <div className="container">
                      <div className="row">
                        <div className="col-3">
                          <img className="film-avatar" src={avatarFilm} alt="Star Wars"/>
                        </div>
                        <div className="col-9">
                          <a onClick={() => this.markFav(value)} className="badge badge-pill badge-success py-2 px-4 mt-2 float-right">Mark Favourite</a>
                          <h3><b>{value.title}</b></h3>
                          <p className="py-2">{value.release_date}</p>
                          <p>{value.opening_crawl}</p>
                          <Link className="btn btn-primary mt-3" to="/details" onClick={() => this.passUrl(value.url)}>View Details</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          />
        </div>

        </React.Fragment>
      );
    }
    else {
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
                    <Link className="btn btn-primary mt-3" to="/details">View Details</Link>
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
}