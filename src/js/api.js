var api = {
  characters: function () {
    return [
      new Character({id: 1009610, name: "Spider-Man"}),
      new Character({id: 1009220, name: "Captain America"}),
      new Character({id: 1009368, name: "Iron Man"}),
      new Character({id: 1009718, name: "Wolverine"}),
      new Character({id: 1009664, name: "Thor"}),
      new Character({id: 1009351, name: "Hulk"})
    ];
  },
  comics: function (characterId, callback) {
    return $.get('/data/comics-' + characterId + '.json', function (response) {
      var toRet = [];
      for (var i in response){
        toRet.push(new Comic(response[i]));
      }
      callback(toRet);
    });
  }
};