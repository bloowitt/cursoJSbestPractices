// Marvel comic finder:
// Known limitations:
// Lets you choose the same character twice
// If a character appears twice (Spiderman and Ultimate Spiderman, e.g.) the comic is printed twice

$(document).on('ready', function () {
  MarvelComicFinder.init();
});

var MarvelComicFinder = ( function( $ ) {
  var _comics = []

  function _printComicList(){
    for (var i in _comics){

    }
    
  }

  function _manageResult(data){
    if (_comics.size() === 0){
      _comics = data;
    } else {
      _comics = _intersect(_comics, data);
      _printComicList();
    }
  }

  function _clearResultList(){
    _comics = [];
    $("#resultados").find("tbody").html("");
  }

  function findComics(firstChar, secondChar){
    _clearResultList();
    api.comics(firstChar, _manageResult);
    api.comics(secondChar, _manageResult);
  }

  function init(){
    $('#personaje1').append(MarvelComicFinder.generateCharacterOptions());
    $('#personaje2').append(MarvelComicFinder.generateCharacterOptions());

    $('#personaje1').on('change', function(event){
      $('#personaje2').find("option:disabled").prop('disabled',false);
      $('#personaje2').find("option[value='" + $('#personaje1').val() + "']").prop('disabled',true);
    });

    $('#personaje2').on('change', function(event){
      $('#personaje1').find("option:disabled").prop('disabled',false);
      $('#personaje1').find("option[value='" + $('#personaje2').val() + "']").prop('disabled',true);
    });

    $('#boton-buscar').on('click', function(event){
      event.preventDefault($('#personaje1').val(), $('#personaje2').val());
      MarvelComicFinder.findComics($('#personaje1').val(), $('#personaje2').val());
    });
  }

  function generateCharacterOptions() {
    var myChars = api.characters();
    var toReturn = [];
    for (var i in myChars) {
      var newElemName = myChars[i]['name'];
      var newElemId = myChars[i]['id'];
      var newElem = "<option data-text='" + newElemName + "' value='" + newElemId + "'>" + newElemName + "</option>"
      toReturn.push(newElem);

    }
    return toReturn;
  }

  return {
    generateCharacterOptions : generateCharacterOptions,
    findComics: findComics,
    init: init
  };

} )( $ );