const mysql = require("mysql");
const inquirer = require("inquirer");
require("dotenv").config();

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.db_pass,
  database: "ee_db"
});


// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});



const updateDepartment = () => {
    console.log('update department!')
    start();
  }
  const updateRole = () => {
    console.log('update Role!')
    start();
  }
  const updateEmployee = () => {
    console.log('update Employee!')
    start();
  }
  
  const viewDepartment = () => {
    console.log('view department!')
    start();
  }
  const viewRole = () => {
    console.log('view Roles!')
    start();
  }
  const viewEmployee = () => {
    console.log('view Employees!')
    start();
  }
  
  const addNewDepartment = () => {
    console.log('Add new department!')
    start();
  }
  const addNewRole = () => {
    console.log('Add new Role!')
    start();
  }
  const addNewEmployee = () => {
    console.log('Add new Employee!')
    start();
  }
  function exit() {
      connection.end();
    }

  function addWhat() {
    // console.log('what')
      inquirer.prompt({
        name: 'addWhat',
        type: 'list',
        message: 'What would you like to add?',
        choices: ['Department', 'Role', 'Employee'],
      }).then(function(answer) {
          switch (answer.addWhat) {
            case 'Department':
                addNewDepartment();
                break;
            case 'Role':
                addNewRole();
                break;
            case 'Employee':
                addNewEmployee();
                break;
          }
      })
  }

  const viewWhat = () => {
      inquirer.prompt({
        name: 'viewWhat',
        type: 'list',
        message: 'What would you like to view?',
        choices: ['Department', 'Role', 'Employee']
      }).then(answer => {
          switch (answer.viewWhat) {
            case 'Department':
                    viewDepartment();
                    break;
                case 'Role':
                    viewRole();
                    break;
                case 'Employee':
                    viewEmployee();
                    break; 
          }
      })
  }

  const updateWhat = () => {
    inquirer.prompt({
      name: 'updateWhat',
      type: 'list',
      message: 'What would you like to update?',
      choices: ['Department', 'Role', 'Employee']
    }).then(answer => {
        switch (answer.updateWhat) {
          case 'Department':
                  updateDepartment();
                  break;
              case 'Role':
                  updateRole();
                  break;
              case 'Employee':
                  updateEmployee();
                  break; 
        }
    })
}

  function start() {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['Add', 'View', 'Update', 'Exit']
        })
        .then(function(answer) {
        switch (answer.action) {
            case 'Add':
            addWhat();
            break;

            case 'View':
            viewWhat();
            break;

            case 'Update':
            updateWhat();
            break;

            case 'Exit':
            exit();
            break;
        }
    })
}