class User {
  constructor(id, userName, password) {
    this._id = id;
    this.userName = userName;
    this.password = password;
    this.friends = [];
  }
}

export { User };
