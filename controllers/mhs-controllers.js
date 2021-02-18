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
	const id = req.body.id_mahasiswa;
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
	const id = req.params.id_mahasiswa;

	connection.query('DELETE FROM mahasiswa WHERE id_mahasiswa = ?', [id], (error, rows, fields)=>{
		if (error) {
			console.log(error)
		} else {
			response.ok(`Berhasil menghapus data dengan id ${id}`, res);
		}
	});
});

// menampilkan hasil dari nested json
exports.jsonGroup = function(req, res){
	connection.query('SELECT mahasiswa.id_mahasiswa, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakuliah.matakuliah, matakuliah.sks FROM krs JOIN matakuliah JOIN mahasiswa WHERE krs.id_mahasiswa = mahasiswa.id_mahasiswa AND krs.id_matakuliah = matakuliah.id_matakuliah ORDER BY mahasiswa.id_mahasiswa ', (error, rows, fields)=>{
		if (error) {
			console.log(error);
		} else {
			response.nestedJson(rows, res);
		}
	});
};

// menapilkan halaman html
exports.laporan = function(req, res){
	res.sendfile('index1.html');
};
