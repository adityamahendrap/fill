CREATE TABLE tb_pegawai (
  id_pegawai INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nama_pegawai VARCHAR(255) NOT NULL,
  alamat VARCHAR(255) NOT NULL,
  no_telp VARCHAR(12) NOT NULL
);

CREATE TABLE tb_jadwal_pegawai (
  id_jadwal_pegawai INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_pegawai INT NOT NULL,
  tgl_kerja DATE NOT NULL,
  shift ENUM('Siang', 'Malam') NOT NULL,
  FOREIGN KEY (id_pegawai) REFERENCES tb_pegawai(id_pegawai)
);

CREATE TABLE tb_mesin (
  id_mesin INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nama_mesin VARCHAR(255) NOT NULL
);

CREATE TABLE tb_jadwal_mesin (
  id_jadwal_mesin INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_mesin INT NOT NULL,
  tgl_produksi DATE NOT NULL,
  daftar_proses VARCHAR(255) NOT NULL,
  FOREIGN KEY (id_mesin) REFERENCES tb_mesin(id_mesin)
);

CREATE TABLE tb_bahan_baku (
  id_bahan_baku INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nama_bahan_baku VARCHAR(255) NOT NULL,
  stok INT NOT NULL,
  harga INT NOT NULL
);

CREATE TABLE tb_detail_transaksi_bahan_baku (
  id_detail_transaksi_bahan_baku INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_transaksi_bahan_baku INT NOT NULL,
  id_bahan_baku INT NOT NULL,
  harga INT NOT NULL,
  jumlah INT NOT NULL,
  FOREIGN KEY (id_transaksi_bahan_baku) REFERENCES tb_transaksi_bahan_baku(id_transaksi_bahan_baku),
  FOREIGN KEY (id_bahan_baku) REFERENCES tb_bahan_baku(id_bahan_baku)
);

CREATE TABLE tb_transaksi_bahan_baku (
  id_transaksi_bahan_baku INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_distributor INT NOT NULL,
  total_harga INT NOT NULL,
  tanggal DATE NOT NULL,
  FOREIGN KEY (id_distributor) REFERENCES tb_distributor(id_distributor)
);

CREATE TABLE tb_distributor (
  id_distributor INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nama_distributor VARCHAR(255) NOT NULL,
  alamat VARCHAR(255) NOT NULL,
  no_telp VARCHAR(12) NOT NULL
);

CREATE TABLE tb_detail_bahan_baku (
  id_detail_bahan_baku INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_bahan_baku INT NOT NULL,
  id_produksi INT NOT NULL,
  jumlah INT NOT NULL,
  FOREIGN KEY (id_bahan_baku) REFERENCES tb_bahan_baku(id_bahan_baku),
  FOREIGN KEY (id_produksi) REFERENCES tb_produksi(id_produksi)
)

CREATE TABLE tb_produksi (
  id_produksi INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_mesin INT NOT NULL,
  id_pegawai INT NOT NULL,
  tgl_produksi DATE NOT NULL,
  modal INT NOT NULL,
  FOREIGN KEY (id_mesin) REFERENCES tb_mesin(id_mesin),
  FOREIGN KEY (id_pegawai) REFERENCES tb_pegawai(id_pegawai),
);

CREATE TABLE tb_buku (
  id_buku INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_produksi INT NOT NULL,
  id_kategori INT NOT NULL,
  judul VARCHAR(255) NOT NULL,
  harga INT NOT NULL,
  stok INT NOT NULL,
  FOREIGN KEY (id_produksi) REFERENCES tb_produksi(id_produksi),
  FOREIGN KEY (id_kategori) REFERENCES tb_kategori(id_kategori)
);

CREATE TABLE tb_kategori (
  id_kategori INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nama_kategori VARCHAR(255) NOT NULL
);

CREATE TABLE tb_admin (
  id_admin INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL, 
  passwd VARCHAR(255) NOT NULL, 
  email VARCHAR(255) NOT NULL
);

CREATE TABLE tb_toko (
  id_toko INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nama_toko VARCHAR(255) NOT NULL, 
  alamat VARCHAR(255) NOT NULL, 
  no_telp VARCHAR(12) NOT NULL
);

CREATE TABLE tb_pengiriman (
  id_pengiriman INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  tujuan VARCHAR(255) NOT NULL,
  waktu_pengiriman DATE NOT NULL,
  waktu_diterima DATE,
  ongkir INT NOT NULL
);

CREATE TABLE tb_transaksi_distribusi (
  id_transaksi_distribusi INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_admin INT NOT NULL,
  id_toko INT NOT NULL,
  id_pengiriman INT NOT NULL,
  total_harga INT NOT NULL,
  tgl_transaksi DATE NOT NULL, 
  FOREIGN KEY (id_admin) REFERENCES tb_admin(id_admin),
  FOREIGN KEY (id_toko) REFERENCES tb_toko(id_toko),
  FOREIGN KEY (id_pengiriman) REFERENCES tb_pengiriman(id_pengiriman)
);

CREATE TABLE tb_detail_transaksi_distribusi (
  id_detail_transaksi_distribusi INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_buku INT NOT NULL,
  id_transaksi_distribusi INT NOT NULL,
  jumlah INT NOT NULL,
  FOREIGN KEY (id_buku) REFERENCES tb_buku(id_buku),
  FOREIGN KEY (id_transaksi_distribusi) REFERENCES tb_transaksi_distribusi(id_transaksi_distribusi)
);