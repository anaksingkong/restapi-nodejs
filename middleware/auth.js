const connection = require('../models/connection');
const mysql = require('mysql');
const md5 = require('md5');
const response = require('../rest/res');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const ip = require('ip');


// controller untuk registrasi
exports.registrasi = ((req, res)=>{
    let post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tanggal_daftar: new Date()
    }
 
    // mengecek email apakah sudah terdaftar atau belum
    let query = 'SELECT email FROM ?? WHERE ??=?'; // ambilkan saya data dari tabel user yang key n value nya adalah email
    let table = ['user', 'email', post.email];
 
    query = mysql.format(query, table); // menjalankan varible query dan table

    // membuat koneksi untuk mengecek email pada tabel user
    connection.query(query, (error, rows)=>{
        if (error) {
            console.log(error)
        } else {
            // mengecek apakah terdapat email yang sama atau tidak
            if (rows.length == 0) {
                // jika tidak terdapat email yang sama, akan memasukan data baru
                let query = 'INSERT INTO ?? SET ?'; 
                let table = ['user']; // akan dimasukan ke tabel user 
                query = mysql.format(query, table); // menjalankan query insert data
                
                // mengecek apakah data berhasil dimasukan atau tidak
                connection.query(query, post, (error, rows)=>{
                    if (error) {
                        console.log(error);
                    } else {
                        response.ok("Berhasil menambahkan data baru", res);
                    }
                });
            // jika email sudah terdaftar maka jalankan perintah else               
            } else { 
                response.ok('Maaf, Email sudah terdaftar', res);
            }
        }
    });
});

// controller untuk login
exports.login = ((req, res)=>{
    // inputan dari body
    let post = {
        email : req.body.email,
        password: req.body.password
    }

    // mengecek apakah email dan psw terdapat dalam database atau tidak
    let query = 'SELECT * FROM ?? WHERE ??=? AND ??=?';
    let table = ['user', 'email', post.email, 'password', md5(post.password)];

    query = mysql.format(query, table); // menjalankan variabel query, table

    connection.query(query, (error, rows)=>{
        if (error) {
            console.log(error);
        } else {
            if (rows.length == 1) {
                // membuat token baru
                let token = jwt.sign(
                    {rows},             // rows adalah hasil select dari dari fungsi query
                    config.secret,      // config.secret adalah untuk mengenerate isi file secret  yang terdapat pada folder config
                    {expiresIn: 1440}   // expiresIn untuk memberikan jangka waktu token tersebut aktif
                ); 

                // user_id terdapat pada table akses_token 
                user_id = rows[0].id_user; // id_user terdapat pada tabel user
                
                // variabel ini akan dimasukan kedalam database jika user berhasil login
                let data = {
                    user_id: user_id,
                    access_token: token,
                    ip_address: ip.address()
                }

                // perintah untuk menginputkan data baru
                let query = 'INSERT INTO ?? SET ?';
                let table = ['akses_token'];

                query = mysql.format(query, table);

                connection.query(query, data, (error, rows)=>{
                    if (error) {
                        console.log(error)
                    } else {
                        res.json({
                            "success": true,
                            "message": "Token tergenerate",
                            "token": token,
                            "currUser": data.user_id
                        })
                    }
                })
            } else {
                res.json({
                    'Error': true,
                    'Massage': "Email atau password salah"
                })
            }
        }
    });
});