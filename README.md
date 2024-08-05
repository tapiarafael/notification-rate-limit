## Description

An implementation of a rate limiter to control the rate of requests to end users based on custom rules.

## Installation

```bash
$ yarn install
```

## Migrations
```bash
$ yarn knex migrate:latest
```

## Seeding
```bash
$ yarn knex seed:run
```
This will create some rules for testing.
| Type     |      Limit  |  Period |
|----------|:-----------:|------:  |
| STATUS   |  3          | minute  |
| NEWS     |    5        | minute  |
| OTHERS   |  2          |  hour   |

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Running the app with docker
```bash
$ docker-compose up
```
> :warning: It's necessary to run the migrations in order to make the application work.

## Test

```bash
# unit tests
$ yarn run test

# test coverage
$ yarn run test:cov
```