const pool = require("./pool");

async function getAllMessages() {
    const {rows} = await pool.query("SELECT * FROM messages")
    console.log(rows);
    return rows;
}

async function getSelectedMessage(req) {
    console.log(req.params)
    const {rows} = await pool.query(
        'SELECT * FROM messages WHERE id = $1',
        [req.params.messageid]
    );
    console.log(req.params.messageid)
    console.log(rows);
    return rows[0];
}

async function addNewMessage(messageUser, messageText) {
    const {rows} = await pool.query(
        `INSERT INTO messages (text, "user", added) VALUES
        ($1, $2, CURRENT_TIMESTAMP)`,
        [messageText, messageUser]
    )
}

module.exports = {
    getAllMessages,
    getSelectedMessage,
    addNewMessage
}