create table if not exists server
(
	server_id text not null
		constraint id
			unique,
	server_ip text not null,
	server_name text,
	constraint server_pkey
		primary key (server_id, server_ip)
);

alter table server owner to postgres;

create table if not exists users
(
	username text not null,
	password text not null,
	salt text not null,
	email text not null,
	id bigserial not null
		constraint users_pkey
			primary key
);

alter table users owner to postgres;

create table if not exists user_code
(
	user_id integer not null
		constraint user_code_pkey
			primary key
		constraint userid
			references users
				on delete cascade,
	code text not null
);

alter table user_code owner to postgres;

create table if not exists user_server
(
	user_id integer not null
		constraint "user"
			references users,
	server_id text not null
		constraint server
			references server (server_id),
	constraint user_server_pkey
		primary key (user_id, server_id)
);

alter table user_server owner to postgres;

create table if not exists user_access_token
(
	user_id integer not null
		constraint user_access_token_user_id_fkey
			references users
				on delete cascade,
	access_token text not null,
	refresh_token text not null,
	constraint user_access_token_pkey
		primary key (user_id, access_token, refresh_token)
);

alter table user_access_token owner to postgres;

