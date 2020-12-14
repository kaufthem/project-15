import React, { Component } from 'react';
import './css/index.css';
import './App.css';
import {
  Route,
  BrowserRouter,
  Switch,
  Redirect
} from 'react-router-dom';
import axios from 'axios';
import apiKey from './config.js';

//import components
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import Gallery from './components/Gallery';
import Error404 from './components/Error404';

//create the App component
class App extends Component {
  state = {
    images: [],
    query: "",
    cats: [],
    dogs: [],
    computers: [],
    loading: true
  }

  componentDidMount() {
    //Axios gets the images for the cats, dogs, and computers categories
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&page=1&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({cats: response.data.photos.photo, loading: false});
      }).catch(error => {console.log('Error fetching and parsing data', error);});

    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&page=1&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({dogs: response.data.photos.photo, loading: false});
      }).catch(error => {console.log('Error fetching and parsing data', error);});

    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=computers&per_page=24&page=1&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({computers: response.data.photos.photo, loading: false});
      }).catch(error => {console.log('Error fetching and parsing data', error);});
    
    //Allows browser navigation to work for the search route
    window.onpopstate = () => {
      const urlSplit = window.location.href.split("search?q=");
      if(urlSplit.length > 1) {
        this.performSearch(urlSplit[1]);
      }
    }
  }

  //Axios gets the images that correspond to the search query
  performSearch = (query) => {
    this.setState({loading: true});
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&page=1&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({query: query, images: response.data.photos.photo, loading: false});
      }).catch(error => {console.log('Error fetching and parsing data', error);});
  }

  //Renders all components including the route elements for cats, dogs, computers, and search
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.performSearch}/>
          <Nav/>
          { this.state.loading ? <p>Loading...</p> : 
          <Switch>
            <Route exact path="/" render={ () => <Redirect to='/cats' />} />
            <Route path="/cats" render={ () => <Gallery title="Cats" images={this.state.cats} /> } />
            <Route path="/dogs" render={ () => <Gallery title="Dogs" images={this.state.dogs} /> } />
            <Route path="/computers" render={ () => <Gallery title="Computers" images={this.state.computers} /> } />
            <Route path="/search" render={ () => <Gallery title={this.state.query} images={this.state.images} />} />
            <Route component={Error404} />
          </Switch> }
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
