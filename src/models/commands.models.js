export const commands = {
  bank: {
    command: 'bank',
    description: 'Perform operations on Bank',
    example: 'bank <operation_name> <operation_arguments>',
    availableOperations: {
      info: {
        name: 'info',
        description: 'Log information about banks',
        arguments: {
          all: {
            name: 'all',
            description: 'Log information about all banks!',
            example: 'bank info all',
          },
          byId: {
            name: 'byId',
            description: 'Log information about one Bank by id!',
            example: 'bank info <bank_id>',
          }
        }
      }
    }
  },
  list: {
    command: 'list',
    description: 'Log list of all available CLI commands!',
    example: 'list',
  },
  exit: {
    command: 'exit',
    description: 'End current session and close terminal!',
    example: 'exit'
  }
};