'use strict';

module.exports = function(app){
	const jsonku = require('../controllers/mhs-controllers.js');

    // route untuk halaman home
	app.route('/')
		.get(jsonku.index);

	// route untuk menampilkan semua data mahasiswa
	app.route('/display-all')
		.get(jsonku.tampilSemuaMahasiswa);

	// route untuk menampilan data mahasiswa berdasarkan id
	app.route('/display/:id')
		.get(jsonku.tampilBerdasarkanId);

	// route untuk menambahkan data mahasiswa
	app.route('/create-data')
		.post(jsonku.tambahData);

	// mengupdate/merubah data mahasiswa
	app.route('/update-data')
		.put(jsonku.rubahData);

	// menghapus data mahasiswa
	app.route('/delete-data/:id')
		.post(jsonku.hapusData)
};