// Marvel comic finder:
// Known limitations:
// Lets you choose the same character twice
// If a character appears twice (Spiderman and Ultimate Spiderman, e.g.) the comic is printed twice

$(document).on('ready', function () {
  MarvelComicFinder.init();
});

var MarvelComicFinder = ( function( $ ) {
  var _comics = []

  function _intersect(listA, listB){
    var listToReturn = [];
    for (var m in listA){
      for (var n in listB){
        if (listA[m].id === listB[n].id){
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
      MarvelComicFinderView.printComicList(_comics);
    }
  }

  function findComics(firstChar, secondChar){
    _comics = [];
    api.comics(firstChar, _manageResult);
    api.comics(secondChar, _manageResult);
  }

  function generateCharacterOptions() {
    var myChars = api.characters()
    var toPass = [];
    for (var i in myChars){
      var c = new Character(myChars[i]);
      toPass.push(c);
    }
    MarvelComicFinderView.addCharacters(toPass);
  }

  function init(){
    MarvelComicFinderView.setupViewElements();
    MarvelComicFinder.generateCharacterOptions();
  }

  return {
    generateCharacterOptions : generateCharacterOptions,
    findComics: findComics,
    init: init,
    testIntersect: _intersect
  };

} )( $ );

/////////////////\\\\\\\\\\\\\\\\\\\\\

var MarvelComicFinderView = ( function( $ ) {
  var $personaje1= null;
  var $personaje2= null;

  function setupViewElements(){
    $personaje1 = $('#personaje1');
    $personaje2 = $('#personaje2');
    $personaje1.on('change', function(event){
      $personaje2.find("option:disabled").prop('disabled',false);
      $personaje2.find("option[value='" + $personaje1.val() + "']").prop('disabled',true);
    });

    $personaje2.on('change', function(event){
      $personaje2.find("option:disabled").prop('disabled',false);
      $personaje1.find("option[value='" + $personaje2.val() + "']").prop('disabled',true);
    });

    $('#boton-buscar').on('click', function(event){
      if ($personaje1.val() === -1 || $personaje2.val() === -1){
        alert("No has elegido alguno de los personajes");
      } else {
        event.preventDefault($personaje1.val(), $personaje2.val());
        MarvelComicFinder.findComics($personaje1.val(), $personaje2.val());
      }
    });
  }

  function  _addOption(option){
    $personaje1.append(option);
    $personaje2.append(option);
  }

  function _getOption(id, name){
    return "<option value='" + id + "'>" + name + "</option>"
  }

  function addCharacters(arrayCharacters){
    for (var i in arrayCharacters){
      _addOption(_getOption(arrayCharacters[i].getId(), arrayCharacters[i].getName()));
    }
  }



  function  printComicList(comicList){
    $("#resultados").find("tbody").html("");
    for (var i in comicList) {
      var $newElem = $("<tr><td class='id'></td><td class='title'></td><td class='characters'></td></tr>")
      $newElem.find(".id").text(comicList[i].id);
      $newElem.find(".title").text(comicList[i].title);
      $newElem.find(".characters").text(comicList[i].characters.join(", "));
      $("#resultados").find("tbody").append($newElem);
    }
  }

  return {
    printComicList: printComicList,
    addCharacters: addCharacters,
    setupViewElements: setupViewElements
  }

} ) ( $ );

////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\

function Character(data){
  this._id = data.id;
  this._name = data.name;
}

Character.prototype.getId = function(){
  return this._id;
};

Character.prototype.getName = function() {
  return this._name;
};