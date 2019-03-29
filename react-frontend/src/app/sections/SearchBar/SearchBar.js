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
            <select name="searchType" onChange={this.onChange}>
                <option value="artist">Artiste</option>
                <option value="title">Titre</option>
            </select>
            <Button onClick={this.searchEvents}>
              Rechercher
            </Button>
          </div>
      )
    }

    onChange(event) {
      const { target: { name, value } } = event;
      console.log(value)
      this.setState({
        [name]: value
      })
    }

    searchEvents() {
      console.log(this.state)
      const { searchText, searchType } = this.state;
      // axios({
      //   method:"GET",
      //   url:"http://localhost:4000/events/search",
      //   params:{
      //     searchType:"artist",
      //     searchext:"a"
      //   }
      // })
      axios.get(`http://localhost:4000/events/search?type=artist&text=a`)
      .then(response => {
        console.log(response.data.events)
        //this.props.updateEvents(response.data.events)
        //this.setState({ evenements: response.data.events, loading: false })
      })
    }
}

export default SearchBar;