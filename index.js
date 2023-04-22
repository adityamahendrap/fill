require("dotenv").config();
const db = require("./utils/connection.js");
const fill = require("./utils/fill.js");

// 1-5 kertas
// 6-10 cover
//11-15 lem

// tanggal()
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


const hitung_transaksi_bahan_baku = () => {
  const pool = [
    { bahan: "Kertas HVS", harga: 20000, stok: 500 },
    { bahan: "Art Paper", harga: 30000, stok: 300 },
    { bahan: "Book Paper", harga: 25000, stok: 400 },
    { bahan: "Tinta Hitam", harga: 15000, stok: 200 },
    { bahan: "Tinta Cyan", harga: 20000, stok: 250 },
    { bahan: "Tinta Magenta", harga: 22000, stok: 250 },
    { bahan: "Tinta Kuning", harga: 19000, stok: 250 },
    { bahan: "Lem Kertas", harga: 10000, stok: 150 },
    { bahan: "Lem Putih", harga: 12000, stok: 200 },
    { bahan: "Hard Cover", harga: 35000, stok: 100 },
    { bahan: "Soft Cover", harga: 20000, stok: 150 },
    { bahan: "Spiral", harga: 25000, stok: 200 },
    { bahan: "Jahit", harga: 30000, stok: 150 },
    { bahan: "Staples", harga: 20000, stok: 250 },
    { bahan: "Kain", harga: 50000, stok: 250 },
  ];

  let data = [
    12, 3, 12, 2, 8, 7, 5, 12, 8, 4, 11, 3, 9, 12, 15, 9, 8, 15, 7, 6, 15, 10,
    13, 15, 9, 5, 1, 4, 6, 11, 11, 2, 5, 5, 11, 9, 11, 9, 10, 3, 5, 6, 11, 11,
    8, 3, 9, 8, 4, 11
  ];

  // const sql = `SELECT id_detail_transaksi_bahan_baku, id_bahan_baku FROM tb_detail_transaksi_bahan_baku ORDER BY id_detail_transaksi_bahan_baku`;
  let harga = [
    20000, 30000, 25000,
    15000, 20000, 22000,
    19000, 10000, 12000,
    35000, 20000, 25000,
    30000, 20000, 50000
  ]
  
  let total_harga = []
  for (let i = 0; i < data.length; i++) {
    let index = data[i] - 1
    total_harga.push((harga[index] - 1000)*50)
    // const sql = `UPDATE tb_detail_transaksi_bahan_baku SET harga = ${harga[index] - 1000} WHERE id_detail_transaksi_bahan_baku = ${i+1};`;
    // const sql = `UPDATE tb_detail_transaksi_bahan_baku SET jumlah = 50 WHERE id_detail_transaksi_bahan_baku = ${i+1};`;
    const sql = `UPDATE tb_transaksi_bahan_baku SET total_harga = ${total_harga[i]} WHERE id_transaksi_bahan_baku = ${i+1};`;
    console.log(sql);
  }
  // total_harga = total_harga.reduce((a,b) => a+b, 0)


  // db.query(sql, (err, res) => {
  //   if (err) throw err;
    // let result = [];
    // res.forEach((e) => {
    //   result.push(e.id_bahan_baku);
    // });
    // console.log(result);
  // });
};

// hitung_transaksi_bahan_baku();

const hitung_modal_produksi = () => {
  const sql = 
  `SELECT tb_detail_bahan_baku.id_detail_bahan_baku, tb_detail_bahan_baku.id_bahan_baku, tb_detail_bahan_baku.id_produksi, SUM(tb_detail_bahan_baku.jumlah * tb_bahan_baku.harga) AS total_harga
  FROM tb_detail_bahan_baku
  INNER JOIN tb_bahan_baku
  ON tb_detail_bahan_baku.id_bahan_baku = tb_bahan_baku.id_bahan_baku
  GROUP BY tb_detail_bahan_baku.id_produksi
  ORDER BY tb_detail_bahan_baku.id_produksi`

  let modal = []
  db.query(sql, (err, res) => {
    res.forEach((e, i) => {
      modal.push(e.total_harga)
      const sql2 = `UPDATE tb_produksi SET modal = ${e.total_harga} WHERE id_produksi = ${i+1};`
      console.log(sql2);
    });
  })
}

const hitung_total_harga_transaksi_distribusi = () => {
  const sql = 
  `SELECT 
    tb_detail_transaksi_distribusi.id_transaksi_distribusi, 
    SUM(tb_buku.harga * tb_detail_transaksi_distribusi.jumlah) AS total_harga
  FROM tb_detail_transaksi_distribusi
  INNER JOIN tb_buku ON tb_detail_transaksi_distribusi.id_buku = tb_buku.id_buku
  GROUP BY tb_detail_transaksi_distribusi.id_transaksi_distribusi
  ORDER BY tb_detail_transaksi_distribusi.id_transaksi_distribusi`

  let total = []
  db.query(sql, (err, res) => {
    if(err) throw err
    // console.log(res);
    res.forEach(e => {
      total.push(e.total_harga)
    });

    for (let i = 0; i < 50; i++) {
      const sql2 = `UPDATE tb_transaksi_distribusi SET total_harga = ${total[i]} WHERE id_transaksi_distribusi = ${i+1};`
      console.log(sql2);
    }
  })
}

// hitung_total_harga_transaksi_distribusi()
// hitung_modal_produksi()
db.end();
