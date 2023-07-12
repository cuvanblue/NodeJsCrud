const connection2 = require('../config/connectDB');

const getAbc = (req, res) => {
    res.send("hehehe home controller message!");
}
const getHomepage = async (req, res) => {

    const [rows, fields] = await connection2.execute('SELECT * FROM users');
    return res.render('index.ejs', { dataUser: rows });
}

const addUser = async (req, res) => {
    let { firstname, lastname, email, address } = req.body;
    if (!firstname || !lastname || !email || !address) {
        return res.send("Vui lòng điền đầy đủ thông tin!");
    }
    else {
        let [userInfor] = await connection2.execute('INSERT INTO users(firstname, lastname, email, address) VALUES(?, ?, ?, ?);', [firstname, lastname, email, address]);
        res.redirect('back');
    }
}

const deleteUser = async (req, res) => {              //==============> dùng post
    let userId = req.body.id;
    await connection2.execute('DELETE FROM user_image_upload WHERE id=?', [userId]);
    await connection2.execute('DELETE FROM users WHERE id=?', [userId]);
    res.redirect('back');
}
// const editUser = async (req, res) => {
//     let { id, firstname, lastname, email, address } = req.body;
//     let kt = true;
//     // kiểm tra xem điền đầy đủ thông tin chưa
//     for (let i = 0; i < Object.values(req.body).length; i++) {
//         if (Object.values(req.body)[i].length == 0) {
//             kt = false;
//             break;
//         }
//     }
//     if (kt) {
//         await connection2.execute('UPDATE users SET firstname = ?, lastname = ?, email=?, address=? WHERE id=?;',
//             [firstname, lastname, email, address, id]);
//         return res.redirect('/');
//     }
//     else {
//         return res.send("Vui lòng điền đầy đủ thông tin!");
//     }
// }
module.exports = {
    getHomepage,
    getAbc,
    addUser,
    deleteUser
}