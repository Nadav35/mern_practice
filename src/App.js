import React, { Component } from 'react';
import './App.css';
import 'aframe';
import 'aframe-physics-system';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hit: false,
      resetId: 0,
      score: 0
    };
    this.$ = this.$.bind(this);
    this.$$ = this.$$.bind(this);
    this.on = this.on.bind(this);
    this.resetBall = this.resetBall.bind(this);
  }

  $(sel) {
    return document.querySelector(sel);
  }
  $$(sel) {
    return document.querySelectorAll(sel);
  }
  on(elem,type,hand) {

    // window.addEventListener(elem, type, hand);
    elem.addEventListener(type,hand);
  }
  resetBall() {
    clearTimeout(this.state.resetId);
    this.$("#ball").body.position.set(0, 0.6, -4);
    this.$("#ball").body.velocity.set(0,5,0);
    this.$("#ball").body.angularVelocity.set(0,0,0);
    this.setState({hit: !this.state.hit});
    let id = setTimeout(this.resetBall, 6000);
    this.setState({resetId: id });
  }
  componentDidMount() {
   
    this.on(this.$("#weapon"), 'collide', (e) => {
      const ball = this.$("#ball");
      if(e.detail.body.id === ball.body.id && !this.state.hit) {
        this.setState({hit: true, score: this.state.score + 1});
        this.$("#score").setAttribute('text', 'value', 'Score ' + this.state.score);
        clearTimeout(this.state.resetId);
        let id = setTimeout(this.resetBall, 2000);
        this.setState({resetId: id});
      }
    });
    
    setTimeout(this.resetBall, 3000);
  }
  render() {
    return (
      <a-scene stats physics="debug:true;">
        <a-entity camera look-controls position="0 1.5 0">
          <a-text id="score" value="Score" position="-0.2 -0.5 -1" color="black" width="5" anchor="left"></a-text>
          <a-cursor></a-cursor>
          <a-entity position="0 0 -3" id="weapon">
            <a-box 
              color='blue' 
              width='0.25' 
              height='0.5' 
              depth='3'
              static-body></a-box>
          </a-entity>
        </a-entity>
        <a-entity 
          id='ball'
          position="0 1 -4"
          material="color:green;"
          geometry="primitive:sphere; radius: 0.5;"
          dynamic-body
        ></a-entity>
        <a-plane
          color='red'
          static-body
          rotation="-90 0 0"
          width="100"
          height="100"
        ></a-plane>
 
      </a-scene>
    );
  }
}

export default App;
