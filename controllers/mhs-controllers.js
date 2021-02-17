'use strict';

const response = require('../rest/res.js');
const connection = require('../models/connection.js');

exports.index = function(req, res){
	response.ok('Aplikasi REST API telah berjalan', res);
};

// menampilkan semua data mahasiswa
exports.tampilSemuaMahasiswa = function(req, res){
	connection.query('SELECT * FROM mahasiswa', (error, rows, fields)=>{
		if (error) {
			console.log(error);
		} else {
			response.ok(rows, res);
		}
	});
};

// menampilkan data mahasiswa berdasarkan id
exports.tampilBerdasarkanId = function(req, res){
	const id = req.params.id;
	connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?', [id],
		(error, rows, fields)=>{
			if (error) {
				console.log(error);
			} else {
				response.ok(rows, res);
			}
		}
	);
};

// menambahkan data pada tabel mahasiswa
exports.tambahData = function(req, res){
	const nim = req.body.nim;
	const nama = req.body.nama;
	const jurusan = req.body.jurusan;

	connection.query('INSERT INTO mahasiswa (nim, nama, jurusan) VALUES (?,?,?)', [nim, nama, jurusan], 
		(error, rows, fields)=>{
			if (error) {
				console.log(error)
			} else {
				response.ok('Berhasil menambahkan data baru', res);
			}
		}
	);
};

// mengupdate/merubah data mahasiswa
// mencoba menggunakan arrow function
exports.rubahData = ((req, res)=>{
	const id = req.body.id;
	const nim = req.body.nim;
	const nama = req.body.nama;
	const jurusan = req.body.jurusan;

	connection.query('UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id_mahasiswa=?', [nim, nama, jurusan, id],
		(error, rows, fields)=>{
			if (error) {
				console.log(error);
			} else {
				response.ok('Berhasil merubah data mahasiswa', res)
			}
		}
	);
});

// menghapus data mahasiswa
exports.hapusData = ((req, res)=>{
	const id = req.params.id;

	connection.query('DELETE FROM mahasiswa WHERE id_mahasiswa = ?', [id], (error, rows, fields)=>{
		if (error) {
			console.log(error)
		} else {
			response.ok(`Berhasil menghapus data dengan id ${id}`, res);
		}
	});
});