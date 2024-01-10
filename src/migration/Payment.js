const cn = require('../config/database.js');

module.exports = async () => {
    let checkTableQuery = "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'Payment')";
    
    await cn.connection.oneOrNone(checkTableQuery)
        .then((result) => { 
            const exists = result.exists;
            if (!exists) {
                const createTableQuery = `CREATE TABLE "Payment" (
                    id SERIAL PRIMARY KEY NOT NULL,
                    "User_id" INT,
                    "Firstname" VARCHAR,
                    "Lastname" VARCHAR,
                    "Email" VARCHAR,
                    "Phone" VARCHAR,
                    "Address" VARCHAR,
                    "Content" JSONB,
                    "Date" TIMESTAMP,

                    FOREIGN KEY ("User_id") REFERENCES "Users"(id) ON DELETE CASCADE
                );
                `;

                return cn.connection.query(createTableQuery)
                    .then(() => {
                        console.log('Payment table created successfully.');
                    });
            } else {
                console.log('Payment table already exists.');
            }
        })
        .catch((error) => {
            console.error('Error occurred during table check:', error);
        });
}