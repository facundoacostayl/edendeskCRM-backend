CREATE TABLE users (
id serial primary key,
loginemail VARCHAR(50) not null,
password VARCHAR(50) not null
);

CREATE TABLE clients (
    id serial primary key,
    name varchar(50) not null,
    saldo int not null,
    created_by int not null,
    foreign key(created_by) references users(id)
);

ALTER TABLE users RENAME TO user;

INSERT INTO clients (nombre, apellido, saldo, telefono, "userId")
VALUES
('Magnasco', 'Magnasco', 200 , 1122334455,'1'),
('Enzo', 'Enzo',  1900 , 1122334455,'1'),
('Charly', 'Charly', 2700 , 1122334455,'1'),
('Jaimito', 'Jaimito', 900 , 1122334455,'1'),
('Rigoberto', 'Rigoberto', 400 , 1122334455,'2'),
('Utonio', 'Utonio', 450 , 1122334455,'2'),
('Fallout', 'Fallout', 5000 , 1122334455,'3'),
('Hades', 'Hades', 7000 , 1122334455,'3')
;

INSERT INTO users (loginemail, password)
VALUES
('Magnasco', 200 ,'1'),
('Enzo', 1900 ,'1'),
('Charly', 2700 ,'1')
;