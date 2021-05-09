const { row, rows } = require("../config/pg");
const slugify = require("slugify")

// post creation 
class Posts {
  static async create({ title, authorId, img_src }) {
    const post = await row(`
      insert into posts 
        ( title, author_id, img_src)
      values 
        ( $1, $2, $3 )
      returning 
        title, author_id, img_src;
    `, title, authorId, img_src)

    return post;
  }
  // profile posts
  static async findByAuthor(authorId) {
    const post = await rows(
      `select 
        *
      from 
        posts          
      where 
        author_id=$1;`
        , authorId)

    return post;

  }

}

module.exports = Posts