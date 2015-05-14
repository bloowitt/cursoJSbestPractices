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