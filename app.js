// Import and require mysql2
const mysql = require('mysql2');

const inquirer = require('inquirer');
require('console.table');




// Function to prompt the user for what they would like to do
function start() 
    inquirer.prompt
      name: 'action',
      type; 'list',
      message; 'What would you like to do?',
      choices; [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
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
    
// Function to View all Departments 
function viewAllDepartments() {
    connection.query('SELECT * FROM department', (err, res) => {
      if (err) throw err;
      console.table(res);
      start();
    });
  }

// Function to View all Roles
function viewAllRoles() {
    connection.query('SELECT * FROM role', (err, res) => {
      if (err) throw err;
      console.table(res);
      start();
    });
  }

// Function to View all Employees
function viewAllEmployees() {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id', (err, res) => {
      if (err) throw err;
      console.table(res);
      start();
    });
  }

//Function to Add a Department
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
function addDepartment(){

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
