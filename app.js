const inquirer = require('inquirer');


// Defining fs so fs.writeFile can be used
// const fs = require('fs');

// Used require so that generatePage function in page-template.js can be used in this module
// const generatePage = require('./src/page-template.js');

// Variable created to hold the generatePage function. Placed it in fs.writeFile as a parameter so we aren't using a function directly.
// const pageHTML = generatePage(name, github);

inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    }
  ])
  .then(answers => console.log(answers));

// generatePage function was here. Moved it to its own file to Modularize code. With that being said, I had to add module.export at bottom of page-template file and require at the top of this file to use generatePage function. Now I'm able to use functions from one module inside another!

  
  // function to create file
//   fs.writeFile('index.html', pageHTML, err => {
//     if (err) throw new Error (err);
  
//     console.log('Portfolio complete! Check out index.html to see the output!');
//   });

