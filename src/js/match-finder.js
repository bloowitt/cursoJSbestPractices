// Marvel comic finder:
// Known limitations:
// Lets you choose the same character twice
// If a character appears twice (Spiderman and Ultimate Spiderman, e.g.) the comic is printed twice

$(document).on('ready', function () {
  window.marvel.MarvelComicFinder.init();
});