
SELECT tb_pegawai.id_pegawai, tb_pegawai.nama_pegawai, tb_jadwal_pegawai.tgl_kerja, tb_jadwal_pegawai.shift
FROM tb_jadwal_pegawai
INNER JOIN tb_pegawai ON tb_pegawai.id_pegawai = tb_jadwal_pegawai.id_pegawai
WHERE tb_jadwal_pegawai.tgl_kerja = '2023-1-10' AND tb_jadwal_pegawai.shift = 'Malam';

-------------------------------------------------------------------------------------------

SELECT tb_buku.id_buku, tb_produksi.id_produksi, tb_buku.judul, tb_produksi.modal
FROM tb_buku
INNER JOIN tb_produksi ON tb_buku.id_produksi = tb_produksi.id_produksi
ORDER BY modal DESC
LIMIT 3

--------------------------------------------------------------------------------------------

~?
SELECT id_kategori, tgl_transaksi, total_harga
FROM (
	SELECT tb_buku.id_buku, tb_buku.id_kategori, tb_detail_transaksi_distribusi.id_detail_transaksi_distribusi
    FROM tb_detail_transaksi_distribusi
    INNER JOIN tb_buku ON tb_detail_transaksi_distribusi.id_buku = tb_buku.id_buku
) as detail
INNER JOIN tb_transaksi_distribusi ON tb_transaksi_distribusi.id_transaksi_distribusi = detail.id_detail_transaksi_distribusi
WHERE MONTH(tgl_transaksi) = 3 AND id_kategori = 1
ORDER BY tgl_transaksi;
~?

SELECT 
	tb_kategori.id_kategori,
	tb_kategori.nama_kategori,
    tb_buku.judul, 
    SUM(tb_detail_transaksi_distribusi.jumlah) AS total_terjual,
    SUM(tb_detail_transaksi_distribusi.jumlah * tb_buku.harga) as total_harga_penjualan
FROM tb_buku
INNER JOIN tb_kategori ON tb_buku.id_kategori = tb_kategori.id_kategori
INNER JOIN tb_detail_transaksi_distribusi ON tb_buku.id_buku = tb_detail_transaksi_distribusi.id_buku
INNER JOIN tb_transaksi_distribusi ON tb_detail_transaksi_distribusi.id_transaksi_distribusi = tb_transaksi_distribusi.id_transaksi_distribusi
WHERE 
	tb_kategori.id_kategori = 5 AND
    -- tb_kategori.nama_kategori = 'Fiksi' AND
    MONTH(tb_transaksi_distribusi.tgl_transaksi) = '1'
GROUP BY 
    tb_buku.id_buku
ORDER BY 
    total_terjual DESC


/* JOIN untuk menghitung harga detail bahan baku*/
SELECT tb_detail_bahan_baku.id_detail_bahan_baku, tb_detail_bahan_baku.id_bahan_baku, tb_detail_bahan_baku.id_produksi, tb_detail_bahan_baku.jumlah, tb_bahan_baku.harga,
tb_detail_bahan_baku.jumlah * tb_bahan_baku.harga AS total_harga
FROM tb_detail_bahan_baku
INNER JOIN tb_bahan_baku
ON tb_detail_bahan_baku.id_bahan_baku = tb_bahan_baku.id_bahan_baku
ORDER BY id_detail_bahan_baku

/* JOIN untuk menghitung modal produksi */
SELECT tb_detail_bahan_baku.id_detail_bahan_baku, tb_detail_bahan_baku.id_bahan_baku, tb_detail_bahan_baku.id_produksi, SUM(tb_detail_bahan_baku.jumlah * tb_bahan_baku.harga) AS total_harga
FROM tb_detail_bahan_baku
INNER JOIN tb_bahan_baku
ON tb_detail_bahan_baku.id_bahan_baku = tb_bahan_baku.id_bahan_baku
GROUP BY tb_detail_bahan_baku.id_produksi
ORDER BY tb_detail_bahan_baku.id_produksi

/* JOIN buku ke dt_distrinbusi untuk mengetahui harga buku */
SELECT 
    tb_detail_transaksi_distribusi.id_detail_transaksi_distribusi, 
    tb_detail_transaksi_distribusi.id_transaksi_distribusi, 
    tb_detail_transaksi_distribusi.id_buku,
    tb_buku.harga, 
    tb_detail_transaksi_distribusi.jumlah,
    tb_buku.harga * tb_detail_transaksi_distribusi.jumlah AS total_harga
FROM tb_detail_transaksi_distribusi
INNER JOIN tb_buku ON tb_detail_transaksi_distribusi.id_buku = tb_buku.id_buku
ORDER BY id_transaksi_distribusi

/* JOIN ?*/
SELECT 
    tb_detail_transaksi_distribusi.id_transaksi_distribusi, 
    SUM(tb_buku.harga * tb_detail_transaksi_distribusi.jumlah) AS total_harga
FROM tb_detail_transaksi_distribusi
INNER JOIN tb_buku ON tb_detail_transaksi_distribusi.id_buku = tb_buku.id_buku
GROUP BY tb_detail_transaksi_distribusi.id_transaksi_distribusi
ORDER BY tb_detail_transaksi_distribusi.id_transaksi_distribusi
