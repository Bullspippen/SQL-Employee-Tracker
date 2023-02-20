// Import and require mysql2
const mysql = require('mysql2');

const inquirer = require('inquirer');
const consoleTable = require('console.table');

// Create the connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    port: 3301,
    user: 'root',
    password: '',
    database: 'employees_db'
  });


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