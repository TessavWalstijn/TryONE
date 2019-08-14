class Player extends GameObject
{
  constructor (coords)
  {
    super(coords);

    // this.idle = 

    // const face = eve.create.SpriteSheet('CloneColors', 2, 5, 4, 0.5, true);
    // this.fly = new createjs.Sprite(face, 'default');
    // this.addChild(this.fly);

    const face = eve.create.SpriteSheet('sprite', settings.image.rows, settings.image.columns, settings.image.amountOfFrames, 1, true);
    this.face = [];
    for (let i = 0; i < 20; i += 1) {
      this.face.push(new createjs.Sprite(face, 'default'));
      this.face[i].gotoAndPlay(i % 10);
      this.face[i].scaleX = 4.2 - 0.2 * i;
      this.face[i].scaleY = 4.2 - 0.2 * i;
      this.face[i].minimum = 4 - 0.2 * i;
      this.face[i].maximum = 4.2 - 0.2 * i;
      this.face[i].bool = true;
      this.face[i].MoveTo = (x = 0, y = 0)=> {
        const { newX, newY } = settings.Movement(x, y, this.face[i].scaleX, i);
        this.face[i].x = newX;
        this.face[i].y = newY;
      }
      this.addChild(this.face[i]);
    }

    this.speed = 0.007;
  }

  Update ({x, y})
  {

    for (let i = 0; i < 20; i += 1) {
      if (settings.breath) {
        if (this.face[i].scaleX >= this.face[i].minimum && this.face[i].bool) {
          this.face[i].scaleX -= this.speed;
          this.face[i].scaleY -= this.speed;
        }

        if (this.face[i].scaleX <= this.face[i].minimum) {
          this.face[i].bool = false;
        }
        if (this.face[i].scaleX >= this.face[i].maximum) {
          this.face[i].bool = true;
        }

        if (this.face[i].scaleX < this.face[i].maximum && !this.face[i].bool) {
          this.face[i].scaleX += this.speed;
          this.face[i].scaleY += this.speed;
        }
      }

      this.face[i].MoveTo(x, y);
    }
  }
}