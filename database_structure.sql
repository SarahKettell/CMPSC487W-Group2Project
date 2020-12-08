drop table menu_items;
drop table orders;
drop table order_items;
drop table order_item_toppings;
drop table menu_item_toppings;
drop table toppings;
drop table address_info;
drop table contact_info;

CREATE TABLE IF NOT EXISTS address_info(
	id integer,
	company_name varchar(50),
	street_address varchar(100),
	city varchar(50),
	state_name varchar(50),
	zip_code integer(5)
);

CREATE TABLE IF NOT EXISTS contact_info(
	id integer,
	phone integer(10),
	email varchar(100)
);

CREATE TABLE IF NOT EXISTS hours_info(
	id integer,
	mon_beg varchar(10),
	mon_end varchar(10),
	tue_beg varchar(10),
	tue_end varchar(10),
	wed_beg varchar(10),
	wed_end varchar(10),
	thu_beg varchar(10),
	thu_end varchar(10),
	fri_beg varchar(10),
	fri_end varchar(10),
	sat_beg varchar(10),
	sat_end varchar(10),
	sun_beg varchar(10),
	sun_end varchar(10)
);

CREATE TABLE IF NOT EXISTS menu_items(
	menu_item_id varchar(36),
	item_name varchar(250) not null,
	crust varchar(100) not null,
	sm_price decimal(10,2) not null,
	med_price decimal(10,2) not null,
	lg_price decimal(10,2) not null,
	xlg_price decimal(10,2) not null,
	description varchar(500) not null,
	primary key(menu_item_id)
);

CREATE TABLE IF NOT EXISTS customers(
    customer_id varchar(36),
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    email varchar(50),
    address1 varchar(50),
    address2 varchar(50),
    city varchar(50),
    state varchar(50),
    zip varchar(50),
    note varchar(500),
    primary key(customer_id)
);

CREATE TABLE IF NOT EXISTS orders(
	order_id varchar(36),
	customer_id varchar(36),
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    email varchar(50),
    address1 varchar(50),
    address2 varchar(50),
    addr_city varchar(50),
    addr_state varchar(50),
    addr_zip varchar(50),
	date_time_created datetime not null,
	date_time_checked_out datetime,
	date_time_scheduled datetime,
	date_time_completed datetime,
	order_type varchar(36),
	notes varchar(500),
	payment_type varchar(36),
	sub_total_price decimal(10,2) not null,
	tax_price decimal(10,2) not null,
	tip_price decimal(10,2) not null,
	total_price decimal(10,2) not null,
	checked_out boolean not null,
	completed boolean not null,
	primary key(order_id)
);



CREATE TABLE IF NOT EXISTS order_items(
	order_item_id varchar(36),
	order_id varchar(36) not null,
	item_name varchar(100) not null,
	crust varchar(100) not null,
	size varchar(36) not null,
	price decimal(10,2) not null,
	notes varchar(500),
	primary key (order_item_id, order_id)
);

CREATE TABLE IF NOT EXISTS order_item_toppings(
	order_item_id varchar(36),
	topping_id varchar(36) not null,
	primary key (order_item_id, topping_id)
);

CREATE TABLE IF NOT EXISTS menu_item_toppings(
	menu_item_id varchar(36),
	topping_id varchar(36) not null,
	primary key (menu_item_id, topping_id)
);

CREATE TABLE IF NOT EXISTS toppings(
	topping_id varchar(36),
	topping_name varchar(100) not null,
	topping_category varchar(100) not null,
	in_stock boolean,
	current_topping boolean,
	primary key (topping_id)
);

insert into menu_items values('1','Meat Lovers', 'thick-crust', 8.00, 10.00, 12.00, 16.00, 'A masterpiece of hearty, high-quality meats including pepperoni, savory sausage, real beef, hickory-smoked bacon, and julienne-cut Canadian bacon, all topped with real cheese made from mozzarella.');
insert into menu_items values('2','Veggie Extravaganza', 'whole-wheat-crust', 8.00, 10.00, 12.00, 16.00,'All your favorite veggies together on a delightfully delicious pizza. Loaded with crisp green peppers, fresh-cut onions, mushrooms, ripe black olives, vine-ripened Roma tomatoes, and real cheese made from mozzarella.');
insert into menu_items values('3','Pepperoni', 'thick-crust', 8.00, 10.00, 12.00, 16.00,'Your choice of crust covered with our signature pizza sauce, real cheese made from mozzarella, and pepperoni. With a pepperoni in almost every bite, its one of our most popular pizzas.');
insert into menu_items values('4','The Cheese', 'thin-crust', 8.00, 10.00, 12.00, 16.00,'Simple, yet simply delicious. Real cheese made from mozzarella on top of our signature pizza sauce with your choice of crust, then baked to a golden brown. It has just what you want, and nothing you don’t.');
insert into toppings values('1', 'green peppers', 'vegetable', true, true);
insert into toppings values('2', 'mushrooms', 'vegetable', true, true);
insert into toppings values('3', 'olives', 'vegetable', true, true);
insert into toppings values('4', 'tomatoes', 'vegetable', true, true);
insert into toppings values('5', 'spinach', 'vegetable', true, true);
insert into toppings values('6', 'onions', 'vegetable', true, true);
insert into toppings values('7', 'pepperoni', 'meat', true, true);
insert into toppings values('8', 'sausage', 'meat', true, true);
insert into toppings values('9', 'bacon', 'meat', true, true);
insert into toppings values('10', 'chicken', 'meat', true, true);
insert into toppings values('11', 'steak', 'meat', true, true);
insert into toppings values('12', 'mozzarella', 'cheese', true, true);
insert into toppings values('13', 'three-cheese blend', 'cheese', true, true);
insert into toppings values('14', 'feta', 'cheese', true, true);
insert into toppings values('15', 'parmesan', 'cheese', true, true);
insert into toppings values('16', 'red sauce', 'sauce', true, true);
insert into toppings values('17', 'pesto', 'sauce', true, true);
insert into toppings values('18', 'white garlic', 'sauce', true, true);
insert into toppings values('19', 'barbeque', 'sauce', true, true);
insert into menu_item_toppings values('1', '7');
insert into menu_item_toppings values('1', '8');
insert into menu_item_toppings values('1', '9');
insert into menu_item_toppings values('1', '16');
insert into menu_item_toppings values('1', '12');
insert into menu_item_toppings values('2', '1');
insert into menu_item_toppings values('2', '2');
insert into menu_item_toppings values('2', '3');
insert into menu_item_toppings values('2', '4');
insert into menu_item_toppings values('2', '5');
insert into menu_item_toppings values('2', '16');
insert into menu_item_toppings values('2', '12');
insert into menu_item_toppings values('3', '7');
insert into menu_item_toppings values('3', '16');
insert into menu_item_toppings values('3', '12');
insert into menu_item_toppings values('4', '12');
insert into menu_item_toppings values('4', '13');
insert into menu_item_toppings values('4', '15');
insert into menu_item_toppings values('4', '16');
insert into address_info values(1, 'Company Name', '123 Pizza Street', 'Pizzatopia', 'PA', 12345);
insert into contact_info values(1, 1234567890, 'sms7631@psu.edu');
insert into orders values('1', '123456', 'John', 'Smith', 'email@host.com', '123 Some St', null , 'Harrisburg', 'PA', '12345', '2020-11-01 13:00:01', '2020-11-01 13:20:01', '2020-11-01 13:50:01', '2020-11-01 14:00:01', 'eat-in', 'Allergic to mushrooms', 'cash', 20.00, 3.00, 6.00, 29.00, true, true);
insert into order_items values('1', '1', 'The Cheese', 'thin-crust', 'medium', 10.00, '');
insert into order_items values('2', '1', 'Meat Lovers', 'thick-crust', 'medium', 10.00, '');
insert into order_item_toppings values('1', '12');
insert into order_item_toppings values('1', '13');
insert into order_item_toppings values('1', '15');
insert into order_item_toppings values('1', '16');
insert into order_item_toppings values('2', '7');
insert into order_item_toppings values('2', '8');
insert into order_item_toppings values('2', '9');
insert into order_item_toppings values('2', '16');
insert into order_item_toppings values('2', '12');
insert into orders values('2', NULL, 'Jill', 'Smith','another@email.com', null, null, null, null, null, '2020-11-25 13:00:01', '2020-11-25 13:20:01', '2020-11-25 13:50:01', NULL, 'eat-in', 'Cook pizzas well done', 'cash', 20.00, 3.00, 6.00, 29.00, true, false);
insert into order_items values('3', '2', 'The Cheese', 'thin-crust', 'medium', 10.00, '');
insert into order_items values('4', '2', 'Meat Lovers', 'thick-crust', 'medium', 10.00, 'Pepperoni on left half');
insert into order_item_toppings values('3', '12');
insert into order_item_toppings values('3', '13');
insert into order_item_toppings values('3', '15');
insert into order_item_toppings values('3', '16');
insert into order_item_toppings values('4', '7');
insert into order_item_toppings values('4', '8');
insert into order_item_toppings values('4', '9');
insert into order_item_toppings values('4', '16');
insert into order_item_toppings values('4', '12');
INSERT INTO orders VALUES('3', '1234567', 'Adam', 'Smith','another@gmail.com', NULL, NULL, NULL, NULL, null, '2020-11-25 13:00:01',  NULL,  NULL, NULL, 'eat-in', 'this order is not submitted',  'cc',  20.00, 3.00, 6.00, 29.00, false, false);
insert into order_items values('5', '3', 'The Cheese', 'thin-crust', 'medium', 10.00, '');
insert into order_items values('6', '3', 'Meat Lovers', 'thick-crust', 'medium', 10.00, '');
insert into order_items values('7','3',  'Veggie Extravaganza', 'whole-wheat-crust', 'large',  12.00, '');
insert into order_item_toppings values('5', '12');
insert into order_item_toppings values('5', '13');
insert into order_item_toppings values('5', '15');
insert into order_item_toppings values('5', '16');
insert into order_item_toppings values('6', '7');
insert into order_item_toppings values('6', '8');
insert into order_item_toppings values('6', '9');
insert into order_item_toppings values('6', '16');
insert into order_item_toppings values('6', '12');
insert into order_item_toppings values('7', '1');
insert into order_item_toppings values('7', '2');
insert into order_item_toppings values('7', '3');
insert into order_item_toppings values('7', '4');
insert into order_item_toppings values('7', '5');
insert into order_item_toppings values('7', '16');
insert into order_item_toppings values('7', '12');
insert into contact_info values('1', '1234567890', 'suri@gmail.com');
insert into hours_info values('1', '10:30', '11:30', '9:30', '11:30', '12:30', '2:30', '1:30', '7:30', '3:30', '10:30', '5:30', '6:30', '3:30', '4:30');
