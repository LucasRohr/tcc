const USER_ACCOUNTS_MOCK = {
  accounts: [
    {
      id: 1,
      name: 'uma conta minha aí',
      type: 'OWNER',
    },

    {
      id: 2,
      name: 'conta herdeira 1 massa meu',
      type: 'HEIR',
    },

    {
      id: 3,
      name: 'conta herdeira 1 massa meu',
      type: 'HEIR',
    },
  ],
}

const OWNER_HEIRS_ACCOUNTS_MOCK = {
  accounts: [
    {
      id: 1,
      userEmail: 'jaozinho@gmail.fon',
      status: 'PENDING',
    },

    {
      id: 2,
      name: 'conta herdeira 1 massa meu',
      userName: 'o famoso incrível',
      status: 'ACCEPTED',
    },

    {
      id: 3,
      name: 'conta herdeira 1 massa meu',
      userName: 'paçoca shippuden',
      status: 'ACCEPTED',
    },
  ],
}

export { USER_ACCOUNTS_MOCK, OWNER_HEIRS_ACCOUNTS_MOCK }
