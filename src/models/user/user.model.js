export class User {
  constructor({ id, email, cpf, name, birthday, accounts, currentAccount }) {
    this.id = id
    this.email = email
    this.cpf = cpf
    this.name = name
    this.birthday = birthday
    this.accounts = accounts
    this.currentAccount = currentAccount
  }
}
