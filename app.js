const inquirer = require('inquirer');


// Defining fs so fs.writeFile can be used
const fs = require('fs');

// Used require so that generatePage function in page-template.js can be used in this module
const generatePage = require('./src/page-template.js');



// Wrapped inquirer.prompt() in a function so that it can be invoked on demand within the flow of the application.
const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section?',
        default: true
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        when: ({ confirmAbout }) => {
          if (confirmAbout) {
            return true;
          } else {
            return false;
          }
        }
      },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username (Required):',
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('Please enter your GitHub username!');
              return false;
            }
          }
      },
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
        message: 'What is the name of your project? (Required)',
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('Please enter project name!');
              return false;
            }
          }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required):',
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('Please enter project description!');
              return false;
            }
          }
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
        message: 'Enter the GitHub link to your project. (Required)',
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('Please enter GitHub link to your project!');
              return false;
            }
          }
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
    const pageHTML = generatePage(portfolioData);
    
  

// generatePage function was here. Moved it to its own file to Modularize code. With that being said, I had to add module.export at bottom of page-template file and require at the top of this file to use generatePage function. Now I'm able to use functions from one module inside another!

  
  // function to create file
  fs.writeFile('index.html', pageHTML, err => {
    if (err) throw new Error (err);
  
    console.log('Portfolio complete! Check out index.html to see the output!');
  });

});