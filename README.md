# :zap: GOEntregas API

## Setup

### Dependencies

- [PostgreSQL](https://www.postgresql.org/download/)
- [Node.js](https://nodejs.org/en/download/)

### Creating your databases and schemas

After installing PostgreSQL, use the terminal to create instances of your database:

```shell
# for local development
$ npm run setup:local

# for local testing
$ npm run setup:test
```

### .env Configuration

Based on the `.env.example` file (located at the root of the project), create a `.env.local` and a `.env.test` with your local configuration.

```shell
# DATABASE
DB_HOST="localhost"
DB_NAME="database_name"
DB_PASSWORD="password"
DB_PORT="5432"
DB_USERNAME="username"
DB_MAIN_SCHEMA="tauria"
DB_AUDIT_SCHEMA="tauria_audit"

# LOGGING
LOGGING_COMBINED_FILE="logs/combined.log"
LOGGING_ERROR_FILE="logs/error.log"
LOGGING_LEVEL="debug"
LOGGING_TYPE="dev"

# SERVER
SERVER_PORT="3000"
```

### Installing Packages

```shell
$ npm i
```

## Running the Project

```shell
$ npm run dev
```

## Running Tests

After running migrations for your test database:

```shell
$ npm test
```

## Migrations

### Creating a Migration

```shell
$ npm run migration:create <migration name>
# example:
$ npm run migration:create CreateUsersTable
```

### Running Migrations

```shell
# this will run migrations in your local database
$ npm run local:migrate

# this will run migrations in your test database
$ npm run test:migrate
```
