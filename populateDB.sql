-- Clearing the data in the tables
DELETE FROM "inventory_product";
DELETE FROM "inventory_usedbikes";
DELETE FROM "inventory_parts";
DELETE FROM "POS_sale";
DELETE FROM "jobs_jobs";

-- Reset the ID sequence
DELETE FROM sqlite_sequence WHERE name = 'inventory_product';
DELETE FROM sqlite_sequence WHERE name = 'inventory_usedbikes';
DELETE FROM sqlite_sequence WHERE name = 'inventory_parts';
DELETE FROM sqlite_sequence WHERE name = 'POS_sale';
DELETE FROM sqlite_sequence WHERE name = 'jobs_jobs';

-- Populating the inventory_product table with dummy data
INSERT INTO "inventory_product"
    ("product_name", "cost")
VALUES
    ('Bike Model A', 5000.00),
    ('Bike Model B', 4500.00),
    ('Bike Model C', 5500.00),
    ('Bike Model D', 6000.00),
    ('Bike Model E', 5500.00),
    ('Bike Model F', 6500.00),
    ('Part Model A', 100.00),
    ('Part Model B', 200.00),
    ('Part Model C', 300.00),
    ('Part Model D', 150.00),
    ('Part Model E', 250.00),
    ('Part Model F', 350.00);

-- Ensure these 'product_ptr_id' values are unique and correspond to 'product_id' in 'inventory_product'
INSERT INTO "inventory_usedbikes"
    ("product_ptr_id", "license_plate", "vin", "make", "vehicle_model", "year", "sale_id")
VALUES
    (1, 'ABC123', 'VIN12345678901234', 'Honda', 'CBR500R', 2019, 1),
    (2, 'XYZ789', 'VIN98765432109876', 'Yamaha', 'YZF-R3', 2020, 2),
    (3, 'LMN456', 'VIN45678901234567', 'Kawasaki', 'Ninja 650', 2021, 3),
    (7, 'DEF123', 'VIN12345678901235', 'Harley Davidson', 'Iron 883', 2018, 7),
    (8, 'GHI789', 'VIN98765432109877', 'Indian', 'Scout Bobber', 2019, 8),
    (9, 'JKL456', 'VIN45678901234568', 'BMW', 'G 310 R', 2020, 9);

INSERT INTO "inventory_parts"
    ("product_ptr_id", "serial_number", "curr_amount_needed", "sale_id", "quantity_extra", "location")
VALUES
    (4, 123456, 10, NULL, 5, 'Room A'),
    (5, 234567, 15, NULL, 8, 'Room B'),
    (6, 345678, 20, NULL, 12, 'Room C'),
    (10, 123457, 15, NULL, 6, 'Room D'),
    (11, 234568, 20, NULL, 9, 'Room E'),
    (12, 345679, 25, NULL, 13, 'Room F');

-- Associate the used bikes with the POS sales
UPDATE "inventory_usedbikes"
SET "sale_id" = 1
WHERE "product_ptr_id" = 1;

UPDATE "inventory_usedbikes"
SET "sale_id" = 2
WHERE "product_ptr_id" = 2;

UPDATE "inventory_usedbikes"
SET "sale_id" = 3
WHERE "product_ptr_id" = 3;

UPDATE "inventory_usedbikes"
SET "sale_id" = 7
WHERE "product_ptr_id" = 7;

UPDATE "inventory_usedbikes"
SET "sale_id" = 8
WHERE "product_ptr_id" = 8;

UPDATE "inventory_usedbikes"
SET "sale_id" = 9
WHERE "product_ptr_id" = 9;

-- Associate the parts with the POS sales
UPDATE "inventory_parts"
SET "sale_id" = 4
WHERE "product_ptr_id" = 4;

UPDATE "inventory_parts"
SET "sale_id" = 5
WHERE "product_ptr_id" = 5;

UPDATE "inventory_parts"
SET "sale_id" = 6
WHERE "product_ptr_id" = 6;

UPDATE "inventory_parts"
SET "sale_id" = 10
WHERE "product_ptr_id" = 10;

UPDATE "inventory_parts"
SET "sale_id" = 11
WHERE "product_ptr_id" = 11;

UPDATE "inventory_parts"
SET "sale_id" = 12
WHERE "product_ptr_id" = 12;

-- Populating the POS_sale table with dummy data
INSERT INTO "POS_sale"
    ("cost", "credit_card", "CVC", "nameOnCard", "validMonth", "ValidDay")
VALUES
    (5200.00, '1234567890123456', '123', 'John Doe', 12, 31),
    (4700.00, '2345678901234567', '456', 'Jane Doe', 11, 30),
    (5600.00, '3456789012345678', '789', 'Alex Smith', 10, 28),
    (100.00, '4567890123456789', '012', 'John Doe', 9, 27),
    (200.00, '5678901234567890', '345', 'Jane Doe', 8, 26),
    (300.00, '6789012345678901', '678', 'Alex Smith', 7, 25),
    (6200.00, '1234567890123457', '124', 'John Doe', 11, 30),
    (5700.00, '2345678901234568', '457', 'Jane Doe', 10, 29),
    (6600.00, '3456789012345679', '790', 'Alex Smith', 9, 28),
    (150.00, '4567890123456780', '013', 'John Doe', 8, 27),
    (250.00, '5678901234567891', '346', 'Jane Doe', 7, 26),
    (350.00, '6789012345678902', '679', 'Alex Smith', 6, 25);


-- Populating the jobs_jobs table with dummy data
INSERT INTO "jobs_jobs"
    ("job_time", "task_str", "assignee_id", "completed", "sale_id")
VALUES
    (120, 'Engine Repair', 1, 1, NULL),
    (45, 'Oil Change', 2, 0, 1),
    (30, 'Tyre Replacement', 3, 1, 2),
    (60, 'Bike Wash', NULL, 0, 3),
    (90, 'Brake Check', 4, 1, 4),
    (75, 'Battery Replacement', 5, 0, NULL),
    (105, 'Engine Tuning', 1, 1, 5),
    (50, 'Suspension Check', 2, 0, NULL),
    (80, 'Electrical System Check', 3, 1, 6),
    (20, 'Quick Inspection', NULL, 0, NULL);

-- Repeat the INSERT INTO statement as needed with different values

COMMIT;
