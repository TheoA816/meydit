DROP TABLE IF EXISTS addrs CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS quotes CASCADE;

CREATE TABLE IF NOT EXISTS addrs ( 
    id SERIAL PRIMARY KEY,
    country TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zipcode NUMERIC NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    phone TEXT,
    addr INT,
    FOREIGN KEY (addr) references addrs (id)
);

CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    clothing TEXT NOT NULL,
    material TEXT NOT NULL,
    budget INT,
    images TEXT[],
    descr TEXT,
    contact INT NOT NULL,
    addr INT NOT NULL,
    FOREIGN KEY (contact) references users (id),
    FOREIGN KEY (addr) references addrs (id)
);

CREATE TABLE IF NOT EXISTS quotes (
    id SERIAL PRIMARY KEY,
    job INT NOT NULL,
    cost TEXT NOT NULL,
    finishBy DATE NOT NULL,
    contact INT NOT NULL,
    FOREIGN KEY (contact) references users (id)
);