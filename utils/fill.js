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

    const sql = `INSERT INTO pegawai VALUES (NULL, '${nama}', '${alamat}, ${kota}', '${noTelp}')`;
    console.log(sql);

    db.query(sql, (err) => {
      if (err) throw err;
    });
  }
  console.log(`${total} data pegawai inserted`);
};

const mesin = (total) => {
  for (let i = 0; i < total; i++) {
    let nama = faker.animal.type();
    nama = nama.charAt(0).toUpperCase() + nama.slice(1);
    const code = faker.random.numeric(3);

    const sql = `INSERT INTO mesin VALUES (NULL, '${nama}_${code}')`;
    console.log(sql);

    db.query(sql, (err) => {
      if(err) throw err;
    })
  }
  console.log(`${total} data mesin inserted`);
};

const bahan_baku = () => {
  const pool = [
    { bahan: 'Kertas HVS', harga: 20000, stok: 500 },
    { bahan: 'Art Paper', harga: 30000, stok: 300 },
    { bahan: 'Book Paper', harga: 25000, stok: 400 },
    { bahan: 'Tinta Hitam', harga: 15000, stok: 200 },
    { bahan: 'Tinta Cyan', harga: 20000, stok: 250 },
    { bahan: 'Tinta Magenta', harga: 22000, stok: 250 },
    { bahan: 'Tinta Kuning', harga: 19000, stok: 250 },
    { bahan: 'Lem Kertas', harga: 10000, stok: 150 },
    { bahan: 'Lem Putih', harga: 12000, stok: 200 },
    { bahan: 'Hard Cover', harga: 35000, stok: 100 },
    { bahan: 'Soft Cover', harga: 20000, stok: 150 },
    { bahan: 'Spiral', harga: 25000, stok: 200 },
    { bahan: 'Jahit', harga: 30000, stok: 150 },
    { bahan: 'Staples', harga: 20000, stok: 250 }
  ];

  for (let i = 0; i < pool.length; i++) {
    // const stok = getRandomNumber(20, 100)
    const sql = `INSERT INTO bahan_baku VALUES (NULL, '${pool[i].bahan}', ${pool[i].stok}, ${pool[i].harga})`;
    console.log(sql);

    db.query(sql, (err) => {
      if (err) throw err;
    });
  }
  console.log(`${pool.length} data bahan baku inserted`);
};

const distributor = (total) => {
  for (let i = 0; i < total; i++) {
    let nama = faker.internet.domainWord()
    const alamat = faker.address.streetAddress();
    const kota = faker.address.city()
    const noTelp = faker.phone.number("08##########");

    const sql = `INSERT INTO distributor VALUES (NULL, '${formatDomain(nama)}', '${alamat}, ${kota}', '${noTelp}')`;
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
    const sql = `INSERT INTO kategori VALUES (NULL, '${kategoriPool[i]}')`;
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
    const passwd = faker.internet.password();
    const email = faker.internet.email().toLowerCase()

    const sql = `INSERT INTO admin VALUES (NULL, '${username}', '${passwd}', '${email}')`;
    console.log(sql);

    db.query(sql, (err) => {
      if (err) throw err;
    });
  }
  console.log(`${total} data admin inserted`);
};

const toko = (total) => {
  for (let i = 0; i < total; i++) {
    const nama = faker.internet.domainWord();
    const alamat = faker.address.streetAddress();
    const kota = faker.address.city()
    const noTelp = faker.phone.number("08##########");

    const sql = `INSERT INTO toko VALUES (NULL, '${formatDomain(nama)}', '${alamat}, ${kota}', '${noTelp}')`;
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
    const randomDate = faker.date.between("2023-01-01", "2023-04-31");
    const waktuPengiriman = sqlDateConvert(randomDate);
    const ongkir = Math.floor((Math.random() * (350000 - 30000 + 1) + 15000) / 100) * 100;
    const randomIncrement = getRandomNumber(3, 30)
    const waktuDiterima = sqlDateConvert(
      incrementDate(randomDate, randomIncrement)
    );

    const sql = `INSERT INTO pengiriman VALUES (NULL, '${tujuan}, ${kota}', '${waktuPengiriman}', '${waktuDiterima}', ${ongkir})`;
    console.log(sql);

    db.query(sql, (err) => {
      if (err) throw err;
    });
  }
  console.log(`${total} data pengiriman inserted`);
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

      const sql =  `INSERT INTO jadwal_pegawai VALUES(NULL, '${i + 1}', '2023-01-${j > 9 ? j : '0' + j.toString()}', '${shiftPool[shiftChoice[i]]}')`
      if(shiftPool[shiftChoice[i]] == 'Siang' ? siang++ : malam++)
      console.log(sql);

      db.query(sql, (err) => {
        if(err) throw err;
      })
    }
  }
  console.log(`${31 * 20} data jadwal pegawai inserted`);
  // console.log(siang);
  // console.log(malam);
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

      const sql = `INSERT INTO jadwal_mesin VALUES(NULL, '${i + 1}', '2023-01-${j > 9 ? j : '0' + j.toString()}', '${prosesPool[i]}')`
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
    const sql = `INSERT INTO transaksi_distribusi VALUES (NULL, ${getRandomNumber(1, 20)}, ${getRandomNumber(1, 20)}, ${i+1}, ${parseInt(i*10000000/getRandomNumber(5,20))})`
    console.log(sql);

    db.query(sql, (err) => {
      if(err) throw err
    })
  }
  console.log(`${total} data transaksi distribusi inserted`);
}

const produksi = (total) => {
  for (let i = 0; i < total; i++) {
    const sql = `INSERT INTO produksi VALUES(NULL, ${getRandomNumber(1, 20)}, ${getRandomNumber(1, 20)}, '2022-12-${getRandomNumber(1, 31)}', ${getRandomNumber(10, 300) * 1000})`
    console.log(sql);

    db.query(sql, (err) => {
      if(err) throw err
    })
  }
  console.log(`${total} data produksi inserted`);
}

const buku = async(total) => {
  const selectModal = `SELECT modal FROM produksi`
  let modal = []

  db.query(selectModal, (err, res) => {
    if(err) throw err
    res.forEach((e, i) => {
      modal.push(e.modal)
    });
    
    for (let i = 0; i < total; i++) {
      let judul = faker.lorem.words()
      judul = capsFirstLetterEachWord(judul)
      
      const idProduksi = getRandomNumber(1, 50)
      const sql = `INSERT INTO buku VALUES(NULL, ${idProduksi}, ${getRandomNumber(1, 15)}, '${judul}', ${modal[idProduksi-1] + (modal[idProduksi-1] * 10/100)}, ${getRandomNumber(20, 1000)})`
      console.log(sql);
  
      db.query(sql, (err) => {
        if(err) throw err
      })
    }
    console.log(`${total} data buku inserted`);
  })
}

const detail_transaksi_distribusi = (total) => {
  for (let i = 0; i < total; i++) {

    const sql = `INSERT INTO detail_transaksi_distribusi VALUES(NULL, ${getRandomNumber(1, 50)}, ${getRandomNumber(1, 1000)}, ${getRandomNumber(1, 50)})`
    console.log(sql);

    db.query(sql, (err) => {
      if(err) throw err
    })
  }
  console.log(`${total} data inserted`);
}

module.exports = { admin, bahan_baku, buku, distributor, jadwal_mesin, jadwal_pegawai, jadwal_pegawai, mesin, pegawai, pengiriman, produksi, toko, transaksi_distribusi, detail_transaksi_distribusi, kategori }