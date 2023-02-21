USE employees_db;
INSERT INTO department (name) VALUES
    ("sales"), 
    ("finance"),
    ("marketing"),
    ("enigneering");

INSERT INTO role (title, salary, department_id) VALUES
    ("Account Executive", 75000, 1),
    ("Accountant", 60000, 2),
    ("Director of Marketing", 100000, 3),
    ("Software Engineer", 90000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ("Michael", "Smith", 1, NULL),
    ("James", "Brown", 2, NULL),
    ("Robert", "Hawkins", 3, NULL),
    ("Penny", "Hardaway", 4, NULL);
