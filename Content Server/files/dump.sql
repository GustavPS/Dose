create table category
(
    imdb_category_id integer not null
        constraint category_pkey
            primary key,
    name             text
);

create table image
(
    id   bigserial
        constraint image_pkey
            primary key,
    path text
);

create table library
(
    id   bigserial
        constraint library_pkey
            primary key,
    name text not null
        constraint name
            unique,
    path text not null,
    type text not null
);

create table movie
(
    id      bigserial
        constraint movie_pkey
            primary key,
    path    text,
    library integer                      not null
        constraint library
            references library,
    name    text default 'no_name'::text not null,
    trailer text
);

create table movie_category
(
    movie_id    integer not null
        constraint movieid
            references movie
            on delete cascade,
    category_id integer not null
        constraint categoryid
            references category
            on delete cascade,
    constraint movie_category_pkey
        primary key (movie_id, category_id)
);

create table movie_image
(
    movie_id integer not null
        constraint movieid
            references movie
            on delete cascade,
    image_id integer not null
        constraint imageid
            references image
            on delete cascade,
    active   boolean not null,
    type     text    not null,
    constraint movie_image_pkey
        primary key (movie_id, image_id)
);

create table movie_metadata
(
    id                        bigserial
        constraint movie_metadata_pkey
            primary key,
    movie_id                  integer not null
        constraint movieid
            references movie
            on delete cascade,
    title                     text,
    overview                  text,
    poster                    text,
    release_date              text,
    runtime                   integer,
    backdrop                  text,
    added_date                text,
    popularity                numeric,
    trailer                   text,
    run_time                  integer,
    tmdb_id                   integer default '-1'::integer,
    found_good_poster         boolean default false,
    found_good_backdrop       boolean default false,
    found_good_logo           boolean default false,
    directplay_ready          boolean default false,
    directplay_failed         boolean default false,
    preview_extracted         boolean default false,
    preview_extraction_failed boolean default false
);

create table serie
(
    id      bigserial
        constraint serie_pkey
            primary key,
    path    text    not null,
    library integer not null
        constraint libraryid
            references library
            on delete cascade,
    name    text    not null
);

create table serie_category
(
    serie_id    integer not null
        constraint serieid
            references serie
            on delete cascade,
    category_id integer not null
        constraint categoryid
            references category
            on delete cascade,
    constraint serie_category_pkey
        primary key (serie_id, category_id)
);

create table serie_episode
(
    serie_id      integer not null
        constraint serieid
            references serie
            on delete cascade,
    season_number integer not null,
    episode       integer not null,
    path          text    not null,
    id            bigserial
        constraint iduniqie
            unique,
    constraint serie_episode_pkey
        primary key (serie_id, season_number, episode)
);

create table serie_episode_metadata
(
    air_date                  text    not null,
    name                      text    not null,
    overview                  text    not null,
    image_path                text    not null,
    vote_average              text    not null,
    episode_number            integer not null,
    season_number             integer not null,
    serie_id                  integer not null
        constraint serieid
            references serie
            on delete cascade,
    added_date                text    not null,
    run_time                  integer default '-1'::integer,
    directplay_ready          boolean default false,
    directplay_failed         boolean default false,
    preview_extracted         boolean default false,
    preview_extraction_failed boolean default false,
    constraint serie_episode_metadata_pkey
        primary key (episode_number, season_number, serie_id)
);

create table serie_image
(
    image_id integer not null
        constraint imageid
            references image
            on delete cascade,
    serie_id integer not null
        constraint serieid
            references serie
            on delete cascade,
    active   boolean not null,
    type     text    not null,
    constraint serie_image_pkey
        primary key (image_id, serie_id)
);

create table serie_metadata
(
    id             bigserial
        constraint serie_metadata_pkey
            primary key,
    serie_id       integer not null
        constraint serieid
            references serie
            on delete cascade,
    title          text    not null,
    overview       text    not null,
    first_air_date text    not null,
    added_date     text    not null,
    popularity     text    not null,
    trailer        text,
    tmdb_id        integer not null
);

create table serie_season
(
    serie_id      integer not null
        constraint serieid
            references serie
            on delete cascade,
    season_number integer not null,
    path          text    not null,
    constraint serie_season_pkey
        primary key (serie_id, season_number)
);

create table serie_season_metadata
(
    name        text    not null,
    air_date    text    not null,
    overview    text    not null,
    poster_path text    not null,
    serie_id    integer not null
        constraint serieid
            references serie
            on delete cascade,
    season_id   integer not null,
    added_date  text    not null,
    constraint serie_season_metadata_pkey
        primary key (serie_id, season_id)
);

create table users
(
    id         bigserial
        constraint user_pkey
            primary key,
    username   text                 not null,
    has_access boolean default true not null
);

create table user_episode_progress
(
    user_id      integer not null
        constraint userid
            references users
            on delete cascade,
    episode_id   integer not null
        constraint episodeid
            references serie_episode (id)
            on delete cascade,
    time         integer,
    last_watched bigint,
    constraint user_episode_progress_pkey
        primary key (user_id, episode_id)
);

create table user_movie_progress
(
    user_id      integer not null
        constraint user_id
            references users
            on delete cascade,
    movie_id     integer not null
        constraint movie_id
            references movie
            on delete cascade,
    time         integer not null,
    last_watched bigint,
    constraint user_movie_progress_pkey
        primary key (user_id, movie_id)
);

create table user_movie_watched
(
    user_id  integer not null
        constraint user_id
            references users
            on delete cascade,
    movie_id integer not null
        constraint movie_id
            references movie
            on delete cascade,
    constraint user_movie_watched_pkey
        primary key (user_id, movie_id)
);

create table user_next_episode
(
    user_id      integer not null
        constraint userid
            references users
            on delete cascade,
    serie_id     integer not null
        constraint serie_id
            references serie
            on delete cascade,
    episode_id   integer not null
        constraint episode_id
            references serie_episode (id)
            on delete cascade,
    last_watched bigint,
    constraint user_next_episode_pkey
        primary key (user_id, serie_id)
);

create table user_refresh_token
(
    id            serial
        constraint user_refresh_token_pkey
            primary key,
    user_id       integer not null
        constraint user_id
            references users
            on delete cascade,
    refresh_token text    not null,
    access_token  text    not null
);

create table user_movie_watchlist
(
    user_id  integer not null
        constraint user_movie_watchlist_user_id_fkey
            references users
            on delete cascade,
    movie_id integer not null
        constraint user_movie_watchlist_movie_id_fkey
            references movie
            on delete cascade,
    constraint user_movie_watchlist_pkey
        primary key (user_id, movie_id)
);

create table movie_resolution
(
    movie_id integer not null
        constraint movie_resolution_pkey
            primary key
        constraint movie_resolution_movie_id_fkey
            references movie
            on delete cascade,
    "240p"   boolean not null,
    "360p"   boolean not null,
    "480p"   boolean not null,
    "720p"   boolean not null,
    "1080p"  boolean not null,
    "1440p"  boolean not null,
    "4k"     boolean not null,
    "8k"     boolean not null,
    codec    text    not null
);

create table serie_episode_resolution
(
    episode_id integer not null
        constraint serie_episode_resolution_pkey
            primary key
        constraint serie_episode_resolution_episode_id_fkey
            references serie_episode (id)
            on delete cascade,
    "240p"     boolean not null,
    "360p"     boolean not null,
    "480p"     boolean not null,
    "720p"     boolean not null,
    "1080p"    boolean not null,
    "1440p"    boolean not null,
    "4k"       boolean not null,
    "8k"       boolean not null,
    codec      text    not null
);

create table serie_episode_language
(
    id               serial
        constraint serie_episode_language_pkey
            primary key,
    serie_episode_id integer not null
        constraint serie_episode_id
            references serie_episode (id)
            on delete cascade,
    language         text    not null,
    stream_index     integer not null,
    codec            text    not null
);

create table movie_language
(
    id           serial
        constraint movie_language_pkey
            primary key,
    movie_id     integer not null
        constraint movie_id
            references movie
            on delete cascade,
    language     text    not null,
    stream_index integer not null,
    codec        text    not null
);

create table serie_episode_subtitle
(
    id         bigserial
        constraint episode_subtitle_pkey
            primary key,
    path       text    not null,
    episode_id integer not null
        constraint episodeid
            references serie_episode (id)
            on delete cascade,
    library_id integer not null
        constraint libraryid
            references library
            on delete cascade,
    language   text,
    synced     boolean not null,
    extracted  boolean not null
);

create table subtitle
(
    id         bigserial
        constraint subtitle_pkey
            primary key,
    path       text,
    movie_id   integer not null
        constraint movieid
            references movie
            on delete cascade,
    library_id integer not null
        constraint libraryid
            references library
            on delete cascade,
    language   text,
    synced     boolean not null,
    extracted  boolean not null
);

create table actor
(
    id    integer not null
        constraint actor_pk
            primary key,
    name  text    not null,
    image text
);

create table movie_actor
(
    actor_id        integer not null
        constraint movie_actor_actor_id_fk
            references actor
            on delete cascade,
    movie_id        integer not null
        constraint movie_actor_movie_id_fk
            references movie
            on delete cascade,
    character_name  text    not null,
    order_in_credit integer not null,
    constraint movie_actor_pk
        primary key (actor_id, movie_id)
);

create table movie_recommended
(
    movie_id_1 integer not null
        constraint movie_recommended_movie_id_fk
            references movie
            on delete cascade,
    movie_id_2 integer not null
        constraint movie_recommended_movie_id_fk_2
            references movie
            on delete cascade,
    priority   integer not null,
    constraint movie_recommended_pk
        primary key (movie_id_1, movie_id_2)
);

create table movie_popular
(
    movie_id integer not null
        constraint movie_popular_pk
            primary key
        constraint movie_popular_movie_id_fk
            references movie
            on delete cascade
);

create table admin
(
    username text not null,
    password text not null,
    id       serial
        constraint admin_pk
            primary key,
    salt     text not null
);

create unique index admin_id_uindex
    on admin (id);

create unique index admin_username_uindex
    on admin (username);

create table admin_access_token
(
    admin_id      integer not null
        constraint admin_access_token_pk
            primary key
        constraint admin_access_token_admin_id_fk
            references admin
            on delete cascade,
    access_token  text    not null,
    refresh_token text    not null
);

create unique index admin_access_token_access_token_uindex
    on admin_access_token (access_token);

create unique index admin_access_token_admin_id_uindex
    on admin_access_token (admin_id);

create unique index admin_access_token_refresh_token_uindex
    on admin_access_token (refresh_token);

create table main_server_requests
(
    id text not null
        constraint main_server_requests_pk
            primary key
);

create unique index main_server_requests_id_uindex
    on main_server_requests (id);

create table general
(
    server_name    text not null,
    main_server_ip text not null
);

