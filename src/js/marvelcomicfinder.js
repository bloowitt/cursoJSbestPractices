
window.marvel = window.marvel || {};
window.marvel.MarvelComicFinder = ( function( ) {
  var _comics = []

  function _intersect(listA, listB){
    var listToReturn = [];
    for (var m in listA){
      for (var n in listB){
        if (listA[m].getId() === listB[n].getId()){
          listToReturn.push(listA[m]);
        }
      }
    }
    return listToReturn;
  }

  function _manageResult(data){
    if (_comics.length === 0){
      _comics = data;
    } else {
      _comics = _intersect(_comics, data);
      window.marvel.view.printComicList(_comics);
    }
  }

  function findComics(firstChar, secondChar){
    _comics = [];
    api.comics(firstChar, _manageResult);
    api.comics(secondChar, _manageResult);
  }

  function generateCharacterOptions() {
    var myChars = api.characters()
    window.marvel.view.addCharacters(myChars);
  }

  function init(){
    window.marvel.view.setupViewElements();
    generateCharacterOptions();
  }

  return {
    generateCharacterOptions : generateCharacterOptions,
    findComics: findComics,
    init: init,
    testIntersect: _intersect
  };

} )();