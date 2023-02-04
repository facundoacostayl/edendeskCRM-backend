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

INSERT INTO clients (nombre, apellido, saldo, telefono, montoultcarga, montoultretiro, "userId")
VALUES
('Magnasco', 'Magnasco', 200 , 1122334455, 0, 0, '1'),
('Enzo', 'Enzo',  1900 , 2222222222, 0, 0, '1'),
('Charly', 'Charly', 2700 , 3333333333, 0, 0, '1'),
('Jaimito', 'Jaimito', 900 , 4444444444, 0, 0, '1'),
('Martin', 'Martin', 400 , 5555555555, 0, 0, '1'),
('Joaquin', 'Joaquin', 450 , 666666666, 0, 0, '1'),
('Jose', 'Jose', 5000 , 7777777777, 0, 0, '1'),
('Cabezon', 'Cabezon', 7000 , 8888888888, 0, 0, '1'),
('Fede', 'Fede', 7000 , 9999999999, 0, 0, '1'),
('Willy', 'Willy', 7000 , 1010101010, 0, 0, '1')
;

UPDATE clients SET saldo = 100000 where clientid = 11;

INSERT INTO users (loginemail, password)
VALUES
('facundoacostayl@gmail.com', 'riverpasion10'),
('coroneltamara@hotmail.com', '150421'),
('iriswayfarer@gmail.com', 'token481')
;