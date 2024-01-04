const cn = require('../config/database.js');

module.exports = async () => {
    let checkTableQuery = "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'Carts')";
    
    await cn.connection.oneOrNone(checkTableQuery)
        .then((result) => { 
            const exists = result.exists;
            if (!exists) {
                const createTableQuery = `CREATE TABLE "Carts" (
                    id SERIAL PRIMARY KEY NOT NULL,
                    "User_id" INT,
                    "Cart" JSONB,

                    FOREIGN KEY ("User_id") REFERENCES "Users"(id) ON DELETE CASCADE
                );

                INSERT INTO "Carts"("User_id","Cart")
                VALUES  (1, '[]'),
                        (2, '[]')
                `;

                return cn.connection.query(createTableQuery)
                    .then(() => {
                        console.log('Carts table created successfully.');
                    });
            } else {
                console.log('Carts table already exists.');
            }
        })
        .catch((error) => {
            console.error('Error occurred during table check:', error);
        });
}