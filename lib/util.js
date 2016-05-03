var Util = {
  inherits: function (childClass, baseClass) {
    function Surrogate () { this.constructor = childClass; }
    Surrogate.prototype = baseClass.prototype;
    childClass.prototype = new Surrogate();
  }
};


module.exports = Util;
