USE employees_db;
INSERT INTO department (name) VALUES
    ("Sales"), 
    ("Finance"),
    ("Marketing"),
    ("Engineering");

INSERT INTO role (title, salary, department_id) VALUES
    ("Account Executive", 75000, 1),
    ("Accountant", 60000, 2),
    ("Marketing Researcher", 100000, 3),
    ("Software Engineer", 90000, 4),
    ("Sales Manager", 120000, 1),
    ("Finance Manager", 140000, 2),
    ("Marketing Director", 160000, 3),
    ("Engineering Manager", 180000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ("Sarah", "Johnson", 5, NULL),
    ("Naomi", "Silver", 6, NULL),
    ("Britney", "Pearson", 7, NULL),
    ("Brett", "Hart", 8, NULL),
    ("Michael", "Smith", 1, 5),
    ("James", "Brown", 2, 6),
    ("Robert", "Hawkins", 3, 7),
    ("Penny", "Hardaway", 4, 8);
