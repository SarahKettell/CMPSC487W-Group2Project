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

CREATE TABLE IF NOT EXISTS orders(
	order_id varchar(36),
	customer_id varchar(36),
	date_time_created datetime not null,
	date_time_checked_out datetime,
	date_time_scheduled datetime,
	date_time_completed datetime,
	type varchar(36),
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
	primary key (order_item_id)
);

CREATE TABLE IF NOT EXISTS order_item_toppings(
	order_item_id varchar(36),
	topping_id varchar(36) not null,
	primary key (order_item_id)
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

insert into menu_items values('1', 'Meat Lovers', 'thick', 'red', 8.00, 10.00, 12.00, 16.00, 'It has all of the meat.');
insert into menu_items values('2','Veggie Extravaganza', 'thick', 'red', 8.00, 10.00, 12.00, 16.00,'All of your favorite vegetables combined.');
insert into toppings values('1', 'green peppers', 'vegetable', true, true);
insert into toppings values('2', 'mushrooms', 'vegetable', true, true);
insert into toppings values('3', 'olives', 'vegetable', true, true);
insert into toppings values('4', 'tomatos', 'vegetable', true, true);
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
insert into toppings values('15', 'parmasean', 'cheese', true, true);
insert into toppings values('16', 'red sauce', 'sauce', true, true);
insert into toppings values('17', 'pesto', 'sauce', true, true);
insert into toppings values('18', 'white garlic', 'sauce', true, true);
insert into toppings values('19', 'barbeque', 'sauce', true, true);
insert into menu_item_toppings values('1', '1');
insert into menu_item_toppings values('1', '2');
insert into menu_item_toppings values('1', '3');
insert into address_info values(1, 'Company Name', '123 Pizza Street', 'Pizzatopia', 'PA', 12345);
insert into contact_info values(1, 1234567890, 'sms7631@psu.edu');
