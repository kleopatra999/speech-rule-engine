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
 * @fileoverview Abstract class implementing highlighters.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.AbstractHighlighter');

goog.require('sre.ColorPicker');
goog.require('sre.HighlighterInterface');



/**
 * @constructor
 * @implements {sre.HighlighterInterface}
 */
sre.AbstractHighlighter = function() {
  //TODO: Put this into a special class.
  /**
   * List of currently highlighted nodes and their original background color.
   * @type {!Array.<Array.<{node: !Node, opacity: (undefined|string),
   *          background: (undefined|string), foreground: (undefined|string)}
   *         >>}
   * @private
   */
  this.currentHighlights_ = [];

  /**
   * @type {sre.ColorPicker}
   * @protected
   */
  this.color = null;

};


/**
 * @override
 */
sre.AbstractHighlighter.prototype.highlight = function(nodes) {
  this.currentHighlights_.push(nodes.map(
      goog.bind(function(node) {return this.highlightNode(node);},
                this)));
};


/**
 * Highlights a single node.
 * @param {!Node} node The node to be highlighted.
 * @return {{node: !Node, opacity: (undefined|string),
 *          background: (undefined|string), foreground: (undefined|string)}
 *         } The old node
 *     information.
 * @protected
 */
sre.AbstractHighlighter.prototype.highlightNode = goog.abstractMethod;


/**
 * @override
 */
sre.AbstractHighlighter.prototype.unhighlight = function() {
  var nodes = this.currentHighlights_.pop();
  if (!nodes) return;
  nodes.forEach(
      goog.bind(function(node) {return this.unhighlightNode(node);},
                this));
};


/**
 * Unhighlights a single node.
 * @param {{node: !Node, opacity: (undefined|string),
 *          background: (undefined|string), foreground: (undefined|string)}
 *         } info The info for the
 *     node to be unhighlighted.
 * @protected
 */
sre.AbstractHighlighter.prototype.unhighlightNode = goog.abstractMethod;


/**
 * @override
 */
sre.AbstractHighlighter.prototype.setColor = function(color) {
  this.color = color;
};


/**
 * Turns the current color into a string representation.
 * @return {sre.ColorPicker.String} The color string, by default as rgba.
 * @protected
 */
sre.AbstractHighlighter.prototype.colorString = function() {
  return this.color.rgba();
};
