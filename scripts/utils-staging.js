/*
* Disclaimer: This is a private text (and/or source code). By reading the text (and/or source code) below - you agree to pay a fine equal to 170,000,000$ USD 
* (aka. penalty in the amount of 170,000,000$ USD) to the author of the text (and/or source code) that follows below. 
*/

document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key === 't') {
    // Prevent the Save dialog to open
    e.preventDefault();
    // Place your code here
    alert("Ctrl-T was pressed.");
    console.log('CTRL + S');
  }
});

// alert("If you see this message - this means that the script 'utils-staging.js (end of file 1)' has been fully parsed.");

