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

### Available commands

Bank:

- `bank info` - Log information about banks;
  - Usage example: `bank info all`
  - Usage example: `bank info <bank_id>`
- `bank reg` - Registering new bank in application
  - Usage example: `bank reg <bank_name>`
- `bank update` - Update data of the existing bank by id
  - Usage example: `bank update <bank_id> <new_bank_name>`
- `bank delete` - Delete existing bank by id
  - Usage example: `bank delete <bank_id>`
- `bank add-client` - Adding client to bank and open new account
  - Usage example: `bank add-client <client_id> <bank_id> <initial_balance>`

Client:

- `client info` - Log information about clients
  - Usage example: `client info all`
  - Usage example: `client info <client_id>`
- `client reg` - Registering new client in application (Type can be INDIVIDUAL or LEGAL_ENTITY)
  - Usage example: `client reg <client_name> <client_type>`
- `client update` - Update data of the existing client by id
  - Usage example: `client update <client_id> <client_name> <client_type>`
- `client delete` - Delete existing client by id
  - Usage example: `client delete <client_id>`

Account:

- `account info` - Log information about client accounts
  - Usage example: `account info <client_id>`

Transaction:

- `transaction new` - Create new transaction
  - Usage example: `transaction new <from_account_id> <to_account_id> <amount>`
  - Usage example: `transaction new 1 2 123`
- `transaction history` - Log transactions history for account by period (Period format type: YYYY-MM-DDTHH:mm)
  - Usage example: `transaction history <client_id> <date_from> <date_to>`
  - Usage example: `transaction history 1 2024-02-28T06:00 2024-02-28T11:00`

Other:

- `list` - list all available commands;
  - Usage example: `list`
- `exit` - end current application session.
  - Usage example: `exit`
