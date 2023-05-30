export default class Loader {
  constructor() {
    this.images = {};
  }

  loadImage = (key, src) => {
    // Create a new image element
    const image = new Image();

    // Create a promise that resolves when the image is loaded successfully
    const promise = new Promise((resolve, reject) => {
      // Set the onload event handler for the image
      image.onload = () => {
        this.images[key] = image; // Store the loaded image in the `images` object using the provided key
        resolve(image); // Resolve the promise with the loaded image
      };

      // Set the onerror event handler for the image
      image.onerror = () => {
        reject("Could not load image: " + src); // Reject the promise with an error message
      };
    });

    // Set the src property of the image to start loading the image
    image.src = src;

    // Return the promise
    return promise;
  };

  getImage = (key) => {
    return key in this.images ? this.images[key] : null; // Return the image corresponding to the provided key, or null if not found
  };
}
