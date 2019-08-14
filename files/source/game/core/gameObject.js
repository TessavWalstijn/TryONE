class GameObject extends createjs.Container
{
  constructor (coords)
  {
    super();

    this.x = coords.x;
    this.y = coords.y;
  }
}