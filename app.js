const fs = require('fs');

const generatePage = require('./src/page-template.js');

// Holds the data arguments
const profileDataArgs = process.argv.slice(2);
//Defines the data (Data destructuring)
const [name, github] = profileDataArgs;

// generatePage function was here. Moved it to its own file to Modularize code. With that being said, I had to add module.export at bottom of page-template file and require at the top of this file to use generatePage function. Now I'm able to use functions from one module inside another!

  
  // function to create file
  fs.writeFile('index.html', generatePage(name, github), err => {
    if (err) throw new Error (err);
  
    console.log('Portfolio complete! Check out index.html to see the output!');
  });

