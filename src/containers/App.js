import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import './App.css';

import { setSearchField } from '../actions';

const mapStateToProps = state => ({
  searchField: state.searchField
});

const mapDispatchToProps = dispatch => ({
  onSearchChange: (event) => dispatch(setSearchField(event.target.value))
});

class App extends Component {
  constructor(){
    super();

    this.state = {
      robots : [], 
      searchField : ''
    };
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then( (response) => response.json() )
    .then( (users) => { this.setState({ robots: users }) } );
  }

  render(){
    const { robots } = this.state;
    const { searchField, onSearchChange } = this.props;
    const filteredRobots = robots.filter( (robot) => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    } );

    return !robots.length ? 
    <h1 className="tc">Loading...</h1> :
    (
      <div className="tc">
        <h1>RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>
    )    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
