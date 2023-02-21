const connection = require("./connection")

class DB{
    constructor(connection){
        this.connection = connection
    }
    findAllEmployees(){
        return this.connection.promise().query(
            "select employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, concat(manager.first_name, ' ', manager.last_name) as manager from employee left join role on employee.role_id = role.id left join department on role.department_id = department.id left join employee manager on manager.id = employee.manager_id;" 
        )
    }
}

module.exports = new DB (connection);