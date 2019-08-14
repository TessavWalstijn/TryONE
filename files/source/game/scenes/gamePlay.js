class GamePlay extends Scene
{
  constructor (coords)
  {
    super();

    this.coords = coords;
    const allCoord = coords.GetCoords();

    this.player = new Player(allCoord.center);
    this.addChild(this.player);
  }

  Update (mouse)
  {
    this.player.Update(mouse);
  }

  OnRotaion ()
  {
    const coords = this.coords.GetCoords();

    eve.utils.RotateObject(this.player, coords.center);
  }
}