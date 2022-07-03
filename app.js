const inquirer = require('inquirer');


// Defining fs so fs.writeFile can be used
// const fs = require('fs');

// Used require so that generatePage function in page-template.js can be used in this module
// const generatePage = require('./src/page-template.js');

// Variable created to hold the generatePage function. Placed it in fs.writeFile as a parameter so we aren't using a function as a parameter.
// const pageHTML = generatePage(name, github);

// Wrapped inquirer.prompt() in a function so that it can be invoked on demand within the flow of the application.
const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username:'
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:'
      }
  ]);
};

// added the parameter, portfolioData to store the project data.
const promptProject = portfolioData => {
    // If there's no 'projects' array property, create one
if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
    console.log(`
  =================
  Add a New Project
  =================
  `);
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project?'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)'
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)'
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ])
    .then(projectData => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};
  
  promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
  });

// generatePage function was here. Moved it to its own file to Modularize code. With that being said, I had to add module.export at bottom of page-template file and require at the top of this file to use generatePage function. Now I'm able to use functions from one module inside another!

  
  // function to create file
//   fs.writeFile('index.html', pageHTML, err => {
//     if (err) throw new Error (err);
  
//     console.log('Portfolio complete! Check out index.html to see the output!');
//   });

