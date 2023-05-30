export default class Keyboard {
  constructor() {
    // Define key codes for arrow keys
    this.LEFT = 37;
    this.RIGHT = 39;
    this.UP = 38;
    this.DOWN = 40;

    // Initialize the `_keys` object to store the state of keys
    this._keys = {};
  }

  // Method to start listening for keyboard events
  listenForEvents = (keys) => {
    // Add event listeners for keydown and keyup events on the window object
    window.addEventListener('keydown', this._onKeyDown);
    window.addEventListener('keyup', this._onKeyUp);

    // Initialize the state of each key in the `_keys` object as false
    keys.forEach((key) => {
      this._keys[key] = false;
    });
  };

  // Event handler for keydown event
  _onKeyDown = (event) => {
    const keyCode = event.keyCode;
    if (keyCode in this._keys) {
      event.preventDefault();
      this._keys[keyCode] = true; // Set the state of the key as true
    }
  };

  // Event handler for keyup event
  _onKeyUp = (event) => {
    const keyCode = event.keyCode;
    if (keyCode in this._keys) {
      event.preventDefault();
      this._keys[keyCode] = false; // Set the state of the key as false
    }
  };

  // Method to check if a key is currently pressed down
  isDown = (keyCode) => {
    if (!(keyCode in this._keys)) {
      // Throw an error if the provided key code is not being listened to
      throw new Error(`Keycode ${keyCode} is not being listened to`);
    }
    return this._keys[keyCode]; // Return the state of the key (true if pressed down, false otherwise)
  };
}
