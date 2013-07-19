(function(root) {

// Imports
// 

var Substance = root.Substance || {};

// Substanc.RegExp.Match
// ================
//
// Regular expressions in Javascript they way they should be.

var Match = function(match) {
  this.index = match.index;
  this.match = [];

  for (var i=0; i < match.length; i++) {
    this.match.push(match[i]);
  }
};

Match.Prototype = function() {

  // Returns the capture groups
  // --------
  // 

  this.captures = function() {
    return this.match.slice(1);
  },

  // Serialize to string
  // --------
  // 

  this.toString = function() {
    return this.match[0];
  }
};

Match.prototype = new Match.Prototype();

// Substance.RegExp
// ================
//

var RegExp = function(exp) {
  this.exp = exp;
};

RegExp.Prototype = function() {

  this.match = function(str) {
    if (str === undefined) throw new Error('No string given');
    
    if (!this.exp.global) {
      return this.exp.exec(str);
    } else {
      var matches = [];
      // Reset the state of the expression
      this.exp.compile(this.exp);

      // Execute until last match has been found
      while ((match = this.exp.exec(str)) !== null) {
        matches.push(new Match(match));
      }
    }
    return matches;
  }
}

RegExp.prototype = new RegExp.Prototype();

// Export
// ========

if (typeof exports !== 'undefined') {
  module.exports = Selection;
} else {
  Substance.RegExp = RegExp;
  Substance.RegExp.Match = Match;
}

})(this);