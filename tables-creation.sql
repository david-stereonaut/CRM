USE sql_intro;

/* CREATE TABLE owner(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(40)
);

CREATE TABLE country(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20)
);

CREATE TABLE email_type(
    id INT PRIMARY KEY,
    type VARCHAR(1)
);

CREATE TABLE client(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    email VARCHAR(40),
    first_contact VARCHAR(40),
    sold BOOLEAN,
    owner_id INT,
    country_id INT,
    email_type_id INT,
    FOREIGN KEY (owner_id) REFERENCES owner(id),
    FOREIGN KEY (country_id) REFERENCES country(id),
    FOREIGN KEY (email_type_id) REFERENCES email_type(id)
); */

/* DROP TABLE client;
DROP TABLE owner;
DROP TABLE country;
DROP TABLE email_type; */

SELECT country.name ,COUNT(*) as count 
FROM client
JOIN country ON client.country_id = country.id
WHERE client.sold = 1
GROUP BY client.country_id
ORDER BY count DESC