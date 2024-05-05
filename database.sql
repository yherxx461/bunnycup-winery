-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- Database name: bunnycup_wholesale

CREATE TABLE "status"(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(30)
);

CREATE TABLE "user"(
	"id" SERIAL PRIMARY KEY,
	"email" VARCHAR(200) UNIQUE NOT NULL,
	"password" VARCHAR(200) NOT NULL,
	"access_level" INT
);

CREATE TABLE "clients"(
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"name" VARCHAR(100) NOT NULL,
	"email" VARCHAR(200) NOT NULL,
	"discount" INT,
	"payment_type" VARCHAR(30)
);

CREATE TABLE "client_address"(
	"id" SERIAL PRIMARY KEY,
	"client_id" INT REFERENCES "clients",
	"street" VARCHAR(150) NOT NULL,
	"city" VARCHAR(50) NOT NULL,
	"state" VARCHAR(20) NOT NULL,
	"zip" INT NOT NULL
	);

CREATE TABLE "orders"(
	"id" VARCHAR(50) PRIMARY KEY,
	"client_id" INT NOT NULL REFERENCES "clients",
	"date" DATE,
	"total_cost" DECIMAL,
	"status_id" INT REFERENCES "status",
	"checkout_discount" INT
);

CREATE TABLE "wine_orders"(
	"order_id" VARCHAR(50) REFERENCES "orders",
	"wine_sku" VARCHAR(20),
	"number_bottles" INT,
	"unit_price" DECIMAL
);

CREATE TABLE "wines"(
	"sku" VARCHAR(50) PRIMARY KEY,
	"image" VARCHAR(100) NOT NULL
	);

--This query will set up the wines template information--
INSERT INTO "wines" ("sku", "image")
VALUES ('FBOMB', '/images/fbomb.png'),
		('JUSTBC', '/images/justbc.png'),
		('RBF', '/images/rbf.png'),
		('TOTALBS', '/images/totalbs.png'),
		('FARMRED', '/images/farmred.png'),
		('LAKELIFE', '/images/lakelife.png'),
		('LUCKYDAYS', '/images/luckydays.png'),
		('SNOWRED', '/images/snowred.png'),
		('WAITWHAT', '/images/waitwhat.png'),
		('FARMWHITE', '/images/farmwhite.png'),
		('SUMMERTIME', '/images/summertime.png'),
		('SUNSHINE', '/images/sunshine.png');

--This query will set up the status table with the different status codes--
INSERT INTO "status" ("id", "name")
VALUES (1, 'Pending'),
	   (2, 'Complete'),
	   (3, 'Cancelled')