CREATE TABLE operation (
    id SERIAL PRIMARY KEY,
    year INT NOT NULL,
    month INT NOT NULL,
    userGain INT,
    userLost INT,
    userTotalBalance INT,
    dayTransactions INT,
    createdAt INT,
    userId INT NOT NULL
);