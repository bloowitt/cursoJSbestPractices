window.marvel = window.marvel || {};
window.marvel.model = window.marvel.model || {};
window.marvel.model.Comic = ( function( ) {
  function Comic(data){
    this._id = data.id;
    this._title = data.title;
    this._characters = data.characters;
  }

  Comic.prototype.getId = function(){
    return this._id;
  };

  Comic.prototype.getTitle = function() {
    return this._title;
  };

  Comic.prototype.getCharacters = function() {
    return this._characters;
  };

  return Comic;

} ) ( );