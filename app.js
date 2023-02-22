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
function addRole(){
  db.findAllDepartments()
  .then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          name: 'title',
          type: 'input',
          message: 'What is the title of the role?',
        },
        {
          name: 'salary',
          type: 'number',
          message: 'What is the salary of the role?',
        },
        {
          name: 'department_id',
          type: 'list',
          message: 'Which department does the role belong to?',
          choices: departmentChoices,
        },
      ])
      .then((answer) => {
        db.createRole(answer)
          .then(() => console.log(`Added ${answer.title} to the database`))
          .then(() => start());
      });
  });
}

//Function to Add an Employee
function addEmployee(){
  db.findAllRoles()
  .then(([rows]) => {
    let roles = rows;
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id,
    }));

    db.findAllEmployees()
      .then(([rows]) => {
        let employees = rows;
        const managerChoices = employees.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id,
        }));

        inquirer.prompt([
          {
            type: "input",
            name: "first_name",
            message: "Enter the employee's first name:",
          },
          {
            type: "input",
            name: "last_name",
            message: "Enter the employee's last name:",
          },
          {
            type: "list",
            name: "role_id",
            message: "Select the employee's role:",
            choices: roleChoices,
          },
          {
            type: "list",
            name: "manager_id",
            message: "Select the employee's manager:",
            choices: managerChoices,
          },
        ])
        .then((answer) => {
          db.createEmployee(answer)
            .then(() => console.log(`Added ${answer.first_name} ${answer.last_name} to the database`))
            .then(() => start())
            .catch((err) => console.log(err));
        });
      });
  });
}

//Function to Update an EMployee ROle
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
function updateEmployeeRole(){

}
//then statment for answers
