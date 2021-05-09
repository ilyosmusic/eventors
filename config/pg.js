
// requiring Pool class form Postgres to connect Postgres database
const { Pool } = require("pg")
// accessing the config file
const config = require("./config")
// creating new variable pool 
const pool = new Pool({
	host: config.DB_HOST,
	user: config.DB_USER,
	password: config.DB_PASSWORD,
	database: config.DATABASE,
	port: config.DB_PORT,
})

//function to query and util rows that come from postgres 

const rows = async (query, ...params) => {
	const client = await pool.connect()

	try {
		const { rows } = await client.query(query, params)
		return rows

	}catch(err) {
		console.log(err);
		
	}finally {
		await client.release()
	}
}
//function to query and util row that come from postgres 
const row = async (query, ...params) => {
	const client = await pool.connect()

	try {
		const { rows: [row] } = await client.query(query, params)
		return row

	}catch(err) {
		console.log(err);
		
	}finally {
		await client.release()

	}
}

module.exports = { rows, row }

