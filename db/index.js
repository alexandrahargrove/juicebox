//THIS FILE SHOULD PROVIDE THE UTILITY FUNCTIONS THAT THE REST OF OUR APPLICATION WILL USE. WE WILL CALL THEM FROM THE SEED FILE, BUT ALSO FROM OUR MAIN APPLICATION FILE.

const { Client } = require('pg');

const client = new Client('postgres://localhost:5432/juicebox-dev');



async function getAllUsers() {
    const { rows } = await client.query(
        `SELECT id, username
        FROM users;`
    );
    return rows;
}


async function createUser({username, password}) {
    try {
        const { rows } = await client.query(`
        INSERT INTO users(username, password)
        VALUES ($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
        `, [username, password]);
        console.log(rows);
        return rows;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    client,
    getAllUsers,
    createUser
}


