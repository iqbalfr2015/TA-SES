-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 29 Bulan Mei 2025 pada 11.22
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ujian-ses`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `hasil_ujian`
--

CREATE TABLE `hasil_ujian` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `soal_id` bigint(20) UNSIGNED NOT NULL,
  `jawaban_diberikan` text NOT NULL,
  `nilai` decimal(5,2) DEFAULT NULL,
  `status_koreksi` enum('pending','dikoreksi') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `jawabans`
--

CREATE TABLE `jawabans` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `soal_id` bigint(20) UNSIGNED NOT NULL,
  `jawaban` text NOT NULL,
  `benar` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `jawabans`
--

INSERT INTO `jawabans` (`id`, `soal_id`, `jawaban`, `benar`, `created_at`, `updated_at`) VALUES
(174, 47, 'Jakarta', 1, '2025-03-16 18:16:46', '2025-03-16 18:16:46'),
(175, 48, '4', 1, '2025-03-16 18:16:46', '2025-03-16 18:16:46'),
(176, 49, 'Jakarta', 1, '2025-03-16 18:42:52', '2025-03-16 18:42:52'),
(177, 49, 'Bandung', 0, '2025-03-16 18:42:52', '2025-03-16 18:42:52'),
(178, 49, 'Surabaya', 0, '2025-03-16 18:42:52', '2025-03-16 18:42:52'),
(179, 49, 'Medan', 0, '2025-03-16 18:42:52', '2025-03-16 18:42:52'),
(180, 50, '3', 0, '2025-03-16 18:42:52', '2025-03-16 18:42:52'),
(181, 50, '4', 1, '2025-03-16 18:42:52', '2025-03-16 18:42:52'),
(182, 50, '5', 0, '2025-03-16 18:42:52', '2025-03-16 18:42:52'),
(183, 50, '6', 0, '2025-03-16 18:42:52', '2025-03-16 18:42:52'),
(184, 51, 'True', 0, '2025-03-16 18:44:25', '2025-03-16 18:44:25'),
(185, 51, 'False', 1, '2025-03-16 18:44:25', '2025-03-16 18:44:25'),
(186, 52, 'True', 0, '2025-03-16 18:44:25', '2025-03-16 18:44:25'),
(187, 52, 'False', 1, '2025-03-16 18:44:25', '2025-03-16 18:44:25'),
(188, 53, 'Object-Oriented Programming (OOP) adalah paradigma pemrograman yang berfokus pada objek. Dalam OOP, program dibangun dengan membuat dan mengelola objek yang memiliki atribut (data) dan method (fungsi atau perilaku).', 1, '2025-03-16 18:44:51', '2025-03-16 18:44:51'),
(189, 54, 'Database relasional adalah jenis database yang menyimpan dan mengelola data dalam bentuk tabel yang memiliki hubungan satu sama lain. ', 1, '2025-03-16 18:44:51', '2025-03-16 18:44:51'),
(190, 55, 'true', 1, '2025-03-17 20:21:04', '2025-03-17 20:21:04'),
(191, 55, 'false', 0, '2025-03-17 20:21:04', '2025-03-17 20:21:04'),
(192, 56, 'kucing', 1, '2025-03-17 20:23:30', '2025-03-17 20:23:30'),
(193, 56, 'ayam', 0, '2025-03-17 20:23:30', '2025-03-17 20:23:30'),
(194, 56, 'gajah', 0, '2025-03-17 20:23:30', '2025-03-17 20:23:30'),
(195, 56, 'semut', 0, '2025-03-17 20:23:30', '2025-03-17 20:23:30'),
(197, 57, 'kondensasi', 1, '2025-03-17 20:27:28', '2025-03-17 20:27:28'),
(199, 58, 'Teori Pythagoras adalah sebuah prinsip dalam geometri yang menyatakan bahwa dalam segitiga siku-siku, kuadrat panjang sisi miring (hipotenusa) sama dengan jumlah kuadrat panjang kedua sisi lainnya.', 1, '2025-03-17 20:29:53', '2025-03-17 20:29:53'),
(205, 63, 'A', 0, '2025-03-17 20:53:11', '2025-03-17 20:53:11'),
(206, 63, 'B', 1, '2025-03-17 20:53:11', '2025-03-17 20:53:11'),
(207, 63, 'C', 0, '2025-03-17 20:53:11', '2025-03-17 20:53:11'),
(208, 63, 'D', 0, '2025-03-17 20:53:11', '2025-03-17 20:53:11'),
(209, 64, 'kelinci', 1, '2025-03-17 20:55:26', '2025-03-17 20:55:26'),
(210, 64, 'ayam', 0, '2025-03-17 20:55:26', '2025-03-17 20:55:26'),
(211, 64, 'tikus', 0, '2025-03-17 20:55:26', '2025-03-17 20:55:26'),
(212, 64, 'hiu', 0, '2025-03-17 20:55:26', '2025-03-17 20:55:26'),
(213, 65, 'True', 0, '2025-03-17 21:48:23', '2025-03-17 21:48:23'),
(214, 65, 'False', 1, '2025-03-17 21:48:23', '2025-03-17 21:48:23'),
(215, 66, 'True', 0, '2025-03-17 21:48:23', '2025-03-17 21:48:23'),
(216, 66, 'False', 1, '2025-03-17 21:48:23', '2025-03-17 21:48:23'),
(217, 67, 'tokyo', 1, '2025-04-20 21:23:50', '2025-04-20 21:23:50'),
(218, 67, 'jakarta', 0, '2025-04-20 21:23:50', '2025-04-20 21:23:50'),
(219, 67, 'bandung', 0, '2025-04-20 21:23:50', '2025-04-20 21:23:50'),
(220, 67, 'surabaya', 0, '2025-04-20 21:23:50', '2025-04-20 21:23:50');

-- --------------------------------------------------------

--
-- Struktur dari tabel `jawaban_peserta`
--

CREATE TABLE `jawaban_peserta` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `peserta_id` bigint(20) UNSIGNED NOT NULL,
  `ujian_id` bigint(20) UNSIGNED NOT NULL,
  `soal_id` bigint(20) UNSIGNED NOT NULL,
  `jawaban_id` bigint(20) UNSIGNED DEFAULT NULL,
  `jawaban_text` text DEFAULT NULL,
  `benar` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `jawaban_peserta`
--

INSERT INTO `jawaban_peserta` (`id`, `peserta_id`, `ujian_id`, `soal_id`, `jawaban_id`, `jawaban_text`, `benar`, `created_at`, `updated_at`) VALUES
(177, 12, 9, 55, 190, NULL, 0, '2025-04-12 10:44:49', '2025-04-12 10:44:49'),
(178, 12, 9, 56, 192, NULL, 1, '2025-04-12 10:44:49', '2025-04-12 10:44:49'),
(179, 12, 9, 57, NULL, 'kondensasiiii', 0, '2025-04-12 10:44:50', '2025-04-12 10:44:50'),
(180, 12, 9, 58, NULL, 'Teori Pythagoras adalah salah satu prinsip dasar dalam geometri yang berkaitan dengan segitiga siku-siku.', 0, '2025-04-12 10:44:51', '2025-04-12 10:44:51'),
(181, 12, 9, 63, 208, NULL, 0, '2025-04-12 10:44:51', '2025-04-12 10:44:51'),
(182, 12, 9, 64, 210, NULL, 0, '2025-04-12 10:44:51', '2025-04-12 10:44:51');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kewenangans`
--

CREATE TABLE `kewenangans` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `staff_id` bigint(20) UNSIGNED NOT NULL,
  `value` varchar(255) NOT NULL,
  `status` enum('aktif','tidak_aktif') NOT NULL DEFAULT 'aktif',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `kewenangans`
--

INSERT INTO `kewenangans` (`id`, `staff_id`, `value`, `status`, `created_at`, `updated_at`) VALUES
(16, 6, 'peserta', 'aktif', '2025-03-02 11:05:35', '2025-03-02 11:05:35'),
(17, 6, 'paket_soal', 'aktif', '2025-03-02 11:05:35', '2025-03-02 11:05:35'),
(18, 6, 'sesi', 'tidak_aktif', '2025-03-02 11:05:35', '2025-03-02 11:05:35'),
(19, 6, 'pengawas', 'tidak_aktif', '2025-03-02 11:05:35', '2025-03-02 11:05:35'),
(36, 11, 'peserta', 'tidak_aktif', '2025-03-02 14:36:48', '2025-03-02 19:06:06'),
(37, 11, 'paket_soal', 'tidak_aktif', '2025-03-02 14:36:48', '2025-03-02 14:36:48'),
(38, 11, 'sesi', 'aktif', '2025-03-02 14:36:48', '2025-03-02 14:36:48'),
(39, 11, 'pengawas', 'aktif', '2025-03-02 14:36:48', '2025-03-02 14:36:48');

-- --------------------------------------------------------

--
-- Struktur dari tabel `lembagas`
--

CREATE TABLE `lembagas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama_lembaga` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `kabupaten` varchar(255) NOT NULL,
  `jenis` enum('SD/Sederajat','SMP/Sederajat','SMA/Sederajat','Perguruan Tinggi','Perusahaan') NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `whatsapp` varchar(255) NOT NULL,
  `nama_lengkap` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `lembagas`
--

INSERT INTO `lembagas` (`id`, `nama_lembaga`, `alamat`, `kabupaten`, `jenis`, `username`, `email`, `whatsapp`, `nama_lengkap`, `user_id`, `created_at`, `updated_at`) VALUES
(2, 'SMAN 1 SUKOHARJO', 'Jl.Soloraya no.98', 'KABUPATEN SUKOHARJO', 'SMA/Sederajat', 'smansakhj22', 'iqbalfarhanrasyid@gmail.com', '0812384778383', 'Iqbal Farhan Rasyid', 7, '2025-03-02 11:04:45', '2025-03-02 11:04:45');

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(13, '2014_10_12_000000_create_users_table', 1),
(14, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(15, '2019_08_19_000000_create_failed_jobs_table', 1),
(16, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(17, '2025_02_26_035228_create_lembagas_table', 1),
(18, '2025_02_26_035403_create_staff_table', 1),
(20, '2025_03_02_215941_create_pesertas_table', 2),
(31, '2025_03_04_021706_create_paket_soals_table', 3),
(32, '2025_03_04_025419_create_soals_table', 3),
(33, '2025_03_04_025518_create_jawabans_table', 3),
(34, '2025_03_04_025546_create_hasil_ujians_table', 3),
(35, '2025_03_04_025921_create_jawaban_pesertas_table', 3),
(36, '2025_03_08_125941_create_soals_table', 4),
(39, '2025_03_09_215241_create_sesi_ujians_table', 5),
(41, '2025_03_11_024711_create_sesi_pesertas_table', 6),
(42, '2025_03_17_025337_create_streamings_table', 7),
(44, '2025_03_19_025810_create_jawaban_pesertas_table', 8),
(45, '2025_03_25_041017_add_skor_to_jawaban_peserta_table', 9);

-- --------------------------------------------------------

--
-- Struktur dari tabel `paket_soals`
--

CREATE TABLE `paket_soals` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `lembaga_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `materi` varchar(255) NOT NULL,
  `skala_nilai` int(11) NOT NULL,
  `kkm` int(11) NOT NULL,
  `acak_soal` tinyint(1) NOT NULL DEFAULT 0,
  `acak_jawaban` tinyint(1) NOT NULL DEFAULT 0,
  `petunjuk_pengerjaan` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `paket_soals`
--

INSERT INTO `paket_soals` (`id`, `lembaga_id`, `user_id`, `name`, `materi`, `skala_nilai`, `kkm`, `acak_soal`, `acak_jawaban`, `petunjuk_pengerjaan`, `created_at`, `updated_at`) VALUES
(6, 2, 7, 'Bahasa Inggris', 'Kata Kerja', 100, 75, 1, 1, '<ol><li><p>1. Sistem akan mendeteksi pergerakan mencurigakan melalui kamera dan AI proctoring.</p><p>2. Jika wajah tidak terdeteksi atau Anda mengalihkan pandangan terlalu lama, sistem akan memberikan peringatan otomatis.</p><p>3. Setiap aktivitas yang mencurigakan akan direkam dan diperiksa oleh panitia ujian.</p><p>4. Jika terdeteksi kecurangan, ujian dapat dibatalkan dan peserta didiskualifikasi.</p></li></ol>', '2025-03-11 20:30:39', '2025-03-11 20:30:39'),
(7, 2, 7, 'Bahasa Indonesia', 'pantun', 100, 70, 1, 1, '<ol><li><p>1. Sistem akan mendeteksi pergerakan mencurigakan melalui kamera dan AI proctoring.</p><p>2. Jika wajah tidak terdeteksi atau Anda mengalihkan pandangan terlalu lama, sistem akan memberikan peringatan otomatis.</p><p>3. Setiap aktivitas yang mencurigakan akan direkam dan diperiksa oleh panitia ujian.</p><p>4. Jika terdeteksi kecurangan, ujian dapat dibatalkan dan peserta didiskualifikasi.</p></li></ol>', '2025-03-17 20:20:26', '2025-03-17 20:20:26'),
(8, 2, 7, 'Iqbal Farhan Rasyid', 'adsfdg', 100, 75, 1, 0, '<ol><li><p>1. Sistem akan mendeteksi pergerakan mencurigakan melalui kamera dan AI proctoring.</p><p>2. Jika wajah tidak terdeteksi atau Anda mengalihkan pandangan terlalu lama, sistem akan memberikan peringatan otomatis.</p><p>3. Setiap aktivitas yang mencurigakan akan direkam dan diperiksa oleh panitia ujian.</p><p>4. Jika terdeteksi kecurangan, ujian dapat dibatalkan dan peserta didiskualifikasi.</p></li></ol>', '2025-03-17 21:47:49', '2025-03-17 21:47:49'),
(9, 2, 7, 'Bahasa Jepang', 'Koniciwa', 100, 75, 1, 0, '<p>1.tidak boleh mencontek</p><ol start=\"2\"><li><p>2.harus jujur</p></li></ol>', '2025-04-20 21:20:56', '2025-04-20 21:20:56');

-- --------------------------------------------------------

--
-- Struktur dari tabel `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `password_reset_tokens`
--

INSERT INTO `password_reset_tokens` (`email`, `token`, `created_at`) VALUES
('iqbalfrmlbb77@gmail.com', '$2y$12$12hQQjjmF9BBM6lOYcm9lu6X0DsF2jI3F5sz/CWT6aT/qZPHfi7eK', '2025-03-16 20:30:23');

-- --------------------------------------------------------

--
-- Struktur dari tabel `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pesertas`
--

CREATE TABLE `pesertas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `lembaga_id` bigint(20) UNSIGNED NOT NULL,
  `nama_peserta` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `no_peserta` varchar(255) NOT NULL,
  `kelompok` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `pesertas`
--

INSERT INTO `pesertas` (`id`, `user_id`, `lembaga_id`, `nama_peserta`, `email`, `no_peserta`, `kelompok`, `created_at`, `updated_at`) VALUES
(11, 32, 2, 'muhamad ragil', 'ragil@gmail.com', '00000001', 'TIB', '2025-03-02 22:57:14', '2025-03-02 22:57:14'),
(12, 33, 2, 'simon ', 'iqbalfrmlbb@gmail.com', '00000012', 'TIB', '2025-03-02 22:57:17', '2025-03-02 22:57:17'),
(13, 34, 2, 'claudia', 'claudia@gmail.com', '00000013', 'TIA', '2025-03-02 22:57:19', '2025-03-02 22:57:19'),
(14, 35, 2, 'afkar tri', 'mafkartriw@gmail.com', '00000014', 'TIC', '2025-03-02 23:13:04', '2025-03-02 23:13:04');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sesi_pesertas`
--

CREATE TABLE `sesi_pesertas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sesi_id` bigint(20) UNSIGNED NOT NULL,
  `peserta_id` bigint(20) UNSIGNED NOT NULL,
  `status` enum('aktif','non_aktif') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `sesi_pesertas`
--

INSERT INTO `sesi_pesertas` (`id`, `sesi_id`, `peserta_id`, `status`, `created_at`, `updated_at`) VALUES
(12, 9, 11, 'aktif', '2025-03-16 18:50:58', '2025-03-16 18:50:58'),
(13, 9, 12, 'aktif', '2025-03-16 18:50:58', '2025-03-16 18:50:58'),
(14, 10, 13, 'aktif', '2025-03-16 19:49:57', '2025-03-16 19:49:57'),
(15, 10, 14, 'aktif', '2025-03-16 19:49:57', '2025-03-16 19:49:57'),
(16, 11, 11, 'aktif', '2025-03-16 21:40:39', '2025-03-16 21:40:39'),
(17, 11, 12, 'aktif', '2025-03-16 21:40:39', '2025-03-16 21:40:39'),
(18, 11, 13, 'aktif', '2025-03-16 21:40:39', '2025-03-16 21:40:39'),
(19, 11, 14, 'aktif', '2025-03-16 21:40:39', '2025-03-16 21:40:39'),
(20, 12, 11, 'aktif', '2025-04-20 21:27:34', '2025-04-20 21:27:34'),
(21, 12, 12, 'aktif', '2025-04-20 21:27:34', '2025-04-20 21:27:34'),
(22, 12, 13, 'aktif', '2025-04-20 21:27:34', '2025-04-20 21:27:34'),
(23, 12, 14, 'aktif', '2025-04-20 21:27:34', '2025-04-20 21:27:34');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sesi_ujians`
--

CREATE TABLE `sesi_ujians` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `paket_soal_id` bigint(20) UNSIGNED NOT NULL,
  `nama_sesi_ujian` varchar(255) NOT NULL,
  `mode_peserta` enum('Semua','Kelompok Peserta','Manual') NOT NULL,
  `kelas_kelompok` varchar(255) NOT NULL,
  `tanggal_pelaksanaan` date NOT NULL,
  `waktu_mulai` time NOT NULL,
  `waktu_pengerjaan` int(11) NOT NULL,
  `wajib_kamera` enum('ya','tidak') NOT NULL,
  `batasi_browser` enum('ya','tidak') NOT NULL,
  `tampilkan_hasil` enum('ya','tidak') NOT NULL,
  `tampilkan_pembahasan` enum('ya','tidak') NOT NULL,
  `gunakan_sertifikat` enum('ya','tidak') NOT NULL,
  `petunjuk_pengerjaan` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `sesi_ujians`
--

INSERT INTO `sesi_ujians` (`id`, `paket_soal_id`, `nama_sesi_ujian`, `mode_peserta`, `kelas_kelompok`, `tanggal_pelaksanaan`, `waktu_mulai`, `waktu_pengerjaan`, `wajib_kamera`, `batasi_browser`, `tampilkan_hasil`, `tampilkan_pembahasan`, `gunakan_sertifikat`, `petunjuk_pengerjaan`, `created_at`, `updated_at`) VALUES
(9, 7, 'UAS Semeseter Gasal 2025', 'Kelompok Peserta', 'TIB', '2025-03-25', '14:50:00', 120, 'ya', 'ya', 'ya', 'ya', 'ya', 'tes', '2025-03-16 18:50:58', '2025-03-16 18:50:58'),
(10, 6, 'Ujian Harian Fisika Kelas', 'Manual', '-', '2025-03-17', '15:49:00', 60, 'tidak', 'tidak', 'ya', 'ya', 'tidak', 'oke', '2025-03-16 19:49:57', '2025-03-16 19:49:57'),
(11, 6, 'UTBK 2025', 'Semua', '-', '2025-03-17', '16:40:00', 90, 'ya', 'tidak', 'ya', 'tidak', 'ya', 'oke', '2025-03-16 21:40:39', '2025-03-16 21:40:39'),
(12, 9, 'Kuis bahasa jepang', 'Semua', '-', '2025-04-24', '13:26:00', 120, 'ya', 'tidak', 'ya', 'tidak', 'ya', 'harus jujur', '2025-04-20 21:27:34', '2025-04-20 21:27:34');

-- --------------------------------------------------------

--
-- Struktur dari tabel `soals`
--

CREATE TABLE `soals` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `paket_soal_id` bigint(20) UNSIGNED NOT NULL,
  `pertanyaan` text NOT NULL,
  `tipe` enum('pilihan_ganda','true_false','gambar','isian','esai') NOT NULL,
  `metode_koreksi` varchar(255) DEFAULT NULL,
  `media` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `soals`
--

INSERT INTO `soals` (`id`, `paket_soal_id`, `pertanyaan`, `tipe`, `metode_koreksi`, `media`, `created_at`, `updated_at`) VALUES
(47, 6, 'Ibukota Indonesia adalah?', 'isian', 'exact', NULL, '2025-03-16 18:16:46', '2025-03-16 18:16:46'),
(48, 6, 'Hasil dari 2 + 2 adalah?', 'isian', 'exact', NULL, '2025-03-16 18:16:46', '2025-03-16 18:16:46'),
(49, 6, 'Apa ibu kota Indonesia?', 'pilihan_ganda', NULL, NULL, '2025-03-16 18:42:52', '2025-03-16 18:42:52'),
(50, 6, '2 + 2 = ?', 'pilihan_ganda', NULL, NULL, '2025-03-16 18:42:52', '2025-03-16 18:42:52'),
(51, 6, 'Apakah bumi itu bulat?', 'true_false', NULL, NULL, '2025-03-16 18:44:25', '2025-03-16 18:44:25'),
(52, 6, 'Matahari terbit dari barat?', 'true_false', NULL, NULL, '2025-03-16 18:44:25', '2025-03-16 18:44:25'),
(53, 6, 'Jelaskan konsep OOP dalam pemrograman!', 'esai', 'ai', NULL, '2025-03-16 18:44:51', '2025-03-16 18:44:51'),
(54, 6, 'Apa yang dimaksud dengan database relasional?', 'esai', 'ai', NULL, '2025-03-16 18:44:51', '2025-03-16 18:44:51'),
(55, 7, 'ikan itu hidup dilaut', 'true_false', NULL, NULL, '2025-03-17 20:21:04', '2025-03-17 20:21:04'),
(56, 7, 'pada gambar di video tersebut apa', 'pilihan_ganda', NULL, 'soal_media/hVthIWEdJHXb38lGCTzqPkSDxbHcbluS0I83Gixx.jpg', '2025-03-17 20:23:30', '2025-03-17 20:23:30'),
(57, 7, 'proses pengembunan dalam proses terjadinya awan adalah..', 'isian', 'exact', NULL, '2025-03-17 20:27:18', '2025-03-17 20:27:18'),
(58, 7, 'apa yang dimaksud dengan teori phytagoras', 'esai', 'ai', NULL, '2025-03-17 20:29:44', '2025-03-17 20:29:44'),
(63, 7, 'listen to the audio above..', 'pilihan_ganda', NULL, 'soal_media/kwL66jKAoUZw9y6entghslszJ4zMA399kJ4jQP9Z.mp3', '2025-03-17 20:53:11', '2025-03-17 20:53:11'),
(64, 7, 'gambar apa dalam video diatas', 'pilihan_ganda', NULL, 'soal_media/JDSfT6FR7bTGp7HH4YRjoXnP5dMJtnhfr5vRleu5.mp4', '2025-03-17 20:55:26', '2025-03-17 20:55:26'),
(65, 8, 'Apakah bumi itu bulat?', 'true_false', NULL, NULL, '2025-03-17 21:48:23', '2025-03-17 21:48:23'),
(66, 8, 'Matahari terbit dari barat?', 'true_false', NULL, NULL, '2025-03-17 21:48:23', '2025-03-17 21:48:23'),
(67, 9, 'Ibu kota jepang?', 'pilihan_ganda', NULL, 'soal_media/wxopa5j30CcNju3ub5HcB4TkqvwNGFDwTFVdYlLJ.jpg', '2025-04-20 21:23:50', '2025-04-20 21:23:50');

-- --------------------------------------------------------

--
-- Struktur dari tabel `staff`
--

CREATE TABLE `staff` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `lembaga_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `nama_staff` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `staff`
--

INSERT INTO `staff` (`id`, `lembaga_id`, `user_id`, `nama_staff`, `email`, `created_at`, `updated_at`) VALUES
(6, 2, 8, 'Afkar Triwardana', 'iqfarryd@gmail.com', '2025-03-02 11:05:35', '2025-03-02 11:05:35'),
(11, 2, 13, 'Habib Shohiburrotib', 'shohiburr23@gmail.com', '2025-03-02 14:36:48', '2025-03-02 14:36:48');

-- --------------------------------------------------------

--
-- Struktur dari tabel `streamings`
--

CREATE TABLE `streamings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sesi_peserta_id` bigint(20) UNSIGNED NOT NULL,
  `stream_url` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','lembaga','staff','peserta') NOT NULL,
  `google_id` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `google_id`, `remember_token`, `created_at`, `updated_at`) VALUES
(7, 'Iqbal Farhan Rasyid', 'iqbalfarhanrasyid@gmail.com', NULL, '$2y$12$q0pIKrhpor7fd1Eu3zVvruNHCe7WzVhIfPH0FSb9iB/rRBbvVuCpS', 'lembaga', '118034912633846239045', NULL, '2025-03-02 11:04:45', '2025-03-08 04:24:58'),
(8, 'Afkar Triwardana', 'iqfarryd@gmail.com', NULL, '$2y$12$YP5UNXi1N3T6xoauNhy7v.Of1K.CGXj3pa4t/iemSeOHRg5ijNX2y', 'staff', '103997283389395150115', NULL, '2025-03-02 11:05:35', '2025-03-18 20:16:04'),
(13, 'Habib Shohiburrotib', 'shohiburr23@gmail.com', NULL, '$2y$12$8aW7qiROzZVaXfbUD.g.E.Dj2ipU4Bws9em/C3FXY/DYnn1YLgWQe', 'staff', NULL, NULL, '2025-03-02 14:36:48', '2025-03-02 14:36:48'),
(32, 'muhamad ragil', 'ragil@gmail.com', NULL, '$2y$12$99BCrwY5cqlJHMsRrD0mquCbJh6ebVui6klXOjVSak1VHhXM3XWly', 'peserta', NULL, NULL, '2025-03-02 22:57:14', '2025-03-02 22:57:14'),
(33, 'simon ', 'iqbaljava76@gmail.com', NULL, '$2y$12$Oo.B0Djp4Jk.YZ94mdOp8.xvkfRnXfF6dbHmkKmbuUsI3n1lc0s5C', 'peserta', '114367923425724566559', NULL, '2025-03-02 22:57:17', '2025-03-16 20:32:03'),
(34, 'claudia', 'claudia@gmail.com', NULL, '$2y$12$2BgptzTchwigMGL8J8RjAuPcEBy2AFbsgZoRomJjgfhz8N3NXr9qG', 'peserta', NULL, NULL, '2025-03-02 22:57:19', '2025-03-02 22:57:19'),
(35, 'afkar tri', 'mafkartriw@gmail.com', NULL, '$2y$12$egCSnNAE/G4zxnpTpWVMtOTRNJjeIRsFZ52rTglqNZOFw0YxhQsO2', 'peserta', NULL, NULL, '2025-03-02 23:13:04', '2025-03-02 23:13:04');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indeks untuk tabel `hasil_ujian`
--
ALTER TABLE `hasil_ujian`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hasil_ujian_user_id_foreign` (`user_id`),
  ADD KEY `hasil_ujian_soal_id_foreign` (`soal_id`);

--
-- Indeks untuk tabel `jawabans`
--
ALTER TABLE `jawabans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jawabans_soal_id_foreign` (`soal_id`);

--
-- Indeks untuk tabel `jawaban_peserta`
--
ALTER TABLE `jawaban_peserta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jawaban_peserta_peserta_id_foreign` (`peserta_id`),
  ADD KEY `jawaban_peserta_ujian_id_foreign` (`ujian_id`),
  ADD KEY `jawaban_peserta_soal_id_foreign` (`soal_id`),
  ADD KEY `jawaban_peserta_jawaban_id_foreign` (`jawaban_id`);

--
-- Indeks untuk tabel `kewenangans`
--
ALTER TABLE `kewenangans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kewenangans_staff_id_foreign` (`staff_id`);

--
-- Indeks untuk tabel `lembagas`
--
ALTER TABLE `lembagas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `lembagas_username_unique` (`username`),
  ADD UNIQUE KEY `lembagas_email_unique` (`email`),
  ADD KEY `lembagas_user_id_foreign` (`user_id`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `paket_soals`
--
ALTER TABLE `paket_soals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `paket_soals_lembaga_id_foreign` (`lembaga_id`),
  ADD KEY `paket_soals_user_id_foreign` (`user_id`);

--
-- Indeks untuk tabel `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indeks untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indeks untuk tabel `pesertas`
--
ALTER TABLE `pesertas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pesertas_email_unique` (`email`),
  ADD UNIQUE KEY `pesertas_no_peserta_unique` (`no_peserta`),
  ADD KEY `pesertas_user_id_foreign` (`user_id`),
  ADD KEY `pesertas_lembaga_id_foreign` (`lembaga_id`);

--
-- Indeks untuk tabel `sesi_pesertas`
--
ALTER TABLE `sesi_pesertas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sesi_pesertas_sesi_id_foreign` (`sesi_id`),
  ADD KEY `sesi_pesertas_peserta_id_foreign` (`peserta_id`);

--
-- Indeks untuk tabel `sesi_ujians`
--
ALTER TABLE `sesi_ujians`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sesi_ujians_paket_soal_id_foreign` (`paket_soal_id`);

--
-- Indeks untuk tabel `soals`
--
ALTER TABLE `soals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `soals_paket_soal_id_foreign` (`paket_soal_id`);

--
-- Indeks untuk tabel `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `staff_email_unique` (`email`),
  ADD KEY `staff_lembaga_id_foreign` (`lembaga_id`),
  ADD KEY `staff_user_id_foreign` (`user_id`);

--
-- Indeks untuk tabel `streamings`
--
ALTER TABLE `streamings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `streamings_sesi_peserta_id_foreign` (`sesi_peserta_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `hasil_ujian`
--
ALTER TABLE `hasil_ujian`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `jawabans`
--
ALTER TABLE `jawabans`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=221;

--
-- AUTO_INCREMENT untuk tabel `jawaban_peserta`
--
ALTER TABLE `jawaban_peserta`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=183;

--
-- AUTO_INCREMENT untuk tabel `kewenangans`
--
ALTER TABLE `kewenangans`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT untuk tabel `lembagas`
--
ALTER TABLE `lembagas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT untuk tabel `paket_soals`
--
ALTER TABLE `paket_soals`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `pesertas`
--
ALTER TABLE `pesertas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT untuk tabel `sesi_pesertas`
--
ALTER TABLE `sesi_pesertas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT untuk tabel `sesi_ujians`
--
ALTER TABLE `sesi_ujians`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT untuk tabel `soals`
--
ALTER TABLE `soals`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT untuk tabel `staff`
--
ALTER TABLE `staff`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `streamings`
--
ALTER TABLE `streamings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `hasil_ujian`
--
ALTER TABLE `hasil_ujian`
  ADD CONSTRAINT `hasil_ujian_soal_id_foreign` FOREIGN KEY (`soal_id`) REFERENCES `soals` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `hasil_ujian_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `jawabans`
--
ALTER TABLE `jawabans`
  ADD CONSTRAINT `jawabans_soal_id_foreign` FOREIGN KEY (`soal_id`) REFERENCES `soals` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `jawaban_peserta`
--
ALTER TABLE `jawaban_peserta`
  ADD CONSTRAINT `jawaban_peserta_jawaban_id_foreign` FOREIGN KEY (`jawaban_id`) REFERENCES `jawabans` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `jawaban_peserta_peserta_id_foreign` FOREIGN KEY (`peserta_id`) REFERENCES `pesertas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `jawaban_peserta_soal_id_foreign` FOREIGN KEY (`soal_id`) REFERENCES `soals` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `jawaban_peserta_ujian_id_foreign` FOREIGN KEY (`ujian_id`) REFERENCES `sesi_ujians` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `kewenangans`
--
ALTER TABLE `kewenangans`
  ADD CONSTRAINT `kewenangans_staff_id_foreign` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `lembagas`
--
ALTER TABLE `lembagas`
  ADD CONSTRAINT `lembagas_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `paket_soals`
--
ALTER TABLE `paket_soals`
  ADD CONSTRAINT `paket_soals_lembaga_id_foreign` FOREIGN KEY (`lembaga_id`) REFERENCES `lembagas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `paket_soals_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `pesertas`
--
ALTER TABLE `pesertas`
  ADD CONSTRAINT `pesertas_lembaga_id_foreign` FOREIGN KEY (`lembaga_id`) REFERENCES `lembagas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pesertas_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `sesi_pesertas`
--
ALTER TABLE `sesi_pesertas`
  ADD CONSTRAINT `sesi_pesertas_peserta_id_foreign` FOREIGN KEY (`peserta_id`) REFERENCES `pesertas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sesi_pesertas_sesi_id_foreign` FOREIGN KEY (`sesi_id`) REFERENCES `sesi_ujians` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `sesi_ujians`
--
ALTER TABLE `sesi_ujians`
  ADD CONSTRAINT `sesi_ujians_paket_soal_id_foreign` FOREIGN KEY (`paket_soal_id`) REFERENCES `paket_soals` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `soals`
--
ALTER TABLE `soals`
  ADD CONSTRAINT `soals_paket_soal_id_foreign` FOREIGN KEY (`paket_soal_id`) REFERENCES `paket_soals` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `staff`
--
ALTER TABLE `staff`
  ADD CONSTRAINT `staff_lembaga_id_foreign` FOREIGN KEY (`lembaga_id`) REFERENCES `lembagas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `staff_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `streamings`
--
ALTER TABLE `streamings`
  ADD CONSTRAINT `streamings_sesi_peserta_id_foreign` FOREIGN KEY (`sesi_peserta_id`) REFERENCES `sesi_pesertas` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
