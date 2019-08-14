const Utils = (()=> {
  let Utils = {
    __version: {
      name: '0.0.1',
      code: '000',
    },
  }

  const utils = {
        /**
     * Find sound by name
     * @param {string} name of the image
     * @return {src} source of the sound file
     */
    FindImage(name)
    {
      return images.find(x => x.name === name).image;
    },

    /**
     * Find sound by name
     * @param {string} name of the image
     * @return {src} source of the sound file
     * */
    FindSound(name) {
      return sounds.find(x => x.name === name).sound.src;
    },

    /**
     * Set an array of objects to the foreground
     * @param {array} objects objects to be set to the foreground
     */
    SetToForeground(objects) {
      for (let i = 0; i < objects.length; i += 1) {
        const parent = objects[i].parent;
        parent.setChildIndex(objects[i], parent.getNumChildren() - 1);
      }
    },

    /**
     * Moves the object to the correct position when the playable is rotating
     * @param {object} object The object that will be moved
     * @param {object} coords The new position of the object
     * */
    RotateObject(object, coords) {
      object.x = coords.x;
      object.y = coords.y;
      object.scaleX = coords.scale || coords.scaleX || 1;
      object.scaleY = coords.scale || coords.scaleY || 1;
    },

    /**
     * Constrains a value between a minimum and maximum value.
     * @param  {Number} n    number to constrain
     * @param  {Number} low  minimum limit
     * @param  {Number} high maximum limit
     * @return {Number}      constrained number
     */
    Constrain (n, low, high) {
      return Math.max(Math.min(n, high), low);
    },

    /**
     * Maps the value from a range to an other
     * @param  {Number} value  the incoming value to be converted
     * @param  {Number} start1 lower bound of the value's current range
     * @param  {Number} stop1  upper bound of the value's current range
     * @param  {Number} start2 lower bound of the value's target range
     * @param  {Number} stop2  upper bound of the value's target range
     * @param  {Boolean} [withinBounds] constrain the value to the newly mapped range
     * @return {Number}
     */
    Map (n, start1, stop1, start2, stop2, withinBounds) {
      var newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
      if (!withinBounds) {
        return newval;
      }
      if (start2 < stop2) {
        return utils.constrain(newval, start2, stop2);
      } else {
        return utils.constrain(newval, stop2, start2);
      }
    },

    /**
     * Returns if the numbers are equal enough
     * @param {Number} a first number to check
     * @param {Number} b second number to check
     * @param {Number} [p] percent for how close a and b should be to return true
     */
    Equals(a, b, p = 0.01) {
      return Math.abs(a - b) <= p * Math.max(1.0, Math.abs(a), Math.abs(b));
    },

    /**
     * Plays sound file
     * @param {string} name of the sound file
     * @param {float} volume
     * @param {boolean} loop
     * @return {Howl} The Howl element created to play the sound
     */
    PlaySound(name, volume = 1, loop = false) {
      const sfx = utils.FindSound(name);

      const sound = new Howl({
        src: [sfx],
        autoplay: true,
        loop: loop,
        volume: volume,
      });

      return sound;
    },
  }

  const center = {
    Bitmap (bitmap)
    {
      center.BitmapHorizontal(bitmap);
      center.BitmapVertical(bitmap);
    },
    BitmapHorizontal (bitmap)
    {
      bitmap.regX = bitmap.getBounds().width / 2;
    },
    BitmapVertical (bitmap)
    {
      bitmap.regY = bitmap.getBounds().height / 2;
    },
    Text(text, align = 'center') {
      text.textAlign = align;
      text.textBaseline = 'middle';
    }
  }

  const create = {
    Bitmap (imageName, coords, parrent = null)
    {
      const object = new createjs.Bitmap(utils.FindImage(imageName));
      center.Bitmap(object);
      object.x = coords.x;
      object.y = coords.y;
      object.scaleX = coords.scale || coords.scaleX || 1;
      object.scaleY = coords.scale || coords.scaleY || 1;
  
      if (parrent !== null) {
        parrent.addChild(object);
      }
  
      return object;
    },
    /**
     * Creates a spritesheet from the given image
     * @param {string} spriteSheetImageName Name of the spritesheet image
     * @param {int} rows The amount of rows in the spritesheet
     * @param {int} columns The amount of columns in the spritesheet
     * @param {int} amountOfFrames The amount of usable frames in the spritesheet
     * @param {int} speed The animation speed
     * @param {boolean} loop Decides if the animation should loop
     * @return {SpriteSheet} The new SpriteSheet with an animation
     */
    SpriteSheet(
      spriteSheetImageName,
      rows,
      columns,
      amountOfFrames,
      speed = 1,
      loop = false,
    ) {
      const image = utils.FindImage(spriteSheetImageName);
      const sheetWidth = image.width;
      const sheetHeight = image.height;
      const frameWidth = sheetWidth / columns;
      const frameHeight = sheetHeight / rows;
      const frameArray = [];
      for (let i = 0; i < amountOfFrames; i += 1) {
        frameArray.push(i);
      }
      const properties = {
        images: [image],
        frames: {
          width: frameWidth,
          height: frameHeight,
          regX: frameWidth / 2,
          regY: frameHeight / 2,
        },
        animations: {
          default: {
            speed: speed,
            frames: frameArray,
            next: loop === true ? 'default' : false,
          },
        },
      };
      return new createjs.SpriteSheet(properties);
    },

    /**
     * Creates a new Text object
     * @param {string} text The string shown in this text object
     * @param {object} coords Position of the object, and size of the text
     * @param {object} options Font properties; name, color, and optional font style ('bold' 'bold italic', etc.)
     * @param {object} parent The parent object that receives the new object as a child
     * @return {createjs.Text} object Centered Text object with set coordinates and text size
     * */
    TextObject(text, coords, options, parent = null) {
      const font = `${options.style || ''} ${coords.size}px ${options.name}`.trim();
      const object = new createjs.Text(text, font, options.color);

      center.Text(object);
      object.x = coords.x;
      object.y = coords.y;
      object.fontStyle = font.style || '';
      object.fontName = font.name;

      if (parent !== null) {
        parent.addChild(object);
      }

      return object;
    }
  }

  return {
    ...Utils,
    utils: utils,
    center: center,
    create: create,
  };
})();

eve.add.Module(Utils, 'Utils');