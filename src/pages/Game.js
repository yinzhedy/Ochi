import React, { Component } from "react";
import Game from '../classes/game';
import Character from '../components/Character';
import Actor from "../components/Actor";

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 1000;


  // sprite code
  const data = {
    h: 32,
    w: 32,
  }
  // sprite code
  class Ochi extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isGameRunning: false
      };
      this.canvasRef = React.createRef();
    }
  
    componentDidMount = () => {
      
      this.start();
    };
  
    start = async () => {
      if (!this.state.isGameRunning) {
        this.game = new Game(this.getContext());
        await this.game.init();
        this.renderGame();
      }
      this.setState(state => ({ isGameRunning: !state.isGameRunning }));
    };
  
    renderGame = () => {
      requestAnimationFrame((elapsed) => {
        this.game.render(elapsed);
  
        if (this.state.isGameRunning) {
          this.renderGame();
        }
      });
    };
  
    getContext = () => this.canvasRef.current.getContext("2d");

    

  render() {
  return (
    <div>
        <div id="gameContainer" className="gameContainer">
          <canvas
            ref={this.canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
          />
            <div className='zone-container'>
              <Character skin="$Lanto180" data={data} /> 
            </div>
        </div>
      </div>
  );
  }

}

export default Ochi;
