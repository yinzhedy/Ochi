import Loader from "./loader";
import TileMap from "./tileMap";
import Camera from "./camera";
import Keyboard from "./keyboard";

export default class Game {
  constructor(context) {
    this.context = context;
    this.loader = new Loader();
    this.tileMap = new TileMap();
    this.camera = new Camera(this.tileMap, 1000, 1000);
    this.keyboard = new Keyboard();
    this._previousElapsed = 0;
  }

  // Initialize the game
  init = async () => {
    // Start listening for keyboard events
    this.keyboard.listenForEvents([
      this.keyboard.LEFT,
      this.keyboard.RIGHT,
      this.keyboard.UP,
      this.keyboard.DOWN,
    ]);

    // Load the tile image using the loader
    const tiles = await this.loader.loadImage("tiles", "./map/tiles.png");

    // Get the loaded image from the loader
    this.tileAtlas = this.loader.getImage("tiles");

    // Store the loaded images
    this.images = {
      tiles,
    };
  };

  // Draw a specific layer of the tile map
  drawLayer = (layerIndex) => {
    // Calculate the range of tiles to draw based on the camera position and dimensions
    const startColumn = Math.floor(this.camera.x / this.tileMap.tileSize);
    const endColumn =
      startColumn + this.camera.width / this.tileMap.tileSize;
    const startRow = Math.floor(this.camera.y / this.tileMap.tileSize);
    const endRow = startRow + this.camera.height / this.tileMap.tileSize;
    const offsetX = -this.camera.x + startColumn * this.tileMap.tileSize;
    const offsetY = -this.camera.y + startRow * this.tileMap.tileSize;

    // Iterate over the tiles in the specified range
    for (let columnIndex = startColumn; columnIndex < endColumn; columnIndex++) {
      for (let rowIndex = startRow; rowIndex < endRow; rowIndex++) {
        const tile = this.tileMap.getTile(layerIndex, columnIndex, rowIndex);
        const x = (columnIndex - startColumn) * this.tileMap.tileSize + offsetX;
        const y = (rowIndex - startRow) * this.tileMap.tileSize + offsetY;

        if (tile !== 0) {
          // Draw the tile if it's not an empty tile (tile index 0)
          this.context.drawImage(
            this.tileAtlas, // image
            (tile - 1) * this.tileMap.tileSize, // source x
            0, // source y
            this.tileMap.tileSize, // source width
            this.tileMap.tileSize, // source height
            Math.round(x), // target x
            Math.round(y), // target y
            this.tileMap.tileSize, // target width
            this.tileMap.tileSize // target height
          );
        }
      }
    }
  };

  // Update the game state
  update = (delta) => {
    // Handle camera movement with arrow keys
    let dirX = 0;
    let dirY = 0;
    if (this.keyboard.isDown(this.keyboard.LEFT)) {
      dirX = -1;
    }
    if (this.keyboard.isDown(this.keyboard.RIGHT)) {
      dirX = 1;
    }
    if (this.keyboard.isDown(this.keyboard.UP)) {
      dirY = -1;
    }
    if (this.keyboard.isDown(this.keyboard.DOWN)) {
      dirY = 1;
    }

    // Move the camera based on the input direction
    this.camera.move(delta, dirX, dirY);
  };

  // Calculate the delta time between frames
  getDelta = (elapsed) => {
    // Compute delta time in seconds and cap it at a maximum of 250 ms (0.25 seconds)
    let delta = (elapsed - this._previousElapsed) / 1000.0;
    delta = Math.min(delta, 0.25);
    this._previousElapsed = elapsed;
    return delta;
  };

  // Render the game
  render = (elapsed) => {
    // Clear the canvas
    this.context.clearRect(0, 0, 512, 512);

    // Update the game state based on delta time
    this.update(this.getDelta(elapsed));

    // Draw the background layer of the tile map
    this.drawLayer(0);

    // Draw the top layer of the tile map
    this.drawLayer(1);
  };
}
