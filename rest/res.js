'use strict';

exports.ok = function(values, res){
	const data = {
		'status': 200,
		'error': null,
		'data': values
	};

	res.json(data);
	res.end();

};

exports.nestedJson = function(values, res){
	// melakukan akumulasi
	const hasil = values.reduce((akumulasiData, item)=>{
		// menentukan key group
		if(akumulasiData[item.nama]){
			// membuat variabel group mahasiswa
			const group = akumulasiData[item.nama];
			// melakukan pengecekan jika didalam array berisi matakuliah
			if(Array.isArray(group.matakuliah)){
				// maka masukan data baru kedalam group matakuliah
				group.matakuliah.push(item.matakuliah);
			} else {
				// jika tidak tampilka matakuliah yang diambil
				group.matakuliah = [group.matakuliah, item.matakuliah];
			}
		} else {
			akumulasiData[item.nama] = item;
		}
		return akumulasiData;
	}, {});

	const data = {
		'status': 200,
		'error': null,
		'values': hasil
	};

	res.json(data);
	res.end();

};