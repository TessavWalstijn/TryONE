class Stage extends createjs.Stage
{
  constructor (screenSize)
  {
    super('canvas');

    this.coords = new CoordsManager(coords, screenSize)
    const location = this.coords.GetCoords()

    RatioManager.SetCanvas(screenSize);
    this._SetStage(screenSize);

    this.gamePlay = new GamePlay(this.coords);
    this.addChild(this.gamePlay);

    this.mouse = {};
    
    // ~~ Mouse Input!
    this.on('stagemousemove', (event) => {
      this.mouse.x = event.stageX - this.width * 0.5;
      this.mouse.y = event.stageY - this.height * 0.5;
    })

    // this.rect = new createjs.Rectangle(0, 0, this.width, this.height);
    // this.addChild(this.rect);

    // this.rect.addEventListener("click", function(event) { console.log(event) })
  }

  Update ()
  {

    this.gamePlay.Update(this.mouse);
  }

  _SetStage({ width, height })
  {
    const coords = this.coords.GetCoords();

    this.width = width;
    this.height = height;
    this.scaleX = width / coords.resolution.x;
    this.scaleY = height / coords.resolution.y;
  }

  UserResize(screenSize)
  {
    RatioManager.SetCanvas(screenSize);
    this.coords.UpdateRatio(screenSize);
    this._SetStage(screenSize);

    this.gamePlay.OnRotaion();
  }
}