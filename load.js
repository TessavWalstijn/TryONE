window.oncontextmenu = function(event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
};

function Init () {
  eve.add.File('./style.css')
        .File('./files/source/libs/create.js', { divId:'libs' }, () => { eve.add
        .File('./files/source/libs/howler.js', { divId:'libs' }, () => { eve.add
        .File('./view.js', { divId:'basic' }, () => { eve.add
        .File('./main.js', { divId:'game' }, () => {
          LoadView();
          LoadGame();
        })})})});
}

Init();