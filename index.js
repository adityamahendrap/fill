require('dotenv').config()
const db = require('./utils/connection.js');
const fill = require('./utils/fill.js');

// tanggal()
// fill.pegawai(20) //
// fill.mesin(20) //
// fill.bahan_baku() //-
// fill.distributor(20) //
// fill.kategori() //
// fill.admin(20) //
// fill.toko(20) //
// fill.pengiriman(50)
// fill.jadwal_pegawai() //
// fill.jadwal_mesin() //
// fill.transaksi_distribusi(50)
// fill.produksi(50) //
// fill.buku(200) //
// fill.detail_transaksi_distribusi(50)
// fill.dt_distribusi(200)
// fill.t_distribusi(50) //

db.end();