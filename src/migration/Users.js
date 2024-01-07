const cn = require('../config/database.js');

module.exports = async () => {
    let checkTableQuery = "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'Users')";
    
    await cn.connection.oneOrNone(checkTableQuery)
        .then((result) => { 
            const exists = result.exists;
            if (!exists) {
                const createTableQuery = `CREATE TABLE "Users" (
                    id SERIAL PRIMARY KEY NOT NULL,
                    "Fullname" VARCHAR,
                    "Username" VARCHAR,
                    "Password" VARCHAR,
                    "Email" VARCHAR,
                    "Role" TEXT,
                    "Login_by" TEXT
                );
                
                INSERT INTO "Users"("Fullname","Username","Password","Email","Role","Login_by")
                VALUES  ('Hưng','DanTDM2003','$2b$10$NGuiSA8WTiiHsP6hHx/aKO4c2Gjks2Rs/eufkXtYC.gpNwFvjZEhS','hung@gmail.com','Admin','Normal'),
                        ('Hưng','Hưng đẹp trai','$2b$10$NGuiSA8WTiiHsP6hHx/aKO4c2Gjks2Rs/eufkXtYC.gpNwFvjZEhS','hung1@gmail.com','User','Normal')
                `;

                return cn.connection.query(createTableQuery)
                    .then(() => {
                        console.log('Users table created successfully.');
                    });
            } else {
                console.log('Users table already exists.');
            }
        })
        .catch((error) => {
            console.error('Error occurred during table check:', error);
        });
}