window.marvel = window.marvel || {};
window.marvel.view = ( function( $ ) {
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
        window.marvel.MarvelComicFinder.findComics($personaje1.val(), $personaje2.val());
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
      $newElem.find(".id").text(comicList[i].getId());
      $newElem.find(".title").text(comicList[i].getTitle());
      $newElem.find(".characters").text(comicList[i].getCharacters().join(", "));
      $("#resultados").find("tbody").append($newElem);
    }
  }

  return {
    printComicList: printComicList,
    addCharacters: addCharacters,
    setupViewElements: setupViewElements
  }

} ) ( $ );