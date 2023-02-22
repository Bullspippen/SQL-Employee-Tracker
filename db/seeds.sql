USE employees_db;
INSERT INTO department (name) VALUES
    ("sales"), 
    ("finance"),
    ("marketing"),
    ("enigneering");

INSERT INTO role (title, salary, department_id) VALUES
    ("Account Executive", 75000, 1),
    ("Accountant", 60000, 2),
    ("Markerting Researcher", 100000, 3),
    ("Software Engineer", 90000, 4);
    ("Sales Manager", 120000, 1),
    ("Finance Manager", 140000, 2),
    ("Marketing Director", 160000, 3),
    ("Engineering Manager", 830000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ("Michael", "Smith", 1, 2),
    ("James", "Brown", 2, 2),
    ("Robert", "Hawkins", 3, 3),
    ("Penny", "Hardaway", 4, 4);
    ("Sarah", "Johnson", 2, 1)
    ("Naomi", "Silver", 3, 2)
    ("Britney", "Pearson", 4, 4)
    ("Brett", "Hart",1, 1)
