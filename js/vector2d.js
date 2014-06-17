function Vector2D(x, y) {
  this.x = x;
  this.y = y;

  this.add = function(v) {
    var x = this.x + v.x;
    var y = this.y + v.y;
    return new Vector2D(x, y);
  }      

  this.sub = function(v) {
    var x = this.x - v.x;
    var y = this.y - v.y;
    return new Vector2D(x, y);
  }

  this.mul = function(k) {
    var x = this.x * k;
    var y = this.y * k;
    return new Vector2D(x, y);
  }

  this.div = function(k) {
    var x = this.x / k;
    var y = this.y / k;
    return new Vector2D(x, y);
  }
}
