const { row, rows } = require("../config/pg");

class Categories {
  static async findAll() {
    const post = await rows(
      `select 
        *
      from 
        categories;
      `)

    return post;

  }
}

module.exports = Categories