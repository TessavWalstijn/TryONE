class RatioManager
{
  constructor (screenSize)
  {
    this._code = -1;
    this._ratio = 'none';
    this._landscape = undefined;

    this.UpdateRatio(screenSize);
  }

  //#region Getters
  get ratio() {
    return this._ratio;
  }

  get code() {
    return this._code;
  }

  get landscape() {
    return this._landscape;
  }
  //#endregion

  // !! Private function
  _SetValues({ code, ratio, landscape })
  {
    this._landscape = landscape;
    this._ratio = ratio;
    this._code = code;
  }

  /**
   * Updates the ratio.
   * @param {Object} screenSize Object of the screen size.
   */
  UpdateRatio (screenSize)
  { // Call the static function to get ratio object
    this._SetValues(RatioManager.GetRatio(screenSize));
  }

  /**
   * Set the width and height for the canvas.
   * @param {Object} screenSize 
   */
  static SetCanvas (screenSize, canvasId = 'canvas')
  {
    
    const width = screenSize.width;
    const height = screenSize.height;
    const canvas = document.getElementById(canvasId);

    // TODO: CHECK THIS SHIET OUT!!!
    // canvas.width = width * window.devicePixelRatio;
    // canvas.height = height * window.devicePixelRatio;

    canvas.width = width;
    canvas.height = height;
    
    console.log(width, window.devicePixelRatio)
    
    canvas.style.position = 'fixed';
    canvas.style.left = canvas.x = 0;
    canvas.style.top = canvas.y = 0;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  }

  /**
   * Returns the ratio object and sets the canvas.
   * @param {Object} [screenSize] Optional for the wrappers.
   */
  static GetRatio (screenSize, canvasId)
  {
    if (!screenSize) {
      screenSize = {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }

    const width = screenSize.width;
    const height = screenSize.height;
    const ratio = width / height;
    
    RatioManager.SetCanvas(screenSize, canvasId);

    // Set values in object
    let object = {};
    (ratio < 1 )
      ? ((ratio < 0.65) // Portrait
        ? (object = {code: 1, ratio: '9:16', landscape: false})
        : (object = {code: 3, ratio: '3:4', landscape: false}))
      : ((ratio > 1.5555) // Landscape
        ? (object = {code: 0, ratio: '16:9', landscape: true})
        : (object = {code: 2, ratio: '4:3', landscape: true}));

    return object;
  }
}

 /*---
 | Coords Manager
 |
 | The coords manager is designed for multiple coord configure files.
 | This is for example if you have a large level.
 | Then you can set up a level only coords manager.
 | This will keep an overview on where things are located.
*/
class CoordsManager extends RatioManager
{
  /**
   * Set up a coords manager.
   * @param {Object} coordObject An object like globalCoords.
   * @param {Object} [screenSize] Optional for the wrappers.
   */
  constructor (coordObject, screenSize)
  {
    super(screenSize);

    this._coords = coordObject;
  }

  GetCoords (...names)
  {
    const max = names.length;

    // Get the correct ratio
    let object = this._coords[this._ratio];

    // Get the requested object
    for (let i = 0; i < max; i += 1)
      object = object[names[i]];

    return object;
  }
}