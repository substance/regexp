# Substance RegExp

This tiny library was created out of a frustration with the native API for
regular expressions in Javascript.

Here's why:

For the new [Substance.Surface](http://github.com/substance/surface) 
we had to implement a simple lookup method that scans for word boundaries
in a paragraph (in order to find out where to jump when pressing `alt`+`right` in our text editor).

So we came up with a simple regular expression.

```js
var wordBounds = /\b\w/g;
```

In order to get all matches of a regular expression on a string you have to call `RegExp.exec` multiple times, which is quite error-prone and terrible to write.

```js
var str = "Fix problem quickly with galvanized jets";
var matches = [];
// Execute until last match has been found
while ((match = wordBounds.exec(str)) !== null) {
  matches.push(match);
}
```

It's also quite unintuitive to access the information you need. In our case we needed to know the character positions of the matched word boundaries. Inspired by Phython and Ruby we came up with something that feels more natural, but without adding any magic.

```js
var wordBounds = new Substance.RegExp(/.\w/g);
var matches = wordBounds.match(str);
```

Much better. Now if our cursor were at position 6 and we wanted to jump to next word bound we could find out the position by inspecting the normalized matches.

```js
var cursorPos = 6;
var nextBound = _.find(matches, function(m) {
  return m.index>charPos;
}).index;
```

Easy. If you want to see it in action have a look at the brand-new [Selection API](https://github.com/substance/document/blob/master/src/selection.js).
