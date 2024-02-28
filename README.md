# Test Task Bank CLI

Node.js project implemented to perform operations using console interface on `bank`, `client`, `account`, `transaction`. Task was implemented using Node.js, PrismaORM, PostgreSQL.

## Installation

1. Create `.env` file in the root of the project;
2. Copy content from `.env.development.local` in newly created `.env` and replace all `<your_value>` with your values;
3. Run command:

```
  docker compose up
```

4. Check is database working.
5. Install dependencies:

```
npm install
```

6. Run Prisma migrations:

```
npm run prisma:migrate
```

7. Run application:

```
npm run start
```

### Available operations
