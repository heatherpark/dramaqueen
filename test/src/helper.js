// jsdom is a pure JS DOM implementation that runs in node
// will be used to test React components
import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

// creating jsdom versions of document and window objects that would
// normally be provided by the browser
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

// add aforementioned objects to global object
global.document = doc;
global.window = win;

// take all props on jsdom window object and hoist onto node.js global object
// this way, props provided by window can be used without the window. prefix
Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});