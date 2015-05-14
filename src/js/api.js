var api = {
  characters: function () {
    return [
      new window.marvel.model.Character({id: 1009610, name: "Spider-Man"}),
      new window.marvel.model.Character({id: 1009220, name: "Captain America"}),
      new window.marvel.model.Character({id: 1009368, name: "Iron Man"}),
      new window.marvel.model.Character({id: 1009718, name: "Wolverine"}),
      new window.marvel.model.Character({id: 1009664, name: "Thor"}),
      new window.marvel.model.Character({id: 1009351, name: "Hulk"})
    ];
  },
  comics: function (characterId, callback) {
    return $.get('/data/comics-' + characterId + '.json', function (response) {
      var toRet = [];
      for (var i in response){
        toRet.push(new window.marvel.model.Comic(response[i]));
      }
      callback(toRet);
    });
  }
};