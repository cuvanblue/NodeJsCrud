-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 12, 2023 at 10:02 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bumbumtest`
--

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230417012840-create-user.js');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `address`, `createdAt`, `updatedAt`) VALUES
(1, 'nguyen', 'nal', 'nguyennam@gmail.com', '25 thanh cong ba dinh h', '2023-04-17 11:35:29', '2023-04-17 11:35:29'),
(2, 'thanh', 'nam', 'namthanh@gmail.com', 'heheh', '2023-04-17 11:37:03', '2023-04-17 11:37:03'),
(3, 'cong', 'dinh', 'congdinh@gmail.com', 'tuong mai hn', '2023-04-17 11:38:04', '2023-04-17 11:38:04'),
(4, 'bumbum', 'bombom', 'abc@gmail.com', 'ha noi api', '2023-04-19 16:22:58', '2023-04-19 16:22:58'),
(20, 'sdfgdsfg', 'gsdgf', 'sgdfdg@gmail.com', 'gsdsgsgd', '2023-06-28 15:05:10', '2023-06-28 15:05:10');

-- --------------------------------------------------------

--
-- Table structure for table `user_image_upload`
--

CREATE TABLE `user_image_upload` (
  `img_id` varchar(50) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  `id` int(11) NOT NULL,
  `type` varchar(50) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  `dateadd` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_image_upload`
--

INSERT INTO `user_image_upload` (`img_id`, `id`, `type`, `dateadd`) VALUES
('avatar-1683344125936.jpg', 1, 'picture', '2023-05-06 10:35:25'),
('avatar-1683346073607.png', 1, 'avatar', '2023-05-06 11:07:53'),
('avatar-1683628353214.jpg', 2, 'picture', '2023-05-09 17:32:33'),
('avatar-1687939553786.jpg', 20, 'avatar', '2023-06-28 15:05:53'),
('multiple_pictures-1683625627614.jpg', 2, 'picture', '2023-05-09 16:47:07'),
('multiple_pictures-1683625637494.jpg', 2, 'avatar', '2023-05-09 16:47:17'),
('multiple_pictures-1683625637555.jpg', 2, 'picture', '2023-05-09 16:47:17'),
('multiple_pictures-1683637286448.jpg', 2, 'picture', '2023-05-09 20:01:26'),
('multiple_pictures-1683637286459.jpg', 2, 'picture', '2023-05-09 20:01:26'),
('multiple_pictures-1683637286461.jpg', 2, 'picture', '2023-05-09 20:01:26'),
('multiple_pictures-1683637286519.jpg', 2, 'picture', '2023-05-09 20:01:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_image_upload`
--
ALTER TABLE `user_image_upload`
  ADD PRIMARY KEY (`img_id`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_image_upload`
--
ALTER TABLE `user_image_upload`
  ADD CONSTRAINT `user_image_upload_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
