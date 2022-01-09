## Installation

```bash
$ npm install
```

## Running the app

```bash
$ yarn start:dev:db
$ yarn start:dev
```

## Running migrations

```bash
$ yarn pretypeorm
$ yarn typeorm:migration:generate [MIGRATION_NAME]
$ yarn typeorm:migration:run 
```

## Endpoint security

```Node
@ApiBearerAuth("JWT")
@UseGuards(JwtAuthGuard)
```