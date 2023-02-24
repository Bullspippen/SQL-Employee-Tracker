const connection = require("./connection")

class DB{
    constructor(connection){
        this.connection = connection
    }
    findAllEmployees(){
        return this.connection.promise().query(
            `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM employee 
            LEFT JOIN role ON employee.role_id = role.id 
            LEFT JOIN department ON role.department_id = department.id 
            LEFT JOIN employee manager ON manager.id = employee.manager_id;`
        );
    }

    findAllDepartments() {
        return this.connection.promise().query(
            `SELECT id, name 
            FROM department`
        );
    }

    findAllRoles() {
        return this.connection.promise().query(
            `SELECT role.id, role.title, department.name AS department, role.salary 
            FROM role 
            LEFT JOIN department ON role.department_id = department.id`
        );
    }

    addEmployee(employee) {
        const { first_name, last_name, role_id, manager_id } = employee;
        return this.connection.promise().query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES (?, ?, ?, ?)`,
            [first_name, last_name, role_id, manager_id]
        );
    }

    removeEmployee(employee_id) {
        return this.connection.promise().query(
            `DELETE FROM employee 
            WHERE id = ?`,
            [employee_id]
        );
    }

    updateEmployeeRole(employee_id, role_id) {
        return this.connection.promise().query(
            `UPDATE employee 
            SET role_id = ? 
            WHERE id = ?`,
            [role_id, employee_id]
        );
    }

    updateEmployeeManager(employee_id, manager_id) {
        return this.connection.promise().query(
            `UPDATE employee 
            SET manager_id = ? 
            WHERE id = ?`,
            [manager_id, employee_id]
        );
    }


    findAllEmployeesByManager(manager_id) {
        return this.connection.promise().query(
            `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM employee 
            LEFT JOIN role ON employee.role_id = role.id 
            LEFT JOIN department ON role.department_id = department.id 
            LEFT JOIN employee manager ON manager.id = employee.manager_id 
            WHERE manager.id = ?`,
            [manager_id]
        );
    }

    findAllEmployeesByDepartment(department_id) {
        return this.connection.promise().query(
            `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM employee 
            LEFT JOIN role ON employee.role_id = role.id 
            LEFT JOIN department ON role.department_id = department.id 
            LEFT JOIN employee manager ON manager.id = employee.manager_id 
            WHERE department.id = ?`,
            [department_id]
        );
    }

    viewDepartmentBudget() {
        return this.connection.promise().query(`
          SELECT d.name AS department_name, SUM(r.salary) AS total_salary_budget
          FROM department d
          JOIN role r ON d.id = r.department_id
          JOIN employee e ON r.id = e.role_id
          GROUP BY d.name;
        `)
        .then(([rows]) => {
          console.table(rows);
        })
        .catch((error) => {
          console.error(error);
        });
      }
      
      start() {
        this.viewDepartmentBudget();
      }
    
      createDepartment(department) {
        return this.connection.promise().query("INSERT INTO department SET ?", department);
      }
    
      createRole(role) {
        return this.connection.promise().query("INSERT INTO role SET ?", role);
      }
    
      createEmployee(employee) {
        return this.connection.promise().query("INSERT INTO employee SET ?", employee);
      }
    }
    
    module.exports = new DB(connection);