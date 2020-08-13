export class User {
  constructor({ id, email, name, birthday, accounts, currentAccount }) {
    this.id = id
    this.email = email
    this.name = name
    this.birthday = birthday
    this.accounts = accounts
    this.currentAccount = currentAccount
  }
}
