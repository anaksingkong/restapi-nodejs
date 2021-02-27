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
    let query = 'SELECT email FROM ?? WHERE ??'; // ambilkan saya data dari tabel user yang key n value nya adalah email
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
                response.ok('Maaf, Email sudah terdaftar');
            }
        }
    });
});