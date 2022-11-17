/*
* Disclaimer: This is a private text (and/or source code). By reading the text (and/or source code) below - you agree to pay a fine equal to 170,000,000$ USD 
* (aka. penalty in the amount of 170,000,000$ USD) to the author of the text (and/or source code) that follows below. 
*/
/*
// Ctrl-N|W|T and some other shortcuts ... are not possible to intercept ==> see this bug report: (they don't want malicious scripts overriding Ctrl-N (which even I sometimes use)
// https://bugzilla.mozilla.org/show_bug.cgi?id=1291706
*/
// Keys that work: Ctrl-F (do not override it I need it.)
document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key === 's') {
    // Prevent the Save dialog to open
    e.preventDefault();
    // Place your code here
    alert("Ctrl-S was pressed.");
    console.log('CTRL + S');
  }
});

/* 
* W3Schools Console example (https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_onclick)
*/
/*
<!DOCTYPE html>
<html>
<body>

<h1>HTML DOM Events</h1>
<h2>The onclick Event</h2>

<p>The onclick event triggers a function when an element is clicked on.</p>
<p>Click to trigger a function that will output "Hello World": 2</p>

<button onclick="myFunction()">Click me</button>

<p id="textArea1"></p>

<script>
function consoleLog(str)
{
  document.getElementById("textArea1").innerText += str + '\n';
}
function myFunction() {
const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

console.log(fetchPromise);

fetchPromise.then((response) => {
  consoleLog(`Received response: ${response.status}`);
});

consoleLog("Started request…");
}
</script>

</body>
</html>
*/

// alert('Do you see this line?');

// alert("If you see this message - this means that the script 'utils-staging.js (end of file 1)' has been fully parsed.");

