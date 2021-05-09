const { row, rows } = require("../config/pg");

// counting the views of the profile
class Views {

  static async add(userId) {
    const view = await row(`
      insert into profile_viewes
        ( user_id)
      values  
        ($1);
      `, userId)
      
    return view;
  }
}

module.exports = Views