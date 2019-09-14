import React from "react";
import "./details.scss";

import axios from "axios";

export default class Details extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        loading: 0,
        data: [],
    };
  }

  componentWillMount() {
    axios.get(localStorage.getItem('url')).then(res => {
    const film = res.data;

    console.log(film);

    this.setState({
        loading: 1,
        data: film
    });
  });

}

goBack() {
    window.history.back();
}

  render() {
    const data = this.state.data;
    if (this.state.loading === 1) {
        return (
            <React.Fragment>

            <a className="btn btn-info" onClick={() => this.goBack()}>Go Back</a>    
            <hr/>
    
            <div>
                <h4>Film Name: {data.title} <span className="float-right">{data.director}</span></h4>
                <p className="py-2">Release Date: {data.release_date}</p>
                <hr/>
                <p>Description: {data.opening_crawl}</p>
            </div>
            
            <hr/>
            <h4 className="py-2">Planets</h4>
            {
                data.planets.map((value, index) => {
                return <div className="project" key={index}>
                            <p>{value}</p>
                        </div>
                })
            }

            <hr/>
            <h4 className="py-2">Species</h4>
            {
                data.species.map((value, index) => {
                return <div className="project" key={index}>
                            <p>{value}</p>
                        </div>
                })
            }

            <hr/>
            <h4 className="py-2">Starships</h4>
            {
                data.starships.map((value, index) => {
                return <div className="project" key={index}>
                            <p>{value}</p>
                        </div>
                })
            }

            <hr/>
            <h4 className="py-2">Vehicles</h4>
            {
                data.vehicles.map((value, index) => {
                return <div className="project" key={index}>
                            <p>{value}</p>
                        </div>
                })
            }

            <hr/>
    
            </React.Fragment>
          );
    } else {
        return (
            <React.Fragment>
    
            <div>
                <p>Loading ...</p>
            </div>
    
            </React.Fragment>
          );
    }
  }
}