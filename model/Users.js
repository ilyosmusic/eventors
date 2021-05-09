const { row, rows } = require("../config/pg");

// User creation
class Users {
  static async create({ name, email, password, categoryId, jobTitle, phoneNumber, bio, imgSrc, locationLink }) {
    const user = await row(`
      insert into users 
        (name, email, password, category_id, job_title, phone_number, bio, img_src, location_link)
      values 
        ($1, $2 , crypt($3, gen_salt('bf')), $4, $5, $6, $7, $8, $9)
      returning 
        name, email, category_id, job_title, user_role, phone_number, user_id;
      `, name, email, password, categoryId, jobTitle, phoneNumber, bio, imgSrc, locationLink)
    return user;

  }

  
  static async findAll() {
    const users = await rows(`
      select 
        usr.user_id,
        usr.name,
        usr.job_title,
        cat.name as cat_name,
        usr.img_src,
        usr.bio,
        usr.phone_number,
        usr.location_link,
        (
          select 
            count(*)
          from 
            profile_viewes as pw
          where
            pw.user_id=usr.user_id
        ) as views_count
      from 
        users as usr
      left join categories as cat
      on usr.category_id=cat.category_id
      order by created_at;
      `,)
    
    return users;


  }

  static async findOne({ email, userId }) {
    const user = await row(`
      select 
        *
      from 
        users
      where
        user_id=$1 or email=$2;
      `, userId, email)
    return user;

  }

  static async findOneDetails(userId) {
    const user = await row(`
      select
        usr.user_id,
        usr.name,
        usr.job_title,
        cat.name as cat_name,
        usr.img_src,
        usr.bio,
        usr.phone_number,
        usr.location_link,
        (
          select 
            count(*)
          from 
            profile_viewes as pw
          where
            pw.user_id=usr.user_id
        ) as views_count
      from
        users as usr
      left join categories as cat
        on usr.category_id=cat.category_id
      where
        usr.user_id=$1;
      `, userId)
    return user;

  }

  static async findByCategory(categoryId) {
    const user = await rows(`
      select 
        usr.user_id,
        usr.name,
        usr.job_title,
        usr.phone_number,
        usr.img_src,
        cat.name as cat_name,
        (
          select 
            count(*)
          from 
            profile_viewes as pw
          where
            pw.user_id=usr.user_id
        ) as views_count
      from 
        users as usr
      left join categories as cat
      on usr.category_id=cat.category_id
      where
        usr.category_id=$1
      limit 20;
      `, categoryId)

    return user;

  }

  static async search({ keyword, page, limit }) {

    const user = await rows(`
      select 
        usr.user_id,
        usr.name,
        usr.job_title,
        usr.img_src,
        cat.name as cat_name,
        regexp_matches(usr.job_title, $1, 'i') as keyword
      from 
        users as usr
      left join categories as cat
      on usr.category_id=cat.category_id
      limit $3 offset ($2 - 1) * $3
      `, keyword, page, limit)

    return user;

  }
// password authentication 
  static async comparePassword(password, hashedPassword) {
    const isValid = await row(`
      select (crypt($1, $2) = $2) as is_valid;
      `, password, hashedPassword)

    return isValid;

  }

}

module.exports = Users