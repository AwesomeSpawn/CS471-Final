-- Populating the inventory_product table with dummy data for bikes and parts
INSERT INTO "inventory_product"
    ("product_name", "cost")
VALUES
    ('Bike Model A', 5000.00),
    ('Bike Model B', 4500.00),
    ('Bike Model C', 5500.00),
    ('Part Model X', 200.00),
    ('Part Model Y', 150.00),
    ('Part Model Z', 300.00);

-- Populating the inventory_usedbikes table with dummy data
INSERT INTO "inventory_usedbikes"
    ("product_ptr_id", "license_plate", "vin", "make", "vehicle_model", "year", "sale_id")
VALUES
    (1, 'ABC123', 'VIN12345678901234', 'Honda', 'CBR500R', 2019, 1),
    (2, 'XYZ789', 'VIN98765432109876', 'Yamaha', 'YZF-R3', 2020, 2),
    (3, 'LMN456', 'VIN45678901234567', 'Kawasaki', 'Ninja 650', 2021, 3);

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

-- Populating the POS_sale table with dummy data
INSERT INTO "POS_sale"
    ("cost", "credit_card", "CVC", "nameOnCard", "validMonth", "ValidDay")
VALUES
    (5200.00, '1234567890123456', '123', 'John Doe', 12, 31),
    (4700.00, '2345678901234567', '456', 'Jane Doe', 11, 30),
    (5600.00, '3456789012345678', '789', 'Alex Smith', 10, 28);

-- Populating the parts table with dummy data
INSERT INTO "parts"
    ("product_ptr_id", "serial_number", "quantity_extra", "curr_amount_needed", "sale_id")
VALUES
    (4, 1001, 5, 2, NULL),
    (5, 1002, 3, 1, NULL),
    (6, 1003, 10, 4, NULL);

-- Associate parts with the POS sales (Example associations)
UPDATE "parts"
SET "sale_id" = 1
WHERE "product_ptr_id" = 4;

UPDATE "parts"
SET "sale_id" = 2
WHERE "product_ptr_id" = 5;

UPDATE "parts"
SET "sale_id" = 3
WHERE "product_ptr_id" = 6;
