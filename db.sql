/* CREATE TABLE IF NOT EXISTS ministro (
    id VARCHAR(11) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    ci VARCHAR(11) NOT NULL,
    genero VARCHAR(1) DEFAULT 'M',
    email VARCHAR(50) NULL,
    celular VARCHAR(11) NULL,
    categoria VARCHAR(1) NULL,
    funciones VARCHAR(1) NULL,
    distrito VARCHAR(1) NOT NULL,
    provincia VARCHAR(3)NOT NULL,
    presbiterio VARCHAR(3)NOT NULL,
    iglesia VARCHAR(255),
    matrimonio INT DEFAULT 1,
    hospedaje INT DEFAULT 0,
    ci_conyugue VARCHAR(11),
    PRIMARY KEY(id)
  );

CREATE TABLE IF NOT EXISTS categoria (
    id VARCHAR(11) NOT NULL,
    nombre VARCHAR(255),
    PRIMARY KEY(id)
); 

CREATE TABLE IF NOT EXISTS funciones (
    id VARCHAR(11) NOT NULL,
    nombre VARCHAR(255),
    PRIMARY KEY(id)
);*/

CREATE TABLE IF NOT EXISTS distritos (
    id VARCHAR(11) NOT NULL,
    nombre VARCHAR(255),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS provincias (
    id VARCHAR(11) NOT NULL,
    nombre VARCHAR(255),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS presbiterios (
    id VARCHAR(11) NOT NULL,
    nombre VARCHAR(255),
    PRIMARY KEY(id)
);

INSERT INTO `funciones` (`id`, `nombre`) 
VALUES ('3', 'Evangelista'), ('4', 'Maestro'); 