import React, { Component } from 'react';
import './style.css';
import { Card, CardTitle, Row, Col } from 'react-materialize';
import asanaJson from '../../asana2.json';

class SelectedPage extends Component {
  state = {
    filteredAsana: asanaJson,
    selectArray: localStorage.getItem("selectString").split(",").map(Number)
  };

  componentDidMount() {
    this.filterAsana();
  }

  checkString = () => console.log(this.state.selectArray)

  // Change the order of the array
  moveUpOrder = (event) => {
    event.preventDefault();
    var currentIndex = this.state.selectArray.indexOf(parseInt(event.target.id));
    var newArray = this.state.selectArray;

    var element = newArray[currentIndex];
    newArray.splice(currentIndex, 1);
    newArray.splice((currentIndex -1), 0, element);
    // save the new array to state
    this.setState({
      selectArray: newArray
    })
    // re-render cards
    this.filterAsana();
  }

  moveDownOrder = (event) => {
    event.preventDefault();
    var currentIndex = this.state.selectArray.indexOf(parseInt(event.target.id));
    var newArray = this.state.selectArray;

    var element = newArray[currentIndex];
    newArray.splice(currentIndex, 1);
    newArray.splice((currentIndex +1), 0, element);
    // save the new array to state
    this.setState({
      selectArray: newArray
    })
    // re-render cards
    this.filterAsana();
  }

  // Takes the selectArray and generates a new JSON with only the selected poses
  filterAsana = () => {
    let newList = [];
    for (let i = 0; i < this.state.selectArray.length; i++) {
      for (let j = 0; j < this.state.filteredAsana.length; j++) {
        if (this.state.selectArray[i] === this.state.filteredAsana[j].id) {
          newList.push(this.state.filteredAsana[j]);
          break;
        }
      }
    }
    this.setState({
      filteredAsana: newList
    })
  }

  // Generates cards for each pose 'asana' in the filteredAsana object
  _renderPose(asana) {
    const { id, sanskrit_name, english_name, img_url, targetArea, translation, category, cues } = asana;
    return (
      <Col l={3} m={6} s={12} >
        <Card key={id} header={<CardTitle image={img_url} />}
          title={english_name}
          reveal={<div><p>{cues}</p><p>Category: {category}</p><p>Great for targeting: {targetArea}</p><p>Translation: {translation}</p></div>}>
          <span>{sanskrit_name}</span>

          <a className="btn upBtn" 
          href={id} id={id} 
          disabled={this.state.selectArray.indexOf(parseInt(id))=== 0 ? true : false} 
          onClick={this.moveUpOrder}>
          <i className="material-icons left">arrow_upward</i>Move Up</a>
          
          <a className="btn downBtn"           
          href={id} id={id} 
          disabled={this.state.selectArray.indexOf(parseInt(id))=== this.state.selectArray.length-1 ? true : false} 
          onClick={this.moveDownOrder}><i className="material-icons left">arrow_downward</i>Move Down</a>
        </Card>
      </Col>
    );
  }

  // Renders on the DOM here
  render() {
    return (
      <div className="cardDiv">
        <p id="instruct">Move your selected poses into your desired order with arrow buttons</p>
        <button onClick={this.checkString}>Check the string again</button>
        <Row>
          {this.state.filteredAsana.map((this._renderPose).bind(this))}
        </Row>
      </div>
    );
  }
}

export default SelectedPage;