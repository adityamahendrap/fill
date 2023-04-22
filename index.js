require("dotenv").config();
const db = require("./utils/connection.js");
const fill = require("./utils/fill.js");

// fill.pegawai(20) //
// fill.mesin(20) //
// fill.bahan_baku() //
// fill.distributor(20) //
// fill.kategori()  //
// fill.admin(20) //
// fill.toko(20) //
// fill.pengiriman(50) //
// fill.jadwal_pegawai() //
// fill.jadwal_mesin() //
// fill.transaksi_distribusi(50) //
// fill.produksi(19) //
// fill.buku(50)
// fill.detail_transaksi_distribusi(50) //
// fill.transaksi_bahan_baku(50)
// fill.dt_distribusi(200)
// fill.t_distribusi(50)
// fill.detail_transaksi_bahan_baku()
// fill.detail_bahan_baku(50)
// fill.hitung_transaksi_bahan_baku();
// fill.hitung_total_harga_transaksi_distribusi()
// fill.hitung_modal_produksi()

db.end();
