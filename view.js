function LoadView ()
{
  let canvas;

  eve.add.File('./files/source/view/canvas.js', { divId:'game' }, () => {eve.add
        .File('./files/source/modules/resize.js', { divId:'game' }, () => {
          BuildCanvas();
          ResizeCanvas();
        })});


  function BuildCanvas ()
  {
    canvas = eve.create.HTMLCanvas({
      canvasId: 'canvas',
      width: 100,
      height: 100
    })

    eve.add.HTMLElement(canvas, 'game')
  }

  function ResizeCanvas()
  {
    window.addEventListener('resize', () => {
      eve.eventResize.Call(({ width, height }) => {
        canvas.width = width;
        canvas.style.width = `${width}px`;
        canvas.height = height;
        canvas.style.height = `${height}px`;
      })
    })

    window.dispatchEvent(new Event('resize'));
  }
}