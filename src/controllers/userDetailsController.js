const connection2 = require('../config/connectDB');
const multer = require("multer");

const getUserDetails = async (req, res) => {
    let param = req.params;
    let [rows, fields] = await connection2.execute('SELECT * FROM users WHERE id=?', [param.userId]);
    let [rows1, fields1] = await connection2.execute("SELECT img_id FROM user_image_upload WHERE id=? AND type='avatar' LIMIT 1", [param.userId]);
    let [rows2, fields2] = await connection2.execute("SELECT * FROM user_image_upload WHERE id=?", [param.userId]);
    let avatar = 'default_avatar.jpg';
    if (rows1.length != 0) {
        avatar = rows1[0].img_id;
    }
    return res.render('user_details.ejs', { dataUser: rows, avatar_pic: avatar, allPictures: rows2 });
}

let upload = multer().single('avatar');

const editUser = async (req, res) => {
    let { id, firstname, lastname, email, address, avatar } = req.body;
    // kiểm tra xem điền đầy đủ thông tin chưa
    if (!firstname || !lastname || !email || !address || !id) {
        return res.send("Vui lòng điền đầy đủ thông tin!");
    }
    else {
        let [rows, fields] = await connection2.execute("SELECT img_id FROM user_image_upload WHERE id=? AND type='avatar' LIMIT 1", [id]);
        await connection2.execute('UPDATE users SET firstname = ?, lastname = ?, email=?, address=? WHERE id=?;', [firstname, lastname, email, address, id]);
        upload(req, res, async function (err) {
            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            }
            else if (!req.file) {
                res.redirect('back');
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                console.log(err);
                return res.send(err);
            }
            else {
                if (rows.length != 0) {
                    await connection2.execute("UPDATE user_image_upload SET type='picture' WHERE img_id=?;", [rows[0].img_id]);
                }
                await connection2.execute('INSERT INTO user_image_upload(img_id, id, type) VALUES(?, ?, ?);', [req.file.filename, id, 'avatar']);
                res.redirect('back');
            }
        });

    }
}
const addPictures = async (req, res) => {
    let id = req.body.user_id;
    upload(req, res, async function (err) {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.files) {
            res.redirect('/');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        else {
            const files = req.files;
            for (index = 0, len = files.length; index < len; index++) {
                await connection2.execute('INSERT INTO user_image_upload(img_id, id, type) VALUES(?, ?, ?);',
                    [req.files[index].filename, id, 'picture']);
            }
            res.redirect('back');
        }
    });
}
const changeAvatar = async (req, res) => {
    let { user_id, img_id } = req.body;
    let [rows, fields] = await connection2.execute("SELECT img_id FROM user_image_upload WHERE id=? AND type='avatar' LIMIT 1", [user_id]);
    if (rows.length != 0) {
        await connection2.execute("UPDATE user_image_upload SET type='picture' WHERE img_id=?;", [rows[0].img_id]);
    }
    await connection2.execute("UPDATE user_image_upload SET type='avatar' WHERE img_id=?;", [img_id]);
    res.redirect('back');
}
module.exports = {
    editUser,
    getUserDetails,
    addPictures,
    changeAvatar
}