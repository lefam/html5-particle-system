function Color(r, g, b, a) {
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;

  this.add = function(c) {
    var r = this.r + c.r;
    var g = this.g + c.g;
    var b = this.b + c.b;
    var a = this.a + c.a;
    return new Color(r, g, b, a);
  }

  this.sub = function(c) {
    var r = this.r - c.r;
    var g = this.g - c.g;
    var b = this.b - c.b;
    var a = this.a - c.a;
    return new Color(r, g, b, a);
  }

  this.mul = function(k) {
    if( k >= 0 ) {
      var r = this.r * k;
      var g = this.g * k;
      var b = this.b * k;
      var a = this.a * k;
      return new Color(r, g, b, a);
    }
    return this;
  }
  
  this.div = function(k) {
    if( k > 0 ) {
      var r = this.r / k;
      var g = this.g / k;
      var b = this.b / k;
      var a = this.a / k;
      return new Color(r, g, b, a);
    }
    return this;
  }

  this.toCssString = function() {
    var r = Math.floor(this.r * 255);
    var g = Math.floor(this.g * 255);
    var b = Math.floor(this.b * 255);
    if( r < 0 ) r = 0;
    if( r > 255 ) r = 255;
    if( g < 0 ) g = 0;
    if( g > 255 ) g = 255;
    if( b < 0 ) b = 0;
    if( b > 255 ) b = 255;
    return "rgba(" + r + ", " + g + ", " + b + ", " + this.a + ")";
  }
}
