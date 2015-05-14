describe("testMarvelComicFinder", function() {
  it("intersect devolviendo una lista de un elemento", function() {
    var list1 = [{id:1},{id:2},{id:3}];
    var list2 = [{id:1},{id:4},{id:5}];
    expect(MarvelComicFinder.testIntersect(list1,list2)).toEqual([{id:1}]);
  });
  it("intersect", function() {
    var list1 = [{id:1},{id:2},{id:3}];
    var list2 = [{id:1},{id:4},{id:5}];
    expect(MarvelComicFinder.testIntersect(list1,list2)).toEqual([{id:1}]);
  });
});