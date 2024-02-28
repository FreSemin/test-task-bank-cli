export const commands = {
  bank: {
    command: 'bank',
    description: 'Perform operations on Bank',
    example: 'bank <operation_name> <operation_argument_1> <operation_argument_2>',
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
      },
      reg: {
        name: 'reg',
        description: 'Registering new bank in application',
        arguments: {
          entityData: {
            name: 'entity data',
            description: 'Register new bank in application!',
            example: 'bank new <bank_name>',
          }
        }
      },
      update: {
        name: 'update',
        description: 'Update data of the existing bank by id',
        arguments: {
          entityData: {
            name: 'entity data',
            description: 'Update data of the existing bank by id',
            example: 'bank update <bank_id> <bank_name>',
          }
        }
      },
      delete: {
        name: 'delete',
        description: 'Delete existing bank by id',
        arguments: {
          id: {
            name: 'id',
            description: 'Delete existing bank by id',
            example: 'bank delete <bank_id>',
          }
        }
      },
      addClient: {
        name: 'add-client',
        description: 'Adding client to bank and open new account',
        arguments: {
          entityData: {
            name: 'entity data',
            description: 'Adding client to bank and open new account!',
            example: 'bank add-client <client_id> <bank_id> <initial_balance>',
          }
        }
      }
    }
  },
  client: {
    command: 'client',
    description: 'Perform operations on Client',
    example: 'client <operation_name> <operation_argument_1> <operation_argument_2>',
    availableOperations: {
      info: {
        name: 'info',
        description: 'Log information about clients',
        arguments: {
          all: {
            name: 'all',
            description: 'Log information about all clients!',
            example: 'client info all',
          },
          byId: {
            name: 'byId',
            description: 'Log information about one Client by id!',
            example: 'client info <client_id>',
          }
        }
      },
      reg: {
        name: 'reg',
        description: 'Registering new client in application',
        arguments: {
          entityData: {
            name: 'entity data',
            description: 'Register new client in application! (Type can be INDIVIDUAL or LEGAL_ENTITY)',
            example: 'client bank new <client_name> <client_type>',
          }
        }
      },
      update: {
        name: 'update',
        description: 'Update data of the existing client by id',
        arguments: {
          entityData: {
            name: 'entity data',
            description: 'Update data of the existing client by id',
            example: 'client update <client_id> <client_name> <client_type>',
          }
        }
      },
      delete: {
        name: 'delete',
        description: 'Delete existing client by id',
        arguments: {
          id: {
            name: 'id',
            description: 'Delete existing client by id',
            example: 'client delete <client_id>',
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