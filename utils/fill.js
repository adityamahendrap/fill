const { faker } = require("@faker-js/faker");
const { formatDomain, incrementDate, sqlDateConvert, shuffleArray, getRandomNumber, capsFirstLetterEachWord } = require('./utils.js');
const db = require('./connection.js');
faker.locale = "id_ID";

const pegawai = (total) => {
  for (let i = 0; i < total; i++) {
    const nama = faker.name.fullName();
    const alamat = faker.address.streetAddress();
    const kota = faker.address.city();
    const noTelp = faker.phone.number("08##########");

    const sql = `INSERT INTO tb_pegawai VALUES (NULL, '${nama}', '${alamat}, ${kota}', '${noTelp}')`;
    console.log(sql);

    db.query(sql, (err) => {
      if (err) throw err;
    });
  }
  console.log(`${total} data pegawai inserted`);
};

const produksi = (total) => {
  for (let i = 0; i < total; i++) {
    const sql = `INSERT INTO tb_produksi VALUES(NULL, ${getRandomNumber(1, 20)}, ${getRandomNumber(1, 20)}, '2023-02-${i+1}', 0);`
    // const sql = `UPDATE tb_produksi SET modal = 0 WHERE id_produksi = ${i+1}`
    console.log(sql);

    // db.query(sql, (err) => {
    //   if(err) throw err
    // })
  }
  console.log(`${total} data produksi inserted`);
}

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

const mesin = (total) => {
  for (let i = 0; i < total; i++) {
    let nama = faker.color.human();
    nama = nama.charAt(0).toUpperCase() + nama.slice(1);
    const code = faker.random.numeric(3);

    const sql = `INSERT INTO tb_mesin VALUES (NULL, '${nama}_${code}')`;
    console.log(sql);

    db.query(sql, (err) => {
      if(err) throw err;
    })
  }
  console.log(`${total} data mesin inserted`);
};

const bahan_baku = () => {
  const pool = [
    { bahan: 'Kertas HVS', harga: 2000, stok: 500 },
    { bahan: 'Art Paper', harga: 3000, stok: 300 },
    { bahan: 'Book Paper', harga: 2500, stok: 400 },
    { bahan: 'Tinta Hitam', harga: 1500, stok: 200 },
    { bahan: 'Tinta Cyan', harga: 2000, stok: 250 },
    { bahan: 'Tinta Magenta', harga: 2200, stok: 250 },
    { bahan: 'Tinta Kuning', harga: 1900, stok: 250 },
    { bahan: 'Lem Kertas', harga: 1000, stok: 150 },
    { bahan: 'Lem Putih', harga: 1200, stok: 200 },
    { bahan: 'Hard Cover', harga: 3500, stok: 100 },
    { bahan: 'Soft Cover', harga: 2000, stok: 150 },
    { bahan: 'Spiral', harga: 2500, stok: 200 },
    { bahan: 'Jahit', harga: 3000, stok: 150 },
    { bahan: 'Staples', harga: 2000, stok: 250 },
    { bahan: 'Kain', harga: 5000, stok: 250 },
  ];

  for (let i = 0; i < pool.length; i++) {
    const stok = getRandomNumber(20, 100)
    // const sql = `INSERT INTO tb_bahan_baku VALUES (NULL, '${pool[i].bahan}', ${pool[i].stok}, ${pool[i].harga})`;
    const sql = `UPDATE tb_bahan_baku SET harga = ${pool[i].harga} WHERE id_bahan_baku = ${i+1};`;
    console.log(sql);

    db.query(sql, (err) => {
      if (err) throw err;
    });
  }
  console.log(`${pool.length} data bahan baku inserted`);
};

const distributor = (total) => {
  for (let i = 0; i < total; i++) {
    let nama = formatDomain(faker.internet.domainWord())
    const alamat = faker.address.streetAddress();
    const kota = faker.address.city()
    const noTelp = faker.phone.number("08##########");

    const sql = `INSERT INTO tb_distributor VALUES (NULL, '${nama}', '${alamat}, ${kota}', '${noTelp}')`;
    console.log(sql);

    db.query(sql, (err) => {
      if(err) throw err;
    })
  }
  console.log(`${total} distributor inserted`);
};

const kategori = () => {
  const kategoriPool = [
    "Fiksi",
    "Non Fiksi",
    "Anak-Anak",
    "Agama",
    "Seni dan Budaya",
    "Komik",
    "Masakan",
    "Olahraga",
    "Bisnis dan Keuangan",
    "Teknologi",
    "Sains",
    "Horor",
    "Sejarah",
    "Politik dan Sosial",
    "Hobi dan Keterampilan",
  ];

  for (let i = 0; i < kategoriPool.length; i++) {
    const sql = `INSERT INTO tb_kategori VALUES (NULL, '${kategoriPool[i]}')`;
    console.log(sql);

    db.query(sql, (err) => {
      if (err) throw err;
    });
  }
  console.log(`${kategoriPool.length} kategori inserted`);
};

const admin = (total) => {
  for (let i = 0; i < total; i++) {
    const username = faker.internet.userName().toLowerCase()
    const passwd = faker.internet.password(16);
    const email = faker.internet.email().toLowerCase()

    const sql = `INSERT INTO tb_admin VALUES (NULL, '${username}', '${passwd}', '${email}')`;
    console.log(sql);

    db.query(sql, (err) => {
      if (err) throw err;
    });
  }
  console.log(`${total} data admin inserted`);
};

const toko = (total) => {
  for (let i = 0; i < total; i++) {
    const nama = formatDomain(faker.internet.domainWord())
    const alamat = faker.address.streetAddress();
    const kota = faker.address.city()
    const noTelp = faker.phone.number("08##########");

    const sql = `INSERT INTO tb_toko VALUES (NULL, '${nama}', '${alamat}, ${kota}', '${noTelp}')`;
    console.log(sql);

    db.query(sql, (err) => {
      if (err) throw err;
    });
  }
  console.log(`${total} data toko inserted`);
};

const pengiriman = (total) => {
  for (let i = 0; i < total; i++) {
    const tujuan = faker.address.streetAddress();
    const kota = faker.address.city();
    const randomDate = faker.date.between("2023-03-01", "2023-04-31");
    const waktuPengiriman = sqlDateConvert(randomDate);
    const ongkir = Math.floor((Math.random() * (50000 - 10000 + 1) + 10000) / 1000) * 1000;
    const randomIncrement = getRandomNumber(3, 30)
    const waktuDiterima = sqlDateConvert(
      incrementDate(randomDate, randomIncrement)
    );

    // const sql = `INSERT INTO tb_pengiriman VALUES (NULL, '${tujuan}, ${kota}', '${waktuPengiriman}', '${waktuDiterima}', ${ongkir})`;
    // const sql2 = `UPDATE tb_pengiriman SET waktu_pengiriman = '2023-02-${i+1}' WHERE id_pengiriman = ${31+i+1};`;
    // const sql2 = `UPDATE tb_pengiriman SET waktu_diterima = '2023-02-${i+1+getRandomNumber(3,7)}' WHERE id_pengiriman = ${31+1+i};`;
    const sql2 = `UPDATE tb_pengiriman SET ongkir = ${ongkir} WHERE id_pengiriman = ${1+i};`;
    console.log(sql2);

    // db.query(sql, (err) => {
    //   if (err) throw err;
    // });
  }
  // console.log(`${total} data pengiriman inserted`);
};

const jadwal_pegawai = () => {
  const shiftPool = ['Siang', 'Malam']
  const days = 31
  const pegawaiCount = 20
  let shiftChoice = [1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0]
  let siang = 0, malam = 0

  for (let j = 1; j <= days; j++) {
    shuffleArray(shiftChoice)
    for (let i = 0; i < pegawaiCount; i++) {

      const sql =  `INSERT INTO tb_jadwal_pegawai VALUES(NULL, '${i + 1}', '2023-02-${j > 9 ? j : '0' + j.toString()}', '${shiftPool[shiftChoice[i]]}')`
      if(shiftPool[shiftChoice[i]] == 'Siang' ? siang++ : malam++)
      console.log(sql);

      db.query(sql, (err) => {
        if(err) throw err;
      })
    }
  }
  console.log(`${31 * 20} data jadwal pegawai inserted`);
}

const jadwal_mesin = () => {
  let prosesPool = [
    'Cetak Offset',
    'Memotong Kertas',
    'Jilid',
    'Folding',
    'Stiching',
    'Laminating',
    'Finishing',
    'Binding',
    'Cetak Digital',
    'Creasing',
    'Perforating',
    'Scoring',
    'Numbering',
    'Embossing',
    'Foiling',
    'Die Cutting',
    'Binding Hardcover',
    'Casing In',
    'Trimming',
    'Packing'
  ];
  
  for (let j = 1; j <= 31; j++) {
    prosesPool = shuffleArray(prosesPool)

    for (let i = 0; i < 20; i++) {

      const sql = `INSERT INTO tb_jadwal_mesin VALUES(NULL, '${i + 1}', '2023-02-${j > 9 ? j : '0' + j.toString()}', '${prosesPool[i]}')`
      console.log(sql);

      db.query(sql, (err) => {
        if(err) throw err;
      })
    }
  }
  console.log(`${31 * 20} jadwal mesin inserted`);
}

const transaksi_distribusi = (total) => {
  for (let i = 0; i < total; i++) {
    const sql = `INSERT INTO tb_transaksi_distribusi VALUES (NULL, ${getRandomNumber(1, 20)}, ${getRandomNumber(1, 20)}, ${i+1}, 0, '2023-03-01')`
    const sql2 = ` UPDATE tb_transaksi_distribusi SET tgl_transaksi = '2023-02-${i+1}' WHERE id_transaksi_distribusi = ${31+i+1};`
    console.log(sql2);

    // db.query(sql, (err) => {
    //   if(err) throw err
    // })
  }
  console.log(`${total} data transaksi distribusi inserted`);
}

const buku = (total) => {
  // const selectModal = `SELECT modal FROM produksi`
  // let modal = []

  // db.query(selectModal, (err, res) => {
  //   if(err) throw err
  //   res.forEach((e, i) => {
  //     modal.push(e.modal)
  //   });
    
  //   for (let i = 0; i < total; i++) {
  //     let judul = faker.lorem.words()
  //     judul = capsFirstLetterEachWord(judul)
      
  //     const idProduksi = getRandomNumber(1, 50)
  //     const sql = `INSERT INTO buku VALUES(NULL, ${idProduksi}, ${getRandomNumber(1, 15)}, '${judul}', ${modal[idProduksi-1] + (modal[idProduksi-1] * 10/100)}, ${getRandomNumber(20, 1000)})`
  //     console.log(sql);
  
  //     db.query(sql, (err) => {
  //       if(err) throw err
  //     })
  //   }
  //   console.log(`${total} data buku inserted`);
  // })

  let harga = [
    38500, 30000, 42500, 40000, 32000, 39500,
    34500, 31000, 42500, 36000, 29500, 26000,
    34500, 40000, 37500, 38500, 32000, 35000,
    37500, 27500, 31000, 25000, 27500, 55000,
    28500, 25000, 40000, 32500, 26000, 39500,
    46000, 37000, 33500, 31000, 26000, 40000,
    26000, 46000, 31000, 27500, 42500, 31000,
    27500, 29500, 27500, 31000, 27500, 28500,
    30000, 22500
  ]

  for (let i = 0; i < total; i++) {
    const id_produksi = getRandomNumber(1, 100)
    const id_kategori =  getRandomNumber(1, 15)
    let judul = capsFirstLetterEachWord(faker.lorem.words())
    const stok = Math.floor((Math.random() * (300 - 20 + 1) + 20) / 5) * 5;
    // const sql = `INSERT INTO tb_buku VALUES(NULL, ${id_produksi}, ${id_kategori}, '${judul}', ${harga}, ${stok})`
    const sql = `INSERT INTO tb_buku VALUES(NULL, ${i+1}, ${id_kategori}, '${judul}', ${harga[i] + 5000}, ${stok});`
    console.log(sql);
  }

  // let modal = []
  // db.query(`SELECT * FROM tb_produksi`, (err, res) => {
  //   if(err) throw err
  //   res.forEach(e => {
  //     modal.push(e.modal)
  //   });
  //   console.log(modal);
  // })
}

const detail_transaksi_distribusi = (total) => {
  function getRandomInRange(min, max) {
    return Math.floor((Math.random() * (max - min + 1) + min) / 10) * 10;
  }
  for (let i = 0; i < total; i++) {

    const sql = `INSERT INTO tb_detail_transaksi_distribusi VALUES(NULL, ${getRandomNumber(1, 25)}, ${i+1}, ${getRandomInRange(10, 50)});`
    const sql2 = `INSERT INTO tb_detail_transaksi_distribusi VALUES(NULL, ${getRandomNumber(25,50)}, ${i+1}, ${getRandomInRange(10,50)});`
    const sql3 = `INSERT INTO tb_detail_transaksi_distribusi VALUES(NULL, ${getRandomNumber(25,50)}, ${i+1}, ${getRandomInRange(10,50)});`
    console.log(sql);
    console.log(sql2);
    console.log(sql3);
    console.log();

    // db.query(sql, (err) => {
    //   if(err) throw err
    // })
  }
  // console.log(`${total} data inserted`);
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

const detail_transaksi_bahan_baku = (total) => {
  // for (let i = 0; i < total; i++) {
    const harga = 0
    const jumlah = 0
    // const sql = `INSERT INTO tb_detail_transaksi_bahan_baku VALUES(NULL, ${i+1}, ${getRandomNumber(1, 15)}, ${harga}, ${jumlah})`

    // const sql2 = `UPDATE tb_detail_transaksi_bahan_baku SET harga = ${pool[i].harga - 100} WHERE tb_detail_transaksi_bahan_baku = ${i+1};`;
    const sql3 = `SELECT * FROM tb_detail_transaksi_bahan_baku`
    
    db.query(sql3, (err, res) => {
      if(err) throw err
      // console.log(res);
      res.forEach((e,i) => {
        console.log(`UPDATE tb_detail_transaksi_bahan_baku SET harga = ${e.harga /10} WHERE id_detail_transaksi_bahan_baku = ${i+1};`);
      });
    })
  // }
  // console.log(`${total} data inserted`);
}


const detail_bahan_baku = (total) => {

  for (let i = 0; i < total; i++) {
    const jumlah = 5
    const sql = `INSERT INTO tb_detail_bahan_baku VALUES(NULL, ${getRandomNumber(1, 5)}, ${i+1}, ${jumlah});`
    const sql2 = `INSERT INTO tb_detail_bahan_baku VALUES(NULL, ${getRandomNumber(6, 10)}, ${i+1}, ${jumlah});`
    const sql3 = `INSERT INTO tb_detail_bahan_baku VALUES(NULL, ${getRandomNumber(11, 15)}, ${i+1}, ${jumlah});`
    console.log(sql);
    console.log(sql2);
    console.log(sql3);
    console.log();

    // db.query(sql, (err) => {
    //   if(err) throw err
    // })
  }
  console.log(`${total} data inserted`);
}

const transaksi_bahan_baku = (total) => {
  for (let i = 0; i < total; i++) {
    const total_harga = 0
    const randomDate = faker.date.between("2022-12-01", "2023-12-31");
    const tanggal = sqlDateConvert(randomDate);
    
    // const sql = `INSERT INTO tb_transaksi_bahan_baku VALUES(NULL, ${getRandomNumber(1, 20)}, ${total_harga}, ${tanggal})`
    const sql = `UPDATE  tb_transaksi_bahan_baku SET tanggal = '2022-12-${getRandomNumber(1, 31)}' WHERE id_transaksi_bahan_baku = ${i+1}`

    db.query(sql, (err) => {
      if(err) throw err
    })
  }
  console.log('ok');
}


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

module.exports = { detail_bahan_baku, detail_transaksi_bahan_baku, transaksi_bahan_baku, admin, bahan_baku, buku, distributor, jadwal_mesin, jadwal_pegawai, jadwal_pegawai, mesin, pegawai, pengiriman, produksi, toko, transaksi_distribusi, detail_transaksi_distribusi, kategori }