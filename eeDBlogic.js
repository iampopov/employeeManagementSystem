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
const questions = async (inputs = []) => {
  const prompts = [
    {
      name: 'addViewUpdate',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: ['Add', 'View', 'Update', 'Exit']
    },
    {
      name: 'addWhat',
      type: 'rawlist',
      message: 'What would you like to add?',
      choices: ['Department', 'Role', 'Employee'],
      when: answers => answers['addViewUpdate']==='Add'
    },
    {
      name: 'updateWhat',
      type: 'rawlist',
      message: 'What would you like to update?',
      choices: ['Department', 'Role', 'Employee'],
      when: answers => answers['addViewUpdate']==='Update'
    },
    {
      name: 'viewWhat',
      type: 'rawlist',
      message: 'What would you like to view?',
      choices: ['Department', 'Role', 'Employee'],
      when: answers => answers['addViewUpdate']==='View'
    },
    {
      name: 'employeeFN',
      message: "Please enter employee first name",
      validate: validateName,
      when: answers => answers['addWhat']==='Employee'
    },
    {
      name: 'employeeLN',
      message: "Please enter employee last name",
      validate: validateName,
      when: answers => answers['addWhat']==='Employee'
    },
    {
      name: 'employeeRole',
      message: 'Please enter 1 for Staff and 2 for Manager',
      validate: validateId,
      when: answers => answers['addWhat']==='Employee'
    },
    {
      name: 'manager',
      message: 'Please enter manager number',
      validate: validateId,
      when: answers => answers['employeeRole']==='2'
    }
  ]
const {again, ...answers} = await inquirer.prompt(prompts);
const newInputs = [...inputs, answers];
return again ? questions(newInputs) : newInputs;
}

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

const start = async () => {
  const inputs = await questions();
  //console.log(inputs[0].addViewUpdate);
  const updateDepartment = () => {
    console.log('update department!')
  }
  const updateRole = () => {
    console.log('update Role!')
  }
  const updateEmployee = () => {
    console.log('update Employee!')
  }
  
  const viewDepartment = () => {
    console.log('view department!')
  }
  const viewRoles = () => {
    console.log('view Roles!')
  }
  const viewEmployees = () => {
    console.log('view Employees!')
  }
  
  const addNewDepartment = () => {
    console.log('Add new department!')
  }
  const addNewRole = () => {
    console.log('Add new Role!')
  }
  const addNewEmployee = () => {
    console.log('Add new Employee!')
  }
  const exit = () => connection.end();

  if (inputs[0].addViewUpdate === 'Exit') {
    exit();
  } else if (inputs[0].addViewUpdate === 'Add') {
    console.log(inputs);
  }

}

function validateName(name) {
  return name !== '' || "Please enter Name"
}

function validateId(id)
{
    const reg = /^\d+$/;
    return reg.test(id) || "ID should be a number!";
}
