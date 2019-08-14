let stage = {};

function LoadGame ()
{
  eve.add.File('./files/source/game/data/coords.js', { divId: 'basic' }, () => { eve.add
        .File('./files/source/view/ratio.js', { divId: 'basic' }, () => { eve.add
        .File('./files/source/game/core/utils.js', { divId: 'game' }, () => { eve.add
        .File('./files/source/game/core/preloader.js', { divId: 'game' }, () => { eve.add
        .File('./files/source/game/core/stage.js', { divId: 'game' }, () => { eve.add
        .File('./files/source/game/core/scene.js', { divId: 'game' }, () => { eve.add
        .File('./files/source/game/core/gameObject.js', { divId: 'game' }, () => { eve.add
        .File('./files/source/game/elements/player.js', { divId: 'game' }, () => { eve.add
        .File('./files/source/game/scenes/gamePlay.js', { divId: 'game' }, () => {
          preloader.Init(() => {
            createjs.Ticker.addEventListener("tick", handleTick);
            
            stage = new Stage(eve.eventResize.GetScreenSize());
			      stage.enableDOMEvents(true);

            window.addEventListener('onorientationchange', () => {
              window.dispatchEvent(new Event('resize'));
            })

            window.addEventListener('resize', () => {
                eve.eventResize.Call((screenSize) => {
                  stage.UserResize(screenSize);
                })
            });

            function handleTick (event)
            {
              stage.update(event);
              stage.Update();
            }

            const canvas = eve.get.HTMLElementById('canvas');
            canvas.width = 100;
            canvas.height = 100;

            window.dispatchEvent(new Event('resize'));
          })
        })})})})})})})})})
}