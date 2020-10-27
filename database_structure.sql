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

insert into menu_items 
	values('1', 'Meat Lovers', 
		'thick', 'red', 'mozzarella', 
		'pepperoni, sausage, bacon', 
		'8.00', '10.00','12.00','16.00',
		'It has meat.'
);

