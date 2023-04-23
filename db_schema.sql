DROP TABLE IF EXISTS address CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS job CASCADE;
DROP TABLE IF EXISTS quote CASCADE;

CREATE TABLE IF NOT EXISTS address ( 
    id SERIAL PRIMARY KEY,
    country TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zipcode NUMERIC NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    addr INT NOT NULL,
    FOREIGN KEY (addr) references address (id)
);

CREATE TABLE IF NOT EXISTS job (
    id SERIAL PRIMARY KEY,
    clothing TEXT NOT NULL,
    material TEXT NOT NULL,
    budget INT,
    images TEXT[],
    descr TEXT NOT NULL,
    contact INT NOT NULL,
    addr INT NOT NULL,
    FOREIGN KEY (contact) references users (id),
    FOREIGN KEY (addr) references address (id)
);

CREATE TABLE IF NOT EXISTS quote (
    id SERIAL PRIMARY KEY,
    job INT NOT NULL,
    cost TEXT NOT NULL,
    finishBy DATE NOT NULL,
    contact INT NOT NULL,
    FOREIGN KEY (contact) references users (id)
);