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
('Enzo', 'Enzo',  1900 , 2222222222,'1'),
('Charly', 'Charly', 2700 , 3333333333,'1'),
('Jaimito', 'Jaimito', 900 , 4444444444,'1'),
('Martin', 'Martin', 400 , 5555555555,'1'),
('Joaquin', 'Joaquin', 450 , 666666666,'1'),
('Jose', 'Jose', 5000 , 7777777777,'1'),
('Cabezon', 'Cabezon', 7000 , 8888888888,'1'),
('Fede', 'Fede', 7000 , 9999999999,'1'),
('Willy', 'Willy', 7000 , 1010101010,'1')
;

INSERT INTO users (loginemail, password)
VALUES
('Magnasco', 200 ,'1'),
('Enzo', 1900 ,'1'),
('Charly', 2700 ,'1')
;