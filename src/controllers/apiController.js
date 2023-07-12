const connection2 = require('../config/connectDB');

const getAllUsers = async (req, res) => {

    const [rows, fields] = await connection2.execute('SELECT * FROM users');
    return res.status(200).json({
        message: 'read conpleted',
        data: rows
    })
}

const createNewUser = async (req, res) => {
    let { firstname, lastname, email, address } = req.body;
    if (!firstname || !lastname || !email || !address) {
        return res.status(404).json({
            message: 'create failed'
        })
    }
    await connection2.execute('INSERT INTO users(firstname, lastname, email, address) VALUES(?, ?, ?, ?);', [firstname, lastname, email, address]);
    return res.status(200).json({
        message: 'create completed'
    })

}

const updateUser = async (req, res) => {
    let { firstname, lastname, email, address, id } = req.body;
    if (!firstname || !lastname || !email || !address || !id) {
        return res.status(404).json({
            message: 'update failed'
        })
    }
    await connection2.execute('UPDATE users SET firstname = ?, lastname = ?, email=?, address=? WHERE id=?;',
        [firstname, lastname, email, address, id]);
    return res.status(200).json({
        message: 'update completed'
    })
}
const deleteUser = async (req, res) => {
    let userId = req.params.id;
    if (!userId) {
        return res.status(404).json({
            message: 'delete failed'
        })
    }
    await connection2.execute('DELETE FROM users WHERE id=?', [userId]);
    return res.status(200).json({
        message: 'delete completed'
    })
}
module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser
}