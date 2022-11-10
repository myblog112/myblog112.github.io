// debugger;
// console.log('Hello world!');
alert('I am being loaded! (my name is utils.js)');

// https://stackoverflow.com/a/824060
function deleteEmptyLineOnLoad1(curScript_1)
{
  debugger;
  var elem4 = curScript_1.previousSibling;
  elem4.nodeValue = elem4.nodeValue.slice(0,-1); // remove last 1 chars from it
  var elem5 = curScript_1.nextSibling; // next sibling is not yet built
}
