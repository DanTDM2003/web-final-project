const cn = require('../config/database.js');

module.exports = async () => {
    let checkTableQuery = "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'Products')";
    
    await cn.connection.oneOrNone(checkTableQuery)
        .then((result) => { 
            const exists = result.exists;
            if (!exists) {
                const createTableQuery = `CREATE TABLE "Products" (
                    id SERIAL PRIMARY KEY NOT NULL,
                    "Name" text,
                    "Rating" INT,
                    "Price" INT,
                    "Short_Description" text,
                    "Quantity" INT,
                    "Full_Description" TEXT,
                    "Thumbnail" TEXT,
                    "Category_id" INT,

                    FOREIGN KEY ("Category_id") REFERENCES "Categories"(id) ON DELETE SET NULL
                );

                INSERT INTO "Products"("Name","Rating","Price","Short_Description","Quantity","Full_Description","Thumbnail","Category_id")
                VALUES  ('Test-clothing1', 1, 1, 'Test-short', 0, 'Test-full', 'product-1.png', 1),
                        ('Test-clothing2', 2, 2, 'Test-short', 0, 'Test-full', 'product-2.png', 2),
                        ('Test-clothing3', 3, 3, 'Test-short', 0, 'Test-full', 'product-3.png', 3),
                        ('Test-clothing4', 4, 4, 'Test-short', 0, 'Test-full', 'product-4.png', 4),
                        ('Test-clothing5', 5, 5, 'Test-short', 0, 'Test-full', 'product-5.png', 5),
                        ('Test-clothing6', 1, 6, 'Test-short', 0, 'Test-full', 'product-6.png', 1),
                        ('Test-clothing7', 2, 7, 'Test-short', 0, 'Test-full', 'product-7.png', 2),
                        ('Test-clothing8', 3, 8, 'Test-short', 0, 'Test-full', 'product-8.png', 3),
                        ('Test-clothing9', 4, 9, 'Test-short', 0, 'Test-full', 'product-9.png', 4),
                        ('Test-clothing10', 5, 10, 'Test-short', 0, 'Test-full', 'product-10.png', 5),
                        ('Test-clothing11', 1, 11, 'Test-short', 0, 'Test-full', 'product-1.png', 1),
                        ('Test-clothing12', 2, 12, 'Test-short', 0, 'Test-full', 'product-2.png', 2),
                        ('Test-clothing13', 3, 13, 'Test-short', 0, 'Test-full', 'product-3.png', 3),
                        ('Test-clothing14', 4, 14, 'Test-short', 0, 'Test-full', 'product-4.png', 4),
                        ('Test-clothing15', 5, 15, 'Test-short', 0, 'Test-full', 'product-5.png', 5),
                        ('Test-clothing16', 1, 16, 'Test-short', 0, 'Test-full', 'product-6.png', 1),
                        ('Test-clothing17', 2, 17, 'Test-short', 0, 'Test-full', 'product-7.png', 2),
                        ('Test-clothing18', 3, 18, 'Test-short', 0, 'Test-full', 'product-8.png', 3),
                        ('Test-clothing19', 4, 19, 'Test-short', 0, 'Test-full', 'product-9.png', 4),
                        ('Test-clothing20', 5, 20, 'Test-short', 0, 'Test-full', 'product-10.png', 5),
                        ('Test-clothing21', 1, 21, 'Test-short', 0, 'Test-full', 'product-1.png', 1),
                        ('Test-clothing22', 2, 22, 'Test-short', 0, 'Test-full', 'product-2.png', 2),
                        ('Test-clothing23', 3, 23, 'Test-short', 0, 'Test-full', 'product-3.png', 3),
                        ('Test-clothing24', 4, 24, 'Test-short', 0, 'Test-full', 'product-4.png', 4),
                        ('Test-clothing25', 5, 25, 'Test-short', 0, 'Test-full', 'product-5.png', 5),
                        ('Test-clothing26', 1, 26, 'Test-short', 0, 'Test-full', 'product-6.png', 1),
                        ('Test-clothing27', 2, 27, 'Test-short', 0, 'Test-full', 'product-7.png', 2),
                        ('Test-clothing28', 3, 28, 'Test-short', 0, 'Test-full', 'product-8.png', 3),
                        ('Test-clothing29', 4, 29, 'Test-short', 0, 'Test-full', 'product-9.png', 4),
                        ('Test-clothing30', 5, 30, 'Test-short', 0, 'Test-full', 'product-10.png', 5)
                `;

                return cn.connection.query(createTableQuery)
                    .then(() => {
                        console.log('Products table created successfully.');
                    });
            } else {
                console.log('Products table already exists.');
            }
        })
        .catch((error) => {
            console.error('Error occurred during table check:', error);
        });
}