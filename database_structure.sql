drop table menu_items;

create table menu_items 
	(item_id varchar(36),
		pizza_name varchar(250),
		crust varchar(250),
		sauce varchar(250),
		cheese varchar(250),
		toppings varchar(250),
		sm_price varchar(10),
		med_price varchar(10),
		lg_price varchar(10),
		xlg_price varchar(10),
		description varchar(500),
		primary key(item_id)
);

insert into menu_items values('1', 'Meat Lovers', 'thick', 'red', 'mozzarella', 'pepperoni, sausage, bacon', '8.00', '10.00','12.00','16.00', 'It has all of the meat.');
insert into menu_items values('2','Veggie Extravaganza', 'thick', 'red', 'cheddar', 'green pepper, mushrooms, ', '8.00', '10.00','12.00','16.00','All of your favorite vegetables combined.');


// IN PROGRESS DO NOT USE
create table orders(
	order_id varchar(36),
	customer_id varchar(36),
	time_placed
	date_placed
	time_scheduled
	date_scheduled
	type
	notes
	payment_type
	sub_total_price
	tax_price
	tip_price
	deliver_fee
	total_price
	checked_out
	completed
	primary key(item_id)
);

create table order_items(
	order_item_id
	order_id
	crust
	size
	price
	notes
);

create table order_item_toppings(
	order_item_id
	topping_id
);

create table menu_item_toppings(
	menu_item_id
	topping_id
);

create table toppings(
	topping_id
	topping_name
	in_stock
	current_topping
);

