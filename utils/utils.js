const formatDomain = (text) => {
  const words = text.split("-");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }

  return words.join(" ");
};

const sqlDateConvert = (datestr) => {
  return datestr.toISOString().substring(0, 10);
};

const incrementDate = (dateString, value) => {
  const date = new Date(dateString);
  return new Date(date.getTime() + value * 24 * 60 * 60 * 1000);
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const capsFirstLetterEachWord = (str) => {
  let words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  return words.join(" ");
}


const tanggal = () => {
  for (let i = 0; i < 50; i++) {
    const sql = `UPDATE transaksi_distribusi SET tanggal = '2022-12-${getRandomNumber(1, 31)}' WHERE id_transaksi_distribusi = ${i+1}`
    console.log(sql);

    db.query(sql, (err) => {
      if(err) throw err
    })
    console.log('ok');
  }
}

const dt_distribusi = (total) => {
  for (let i = 0; i < total; i++) {
    let id_buku = getRandomNumber(1, 50)
    let jumlah = getRandomNumber(1, 10) * 10
    let id_t_distribusi = getRandomNumber(1, 50)
    const sql = `INSERT INTO detail_transaksi_distribusi VALUES(NULL, ${id_buku}, ${jumlah}, ${id_t_distribusi})`
    console.log(sql);

    db.query(sql, (err) => {
      if(err) throw err
    })
  }
  console.log(`${total} data inserted`);
}

const t_distribusi = (total) => {
  for (let i = 0; i < total; i++) {
    const id_admin = getRandomNumber(1, 20)
    const id_toko = getRandomNumber(1, 20)

    const sql = `INSERT INTO transaksi_distribusi VALUES (NULL, ${id_admin}, ${id_toko}, NULL, NULL)`
    console.log(sql);

    db.query(sql, (err) => {
      if(err) throw err
    })
  }
  console.log(`${total} data transaksi distribusi inserted`);
}


module.exports = { formatDomain, incrementDate, sqlDateConvert, shuffleArray, getRandomNumber, capsFirstLetterEachWord }