DROP TABLE IF EXISTS "Product";
CREATE TABLE "Product"(
  "id" serial PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "star" int4 NOT NULL,
  "price" int4 NOT NULL,
  "short_description" text NOT NULL,
  "quantity" int4 NOT NULL,
  "full_description" text NOT NULL,
  "catID" serial NOT NULL
);

INSERT INTO "Product"(name,star,price,short_description,quantity,full_description,"catID") VALUES('Test-clothing', 1, 1, 'Test-short', 0, 'Test-full', 1),
('Test-clothing', 2, 2, 'Test-short', 0, 'Test-full', 2),
('Test-clothing', 3, 3, 'Test-short', 0, 'Test-full', 3),
('Test-clothing', 4, 4, 'Test-short', 0, 'Test-full', 4),
('Test-clothing', 5, 5, 'Test-short', 0, 'Test-full', 5),
('Test-clothing', 1, 6, 'Test-short', 0, 'Test-full', 1),
('Test-clothing', 2, 7, 'Test-short', 0, 'Test-full', 2),
('Test-clothing', 3, 8, 'Test-short', 0, 'Test-full', 3),
('Test-clothing', 4, 9, 'Test-short', 0, 'Test-full', 4),
('Test-clothing', 5, 10, 'Test-short', 0, 'Test-full', 5),
('Test-clothing', 1, 11, 'Test-short', 0, 'Test-full', 1),
('Test-clothing', 2, 12, 'Test-short', 0, 'Test-full', 2),
('Test-clothing', 3, 13, 'Test-short', 0, 'Test-full', 3),
('Test-clothing', 4, 14, 'Test-short', 0, 'Test-full', 4),
('Test-clothing', 5, 15, 'Test-short', 0, 'Test-full', 5),
('Test-clothing', 1, 16, 'Test-short', 0, 'Test-full', 1),
('Test-clothing', 2, 17, 'Test-short', 0, 'Test-full', 2),
('Test-clothing', 3, 18, 'Test-short', 0, 'Test-full', 3),
('Test-clothing', 4, 19, 'Test-short', 0, 'Test-full', 4),
('Test-clothing', 5, 20, 'Test-short', 0, 'Test-full', 5),
('Test-clothing', 1, 21, 'Test-short', 0, 'Test-full', 1),
('Test-clothing', 2, 22, 'Test-short', 0, 'Test-full', 2),
('Test-clothing', 3, 23, 'Test-short', 0, 'Test-full', 3),
('Test-clothing', 4, 24, 'Test-short', 0, 'Test-full', 4),
('Test-clothing', 5, 25, 'Test-short', 0, 'Test-full', 5),
('Test-clothing', 1, 26, 'Test-short', 0, 'Test-full', 1),
('Test-clothing', 2, 27, 'Test-short', 0, 'Test-full', 2),
('Test-clothing', 3, 28, 'Test-short', 0, 'Test-full', 3),
('Test-clothing', 4, 29, 'Test-short', 0, 'Test-full', 4),
('Test-clothing', 5, 30, 'Test-short', 0, 'Test-full', 5);

DROP TABLE IF EXISTS "Category";
CREATE TABLE "Category"(
  "catID" serial PRIMARY KEY NOT NULL,
  "catName" text NOT NULL
);

INSERT INTO "Category" VALUES(1, 'a');
INSERT INTO "Category" VALUES(2, 'b');
INSERT INTO "Category" VALUES(3, 'c');
INSERT INTO "Category" VALUES(4, 'd');
INSERT INTO "Category" VALUES(5, 'e');

ALTER TABLE "Product" ADD CONSTRAINT "FK_Cate" FOREIGN KEY ("catID") REFERENCES "Category" ("catID");