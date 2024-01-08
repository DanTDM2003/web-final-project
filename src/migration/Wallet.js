const cn = require('../config/database.js');

module.exports = async () => {
    let checkTableQuery = "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'Wallet')";
    
    await cn.connection.oneOrNone(checkTableQuery)
        .then((result) => { 
            const exists = result.exists;
            if (!exists) {
                const createTableQuery = `CREATE TABLE "Wallet" (
                    id SERIAL PRIMARY KEY NOT NULL,
                    "User_id" INT,
                    "Balance" INT,

                    FOREIGN KEY ("User_id") REFERENCES "Users"(id) ON DELETE CASCADE
                );

                INSERT INTO "Wallet"("User_id","Balance")
                VALUES  (1, 100),
                        (2, 500)
                `;

                return cn.connection.query(createTableQuery)
                    .then(() => {
                        console.log('Wallet table created successfully.');
                    });
            } else {
                console.log('Wallet table already exists.');
            }
        })
        .catch((error) => {
            console.error('Error occurred during table check:', error);
        });
}