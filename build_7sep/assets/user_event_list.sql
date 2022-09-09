-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 13, 2022 at 09:09 AM
-- Server version: 10.3.34-MariaDB-0ubuntu0.20.04.1
-- PHP Version: 7.3.33-1+focal

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ashom_admin`
--

-- --------------------------------------------------------

--
-- Table structure for table `user_event_list`
--

CREATE TABLE `user_event_list` (
  `id` int(11) NOT NULL,
  `event` varchar(255) NOT NULL DEFAULT '',
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_event_list`
--

INSERT INTO `user_event_list` (`id`, `event`, `created_at`) VALUES
(1, 'search_company', '2022-05-02 06:51:32'),
(2, 'view_ksa_company', '2022-05-02 06:51:48'),
(3, 'view_uae_company', '2022-05-02 06:51:52'),
(4, 'view_kuwait_company', '2022-05-02 06:52:01'),
(5, 'view_bahrain_company', '2022-05-02 06:52:07'),
(6, 'view_qatar_company', '2022-05-02 06:52:13'),
(7, 'view_oman_company', '2022-05-02 06:52:20'),
(8, 'view_countries_news', '2022-05-02 06:52:27'),
(9, 'view_ksa_news', '2022-05-02 06:52:34'),
(10, 'view_uae_news', '2022-05-02 06:52:40'),
(11, 'view_kuwait_news', '2022-05-02 06:52:45'),
(12, 'view_bahrain_news', '2022-05-02 06:52:50'),
(13, 'view_qatar_news', '2022-05-02 06:52:55'),
(14, 'view_oman_news', '2022-05-02 06:53:00'),
(15, 'news_share', '2022-05-02 06:53:06'),
(16, 'create_news_forum', '2022-05-02 06:53:13'),
(17, 'create_compose_forum', '2022-05-02 06:53:21'),
(18, 'create_poll_forum', '2022-05-02 06:53:26'),
(19, 'view_news_detail_click', '2022-05-02 06:53:34'),
(20, 'view_forum_detail_click', '2022-05-02 06:53:42'),
(21, 'company_page_view', '2022-05-02 06:53:50'),
(22, 'click_company_financial_statements', '2022-05-02 06:53:59'),
(23, 'click_company_news', '2022-05-02 06:54:05'),
(24, 'company_income_statement_view', '2022-05-02 06:54:13'),
(25, 'company_balance_sheet_view', '2022-05-02 06:54:19'),
(26, 'company_equity_statement_view', '2022-05-02 06:54:24'),
(27, 'company_cashflow_statement_view', '2022-05-02 06:54:30'),
(28, 'company_comprehensive_statement_view', '2022-05-02 06:54:36'),
(29, 'company_notes_view', '2022-05-02 06:54:43'),
(30, 'company_annual_report_view', '2022-05-02 06:54:49'),
(31, 'company_financial_report_view', '2022-05-02 06:54:55'),
(32, 'app_exception', '2022-05-02 07:53:41'),
(33, 'app_store_subscription_renew', '2022-05-02 07:53:41'),
(34, 'app_update', '2022-05-02 07:53:41'),
(35, 'first_open', '2022-05-02 07:53:41'),
(36, 'first_visit', '2022-05-02 07:53:41'),
(37, 'in_app_purchase', '2022-05-02 07:53:41'),
(38, 'notification_foreground', '2022-05-02 07:53:41'),
(39, 'notification_open', '2022-05-02 07:53:41'),
(40, 'os_update', '2022-05-02 07:53:41'),
(41, 'page_view', '2022-05-02 07:53:41'),
(42, 'screen_view', '2022-05-02 07:53:41'),
(43, 'session_start', '2022-05-02 07:53:41');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user_event_list`
--
ALTER TABLE `user_event_list`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user_event_list`
--
ALTER TABLE `user_event_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
