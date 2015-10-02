// Copyright 2015 Volker Sorge
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/**
 * @fileoverview Class highlighting HTML-CSS elements.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.HtmlHighlighter');

goog.require('sre.CssHighlighter');



/**
 * @constructor
 * @extends {sre.CssHighlighter}
 */
sre.HtmlHighlighter = function() {
  goog.base(this);

  /**
   * @type {!string}
   */
  this.mode = '';
};
goog.inherits(sre.HtmlHighlighter, sre.CssHighlighter);


/**
 * Set the mode of the highlighter.
 * @param {!string} mode The mode indicator.
 */
sre.HtmlHighlighter.prototype.setMode = function(mode) {
  this.mode = mode;
};


/**
 * @override
 */
sre.HtmlHighlighter.prototype.highlightNode = function(node) {
  if (this.mode === 'walk' ||
      (node.className !== 'MathJax_HitBox' &&
       (!node.previousSibling ||
        node.previousSibling.className !== 'MathJax_HitBox'))) {
    return goog.base(this, 'highlightNode', node);
  }
  if (node.className === 'MathJax_HitBox') {
    var box = node;
    node = /** @type {!Node} */ (node.nextSibling);
  } else {
    box = /** @type {!Node} */ (node.previousSibling);
  }
  var info = {node: box,
    opacity: box.opacity,
    background: box.style.backgroundColor,
    foreground: node.style.color};
  var color = this.color.rgb();
  box.style.backgroundColor = color.background;
  box.style.opacity = color.alphaback;
  node.style.color = color.foreground;
  return info;
};


/**
 * @override
 */
sre.HtmlHighlighter.prototype.unhighlightNode = function(info) {
  if (info.node.className !== 'MathJax_HitBox') {
    goog.base(this, 'unhighlightNode', info);
    return;
  }
  info.node.style.backgroundColor = info.background;
  info.node.style.opacity = info.opacity;
  info.node.nextSibling.style.color = info.foreground;
};