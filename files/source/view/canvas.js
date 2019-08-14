const Canvas = (()=> {
  let Canvas = {
    __version: {
      name: '0.0.1',
      code: '000',
    },
  }

  const create = {
    HTMLCanvas ({ canvasId, width, height })
    {
      const canvas = eve.create.HTMLElement('canvas');
      
      canvas.id = canvasId;
      canvas.width = width;
      canvas.height = height;

      return canvas;
    },
  }

  return {
    ...Canvas,
    create: create,
    // add: add,
  };
})();

eve.add.Module(Canvas, 'Canvas');