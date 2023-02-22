USE employees_db;
INSERT INTO department (name) VALUES
    ("sales"), 
    ("finance"),
    ("marketing"),
    ("engineering");

INSERT INTO role (title, salary, department_id) VALUES
    ("Account Executive", 75000, 1),
    ("Accountant", 60000, 2),
    ("Marketing Researcher", 100000, 3),
    ("Software Engineer", 90000, 4),
    ("Sales Manager", 120000, 5),
    ("Finance Manager", 140000, 6),
    ("Marketing Director", 160000, 7),
    ("Engineering Manager", 180000, 8);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ("Michael", "Smith", 1, 5),
    ("James", "Brown", 2, 6),
    ("Robert", "Hawkins", 3, 7),
    ("Penny", "Hardaway", 4, 8),
    ("Sarah", "Johnson", 2, 5),
    ("Naomi", "Silver", 3, 6),
    ("Britney", "Pearson", 4, 8),
    ("Brett", "Hart",1, 5);
