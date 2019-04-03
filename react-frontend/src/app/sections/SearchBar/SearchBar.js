import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import axios from "axios";
import "./SearchBar.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.searchEvents = this.searchEvents.bind(this);
    this.state = {
      searchText: "",
      searchType: "artist"
    }
  }

  render() {
      const { searchText, searchType } = this.state;
      return (
          <div className="complete-bar">
            <input type="text" name="searchText" value={searchText} onChange={this.onChange} />
            <select name="searchType" value={searchType} onChange={this.onChange}>
                <option value="artist">Artiste</option>
                <option value="title">Titre</option>
            </select>
            <Button className="fa fa-search" onClick={this.searchEvents}/>
          </div>
      )
    }

    onChange(event) {
      const { target: { name, value } } = event;
      this.setState({
        [name]: value
      })
    }

    searchEvents() {
      const { searchText, searchType } = this.state;
      axios.get(`https://sitevente1-serveur.herokuapp.com/events/search?searchType=${searchType}&searchText=${searchText}`)
      .then(response => {
        this.props.updateEvents(response.data.events);
      })
    }
}

export default SearchBar;