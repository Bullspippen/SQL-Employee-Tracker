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
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role',
        'View Department Budget',
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
          case "View Department Budget":
            viewDepartmentBudget();
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
    db.createDepartment(answer)
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

//Function to Update an Employee Role
function updateEmployeeRole(){
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
      }));

    db.findAllRoles()
      .then(([rows]) => {
        let roles = rows;
        const roleChoices = roles.map(({ id, title }) => ({
          name: title,
          value: id,
      }));

      inquirer.prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: "Which employee's role do you want to update?",
          choices: employeeChoices,
        },
        {
          type: 'list',
          name: 'roleId',
          message: "Which role do you want to assign to the selected employee?",
          choices: roleChoices,
        },
      ])
        .then((answers) => {
          // Update the employee's role in the database
          db.updateEmployeeRole(answers.employeeId, answers.roleId)
            .then(() => console.log('Employee role updated successfully!'))
            .then(() => start());
        });
    });
});

//Function to View Department Budget
function viewDepartmentBudget() {
  db.findDepartmentBudget()
    .then(([rows]) => {
      const budget = rows;
      console.table(budget);
    })
      .then(() => start())
}}
