// Import and require mysql2

const inquirer = require('inquirer');
require('console.table');

const db = require("./db")



start()
// Function to prompt the user for what they would like to do
function start() {
    inquirer.prompt(
      {name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]})
      .then((answer) => {
        switch (answer.action) {
          case 'View all departments':
            viewAllDepartments();
            break;
          case 'View all roles':
            viewAllRoles();
            break;
          case 'View all employees':
            viewAllEmployees();
            break;
          case 'Add a department':
            addDepartment();
            break;
          case 'Add a role':
            addRole();
            break;
          case 'Add an employee':
            addEmployee();
            break;
          case 'Update an employee role':
            updateEmployeeRole();
            break;
          case 'Exit':
            console.log('Goodbye!');
            connection.end();
            break;
        }
      });
}
// Function to View all Departments 
function viewAllDepartments() {
  db.findAllDepartments()
  .then(([rows]) => {
    const departments = rows;
    console.table(departments);
  })
  .then(() => start());
}

// Function to View all Roles
function viewAllRoles() {
  db.findAllRoles()
  .then(([rows]) => {
    const roles = rows;
    console.table(roles);
  })
  .then(() => start());
}

// Function to View all Employees
function viewAllEmployees() {
  db.findAllEmployees()
  .then(([rows]) => {
    let employees = rows
    console.table (employees);
  })
  .then(() => start())
  }

//Function to Add a Department
function addDepartment(){
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the department?',
      validate: (input) => {
        if (input === '') {
          return 'Department name cannot be empty.';
        }
        return true;
      },
    },
  ]).then((answer) => {
    db.createDepartment(answer.name)
      .then(() => console.log(`Added ${answer.name} to the database.`))
      .then(() => start());
  });
}

//Function to Add a Role
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
function addRole(){
    
}
//Function to Add an Employee
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
function addEmployee(){

}
    //     type: "input",
    //     name: "firstName",  
    //     message: "Enter the employee's first name:",
    //   Do the same for lastName, roleId and ManagerId (Creating Roles??)

    
//Function to Update an EMployee ROle
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
function updateEmployeeRole(){

}
//then statment for answers
