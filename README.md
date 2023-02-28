## TODO

```bash
Filter post by category exemple :

?categories=webdesign
?categories=webdesign,code (OR)
CRUD Comment with relation post and user order by created at (DESC)

CRUD User (email, password, first name, last name, posts (relation) )
```

## Installation

```bash
$ npm install
```

## IMPORTANT Running the app
You can test the app with POSTMAN by importing the file `NestJs API.postman_collection.json` in the root of the project.\
Don't forget to create a .env file in the root of the project and add the following variables:

```bash
# .env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```


DOCKER
```bash
# reset containers
$ make reset

# start containers
$ make up

# stop containers
$ make down
```

NESTJS
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Utils Commands Via CLI

```bash
# generate module
$ nest g mo <module-name>

# generate controller
$ nest g co <controller-name>

# generate  service
$ nest g s <service-name>

# generate resource
$ nest g res <resource-name>
```