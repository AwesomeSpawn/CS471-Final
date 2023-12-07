-- Clearing the data in the tables
DELETE FROM "inventory_product";
DELETE FROM "inventory_usedbikes";
DELETE FROM "inventory_parts";
DELETE FROM "POS_sale";

-- Reset the ID sequence
DELETE FROM sqlite_sequence WHERE name = 'inventory_product';
DELETE FROM sqlite_sequence WHERE name = 'inventory_usedbikes';
DELETE FROM sqlite_sequence WHERE name = 'inventory_parts';
DELETE FROM sqlite_sequence WHERE name = 'POS_sale';

-- Populating the inventory_product table with dummy data
INSERT INTO "inventory_product"
    ("product_name", "cost")
VALUES
    ('Bike Model A', 5000.00),
    ('Bike Model B', 4500.00),
    ('Bike Model C', 5500.00),
    ('Part Model A', 100.00),
    ('Part Model B', 200.00),
    ('Part Model C', 300.00);

-- Ensure these 'product_ptr_id' values are unique and correspond to 'product_id' in 'inventory_product'
INSERT INTO "inventory_usedbikes"
    ("product_ptr_id", "license_plate", "vin", "make", "vehicle_model", "year", "sale_id")
VALUES
    (1, 'ABC123', 'VIN12345678901234', 'Honda', 'CBR500R', 2019, 1),
    (2, 'XYZ789', 'VIN98765432109876', 'Yamaha', 'YZF-R3', 2020, 2),
    (3, 'LMN456', 'VIN45678901234567', 'Kawasaki', 'Ninja 650', 2021, 3);

INSERT INTO "inventory_parts"
    ("product_ptr_id", "serial_number", "curr_amount_needed", "sale_id", "quantity_extra")
VALUES
    (4, 123456, 10, NULL, 5),
    (5, 234567, 15, NULL, 8),
    (6, 345678, 20, NULL, 12);

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

-- Populating the POS_sale table with dummy data
INSERT INTO "POS_sale"
    ("cost", "credit_card", "CVC", "nameOnCard", "validMonth", "ValidDay")
VALUES
    (5200.00, '1234567890123456', '123', 'John Doe', 12, 31),
    (4700.00, '2345678901234567', '456', 'Jane Doe', 11, 30),
    (5600.00, '3456789012345678', '789', 'Alex Smith', 10, 28),
    (100.00, '4567890123456789', '012', 'John Doe', 9, 27),
    (200.00, '5678901234567890', '345', 'Jane Doe', 8, 26),
    (300.00, '6789012345678901', '678', 'Alex Smith', 7, 25);


