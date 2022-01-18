-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 18, 2022 at 02:51 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tapd`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `paddSub1` (IN `kd` VARCHAR(5), IN `nm` VARCHAR(150), IN `pagu` VARCHAR(25), IN `pembahasan` INT(2), IN `perkada` INT(2), IN `tahun` YEAR(4))  BEGIN
        DECLARE countSub int DEFAULT 0;
        SELECT a.selected1 INTO countSub FROM apbdsub1 a WHERE a.kdSub1=kd AND a.noPembahasan1=pembahasan AND a.perkada1=perkada AND a.date1=tahun;
        IF countSub>0 THEN
            SELECT false as status;
        ELSE
            INSERT INTO apbdsub1(kdSub1,nmSub1,pagu1,noPembahasan1,perkada1,date1) VALUES (kd,nm,pagu,pembahasan,perkada,tahun);
            SELECT true as status;
        END IF;
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `paddSub2` (IN `kdSub` VARCHAR(2), `kd` VARCHAR(5), `nm` VARCHAR(150), `pagu` VARCHAR(25), `pembahasan` INT(2), `perkada` INT(2), `tahun` YEAR(4))  BEGIN
        DECLARE countSub int DEFAULT 0;
        SELECT a.selected2 INTO countSub FROM apbdsub2 a WHERE a.kdSub2=kd AND a.noPembahasan2=pembahasan AND 
            a.date2=tahun AND a.kdSub1=kdSub and a.perkada2=perkada;
        IF countSub>0 THEN  
            SELECT false as status;
        ELSE
            INSERT INTO apbdSub2
                (kdSub1,kdSub2,nmSub2,pagu2,noPembahasan2,perkada2,date2) 
            VALUES (kdSub,kd,nm,pagu,pembahasan,perkada,tahun);
            call responSub1(kdSub,0,pembahasan,perkada,tahun);
            SELECT true as status;
        END IF;
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `paddSub3` (IN `kdSub` VARCHAR(25), `kd` VARCHAR(25), `nm` VARCHAR(150), `pagu` VARCHAR(25), `pembahasan` INT(2), `perkada` INT(2), `tahun` YEAR(4))  BEGIN
        DECLARE countSub int DEFAULT 0;
        SELECT a.selected3 INTO countSub FROM apbdsub3 a WHERE a.kdSub3=kd AND a.noPembahasan3=pembahasan AND 
            a.date3=tahun AND a.kdSub2=kdSub and a.perkada3=perkada;
        IF countSub>0 THEN  
            SELECT false as status;
        ELSE
            INSERT INTO apbdSub3
                (kdSub2,kdSub3,nmSub3,pagu3,noPembahasan3,perkada3,date3) 
            VALUES (kdSub,kd,nm,pagu,pembahasan,perkada,tahun);
            call responSub2(kdSub,0,pembahasan,perkada,tahun);
            SELECT true as status;
        END IF;
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `paddSub4` (IN `kdSub` VARCHAR(25), `kd` VARCHAR(25), `nm` VARCHAR(150), `pagu` VARCHAR(25), `pembahasan` INT(2), `perkada` INT(2), `tahun` YEAR(4))  BEGIN
        DECLARE countSub int DEFAULT 0;
        SELECT a.selected4 INTO countSub FROM apbdsub4 a WHERE a.kdSub4=kd AND a.noPembahasan4=pembahasan AND 
            a.date4=tahun AND a.kdSub3=kdSub and a.perkada4=perkada;
        IF countSub>0 THEN  
            SELECT false as status;
        ELSE
            INSERT INTO apbdSub4
                (kdSub3,kdSub4,nmSub4,pagu4,noPembahasan4,perkada4,date4) 
            VALUES (kdSub,kd,nm,pagu,pembahasan,perkada,tahun);
            call responSub3(kdSub,0,pembahasan,perkada,tahun);
            SELECT true as status;
        END IF;
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `paddSub5` (IN `kdSub` VARCHAR(25), `kd` VARCHAR(25), `nm` VARCHAR(150), `pagu` VARCHAR(25), `pembahasan` INT(2), `perkada` INT(2), `tahun` YEAR(4))  BEGIN
        DECLARE countSub int DEFAULT 0;
        SELECT a.selected5 INTO countSub FROM apbdsub5 a WHERE a.kdSub5=kd AND a.noPembahasan5=pembahasan AND 
            a.date5=tahun AND a.kdSub4=kdSub and a.perkada5=perkada;
        IF countSub>0 THEN  
            SELECT false as status;
        ELSE
            INSERT INTO apbdSub5
                (kdSub4,kdSub5,nmSub5,pagu5,noPembahasan5,perkada5,date5) 
            VALUES (kdSub,kd,nm,pagu,pembahasan,perkada,tahun);
            call responSub4(kdSub,0,pembahasan,perkada,tahun);
            SELECT true as status;
        END IF;
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `paddSub6` (IN `kdSub` VARCHAR(25), `kd` VARCHAR(25), `nm` VARCHAR(150), `pagu` VARCHAR(25), `pembahasan` INT(2), `perkada` INT(2), `tahun` YEAR(4))  BEGIN
        DECLARE countSub int DEFAULT 0;
        SELECT a.selected6 INTO countSub FROM apbdsub6 a WHERE a.kdSub6=kd AND a.noPembahasan6=pembahasan AND 
            a.date6=tahun AND a.kdSub5=kdSub and a.perkada6=perkada;
        IF countSub>0 THEN  
            SELECT false as status;
        ELSE
            INSERT INTO apbdSub6
                (kdSub5,kdSub6,nmSub6,pagu6,noPembahasan6,perkada6,date6) 
            VALUES (kdSub,kd,nm,pagu,pembahasan,perkada,tahun);
            call responSub5(kdSub,0,pembahasan,perkada,tahun);
            SELECT true as status;
        END IF;
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `paddSub7` (IN `kdSub` VARCHAR(25), `kd` VARCHAR(25), `nm` VARCHAR(150), `pagu` VARCHAR(25), `pembahasan` INT(2), `perkada` INT(2), `tahun` YEAR(4))  BEGIN
        DECLARE countSub int DEFAULT 0;
        SELECT a.selected7 INTO countSub FROM apbdsub7 a WHERE a.kdSub7=kd AND a.noPembahasan7=pembahasan AND 
            a.date7=tahun AND a.kdSub6=kdSub and a.perkada7=perkada;
        IF countSub>0 THEN  
            SELECT false as status;
        ELSE
            INSERT INTO apbdSub7
                (kdSub6,kdSub7,nmSub7,pagu7,noPembahasan7,perkada7,date7) 
            VALUES (kdSub,kd,nm,pagu,pembahasan,perkada,tahun);
            call responSub6(kdSub,0,pembahasan,perkada,tahun);
            SELECT true as status;
        END IF;
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pdelSub2` (IN `kdSub` VARCHAR(2), IN `kd` VARCHAR(5), IN `pembahasan` INT(2), IN `perkada` INT(2), IN `tahun` YEAR(4))  BEGIN
        DECLARE countSub int DEFAULT 0;
        SELECT count(a.kdSub2) INTO countSub FROM apbdsub2 a WHERE a.noPembahasan2=pembahasan and a.perkada2=perkada AND 
            a.date2=tahun AND a.kdSub1=kdSub;
        delete from apbdSub2 where kdSub2=kd and kdSub1=kdSub and perkada2=perkada and noPembahasan2=pembahasan and date2=tahun;
        IF countSub=1 THEN
            call responSub1(kdSub,1,pembahasan,perkada,tahun);
        ELSE
            call responSub1(kdSub,0,pembahasan,perkada,tahun);
        END IF;
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pdelSub3` (IN `kdSub` VARCHAR(25), `kd` VARCHAR(25), `pembahasan` INT(2), `perkada` INT(2), `tahun` YEAR(4))  BEGIN
        DECLARE countSub int DEFAULT 0;
        SELECT count(a.kdSub3) INTO countSub FROM apbdsub3 a WHERE a.noPembahasan3=pembahasan AND 
            a.date3=tahun AND a.kdSub2=kdSub and a.perkada3=perkada;
        delete from apbdSub3 where kdSub3=kd and kdSub2=kdSub and noPembahasan3=pembahasan AND 
            date3=tahun AND perkada3=perkada;
        IF countSub=1 THEN
            call responSub2(kdSub,1,pembahasan,perkada,tahun);
        ELSE
            call responSub2(kdSub,0,pembahasan,perkada,tahun);
        END IF;
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pdelSub4` (IN `kdSub` VARCHAR(25), `kd` VARCHAR(25), `pembahasan` INT(2), `perkada` INT(2), `tahun` YEAR(4))  BEGIN
        DECLARE countSub int DEFAULT 0;
        SELECT count(a.kdSub4) INTO countSub FROM apbdsub4 a WHERE a.noPembahasan4=pembahasan AND 
            a.date4=tahun AND a.kdSub3=kdSub and a.perkada4=perkada;
        delete from apbdSub4 where kdSub4=kd and kdSub3=kdSub and noPembahasan4=pembahasan AND 
            date4=tahun and perkada4=perkada;
        IF countSub=1 THEN
            call responSub3(kdSub,1,pembahasan,perkada,tahun);
        ELSE
            call responSub3(kdSub,0,pembahasan,perkada,tahun);
        END IF;
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pdelSub5` (IN `kdSub` VARCHAR(25), `kd` VARCHAR(25), `pembahasan` INT(2), `perkada` INT(2), `tahun` YEAR(4))  BEGIN
        DECLARE countSub int DEFAULT 0;
        SELECT count(a.kdSub5) INTO countSub FROM apbdsub5 a WHERE a.noPembahasan5=pembahasan AND 
            a.date5=tahun AND a.kdSub4=kdSub and a.perkada5=perkada;
        delete from apbdSub5 where kdSub5=kd and kdSub4=kdSub and noPembahasan5=pembahasan AND 
            date5=tahun and perkada5=perkada;
        IF countSub=1 THEN
            call responSub4(kdSub,1,pembahasan,perkada,tahun);
        ELSE
            call responSub4(kdSub,0,pembahasan,perkada,tahun);
        END IF;
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pdelSub6` (IN `kdSub` VARCHAR(25), `kd` VARCHAR(25), `pembahasan` INT(2), `perkada` INT(2), `tahun` YEAR(4))  BEGIN
        DECLARE countSub int DEFAULT 0;
        SELECT count(a.kdSub6) INTO countSub FROM apbdsub6 a WHERE a.noPembahasan6=pembahasan AND 
            a.date6=tahun AND a.kdSub5=kdSub and a.perkada6=perkada;
        delete from apbdSub6 where kdSub6=kd and kdSub5=kdSub and noPembahasan6=pembahasan AND 
            date6=tahun AND perkada6=perkada;
        IF countSub=1 THEN
            call responSub5(kdSub,1,pembahasan,perkada,tahun);
        ELSE
            call responSub5(kdSub,0,pembahasan,perkada,tahun);
        END IF;
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pdelSub7` (IN `kdSub` VARCHAR(25), `kd` VARCHAR(25), `pembahasan` INT(2), `perkada` INT(2), `tahun` YEAR(4))  BEGIN
        DECLARE countSub int DEFAULT 0;
        SELECT count(a.kdSub7) INTO countSub FROM apbdsub7 a WHERE a.noPembahasan7=pembahasan AND 
            a.date7=tahun AND a.kdSub6=kdSub and a.perkada7=perkada;
        delete from apbdSub7 where kdSub7=kd and kdSub6=kdSub and noPembahasan7=pembahasan AND 
            date7=tahun AND perkada7=perkada;
        IF countSub=1 THEN
            call responSub6(kdSub,1,pembahasan,perkada,tahun);
        ELSE
            call responSub6(kdSub,0,pembahasan,perkada,tahun);
        END IF;
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pupdSub1` (IN `kd` VARCHAR(5), IN `nm` VARCHAR(150), IN `pagu` VARCHAR(25), IN `pembahasan` INT(2), IN `perkada` INT(2), IN `tahun` YEAR(4))  BEGIN
       UPDATE apbdsub1 SET nmSub1=nm,pagu1=pagu WHERE kdSub1=kd and date1=tahun  AND perkada1=perkada AND noPembahasan1=pembahasan;
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pupdSub2` (IN `kdSub` VARCHAR(2), `kd` VARCHAR(5), `nm` VARCHAR(150), `pagu` VARCHAR(25), `pembahasan` INT(2), `perkada` INT(2), `tahun` YEAR(4))  BEGIN
        DECLARE countSub int DEFAULT 0;
        SELECT a.selected2 INTO countSub FROM apbdsub2 a WHERE a.kdSub2=kd AND a.noPembahasan2=pembahasan AND 
            a.date2=tahun AND a.kdSub1=kdSub and a.perkada2=perkada;
        IF countSub>0 THEN
            UPDATE apbdsub2 a SET a.nmSub2=nm,a.pagu2=pagu WHERE a.kdSub2=kd AND a.kdSub1=kdSub and a.date2=tahun and a.perkada2=perkada AND a.noPembahasan2=pembahasan;
            call responSub1(kdSub,0,pembahasan,perkada,tahun);
        ELSE
            UPDATE apbdsub2 a SET a.nmSub2=nm WHERE a.kdSub2=kd AND a.kdSub1=kdSub and a.date2=tahun and a.perkada2=perkada AND a.noPembahasan2=pembahasan;
        END IF;
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pupdSub3` (IN `kdSub` VARCHAR(25), `kd` VARCHAR(25), `nm` VARCHAR(150), `pagu` VARCHAR(25), `pembahasan` INT(2), `perkada` INT(2), `tahun` YEAR(4))  BEGIN
        DECLARE countSub int DEFAULT 0;
        SELECT a.selected3 INTO countSub FROM apbdsub3 a WHERE a.kdSub3=kd AND a.noPembahasan3=pembahasan AND 
            a.date3=tahun AND a.kdSub2=kdSub  and a.perkada3=perkada;
        IF countSub>0 THEN
            UPDATE apbdsub3 a SET a.nmSub3=nm,a.pagu3=pagu WHERE a.kdSub3=kd AND a.kdSub2=kdSub and a.date3=tahun AND a.noPembahasan3=pembahasan and a.perkada3=perkada;
            call responSub2(kdSub,0,pembahasan,perkada,tahun);
        ELSE
            UPDATE apbdsub3 a SET a.nmSub3=nm WHERE a.kdSub3=kd AND a.kdSub2=kdSub and a.date3=tahun AND a.noPembahasan3=pembahasan and a.perkada3=perkada;
        END IF;
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pupdSub4` (IN `kdSub` VARCHAR(25), `kd` VARCHAR(25), `nm` VARCHAR(150), `pagu` VARCHAR(25), `pembahasan` INT(2), `perkada` INT(2), `tahun` YEAR(4))  BEGIN
        DECLARE countSub int DEFAULT 0;
        SELECT a.selected4 INTO countSub FROM apbdsub4 a WHERE a.kdSub4=kd AND a.noPembahasan4=pembahasan AND 
            a.date4=tahun AND a.kdSub3=kdSub and a.perkada4=perkada;
        IF countSub>0 THEN
            UPDATE apbdsub4 a SET a.nmSub4=nm,a.pagu4=pagu WHERE a.kdSub4=kd AND a.kdSub3=kdSub and a.date4=tahun and a.perkada4=perkada AND a.noPembahasan4=pembahasan;
            call responSub3(kdSub,0,pembahasan,perkada,tahun);
        ELSE
            UPDATE apbdsub4 a SET a.nmSub4=nm WHERE a.kdSub4=kd AND a.kdSub3=kdSub and a.date4=tahun AND a.noPembahasan4=pembahasan and a.perkada4=perkada;
        END IF;
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pupdSub5` (IN `kdSub` VARCHAR(25), `kd` VARCHAR(25), `nm` VARCHAR(150), `pagu` VARCHAR(25), `pembahasan` INT(2), `perkada` INT(2), `tahun` YEAR(4))  BEGIN
        DECLARE countSub int DEFAULT 0;
        SELECT a.selected5 INTO countSub FROM apbdsub5 a WHERE a.kdSub5=kd AND a.noPembahasan5=pembahasan AND 
            a.date5=tahun AND a.kdSub4=kdSub and a.perkada5=perkada;
        IF countSub>0 THEN
            UPDATE apbdsub5 a SET a.nmSub5=nm,a.pagu5=pagu WHERE a.kdSub5=kd AND a.kdSub4=kdSub and a.date5=tahun and a.perkada5=perkada AND a.noPembahasan5=pembahasan;
            call responSub4(kdSub,0,pembahasan,perkada,tahun);
        ELSE
            UPDATE apbdsub5 a SET a.nmSub5=nm WHERE a.kdSub5=kd AND a.kdSub4=kdSub and a.date5=tahun and a.perkada5=perkada AND a.noPembahasan5=pembahasan;
        END IF;
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pupdSub6` (IN `kdSub` VARCHAR(25), `kd` VARCHAR(25), `nm` VARCHAR(150), `pagu` VARCHAR(25), `pembahasan` INT(2), `perkada` INT(2), `tahun` YEAR(4))  BEGIN
        DECLARE countSub int DEFAULT 0;
        SELECT a.selected6 INTO countSub FROM apbdsub6 a WHERE a.kdSub6=kd AND a.noPembahasan6=pembahasan AND 
            a.date6=tahun AND a.kdSub5=kdSub and a.perkada6=perkada;
        IF countSub>0 THEN
            UPDATE apbdsub6 a SET a.nmSub6=nm,a.pagu6=pagu WHERE a.kdSub6=kd AND a.kdSub5=kdSub and a.date6=tahun and a.perkada6=perkada AND a.noPembahasan6=pembahasan;
            call responSub5(kdSub,0,pembahasan,perkada,tahun);
        ELSE
            UPDATE apbdsub6 a SET a.nmSub6=nm WHERE a.kdSub6=kd AND a.kdSub5=kdSub and a.date6=tahun and a.perkada6=perkada AND a.noPembahasan6=pembahasan;
        END IF;
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pupdSub7` (IN `kdSub` VARCHAR(25), `kd` VARCHAR(25), `nm` VARCHAR(150), `pagu` VARCHAR(25), `pembahasan` INT(2), `perkada` INT(2), `tahun` YEAR(4))  BEGIN
        DECLARE countSub int DEFAULT 0;
        SELECT a.selected7 INTO countSub FROM apbdsub7 a WHERE a.kdSub7=kd AND a.noPembahasan7=pembahasan AND 
            a.date7=tahun AND a.kdSub6=kdSub and a.perkada7=perkada;
        IF countSub>0 THEN
            UPDATE apbdsub7 a SET a.nmSub7=nm,a.pagu7=pagu WHERE a.kdSub7=kd AND a.kdSub6=kdSub and a.date7=tahun and a.perkada7=perkada AND a.noPembahasan7=pembahasan;
            call responSub6(kdSub,0,pembahasan,perkada,tahun);
        ELSE
            UPDATE apbdsub7 a SET a.nmSub7=nm WHERE a.kdSub7=kd AND a.kdSub6=kdSub and a.perkada7=perkada and a.date7=tahun AND a.noPembahasan7=pembahasan;
        END IF;
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `responSub1` (IN `kdSub` VARCHAR(2), IN `selected` TINYINT(1), IN `pembahasan` INT(2), IN `perkada` INT(2), IN `tahun` YEAR(4))  BEGIN
        update apbdsub1 set 
            pagu1=(SELECT sum(a.pagu2) FROM apbdsub2 a WHERE a.noPembahasan2=pembahasan  AND a.perkada2=perkada AND a.date2=tahun AND a.kdSub1=kdSub),
            selected1=selected
        where kdSub1=kdSub and noPembahasan1=pembahasan AND perkada1=perkada and date1=tahun;
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `responSub2` (IN `kdSub` VARCHAR(25), IN `selected` TINYINT(1), IN `pembahasan` INT(2), IN `perkada` INT(2), IN `tahun` YEAR(4))  BEGIN
        update apbdsub2 set 
            pagu2=(SELECT sum(a.pagu3) FROM apbdsub3 a WHERE a.noPembahasan3=pembahasan and a.perkada3=perkada AND a.date3=tahun AND a.kdSub2=kdSub),
            selected2=selected
        where kdSub2=kdSub and noPembahasan2=pembahasan and perkada2=perkada and date2=tahun;
        call responSub1((select kdSub1 from apbdsub2 where kdSub2=kdSub and noPembahasan2=pembahasan and perkada2=perkada and date2=tahun limit 1),0,pembahasan,perkada,tahun);
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `responSub3` (IN `kdSub` VARCHAR(25), `selected` TINYINT(1), `pembahasan` INT(2), `perkada` INT(2), `tahun` YEAR(4))  BEGIN
        update apbdsub3 set 
            pagu3=(SELECT sum(a.pagu4) FROM apbdsub4 a WHERE a.noPembahasan4=pembahasan AND a.date4=tahun and a.perkada4=perkada AND a.kdSub3=kdSub),
            selected3=selected
        where kdSub3=kdSub and noPembahasan3=pembahasan and perkada3=perkada and date3=tahun;
        call responSub2((select kdSub2 from apbdsub3 where kdSub3=kdSub and noPembahasan3=pembahasan and perkada3=perkada and date3=tahun limit 1),0,pembahasan,perkada,tahun);
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `responSub4` (IN `kdSub` VARCHAR(25), `selected` TINYINT(1), `pembahasan` INT(2), `perkada` INT(2), `tahun` YEAR(4))  BEGIN
        update apbdsub4 set 
            pagu4=(SELECT sum(a.pagu5) FROM apbdsub5 a WHERE a.noPembahasan5=pembahasan AND a.date5=tahun  and a.perkada5=perkada AND  a.kdSub4=kdSub),
            selected4=selected
        where kdSub4=kdSub and noPembahasan4=pembahasan and date4=tahun  and perkada4=perkada;
        call responSub3((select kdSub3 from apbdsub4 where kdSub4=kdSub and noPembahasan4=pembahasan and date4=tahun  and perkada4=perkada limit 1),0,pembahasan,perkada,tahun);
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `responSub5` (IN `kdSub` VARCHAR(25), `selected` TINYINT(1), `pembahasan` INT(2), `perkada` INT(2), `tahun` YEAR(4))  BEGIN
        update apbdsub5 set 
            pagu5=(SELECT sum(a.pagu6) FROM apbdsub6 a WHERE a.noPembahasan6=pembahasan and a.perkada6=perkada AND a.date6=tahun AND 
                   a.kdSub5=kdSub),
            selected5=selected
        where kdSub5=kdSub and noPembahasan5=pembahasan and perkada5=perkada and date5=tahun;
        call responSub4((select kdSub4 from apbdsub5 where kdSub5=kdSub and noPembahasan5=pembahasan and perkada5=perkada and date5=tahun limit 1),0,pembahasan,perkada,tahun);
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `responSub6` (IN `kdSub` VARCHAR(25), `selected` TINYINT(1), `pembahasan` INT(2), `perkada` INT(2), `tahun` YEAR(4))  BEGIN
        update apbdsub6 set 
            pagu6=(SELECT sum(a.pagu7) FROM apbdsub7 a WHERE a.noPembahasan7=pembahasan AND a.date7=tahun AND 
                   a.kdSub6=kdSub and a.perkada7=perkada),
            selected6=selected
        where kdSub6=kdSub and noPembahasan6=pembahasan and date6=tahun and perkada6=perkada;
        call responSub5((select kdSub5 from apbdsub6 where kdSub6=kdSub and noPembahasan6=pembahasan and date6=tahun and perkada6=perkada limit 1),0,pembahasan,perkada,tahun);
    END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `absensi`
--

CREATE TABLE `absensi` (
  `kdAbsensi` int(2) NOT NULL,
  `noPembahasan` varchar(3) NOT NULL,
  `perkada` varchar(3) NOT NULL,
  `tahun` year(4) NOT NULL,
  `kdMember` varchar(15) NOT NULL,
  `noUpd` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `absensi`
--

INSERT INTO `absensi` (`kdAbsensi`, `noPembahasan`, `perkada`, `tahun`, `kdMember`, `noUpd`) VALUES
(1, '1', '1', 2022, '2G18-memb-2', 1),
(2, '1', '1', 2022, '2G18-memb-3', 1),
(3, '1', '1', 2022, '2G18-memb-4', 1),
(4, '1', '1', 2022, '2G18-memb-5', 1);

-- --------------------------------------------------------

--
-- Table structure for table `apbdsub1`
--

CREATE TABLE `apbdsub1` (
  `kdSub1` varchar(2) NOT NULL,
  `nmSub1` varchar(150) NOT NULL,
  `pagu1` varchar(25) NOT NULL,
  `paguR1` varchar(25) NOT NULL DEFAULT '0',
  `selected1` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'digunakan untuk menentukan data ini termasuk yang akan dijadikan pilihan atau tidak',
  `date1` year(4) NOT NULL DEFAULT current_timestamp() COMMENT 'untuk mempersiapkan penyimpanan dimasa mendatang',
  `ins1` timestamp NOT NULL DEFAULT current_timestamp(),
  `noPembahasan1` int(2) NOT NULL DEFAULT 0,
  `keterangan1` varchar(250) DEFAULT NULL,
  `perkada1` int(3) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `apbdsub1`
--

INSERT INTO `apbdsub1` (`kdSub1`, `nmSub1`, `pagu1`, `paguR1`, `selected1`, `date1`, `ins1`, `noPembahasan1`, `keterangan1`, `perkada1`) VALUES
('4', 'PENDAPATAN DAERAH', '1031192671677', '0', 1, 2022, '2022-01-09 14:29:38', 0, NULL, 1),
('4', 'PENDAPATAN DAERAH', '1031792671677', '0', 0, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('5', 'BELANJA DAERAH', '1073664921752', '0', 0, 2022, '2022-01-09 14:29:38', 0, NULL, 1),
('5', 'BELANJA DAERAH', '1074264921752', '0', 0, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('6', 'PEMBIAYAAN DAERAH', '48252250075', '0', 0, 2022, '2022-01-09 14:29:38', 0, NULL, 1),
('6', 'PEMBIAYAAN DAERAH', '48452250075', '0', 0, 2022, '2022-01-11 04:10:16', 1, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `apbdsub2`
--

CREATE TABLE `apbdsub2` (
  `kdSub1` varchar(2) NOT NULL,
  `kdSub2` varchar(20) NOT NULL,
  `nmSub2` varchar(150) NOT NULL,
  `pagu2` varchar(25) NOT NULL DEFAULT '0',
  `paguR2` varchar(25) NOT NULL COMMENT 'pagu real',
  `selected2` tinyint(1) NOT NULL DEFAULT 1,
  `date2` year(4) NOT NULL DEFAULT current_timestamp(),
  `ins2` timestamp NOT NULL DEFAULT current_timestamp(),
  `noPembahasan2` int(2) NOT NULL DEFAULT 0,
  `keterangan2` varchar(250) DEFAULT NULL,
  `perkada2` int(3) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `apbdsub2`
--

INSERT INTO `apbdsub2` (`kdSub1`, `kdSub2`, `nmSub2`, `pagu2`, `paguR2`, `selected2`, `date2`, `ins2`, `noPembahasan2`, `keterangan2`, `perkada2`) VALUES
('4', '4.1', 'PENDAPATAN ASLI DAERAH (PAD)', '101421974054', '', 1, 2022, '2022-01-09 14:32:14', 0, NULL, 1),
('4', '4.1', 'PENDAPATAN ASLI DAERAH (PAD)', '102021974054', '', 0, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4', '4.2', 'PENDAPATAN TRANSFER', '915932261623', '', 1, 2022, '2022-01-09 14:32:14', 0, NULL, 1),
('4', '4.2', 'PENDAPATAN TRANSFER', '915932261623', '', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4', '4.3', 'LAIN-LAIN PENDAPATAN DAERAH YANG SAH', '13838436000', '', 1, 2022, '2022-01-09 14:32:14', 0, NULL, 1),
('4', '4.3', 'LAIN-LAIN PENDAPATAN DAERAH YANG SAH', '13838436000', '', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('5', '5.1', 'BELANJA PERANGKAT DAERAH', '934023932686', '', 1, 2022, '2022-01-09 14:32:14', 0, NULL, 1),
('5', '5.1', 'BELANJA PERANGKAT DAERAH', '935523932686', '934023932686', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('5', '5.2', 'BELANJA TIDAK TERDUGA', '24248886366', '', 1, 2022, '2022-01-09 14:32:14', 0, NULL, 1),
('5', '5.2', 'BELANJA TIDAK TERDUGA', '22648886366', '22698886366\n', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('5', '5.3', 'BELANJA BAGI HASIL', '5039845000', '', 1, 2022, '2022-01-09 14:32:14', 0, NULL, 1),
('5', '5.3', 'BELANJA BAGI HASIL', '5539845000', '5039845000', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('5', '5.4', 'BELANJA ALOKASI DANA DESA', '58950516700', '', 1, 2022, '2022-01-09 14:32:14', 0, NULL, 1),
('5', '5.4', 'BELANJA ALOKASI DANA DESA', '59150516700', ' 	58950516700', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('5', '5.5', 'BELANJA DANA DESA', '51401741000', '', 1, 2022, '2022-01-09 14:32:14', 0, NULL, 1),
('5', '5.5', 'BELANJA DANA DESA', '51401741000', '', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('6', '6.1', 'PENERIMAAN PEMBIAYAAN', '45362250075', '', 0, 2022, '2022-01-09 14:32:14', 0, NULL, 1),
('6', '6.1', 'PENERIMAAN PEMBIAYAAN', '45562250075', '', 0, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('6', '6.2', 'PENGELUARAN PEMBIAYAAN', '2890000000', '', 1, 2022, '2022-01-09 14:32:14', 0, NULL, 1),
('6', '6.2', 'PENGELUARAN PEMBIAYAAN', '2890000000', '', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `apbdsub3`
--

CREATE TABLE `apbdsub3` (
  `kdSub2` varchar(20) NOT NULL,
  `kdSub3` varchar(20) NOT NULL,
  `nmSub3` varchar(150) NOT NULL,
  `pagu3` varchar(25) DEFAULT NULL,
  `paguR3` varchar(25) NOT NULL DEFAULT '0',
  `selected3` tinyint(1) NOT NULL DEFAULT 1,
  `date3` year(4) NOT NULL DEFAULT current_timestamp(),
  `ins3` timestamp NOT NULL DEFAULT current_timestamp(),
  `noPembahasan3` int(2) NOT NULL DEFAULT 0,
  `keterangan3` varchar(250) DEFAULT NULL,
  `perkada3` int(3) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `apbdsub3`
--

INSERT INTO `apbdsub3` (`kdSub2`, `kdSub3`, `nmSub3`, `pagu3`, `paguR3`, `selected3`, `date3`, `ins3`, `noPembahasan3`, `keterangan3`, `perkada3`) VALUES
('4.1', '4.1.01', 'Pajak Daerah', '41600000000', '0', 1, 2022, '2022-01-09 14:36:08', 0, NULL, 1),
('4.1', '4.1.01', 'Pajak Daerah', '42200000000', '0', 0, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1', '4.1.02', 'Retribusi Daerah', '8798446054', '0', 1, 2022, '2022-01-09 14:36:08', 0, NULL, 1),
('4.1', '4.1.02', 'Retribusi Daerah', '8798446054', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1', '4.1.03', 'Hasil Pengelolaan Kekayaan Daerah yang Dipisahkan', '5870000000', '0', 1, 2022, '2022-01-09 14:36:08', 0, NULL, 1),
('4.1', '4.1.03', 'Hasil Pengelolaan Kekayaan Daerah yang Dipisahkan', '5870000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1', '4.1.04', 'Lain-lain PAD yang Sah', '45153528000', '0', 1, 2022, '2022-01-09 14:36:08', 0, NULL, 1),
('4.1', '4.1.04', 'Lain-lain PAD yang Sah', '45153528000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2', '4.2.01', 'Pendapatan Transfer Pemerintah Pusat', '833335411000', '0', 1, 2022, '2022-01-09 14:36:08', 0, NULL, 1),
('4.2', '4.2.01', 'Pendapatan Transfer Pemerintah Pusat', '833335411000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2', '4.2.02', 'Pendapatan Transfer Antar Daerah', '82596850623', '0', 1, 2022, '2022-01-09 14:36:08', 0, NULL, 1),
('4.2', '4.2.02', 'Pendapatan Transfer Antar Daerah', '82596850623', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.3', '4.3.01', 'Pendapatan Hibah', '10546500000', '0', 1, 2022, '2022-01-09 14:36:08', 0, NULL, 1),
('4.3', '4.3.01', 'Pendapatan Hibah', '10546500000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.3', '4.3.03', 'Lain-lain Pendapatan Sesuai dengan Ketentuan Peraturan Perundang-Undangan', '3291936000', '0', 1, 2022, '2022-01-09 14:36:08', 0, NULL, 1),
('4.3', '4.3.03', 'Lain-lain Pendapatan Sesuai dengan Ketentuan Peraturan Perundang-Undangan', '3291936000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('6.1', '6.1.01', 'Sisa Lebih Perhitungan Anggaran Tahun Sebelumnya', '45362250075', '0', 1, 2022, '2022-01-09 14:36:08', 0, NULL, 1),
('6.1', '6.1.01', 'Sisa Lebih Perhitungan Anggaran Tahun Sebelumnya', '45562250075', '45362250075', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('6.2', '6.2.02', 'Penyertaan Modal Daerah', '2890000000', '0', 1, 2022, '2022-01-09 14:36:08', 0, NULL, 1),
('6.2', '6.2.02', 'Penyertaan Modal Daerah', '2890000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `apbdsub4`
--

CREATE TABLE `apbdsub4` (
  `kdSub3` varchar(20) NOT NULL,
  `kdSub4` varchar(20) NOT NULL,
  `nmSub4` varchar(150) NOT NULL,
  `pagu4` varchar(25) DEFAULT NULL,
  `paguR4` varchar(25) NOT NULL DEFAULT '0',
  `selected4` tinyint(1) NOT NULL DEFAULT 1,
  `date4` year(4) NOT NULL DEFAULT current_timestamp(),
  `ins4` timestamp NOT NULL DEFAULT current_timestamp(),
  `noPembahasan4` int(2) NOT NULL DEFAULT 0,
  `keterangan4` varchar(250) DEFAULT NULL,
  `perkada4` int(3) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `apbdsub4`
--

INSERT INTO `apbdsub4` (`kdSub3`, `kdSub4`, `nmSub4`, `pagu4`, `paguR4`, `selected4`, `date4`, `ins4`, `noPembahasan4`, `keterangan4`, `perkada4`) VALUES
('4.1.01', '4.1.01.06', 'Pajak Hotel', '240000000', '0', 1, 2022, '2022-01-09 14:39:20', 0, NULL, 1),
('4.1.01', '4.1.01.06', 'Pajak Hotel', '840000000', '240000000', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.01', '4.1.01.07', 'Pajak Restoran', '15000000000', '0', 1, 2022, '2022-01-09 14:39:20', 0, NULL, 1),
('4.1.01', '4.1.01.07', 'Pajak Restoran', '15000000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.01', '4.1.01.08', 'Pajak Hiburan', '10000000', '0', 1, 2022, '2022-01-09 14:39:20', 0, NULL, 1),
('4.1.01', '4.1.01.08', 'Pajak Hiburan', '10000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.01', '4.1.01.09', 'Pajak Reklame', '300000000', '0', 1, 2022, '2022-01-09 14:39:20', 0, NULL, 1),
('4.1.01', '4.1.01.09', 'Pajak Reklame', '300000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.01', '4.1.01.10', 'Pajak Penerangan Jalan', '16500000000', '0', 1, 2022, '2022-01-09 14:39:20', 0, NULL, 1),
('4.1.01', '4.1.01.10', 'Pajak Penerangan Jalan', '16500000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.01', '4.1.01.11', 'Pajak Parkir', '50000000', '0', 1, 2022, '2022-01-09 14:39:20', 0, NULL, 1),
('4.1.01', '4.1.01.11', 'Pajak Parkir', '50000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.01', '4.1.01.12', 'Pajak Air Tanah', '3000000000', '0', 1, 2022, '2022-01-09 14:39:20', 0, NULL, 1),
('4.1.01', '4.1.01.12', 'Pajak Air Tanah', '3000000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.01', '4.1.01.14', 'Pajak Mineral Bukan Logam dan Batuan', '2000000000', '0', 1, 2022, '2022-01-09 14:39:20', 0, NULL, 1),
('4.1.01', '4.1.01.14', 'Pajak Mineral Bukan Logam dan Batuan', '2000000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.01', '4.1.01.15', 'Pajak Bumi dan Bangunan Perdesaan dan Perkotaan (PBBP2)', '1500000000', '0', 1, 2022, '2022-01-09 14:39:20', 0, NULL, 1),
('4.1.01', '4.1.01.15', 'Pajak Bumi dan Bangunan Perdesaan dan Perkotaan (PBBP2)', '1500000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.01', '4.1.01.16', 'Bea Perolehan Hak Atas Tanah dan Bangunan (BPHTB)', '3000000000', '0', 1, 2022, '2022-01-09 14:39:20', 0, NULL, 1),
('4.1.01', '4.1.01.16', 'Bea Perolehan Hak Atas Tanah dan Bangunan (BPHTB)', '3000000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.02', '4.1.02.01', 'Retribusi Jasa Umum', '5739446054', '0', 1, 2022, '2022-01-09 14:39:20', 0, NULL, 1),
('4.1.02', '4.1.02.01', 'Retribusi Jasa Umum', '5739446054', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.02', '4.1.02.02', 'Retribusi Jasa Usaha', '2654000000', '0', 1, 2022, '2022-01-09 14:39:20', 0, NULL, 1),
('4.1.02', '4.1.02.02', 'Retribusi Jasa Usaha', '2654000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.02', '4.1.02.03', 'Retribusi Perizinan Tertentu', '405000000', '0', 1, 2022, '2022-01-09 14:39:20', 0, NULL, 1),
('4.1.02', '4.1.02.03', 'Retribusi Perizinan Tertentu', '405000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.03', '4.1.03.02', 'Bagian Laba yang Dibagikan kepada Pemerintah Daerah (Dividen) atas Penyertaan Modal pada BUMD', '5870000000', '0', 1, 2022, '2022-01-09 14:39:20', 0, NULL, 1),
('4.1.03', '4.1.03.02', 'Bagian Laba yang Dibagikan kepada Pemerintah Daerah (Dividen) atas Penyertaan Modal pada BUMD', '5870000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.04', '4.1.04.05', 'Jasa Giro', '7150000000', '0', 1, 2022, '2022-01-09 14:39:20', 0, NULL, 1),
('4.1.04', '4.1.04.05', 'Jasa Giro', '7150000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.04', '4.1.04.07', 'Pendapatan Bunga', '10000000000', '0', 1, 2022, '2022-01-09 14:39:20', 0, NULL, 1),
('4.1.04', '4.1.04.07', 'Pendapatan Bunga', '10000000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.04', '4.1.04.08', 'Penerimaan atas Tuntutan Ganti Kerugian Keuangan Daerah', '2000000000', '0', 1, 2022, '2022-01-09 14:39:20', 0, NULL, 1),
('4.1.04', '4.1.04.08', 'Penerimaan atas Tuntutan Ganti Kerugian Keuangan Daerah', '2000000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.04', '4.1.04.16', 'Pendapatan BLUD', '21500000000', '0', 1, 2022, '2022-01-09 14:39:20', 0, NULL, 1),
('4.1.04', '4.1.04.16', 'Pendapatan BLUD', '21500000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.04', '4.1.04.18', 'Pendapatan Dana Kapitasi Jaminan Kesehatan Nasional (JKN) pada Fasilitas Kesehatan Tingkat Pertama (FKTP)', '4503528000', '0', 1, 2022, '2022-01-09 14:39:20', 0, NULL, 1),
('4.1.04', '4.1.04.18', 'Pendapatan Dana Kapitasi Jaminan Kesehatan Nasional (JKN) pada Fasilitas Kesehatan Tingkat Pertama (FKTP)', '4503528000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01', '4.2.01.01', 'Dana Perimbangan', '774300820000', '0', 1, 2022, '2022-01-09 14:39:20', 0, NULL, 1),
('4.2.01', '4.2.01.01', 'Dana Perimbangan', '774300820000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01', '4.2.01.02', 'Dana Insentif Daerah (DID)', '7632850000', '0', 1, 2022, '2022-01-09 14:39:20', 0, NULL, 1),
('4.2.01', '4.2.01.02', 'Dana Insentif Daerah (DID)', '7632850000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01', '4.2.01.05', 'Dana Desa', '51401741000', '0', 1, 2022, '2022-01-09 14:39:20', 0, NULL, 1),
('4.2.01', '4.2.01.05', 'Dana Desa', '51401741000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.02', '4.2.02.01', 'Pendapatan Bagi Hasil', '82096850623', '0', 1, 2022, '2022-01-09 14:39:20', 0, NULL, 1),
('4.2.02', '4.2.02.01', 'Pendapatan Bagi Hasil', '82096850623', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.02', '4.2.02.02', 'Bantuan Keuangan', '500000000', '0', 1, 2022, '2022-01-09 14:39:20', 0, NULL, 1),
('4.2.02', '4.2.02.02', 'Bantuan Keuangan', '500000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.3.01', '4.3.01.01', 'Pendapatan Hibah dari Pemerintah Pusat', '9890000000', '0', 1, 2022, '2022-01-09 14:39:20', 0, NULL, 1),
('4.3.01', '4.3.01.01', 'Pendapatan Hibah dari Pemerintah Pusat', '9890000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.3.01', '4.3.01.05', 'Sumbangan Pihak Ketiga/Sejenis', '656500000', '0', 1, 2022, '2022-01-09 14:39:20', 0, NULL, 1),
('4.3.01', '4.3.01.05', 'Sumbangan Pihak Ketiga/Sejenis', '656500000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.3.03', '4.3.03.02', 'Pendapatan Dana Kapitasi Jaminan Kesehatan Nasional (JKN) pada Fasilitas Kesehatan Tingkat Pertama (FKTP)', '3291936000', '0', 1, 2022, '2022-01-09 14:39:20', 0, NULL, 1),
('4.3.03', '4.3.03.02', 'Pendapatan Dana Kapitasi Jaminan Kesehatan Nasional (JKN) pada Fasilitas Kesehatan Tingkat Pertama (FKTP)', '3291936000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `apbdsub5`
--

CREATE TABLE `apbdsub5` (
  `kdSub4` varchar(20) NOT NULL,
  `kdSub5` varchar(20) NOT NULL,
  `nmSub5` varchar(150) NOT NULL,
  `pagu5` varchar(25) DEFAULT NULL,
  `paguR5` varchar(25) NOT NULL DEFAULT '0',
  `selected5` tinyint(1) NOT NULL DEFAULT 1,
  `date5` year(4) NOT NULL DEFAULT current_timestamp(),
  `ins5` timestamp NOT NULL DEFAULT current_timestamp(),
  `noPembahasan5` int(2) NOT NULL DEFAULT 0,
  `keterangan5` varchar(250) DEFAULT NULL,
  `perkada5` int(3) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `apbdsub5`
--

INSERT INTO `apbdsub5` (`kdSub4`, `kdSub5`, `nmSub5`, `pagu5`, `paguR5`, `selected5`, `date5`, `ins5`, `noPembahasan5`, `keterangan5`, `perkada5`) VALUES
('4.1.01', '4.1.01.06', 'Pajak Hotel', '240000000', '0', 1, 2022, '2022-01-09 14:41:24', 0, NULL, 1),
('4.1.01', '4.1.01.06', 'Pajak Hotel', '240000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.01', '4.1.01.07', 'Pajak Restoran', '15000000000', '0', 1, 2022, '2022-01-09 14:41:24', 0, NULL, 1),
('4.1.01', '4.1.01.07', 'Pajak Restoran', '15000000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.01', '4.1.01.08', 'Pajak Hiburan', '10000000', '0', 1, 2022, '2022-01-09 14:41:24', 0, NULL, 1),
('4.1.01', '4.1.01.08', 'Pajak Hiburan', '10000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.01', '4.1.01.09', 'Pajak Reklame', '300000000', '0', 1, 2022, '2022-01-09 14:41:24', 0, NULL, 1),
('4.1.01', '4.1.01.09', 'Pajak Reklame', '300000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.01', '4.1.01.10', 'Pajak Penerangan Jalan', '16500000000', '0', 1, 2022, '2022-01-09 14:41:24', 0, NULL, 1),
('4.1.01', '4.1.01.10', 'Pajak Penerangan Jalan', '16500000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.01', '4.1.01.11', 'Pajak Parkir', '50000000', '0', 1, 2022, '2022-01-09 14:41:24', 0, NULL, 1),
('4.1.01', '4.1.01.11', 'Pajak Parkir', '50000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.01', '4.1.01.12', 'Pajak Air Tanah', '3000000000', '0', 1, 2022, '2022-01-09 14:41:24', 0, NULL, 1),
('4.1.01', '4.1.01.12', 'Pajak Air Tanah', '3000000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.01', '4.1.01.14', 'Pajak Mineral Bukan Logam dan Batuan', '2000000000', '0', 1, 2022, '2022-01-09 14:41:24', 0, NULL, 1),
('4.1.01', '4.1.01.14', 'Pajak Mineral Bukan Logam dan Batuan', '2000000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.01', '4.1.01.15', 'Pajak Bumi dan Bangunan Perdesaan dan Perkotaan (PBBP2)', '1500000000', '0', 1, 2022, '2022-01-09 14:41:24', 0, NULL, 1),
('4.1.01', '4.1.01.15', 'Pajak Bumi dan Bangunan Perdesaan dan Perkotaan (PBBP2)', '1500000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.01', '4.1.01.16', 'Bea Perolehan Hak Atas Tanah dan Bangunan (BPHTB)', '3000000000', '0', 1, 2022, '2022-01-09 14:41:24', 0, NULL, 1),
('4.1.01', '4.1.01.16', 'Bea Perolehan Hak Atas Tanah dan Bangunan (BPHTB)', '3000000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.02', '4.1.02.01', 'Retribusi Jasa Umum', '5739446054', '0', 1, 2022, '2022-01-09 14:41:24', 0, NULL, 1),
('4.1.02', '4.1.02.01', 'Retribusi Jasa Umum', '5739446054', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.02', '4.1.02.02', 'Retribusi Jasa Usaha', '2654000000', '0', 1, 2022, '2022-01-09 14:41:24', 0, NULL, 1),
('4.1.02', '4.1.02.02', 'Retribusi Jasa Usaha', '2654000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.02', '4.1.02.03', 'Retribusi Perizinan Tertentu', '405000000', '0', 1, 2022, '2022-01-09 14:41:24', 0, NULL, 1),
('4.1.02', '4.1.02.03', 'Retribusi Perizinan Tertentu', '405000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.03', '4.1.03.02', 'Bagian Laba yang Dibagikan kepada Pemerintah Daerah (Dividen) atas Penyertaan Modal pada BUMD', '5870000000', '0', 1, 2022, '2022-01-09 14:41:24', 0, NULL, 1),
('4.1.03', '4.1.03.02', 'Bagian Laba yang Dibagikan kepada Pemerintah Daerah (Dividen) atas Penyertaan Modal pada BUMD', '5870000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.04', '4.1.04.05', 'Jasa Giro', '7150000000', '0', 1, 2022, '2022-01-09 14:41:24', 0, NULL, 1),
('4.1.04', '4.1.04.05', 'Jasa Giro', '7150000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.04', '4.1.04.07', 'Pendapatan Bunga', '10000000000', '0', 1, 2022, '2022-01-09 14:41:24', 0, NULL, 1),
('4.1.04', '4.1.04.07', 'Pendapatan Bunga', '10000000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.04', '4.1.04.08', 'Penerimaan atas Tuntutan Ganti Kerugian Keuangan Daerah', '2000000000', '0', 1, 2022, '2022-01-09 14:41:24', 0, NULL, 1),
('4.1.04', '4.1.04.08', 'Penerimaan atas Tuntutan Ganti Kerugian Keuangan Daerah', '2000000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.04', '4.1.04.16', 'Pendapatan BLUD', '21500000000', '0', 1, 2022, '2022-01-09 14:41:24', 0, NULL, 1),
('4.1.04', '4.1.04.16', 'Pendapatan BLUD', '21500000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.04', '4.1.04.18', 'Pendapatan Dana Kapitasi Jaminan Kesehatan Nasional (JKN) pada Fasilitas Kesehatan Tingkat Pertama (FKTP)', '4503528000', '0', 1, 2022, '2022-01-09 14:41:24', 0, NULL, 1),
('4.1.04', '4.1.04.18', 'Pendapatan Dana Kapitasi Jaminan Kesehatan Nasional (JKN) pada Fasilitas Kesehatan Tingkat Pertama (FKTP)', '4503528000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01', '4.2.01.01', 'Dana Perimbangan', '774300820000', '0', 1, 2022, '2022-01-09 14:41:24', 0, NULL, 1),
('4.2.01', '4.2.01.01', 'Dana Perimbangan', '774300820000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01', '4.2.01.02', 'Dana Insentif Daerah (DID)', '7632850000', '0', 1, 2022, '2022-01-09 14:41:24', 0, NULL, 1),
('4.2.01', '4.2.01.02', 'Dana Insentif Daerah (DID)', '7632850000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01', '4.2.01.05', 'Dana Desa', '51401741000', '0', 1, 2022, '2022-01-09 14:41:24', 0, NULL, 1),
('4.2.01', '4.2.01.05', 'Dana Desa', '51401741000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.02', '4.2.02.01', 'Pendapatan Bagi Hasil', '82096850623', '0', 1, 2022, '2022-01-09 14:41:24', 0, NULL, 1),
('4.2.02', '4.2.02.01', 'Pendapatan Bagi Hasil', '82096850623', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.02', '4.2.02.02', 'Bantuan Keuangan', '500000000', '0', 1, 2022, '2022-01-09 14:41:24', 0, NULL, 1),
('4.2.02', '4.2.02.02', 'Bantuan Keuangan', '500000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.3.01', '4.3.01.01', 'Pendapatan Hibah dari Pemerintah Pusat', '9890000000', '0', 1, 2022, '2022-01-09 14:41:24', 0, NULL, 1),
('4.3.01', '4.3.01.01', 'Pendapatan Hibah dari Pemerintah Pusat', '9890000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.3.01', '4.3.01.05', 'Sumbangan Pihak Ketiga/Sejenis', '656500000', '0', 1, 2022, '2022-01-09 14:41:24', 0, NULL, 1),
('4.3.01', '4.3.01.05', 'Sumbangan Pihak Ketiga/Sejenis', '656500000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.3.03', '4.3.03.02', 'Pendapatan Dana Kapitasi Jaminan Kesehatan Nasional (JKN) pada Fasilitas Kesehatan Tingkat Pertama (FKTP)', '3291936000', '0', 1, 2022, '2022-01-09 14:41:24', 0, NULL, 1),
('4.3.03', '4.3.03.02', 'Pendapatan Dana Kapitasi Jaminan Kesehatan Nasional (JKN) pada Fasilitas Kesehatan Tingkat Pertama (FKTP)', '3291936000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `apbdsub6`
--

CREATE TABLE `apbdsub6` (
  `kdSub5` varchar(20) NOT NULL,
  `kdSub6` varchar(20) NOT NULL,
  `nmSub6` varchar(150) NOT NULL,
  `pagu6` varchar(25) DEFAULT NULL,
  `paguR6` varchar(25) NOT NULL DEFAULT '0',
  `selected6` tinyint(1) NOT NULL DEFAULT 1,
  `date6` year(4) NOT NULL DEFAULT current_timestamp(),
  `ins6` timestamp NOT NULL DEFAULT current_timestamp(),
  `noPembahasan6` int(2) NOT NULL DEFAULT 0,
  `keterangan6` varchar(250) DEFAULT NULL,
  `perkada6` int(3) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `apbdsub6`
--

INSERT INTO `apbdsub6` (`kdSub5`, `kdSub6`, `nmSub6`, `pagu6`, `paguR6`, `selected6`, `date6`, `ins6`, `noPembahasan6`, `keterangan6`, `perkada6`) VALUES
('4.1.01.06.01', '4.1.01.06.01.0001', 'Pajak Hotel', '240000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.01.06.01', '4.1.01.06.01.0001', 'Pajak Hotel', '240000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.01.07.01', '4.1.01.07.01.0001', 'Pajak Restoran dan Sejenisnya', '15000000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.01.07.01', '4.1.01.07.01.0001', 'Pajak Restoran dan Sejenisnya', '15000000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.01.08.05', '4.1.01.08.05.0001', 'Pajak Diskotik, Karaoke, Klub Malam, dan Sejenisnya', '10000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.01.08.05', '4.1.01.08.05.0001', 'Pajak Diskotik, Karaoke, Klub Malam, dan Sejenisnya', '10000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.01.09.01', '4.1.01.09.01.0001', 'Pajak Reklame Papan/Billboard/Videotron/ Megatron', '300000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.01.09.01', '4.1.01.09.01.0001', 'Pajak Reklame Papan/Billboard/Videotron/ Megatron', '300000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.01.10.01', '4.1.01.10.01.0001', 'Pajak Penerangan Jalan Dihasilkan Sendiri', '16500000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.01.10.01', '4.1.01.10.01.0001', 'Pajak Penerangan Jalan Dihasilkan Sendiri', '16500000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.01.11.01', '4.1.01.11.01.0001', 'Pajak Parkir', '50000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.01.11.01', '4.1.01.11.01.0001', 'Pajak Parkir', '50000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.01.12.01', '4.1.01.12.01.0001', 'Pajak Air Tanah', '3000000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.01.12.01', '4.1.01.12.01.0001', 'Pajak Air Tanah', '3000000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.01.14.37', '4.1.01.14.37.0001', 'Pajak Mineral bukan Logam dan Batuan Lainnya', '2000000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.01.14.37', '4.1.01.14.37.0001', 'Pajak Mineral bukan Logam dan Batuan Lainnya', '2000000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.01.15.01', '4.1.01.15.01.0001', 'PBBP2', '1500000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.01.15.01', '4.1.01.15.01.0001', 'PBBP2', '1500000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.01.16.01', '4.1.01.16.01.0001', 'BPHTB-Pemindahan Hak', '3000000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.01.16.01', '4.1.01.16.01.0001', 'BPHTB-Pemindahan Hak', '3000000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.02.01.01', '4.1.02.01.01.0001', 'Retribusi Pelayanan Kesehatan di Puskesmas', '1226296054', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.02.01.01', '4.1.02.01.01.0001', 'Retribusi Pelayanan Kesehatan di Puskesmas', '1226296054', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.02.01.01', '4.1.02.01.01.0005', 'Retribusi Pelayanan Kesehatan di Rumah Sakit Umum Daerah', '3500000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.02.01.01', '4.1.02.01.01.0005', 'Retribusi Pelayanan Kesehatan di Rumah Sakit Umum Daerah', '3500000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.02.01.04', '4.1.02.01.04.0001', 'Retribusi Penyediaan Pelayanan Parkir di Tepi Jalan Umum', '50000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.02.01.04', '4.1.02.01.04.0001', 'Retribusi Penyediaan Pelayanan Parkir di Tepi Jalan Umum', '50000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.02.01.06', '4.1.02.01.06.0001', 'Retribusi Pengujian Kendaraan Bermotor', '300000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.02.01.06', '4.1.02.01.06.0001', 'Retribusi Pengujian Kendaraan Bermotor', '300000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.02.01.11', '4.1.02.01.11.0001', 'Retribusi Pelayanan Pengujian Alat-Alat Ukur, Takar, Timbang, dan Perlengkapannya', '13150000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.02.01.11', '4.1.02.01.11.0001', 'Retribusi Pelayanan Pengujian Alat-Alat Ukur, Takar, Timbang, dan Perlengkapannya', '13150000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.02.01.13', '4.1.02.01.13.0001', 'Retribusi Pengawasan dan Pengendalian Menara Telekomunikasi', '650000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.02.01.13', '4.1.02.01.13.0001', 'Retribusi Pengawasan dan Pengendalian Menara Telekomunikasi', '650000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.02.02.01', '4.1.02.02.01.0002', 'Retribusi Penyewaan Tanah', '300000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.02.02.01', '4.1.02.02.01.0002', 'Retribusi Penyewaan Tanah', '300000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.02.02.01', '4.1.02.02.01.0006', 'Retribusi Pemakaian Kendaraan Bermotor', '4000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.02.02.01', '4.1.02.02.01.0006', 'Retribusi Pemakaian Kendaraan Bermotor', '4000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.02.02.01', '4.1.02.02.01.0007', 'Retribusi Pemakaian Alat', '1075000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.02.02.01', '4.1.02.02.01.0007', 'Retribusi Pemakaian Alat', '1075000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.02.02.04', '4.1.02.02.04.0002', 'Retribusi Pelayanan Penyediaan Tempat Kegiatan Usaha', '600000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.02.02.04', '4.1.02.02.04.0002', 'Retribusi Pelayanan Penyediaan Tempat Kegiatan Usaha', '600000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.02.02.07', '4.1.02.02.07.0001', 'Retribusi Pelayanan Rumah Potong Hewan', '100000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.02.02.07', '4.1.02.02.07.0001', 'Retribusi Pelayanan Rumah Potong Hewan', '100000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.02.02.08', '4.1.02.02.08.0001', 'Retribusi Pelayanan Kepelabuhanan', '200000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.02.02.08', '4.1.02.02.08.0001', 'Retribusi Pelayanan Kepelabuhanan', '200000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.02.02.09', '4.1.02.02.09.0001', 'Retribusi Pelayanan Tempat Rekreasi dan Olahraga', '50000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.02.02.09', '4.1.02.02.09.0001', 'Retribusi Pelayanan Tempat Rekreasi dan Olahraga', '50000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.02.02.11', '4.1.02.02.11.0001', 'Retribusi Penjualan Produksi Hasil Usaha Daerah berupa Bibit atau Benih Tanaman', '250000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.02.02.11', '4.1.02.02.11.0001', 'Retribusi Penjualan Produksi Hasil Usaha Daerah berupa Bibit atau Benih Tanaman', '250000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.02.02.11', '4.1.02.02.11.0003', 'Retribusi Penjualan Produksi hasil Usaha Daerah berupa Bibit atau Benih Ikan', '75000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.02.02.11', '4.1.02.02.11.0003', 'Retribusi Penjualan Produksi hasil Usaha Daerah berupa Bibit atau Benih Ikan', '75000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.02.03.01', '4.1.02.03.01.0001', 'Retribusi Pemberian Izin Mendirikan Bangunan', '200000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.02.03.01', '4.1.02.03.01.0001', 'Retribusi Pemberian Izin Mendirikan Bangunan', '200000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.02.03.03', '4.1.02.03.03.0001', 'Retribusi Izin Trayek untuk Menyediakan Pelayanan Angkutan Umum', '5000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.02.03.03', '4.1.02.03.03.0001', 'Retribusi Izin Trayek untuk Menyediakan Pelayanan Angkutan Umum', '5000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.02.03.06', '4.1.02.03.06.0001', 'Retribusi Pemberian Perpanjangan IMTA kepada Pemberi Kerja Tenaga Kerja Asing', '200000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.02.03.06', '4.1.02.03.06.0001', 'Retribusi Pemberian Perpanjangan IMTA kepada Pemberi Kerja Tenaga Kerja Asing', '200000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.03.02.01', '4.1.03.02.01.0001', 'Bagian Laba yang Dibagikan kepada Pemerintah Daerah (Dividen) atas Penyertaan Modal pada BUMD (Lembaga Keuangan)', '5870000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.03.02.01', '4.1.03.02.01.0001', 'Bagian Laba yang Dibagikan kepada Pemerintah Daerah (Dividen) atas Penyertaan Modal pada BUMD (Lembaga Keuangan)', '5870000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.04.05.01', '4.1.04.05.01.0001', 'Jasa Giro pada Kas Daerah', '7000000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.04.05.01', '4.1.04.05.01.0001', 'Jasa Giro pada Kas Daerah', '7000000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.04.05.02', '4.1.04.05.02.0001', 'Jasa Giro pada Kas di Bendahara', '150000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.04.05.02', '4.1.04.05.02.0001', 'Jasa Giro pada Kas di Bendahara', '150000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.04.07.01', '4.1.04.07.01.0001', 'Pendapatan Bunga atas Penempatan Uang Pemerintah Daerah', '10000000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.04.07.01', '4.1.04.07.01.0001', 'Pendapatan Bunga atas Penempatan Uang Pemerintah Daerah', '10000000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.04.08.01', '4.1.04.08.01.0001', 'Tuntutan Ganti Kerugian Daerah terhadap Bendahara', '2000000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.04.08.01', '4.1.04.08.01.0001', 'Tuntutan Ganti Kerugian Daerah terhadap Bendahara', '2000000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.04.16.01', '4.1.04.16.01.0001', 'Pendapatan BLUD', '21500000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.04.16.01', '4.1.04.16.01.0001', 'Pendapatan BLUD', '21500000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.1.04.18.01', '4.1.04.18.01.0001', 'Pendapatan Dana Kapitasi JKN pada FKTP', '4503528000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.1.04.18.01', '4.1.04.18.01.0001', 'Pendapatan Dana Kapitasi JKN pada FKTP', '4503528000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.01', '4.2.01.01.01.0001', 'DBH Pajak Bumi dan Bangunan', '66604501000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.01', '4.2.01.01.01.0001', 'DBH Pajak Bumi dan Bangunan', '66604501000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.01', '4.2.01.01.01.0002', 'DBH PPh Pasal 21', '14582323000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.01', '4.2.01.01.01.0002', 'DBH PPh Pasal 21', '14582323000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.01', '4.2.01.01.01.0004', 'DBH Cukai Hasil Tembakau (CHT)', '3308890000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.01', '4.2.01.01.01.0004', 'DBH Cukai Hasil Tembakau (CHT)', '3308890000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.01', '4.2.01.01.01.0009', 'Dana Bagi Hasil (DBH) Sumber Daya Alam (SDA) Mineral dan Batubara-Royalty', '130147750000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.01', '4.2.01.01.01.0009', 'Dana Bagi Hasil (DBH) Sumber Daya Alam (SDA) Mineral dan Batubara-Royalty', '130147750000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.01', '4.2.01.01.01.0011', 'DBH Sumber Daya Alam (SDA) Kehutanan-Iuran Izin Usaha Pemanfaatan Hutan (IIUPH)', '216741000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.01', '4.2.01.01.01.0011', 'DBH Sumber Daya Alam (SDA) Kehutanan-Iuran Izin Usaha Pemanfaatan Hutan (IIUPH)', '216741000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.01', '4.2.01.01.01.0013', 'DBH Sumber Daya Alam (SDA) Perikanan', '1918826000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.01', '4.2.01.01.01.0013', 'DBH Sumber Daya Alam (SDA) Perikanan', '1918826000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.02', '4.2.01.01.02.0001', 'DAU', '371041136000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.02', '4.2.01.01.02.0001', 'DAU', '371041136000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0001', 'DAK Fisik-Bidang Pendidikan-Reguler-PAUD', '1210890000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0001', 'DAK Fisik-Bidang Pendidikan-Reguler-PAUD', '1210890000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0002', 'DAK Fisik-Bidang Pendidikan-Reguler-SD', '2832100000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0002', 'DAK Fisik-Bidang Pendidikan-Reguler-SD', '2832100000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0003', 'DAK Fisik-Bidang Pendidikan-Reguler-SMP', '4544474000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0003', 'DAK Fisik-Bidang Pendidikan-Reguler-SMP', '4544474000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0011', 'DAK Fisik-Bidang Pendidikan-Reguler-Perpustakaan Daerah', '200000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0011', 'DAK Fisik-Bidang Pendidikan-Reguler-Perpustakaan Daerah', '200000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0015', 'DAK Fisik-Bidang Kesehatan dan KB-Reguler-Pelayanan Kefarmasian', '3193891000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0015', 'DAK Fisik-Bidang Kesehatan dan KB-Reguler-Pelayanan Kefarmasian', '3193891000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0016', 'DAK Fisik-Bidang Kesehatan dan KB-Penugasan-Penurunan AKI dan AKB', '4006294000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0016', 'DAK Fisik-Bidang Kesehatan dan KB-Penugasan-Penurunan AKI dan AKB', '4006294000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0018', 'DAK Fisik-Bidang Kesehatan dan KB-Penugasan-Peningkatan Pencegahan dan Pengendalian Penyakit dan Sanitasi Total Berbasis Masyarakat', '1575301000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0018', 'DAK Fisik-Bidang Kesehatan dan KB-Penugasan-Peningkatan Pencegahan dan Pengendalian Penyakit dan Sanitasi Total Berbasis Masyarakat', '1575301000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0025', 'DAK Fisik-Bidang Kesehatan dan KB-Reguler-KB', '706196000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0025', 'DAK Fisik-Bidang Kesehatan dan KB-Reguler-KB', '706196000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0026', 'DAK Fisik-Bidang Kesehatan dan KB-Penugasan-Penurunan Stunting (KB)', '241115000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0026', 'DAK Fisik-Bidang Kesehatan dan KB-Penugasan-Penurunan Stunting (KB)', '241115000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0031', 'DAK Fisik-Bidang Pertanian-Penugasan-Pembangunan/Renovasi Sarana dan Prasarana Fisik Dasar Pembangunan Pertanian', '13967934000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0031', 'DAK Fisik-Bidang Pertanian-Penugasan-Pembangunan/Renovasi Sarana dan Prasarana Fisik Dasar Pembangunan Pertanian', '13967934000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0032', 'DAK Fisik-Bidang Kelautan dan Perikanan-Penugasan', '5030000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0032', 'DAK Fisik-Bidang Kelautan dan Perikanan-Penugasan', '5030000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0034', 'DAK Fisik-Bidang Jalan-Reguler-Jalan', '10649818000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0034', 'DAK Fisik-Bidang Jalan-Reguler-Jalan', '10649818000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0035', 'DAK Fisik-Bidang Jalan-Penugasan-Jalan', '17650004000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0035', 'DAK Fisik-Bidang Jalan-Penugasan-Jalan', '17650004000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0037', 'DAK Fisik-Bidang Air Minum-Reguler', '5860595000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0037', 'DAK Fisik-Bidang Air Minum-Reguler', '5860595000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0040', 'DAK Fisik-Bidang Sanitasi-Reguler', '4363025000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0040', 'DAK Fisik-Bidang Sanitasi-Reguler', '4363025000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0043', 'DAK Fisik-Bidang Irigasi-Penugasan', '5811709000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0043', 'DAK Fisik-Bidang Irigasi-Penugasan', '5811709000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0052', 'DAK Fisik-Bidang Kesehatan dan KB-Reguler-Peningkatan Kesiapan Sistem Kesehatan', '10214584000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0052', 'DAK Fisik-Bidang Kesehatan dan KB-Reguler-Peningkatan Kesiapan Sistem Kesehatan', '10214584000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0054', 'DAK Fisik-Bidang Transportasi Perdesaan-Reguler', '11588887000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0054', 'DAK Fisik-Bidang Transportasi Perdesaan-Reguler', '11588887000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0056', 'DAK Fisik-Bidang Perumahan dan Permukiman-Penugasan', '1048601000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.03', '4.2.01.01.03.0056', 'DAK Fisik-Bidang Perumahan dan Permukiman-Penugasan', '1048601000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.04', '4.2.01.01.04.0001', 'DAK Non Fisik-BOS Reguler', '22382910000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.04', '4.2.01.01.04.0001', 'DAK Non Fisik-BOS Reguler', '22382910000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.04', '4.2.01.01.04.0004', 'DAK Non Fisik-TPG PNSD', '41795528000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.04', '4.2.01.01.04.0004', 'DAK Non Fisik-TPG PNSD', '41795528000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.04', '4.2.01.01.04.0005', 'DAK Non Fisik-Tamsil Guru PNSD', '1302000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.04', '4.2.01.01.04.0005', 'DAK Non Fisik-Tamsil Guru PNSD', '1302000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.04', '4.2.01.01.04.0007', 'DAK Non Fisik-BOP PAUD', '4128600000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.04', '4.2.01.01.04.0007', 'DAK Non Fisik-BOP PAUD', '4128600000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.04', '4.2.01.01.04.0008', 'DAK Non Fisik-BOP Pendidikan Kesetaraan', '125520000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.04', '4.2.01.01.04.0008', 'DAK Non Fisik-BOP Pendidikan Kesetaraan', '125520000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.04', '4.2.01.01.04.0011', 'DAK Non Fisik-BOKKB-BOK', '8275577000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.04', '4.2.01.01.04.0011', 'DAK Non Fisik-BOKKB-BOK', '8275577000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.04', '4.2.01.01.04.0012', 'DAK Non Fisik-BOKKB-Pengawasan Obat dan Makanan', '13258000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.04', '4.2.01.01.04.0012', 'DAK Non Fisik-BOKKB-Pengawasan Obat dan Makanan', '13258000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.04', '4.2.01.01.04.0014', 'DAK Non Fisik-BOKKB-Jaminan Persalinan', '176149000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.04', '4.2.01.01.04.0014', 'DAK Non Fisik-BOKKB-Jaminan Persalinan', '176149000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.04', '4.2.01.01.04.0015', 'DAK Non Fisik-BOKKB-BOKB', '2494699000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.04', '4.2.01.01.04.0015', 'DAK Non Fisik-BOKKB-BOKB', '2494699000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.04', '4.2.01.01.04.0016', 'DAK Non Fisik-PK2UKM', '400800000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.04', '4.2.01.01.04.0016', 'DAK Non Fisik-PK2UKM', '400800000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.04', '4.2.01.01.04.0020', 'DAK Non Fisik-Fasilitasi Penanaman Modal', '393394000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.04', '4.2.01.01.04.0020', 'DAK Non Fisik-Fasilitasi Penanaman Modal', '393394000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.01.04', '4.2.01.01.04.0023', 'DAK Non Fisik-Dana Ketahanan Pangan Dan Pertanian', '296800000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.01.04', '4.2.01.01.04.0023', 'DAK Non Fisik-Dana Ketahanan Pangan Dan Pertanian', '296800000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.02.01', '4.2.01.02.01.0001', 'DID', '7632850000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.02.01', '4.2.01.02.01.0001', 'DID', '7632850000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.01.05.01', '4.2.01.05.01.0001', 'Dana Desa', '51401741000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.01.05.01', '4.2.01.05.01.0001', 'Dana Desa', '51401741000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.02.01.01', '4.2.02.01.01.0001', 'Pendapatan Bagi Hasil Pajak Kendaraan Bermotor', '9899004742', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.02.01.01', '4.2.02.01.01.0001', 'Pendapatan Bagi Hasil Pajak Kendaraan Bermotor', '9899004742', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.02.01.01', '4.2.02.01.01.0002', 'Pendapatan Bagi Hasil Bea Balik Nama Kendaraan Bermotor', '8653473050', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.02.01.01', '4.2.02.01.01.0002', 'Pendapatan Bagi Hasil Bea Balik Nama Kendaraan Bermotor', '8653473050', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.02.01.01', '4.2.02.01.01.0003', 'Pendapatan Bagi Hasil Pajak Bahan Bakar Kendaraan Bermotor', '44872328865', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.02.01.01', '4.2.02.01.01.0003', 'Pendapatan Bagi Hasil Pajak Bahan Bakar Kendaraan Bermotor', '44872328865', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.02.01.01', '4.2.02.01.01.0004', 'Pendapatan Bagi Hasil Pajak Air Permukaan', '55781250', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.02.01.01', '4.2.02.01.01.0004', 'Pendapatan Bagi Hasil Pajak Air Permukaan', '55781250', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.02.01.01', '4.2.02.01.01.0005', 'Pendapatan Bagi Hasil Pajak Rokok', '18616262716', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.02.01.01', '4.2.02.01.01.0005', 'Pendapatan Bagi Hasil Pajak Rokok', '18616262716', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.2.02.02.02', '4.2.02.02.02.0001', 'Bantuan Keuangan Khusus dari Pemerintah Daerah Provinsi', '500000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.2.02.02.02', '4.2.02.02.02.0001', 'Bantuan Keuangan Khusus dari Pemerintah Daerah Provinsi', '500000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.3.01.01.01', '4.3.01.01.01.0001', 'Pendapatan Hibah dari Pemerintah Pusat', '9890000000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.3.01.01.01', '4.3.01.01.01.0001', 'Pendapatan Hibah dari Pemerintah Pusat', '9890000000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.3.01.05.01', '4.3.01.05.01.0001', 'Sumbangan Pihak Ketiga/Sejenis', '656500000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.3.01.05.01', '4.3.01.05.01.0001', 'Sumbangan Pihak Ketiga/Sejenis', '656500000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1),
('4.3.03.02.01', '4.3.03.02.01.0002', 'Pendapatan Dana Kapitasi JKN pada FKTP Non BLUD', '3291936000', '0', 1, 2022, '2022-01-09 14:48:04', 0, NULL, 1),
('4.3.03.02.01', '4.3.03.02.01.0002', 'Pendapatan Dana Kapitasi JKN pada FKTP Non BLUD', '3291936000', '0', 1, 2022, '2022-01-11 04:10:16', 1, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `apbdsub7`
--

CREATE TABLE `apbdsub7` (
  `kdSub6` varchar(20) NOT NULL,
  `kdSub7` varchar(20) NOT NULL,
  `nmSub7` varchar(150) NOT NULL,
  `pagu7` varchar(25) DEFAULT NULL,
  `paguR7` varchar(25) NOT NULL DEFAULT '0',
  `selected7` tinyint(1) NOT NULL DEFAULT 1,
  `date7` year(4) NOT NULL DEFAULT current_timestamp(),
  `ins7` timestamp NOT NULL DEFAULT current_timestamp(),
  `noPembahasan7` int(2) NOT NULL DEFAULT 0,
  `keterangan7` varchar(250) DEFAULT NULL,
  `perkada7` int(3) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `app`
--

CREATE TABLE `app` (
  `kdApp` varchar(50) NOT NULL,
  `nmApp` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `app`
--

INSERT INTO `app` (`kdApp`, `nmApp`) VALUES
('MFC2G18-01', 'Tim Anggaran Pendapatan Daerah');

-- --------------------------------------------------------

--
-- Table structure for table `appfitur`
--

CREATE TABLE `appfitur` (
  `kdApp` varchar(50) NOT NULL,
  `kdFitur` varchar(50) NOT NULL,
  `nmFitur` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `appfitur`
--

INSERT INTO `appfitur` (`kdApp`, `kdFitur`, `nmFitur`) VALUES
('MFC2G18-01', 'MFC2G18-1/1', 'Login Sistem'),
('MFC2G18-01', 'MFC2G18-2/1', 'Dashboard'),
('MFC2G18-01', 'MFC2G18-2/2', 'Tambah Data Perda'),
('MFC2G18-01', 'MFC2G18-2/3', 'Perbarui Data Perda'),
('MFC2G18-01', 'MFC2G18-2/4', 'Hapus Data Perda'),
('MFC2G18-01', 'MFC2G18-3/1', 'Dinas'),
('MFC2G18-01', 'MFC2G18-3/2', 'Tambah Data Dinas'),
('MFC2G18-01', 'MFC2G18-3/3', 'Perbarui Data Dinas'),
('MFC2G18-01', 'MFC2G18-3/4', 'Hapus Data Dinas'),
('MFC2G18-01', 'MFC2G18-4/1', 'Member'),
('MFC2G18-01', 'MFC2G18-4/2', 'Tambah Data Member'),
('MFC2G18-01', 'MFC2G18-4/3', 'Perbarui Data Member'),
('MFC2G18-01', 'MFC2G18-4/4', 'Hapus Data Member'),
('MFC2G18-01', 'MFC2G18-5/1', 'renstra'),
('MFC2G18-01', 'MFC2G18-5/10', 'Hapus Data Program'),
('MFC2G18-01', 'MFC2G18-5/11', 'Tambah Data Kegiatan'),
('MFC2G18-01', 'MFC2G18-5/12', 'Perbarui Data Kegiatan'),
('MFC2G18-01', 'MFC2G18-5/13', 'Hapus Data Kegiatan'),
('MFC2G18-01', 'MFC2G18-5/14', 'Tambah Data Sub Kegiatan'),
('MFC2G18-01', 'MFC2G18-5/15', 'Perbarui Data Sub Kegiatan'),
('MFC2G18-01', 'MFC2G18-5/16', 'Hapus Data Sub Kegiatan'),
('MFC2G18-01', 'MFC2G18-5/2', 'Tambah Data Urusan'),
('MFC2G18-01', 'MFC2G18-5/3', 'Perbarui Data Urusan'),
('MFC2G18-01', 'MFC2G18-5/4', 'Hapus Data Urusan'),
('MFC2G18-01', 'MFC2G18-5/5', 'Tambah Data Bidang'),
('MFC2G18-01', 'MFC2G18-5/6', 'Perbarui Data Bidang'),
('MFC2G18-01', 'MFC2G18-5/7', 'Hapus Data Bidang'),
('MFC2G18-01', 'MFC2G18-5/8', 'Tambah Data Program'),
('MFC2G18-01', 'MFC2G18-5/9', 'Perbarui Data Program'),
('MFC2G18-01', 'MFC2G18-6/1', 'Usulan'),
('MFC2G18-01', 'MFC2G18-6/2', 'Tambah Data Usulan'),
('MFC2G18-01', 'MFC2G18-6/3', 'Perbarui Data Usulan'),
('MFC2G18-01', 'MFC2G18-6/4', 'Hapus Data Usulan'),
('MFC2G18-01', 'MFC2G18-6/5', 'Kirim Data Usulan'),
('MFC2G18-01', 'MFC2G18-7/1', 'Disposisi'),
('MFC2G18-01', 'MFC2G18-7/2', 'Tambah Data Disposisi'),
('MFC2G18-01', 'MFC2G18-7/3', 'Perbarui Data Disposisi'),
('MFC2G18-01', 'MFC2G18-7/4', 'Arsipkan Disposisi'),
('MFC2G18-01', 'MFC2G18-8/1', 'Kajian Teknis'),
('MFC2G18-01', 'MFC2G18-8/2', 'Tambah Data Kajian Teknis'),
('MFC2G18-01', 'MFC2G18-8/3', 'Perbarui Data Kajian Teknis'),
('MFC2G18-01', 'MFC2G18-9/1', 'Forum TAPD'),
('MFC2G18-01', 'MFC2G18-9/2', ' changed Forum TAPD'),
('MFC2G18-01', 'MFC2G18-9/3', ' set nomor pembahasan Forum TAPD'),
('MFC2G18-01', 'MFC2G18-9/4', ' aksi finalisasi Forum TAPD');

-- --------------------------------------------------------

--
-- Table structure for table `appkey`
--

CREATE TABLE `appkey` (
  `kdApp` varchar(15) NOT NULL,
  `kdFitur` varchar(15) NOT NULL,
  `kdMember` varchar(15) NOT NULL,
  `Kunci` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `appkey`
--

INSERT INTO `appkey` (`kdApp`, `kdFitur`, `kdMember`, `Kunci`) VALUES
('MFC2G18-01', 'MFC2G18-1/1', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-1/1', '2G18-memb-10', 0),
('MFC2G18-01', 'MFC2G18-1/1', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-1/1', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-1/1', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-1/1', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-1/1', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-1/1', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-1/1', '2G18-memb-6', 0),
('MFC2G18-01', 'MFC2G18-1/1', '2G18-memb-7', 0),
('MFC2G18-01', 'MFC2G18-1/1', '2G18-memb-8', 0),
('MFC2G18-01', 'MFC2G18-1/1', '2G18-memb-9', 0),
('MFC2G18-01', 'MFC2G18-2/1', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-2/1', '2G18-memb-10', 0),
('MFC2G18-01', 'MFC2G18-2/1', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-2/1', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-2/1', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-2/1', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-2/1', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-2/1', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-2/1', '2G18-memb-6', 0),
('MFC2G18-01', 'MFC2G18-2/1', '2G18-memb-7', 0),
('MFC2G18-01', 'MFC2G18-2/1', '2G18-memb-8', 0),
('MFC2G18-01', 'MFC2G18-2/1', '2G18-memb-9', 0),
('MFC2G18-01', 'MFC2G18-2/2', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-2/2', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-2/2', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-2/2', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-2/2', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-2/2', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-2/2', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-2/3', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-2/3', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-2/3', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-2/3', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-2/3', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-2/3', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-2/3', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-2/4', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-2/4', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-2/4', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-2/4', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-2/4', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-2/4', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-2/4', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-3/1', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-3/1', '2G18-memb-10', 0),
('MFC2G18-01', 'MFC2G18-3/1', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-3/1', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-3/1', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-3/1', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-3/1', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-3/1', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-3/1', '2G18-memb-6', 0),
('MFC2G18-01', 'MFC2G18-3/1', '2G18-memb-7', 0),
('MFC2G18-01', 'MFC2G18-3/1', '2G18-memb-8', 0),
('MFC2G18-01', 'MFC2G18-3/1', '2G18-memb-9', 0),
('MFC2G18-01', 'MFC2G18-3/2', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-3/2', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-3/2', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-3/2', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-3/2', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-3/2', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-3/2', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-3/3', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-3/3', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-3/3', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-3/3', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-3/3', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-3/3', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-3/3', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-3/4', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-3/4', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-3/4', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-3/4', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-3/4', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-3/4', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-3/4', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-4/1', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-4/1', '2G18-memb-10', 0),
('MFC2G18-01', 'MFC2G18-4/1', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-4/1', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-4/1', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-4/1', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-4/1', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-4/1', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-4/1', '2G18-memb-6', 0),
('MFC2G18-01', 'MFC2G18-4/1', '2G18-memb-7', 0),
('MFC2G18-01', 'MFC2G18-4/1', '2G18-memb-8', 0),
('MFC2G18-01', 'MFC2G18-4/1', '2G18-memb-9', 0),
('MFC2G18-01', 'MFC2G18-4/2', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-4/2', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-4/2', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-4/2', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-4/2', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-4/2', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-4/2', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-4/3', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-4/3', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-4/3', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-4/3', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-4/3', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-4/3', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-4/3', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-4/4', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-4/4', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-4/4', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-4/4', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-4/4', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-4/4', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-4/4', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-5/1', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-5/1', '2G18-memb-10', 0),
('MFC2G18-01', 'MFC2G18-5/1', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-5/1', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-5/1', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-5/1', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-5/1', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-5/1', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-5/1', '2G18-memb-6', 0),
('MFC2G18-01', 'MFC2G18-5/1', '2G18-memb-7', 0),
('MFC2G18-01', 'MFC2G18-5/1', '2G18-memb-8', 0),
('MFC2G18-01', 'MFC2G18-5/1', '2G18-memb-9', 0),
('MFC2G18-01', 'MFC2G18-5/10', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-5/10', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-5/10', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-5/10', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-5/10', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-5/10', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-5/10', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-5/11', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-5/11', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-5/11', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-5/11', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-5/11', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-5/11', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-5/11', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-5/12', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-5/12', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-5/12', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-5/12', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-5/12', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-5/12', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-5/12', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-5/13', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-5/13', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-5/13', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-5/13', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-5/13', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-5/13', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-5/13', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-5/14', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-5/14', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-5/14', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-5/14', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-5/14', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-5/14', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-5/14', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-5/15', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-5/15', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-5/15', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-5/15', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-5/15', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-5/15', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-5/15', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-5/16', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-5/16', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-5/16', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-5/16', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-5/16', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-5/16', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-5/16', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-5/2', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-5/2', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-5/2', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-5/2', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-5/2', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-5/2', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-5/2', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-5/3', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-5/3', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-5/3', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-5/3', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-5/3', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-5/3', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-5/3', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-5/4', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-5/4', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-5/4', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-5/4', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-5/4', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-5/4', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-5/4', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-5/5', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-5/5', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-5/5', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-5/5', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-5/5', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-5/5', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-5/5', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-5/6', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-5/6', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-5/6', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-5/6', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-5/6', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-5/6', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-5/6', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-5/7', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-5/7', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-5/7', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-5/7', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-5/7', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-5/7', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-5/7', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-5/8', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-5/8', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-5/8', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-5/8', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-5/8', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-5/8', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-5/8', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-5/9', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-5/9', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-5/9', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-5/9', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-5/9', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-5/9', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-5/9', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-6/1', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-6/1', '2G18-memb-10', 0),
('MFC2G18-01', 'MFC2G18-6/1', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-6/1', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-6/1', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-6/1', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-6/1', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-6/1', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-6/1', '2G18-memb-6', 0),
('MFC2G18-01', 'MFC2G18-6/1', '2G18-memb-7', 0),
('MFC2G18-01', 'MFC2G18-6/1', '2G18-memb-8', 0),
('MFC2G18-01', 'MFC2G18-6/1', '2G18-memb-9', 0),
('MFC2G18-01', 'MFC2G18-6/2', '2G18-memb-1', 1),
('MFC2G18-01', 'MFC2G18-6/2', '2G18-memb-10', 0),
('MFC2G18-01', 'MFC2G18-6/2', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-6/2', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-6/2', '2G18-memb-2', 1),
('MFC2G18-01', 'MFC2G18-6/2', '2G18-memb-3', 1),
('MFC2G18-01', 'MFC2G18-6/2', '2G18-memb-4', 1),
('MFC2G18-01', 'MFC2G18-6/2', '2G18-memb-5', 1),
('MFC2G18-01', 'MFC2G18-6/2', '2G18-memb-6', 0),
('MFC2G18-01', 'MFC2G18-6/2', '2G18-memb-7', 0),
('MFC2G18-01', 'MFC2G18-6/2', '2G18-memb-8', 0),
('MFC2G18-01', 'MFC2G18-6/2', '2G18-memb-9', 0),
('MFC2G18-01', 'MFC2G18-6/3', '2G18-memb-1', 1),
('MFC2G18-01', 'MFC2G18-6/3', '2G18-memb-10', 0),
('MFC2G18-01', 'MFC2G18-6/3', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-6/3', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-6/3', '2G18-memb-2', 1),
('MFC2G18-01', 'MFC2G18-6/3', '2G18-memb-3', 1),
('MFC2G18-01', 'MFC2G18-6/3', '2G18-memb-4', 1),
('MFC2G18-01', 'MFC2G18-6/3', '2G18-memb-5', 1),
('MFC2G18-01', 'MFC2G18-6/3', '2G18-memb-6', 0),
('MFC2G18-01', 'MFC2G18-6/3', '2G18-memb-7', 0),
('MFC2G18-01', 'MFC2G18-6/3', '2G18-memb-8', 0),
('MFC2G18-01', 'MFC2G18-6/3', '2G18-memb-9', 0),
('MFC2G18-01', 'MFC2G18-6/4', '2G18-memb-1', 1),
('MFC2G18-01', 'MFC2G18-6/4', '2G18-memb-10', 0),
('MFC2G18-01', 'MFC2G18-6/4', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-6/4', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-6/4', '2G18-memb-2', 1),
('MFC2G18-01', 'MFC2G18-6/4', '2G18-memb-3', 1),
('MFC2G18-01', 'MFC2G18-6/4', '2G18-memb-4', 1),
('MFC2G18-01', 'MFC2G18-6/4', '2G18-memb-5', 1),
('MFC2G18-01', 'MFC2G18-6/4', '2G18-memb-6', 0),
('MFC2G18-01', 'MFC2G18-6/4', '2G18-memb-7', 0),
('MFC2G18-01', 'MFC2G18-6/4', '2G18-memb-8', 0),
('MFC2G18-01', 'MFC2G18-6/4', '2G18-memb-9', 0),
('MFC2G18-01', 'MFC2G18-6/5', '2G18-memb-1', 1),
('MFC2G18-01', 'MFC2G18-6/5', '2G18-memb-10', 0),
('MFC2G18-01', 'MFC2G18-6/5', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-6/5', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-6/5', '2G18-memb-2', 1),
('MFC2G18-01', 'MFC2G18-6/5', '2G18-memb-3', 1),
('MFC2G18-01', 'MFC2G18-6/5', '2G18-memb-4', 1),
('MFC2G18-01', 'MFC2G18-6/5', '2G18-memb-5', 1),
('MFC2G18-01', 'MFC2G18-6/5', '2G18-memb-6', 0),
('MFC2G18-01', 'MFC2G18-6/5', '2G18-memb-7', 0),
('MFC2G18-01', 'MFC2G18-6/5', '2G18-memb-8', 0),
('MFC2G18-01', 'MFC2G18-6/5', '2G18-memb-9', 0),
('MFC2G18-01', 'MFC2G18-7/1', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-7/1', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-7/1', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-7/1', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-7/1', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-7/1', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-7/1', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-7/2', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-7/2', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-7/2', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-7/2', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-7/2', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-7/2', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-7/2', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-7/3', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-7/3', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-7/3', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-7/3', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-7/3', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-7/3', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-7/3', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-7/4', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-7/4', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-7/4', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-7/4', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-7/4', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-7/4', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-7/4', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-8/1', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-8/1', '2G18-memb-10', 0),
('MFC2G18-01', 'MFC2G18-8/1', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-8/1', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-8/1', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-8/1', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-8/1', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-8/1', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-8/1', '2G18-memb-7', 0),
('MFC2G18-01', 'MFC2G18-8/1', '2G18-memb-9', 0),
('MFC2G18-01', 'MFC2G18-8/2', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-8/2', '2G18-memb-10', 0),
('MFC2G18-01', 'MFC2G18-8/2', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-8/2', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-8/2', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-8/2', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-8/2', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-8/2', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-8/2', '2G18-memb-7', 0),
('MFC2G18-01', 'MFC2G18-8/2', '2G18-memb-9', 0),
('MFC2G18-01', 'MFC2G18-8/3', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-8/3', '2G18-memb-10', 0),
('MFC2G18-01', 'MFC2G18-8/3', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-8/3', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-8/3', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-8/3', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-8/3', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-8/3', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-8/3', '2G18-memb-7', 0),
('MFC2G18-01', 'MFC2G18-8/3', '2G18-memb-9', 0),
('MFC2G18-01', 'MFC2G18-9/1', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-9/1', '2G18-memb-10', 0),
('MFC2G18-01', 'MFC2G18-9/1', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-9/1', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-9/1', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-9/1', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-9/1', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-9/1', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-9/1', '2G18-memb-7', 0),
('MFC2G18-01', 'MFC2G18-9/1', '2G18-memb-9', 0),
('MFC2G18-01', 'MFC2G18-9/2', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-9/2', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-9/2', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-9/2', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-9/2', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-9/2', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-9/2', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-9/3', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-9/3', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-9/3', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-9/3', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-9/3', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-9/3', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-9/3', '2G18-memb-5', 0),
('MFC2G18-01', 'MFC2G18-9/4', '2G18-memb-1', 0),
('MFC2G18-01', 'MFC2G18-9/4', '2G18-memb-11', 0),
('MFC2G18-01', 'MFC2G18-9/4', '2G18-memb-12', 0),
('MFC2G18-01', 'MFC2G18-9/4', '2G18-memb-2', 0),
('MFC2G18-01', 'MFC2G18-9/4', '2G18-memb-3', 0),
('MFC2G18-01', 'MFC2G18-9/4', '2G18-memb-4', 0),
('MFC2G18-01', 'MFC2G18-9/4', '2G18-memb-5', 0);

-- --------------------------------------------------------

--
-- Table structure for table `ci_sessions`
--

CREATE TABLE `ci_sessions` (
  `id` varchar(128) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `timestamp` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `data` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `dbidang`
--

CREATE TABLE `dbidang` (
  `kdUrusan` varchar(4) NOT NULL,
  `kdBidang` varchar(15) NOT NULL,
  `nmBidang` varchar(250) NOT NULL,
  `paguBidang` varchar(25) DEFAULT NULL,
  `insBidang` timestamp NOT NULL DEFAULT current_timestamp(),
  `taBidang` year(4) NOT NULL DEFAULT current_timestamp(),
  `perkadaB` int(3) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dbidang`
--

INSERT INTO `dbidang` (`kdUrusan`, `kdBidang`, `nmBidang`, `paguBidang`, `insBidang`, `taBidang`, `perkadaB`) VALUES
('1', '101', 'URUSAN PEMERINTAHAN BIDANG PENDIDIKAN', '', '2021-09-30 12:27:27', 2021, 1),
('1', '102', 'URUSAN PEMERINTAHAN BIDANG KESEHATAN', '', '2021-09-30 12:27:27', 2021, 1),
('1', '103', 'URUSAN PEMERINTAHAN BIDANG PEKERJAAN UMUM DAN PENATAAN RUANG', '', '2021-09-30 12:27:27', 2021, 1),
('1', '104', 'URUSAN PEMERINTAHAN BIDANG PERUMAHAN DAN KAWASAN PERMUKIMAN', '', '2021-09-30 12:27:27', 2021, 1),
('1', '105', 'URUSAN PEMERINTAHAN BIDANG KETENTERAMAN DAN KETERTIBAN UMUM SERTA PERLINDUNGAN MASYARAKAT', '', '2021-09-30 12:27:27', 2021, 1),
('1', '106', 'URUSAN PEMERINTAHAN BIDANG SOSIAL', '', '2021-09-30 12:27:27', 2021, 1),
('2', '207', 'URUSAN PEMERINTAHAN BIDANG TENAGA KERJA', '', '2021-09-30 12:27:27', 2021, 1),
('2', '208', 'URUSAN PEMERINTAHAN BIDANG PEMBERDAYAAN PEREMPUAN DAN  PERLINDUNGAN ANAK', '', '2021-09-30 12:27:27', 2021, 1),
('2', '209', 'URUSAN PEMERINTAHAN BIDANG PANGAN', '', '2021-09-30 12:27:27', 2021, 1),
('2', '211', 'URUSAN PEMERINTAHAN BIDANG LINGKUNGAN HIDUP', '', '2021-09-30 12:27:27', 2021, 1),
('2', '213', 'URUSAN PEMERINTAHAN BIDANG PEMBERDAYAAN MASYARAKAT DAN DESA', '', '2021-09-30 12:27:27', 2021, 1),
('2', '214', 'URUSAN PEMERINTAHAN BIDANG PENGENDALIAN PENDUDUK DAN KELUARGA BERENCANA', '', '2021-09-30 12:27:27', 2021, 1),
('2', '215', 'URUSAN PEMERINTAH BIDANG PERHUBUNGAN', '', '2021-09-30 12:27:27', 2021, 1),
('2', '216', 'URUSAN PEMERINTAHAN BIDANG KOMUNIKASI DAN INFORMATIKA', '', '2021-09-30 12:27:27', 2021, 1),
('2', '217', 'URUSAN PEMERINTAHAN BIDANG KOPERASI, USAHA KECIL, DAN MENENGAH', '', '2021-09-30 12:27:27', 2021, 1),
('2', '218', 'URUSAN  PEMERINTAHAN  BIDANG  PENANAMAN MODAL', '', '2021-09-30 12:27:27', 2021, 1),
('2', '219', 'URUSAN PEMERINTAHAN BIDANG KEPEMUDAAN DAN OLAHRAGA', '', '2021-09-30 12:27:27', 2021, 1),
('2', '222', 'URUSAN PEMERINTAHAN BIDANG KEBUDAYAAN', '', '2021-09-30 12:27:27', 2021, 1),
('2', '223', 'URUSAN PEMERINTAHAN BIDANG PERPUSTAKAAN', '', '2021-09-30 12:27:27', 2021, 1),
('2', '224', 'URUSAN PEMERINTAHAN BIDANG KEARSIPAN', '', '2021-09-30 12:27:27', 2021, 1),
('3', '325', 'URUSAN PEMERINTAHAN BIDANG KELAUTAN DAN PERIKANAN', '', '2021-09-30 12:27:27', 2021, 1),
('3', '326', 'URUSAN PEMERINTAHAN BIDANG PARIWISATA', '', '2021-09-30 12:27:27', 2021, 1),
('3', '327', 'URUSAN PEMERINTAHAN BIDANG PERTANIAN', '', '2021-09-30 12:27:27', 2021, 1),
('3', '331', 'URUSAN PEMERINTAHAN BIDANG PERINDUSTRIAN', '', '2021-09-30 12:27:27', 2021, 1),
('3', '332', 'URUSAN PEMERINTAHAN BIDANG TRANSMIGRASI', '', '2021-09-30 12:27:27', 2021, 1),
('4', '401', 'SEKRETARIAT DAERAH', '', '2021-09-30 12:27:27', 2021, 1);

-- --------------------------------------------------------

--
-- Table structure for table `dinas`
--

CREATE TABLE `dinas` (
  `kdDinas` varchar(20) NOT NULL,
  `nmDinas` varchar(100) NOT NULL,
  `kadis` varchar(50) NOT NULL,
  `nip` varchar(50) NOT NULL,
  `pagu` varchar(30) NOT NULL DEFAULT '0',
  `paguR` varchar(30) NOT NULL DEFAULT '0',
  `kategori` varchar(15) NOT NULL,
  `perkada` int(3) NOT NULL DEFAULT 0,
  `tahun` year(4) NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dinas`
--

INSERT INTO `dinas` (`kdDinas`, `nmDinas`, `kadis`, `nip`, `pagu`, `paguR`, `kategori`, `perkada`, `tahun`) VALUES
('1-12-220-002', 'DINAS PENDIDIKAN DAN KEBUDAYAAN', 'Drs. H. Mukhlis, M. Si', '196207141992021001', '500000', '0', '', 0, 2021),
('1-12-220-002', 'DINAS PENDIDIKAN DAN KEBUDAYAAN', '-', '-', '255113779848', '0', '', 1, 2022),
('1-12-220-002', 'DINAS PENDIDIKAN DAN KEBUDAYAAN', 'Drs. H. Mukhlis, M. Si', '196207141992021001', '500000', '0', '', 1, 2023),
('1-12-220-002', 'DINAS PENDIDIKAN DAN KEBUDAYAAN', 'Drs. H. Mukhlis, M. Si', '196207141992021001', '500000', '0', '', 2, 2021),
('1-20-00-001', 'DINAS KESEHATAN', 'H. TUWUH, S.AP', '196405071985111003', '500000', '0', '', 0, 2021),
('1-20-00-001', 'DINAS KESEHATAN', '-', '-', '77177015207', '0', '', 1, 2022),
('1-20-00-001', 'DINAS KESEHATAN', 'H. TUWUH, S.AP', '196405071985111003', '500000', '0', '', 1, 2023),
('1-20-00-001', 'DINAS KESEHATAN', 'H. TUWUH, S.AP', '196405071985111003', '500000', '0', '', 2, 2021),
('1-20-00-00101', 'RSUD ASY-SYIFA', 'dr. CARLOF', '198201242010011014', '500000', '0', '', 0, 2021),
('1-20-00-00101', 'RSUD ASY-SYIFA', '-', '-', '52472234365', '0', '', 1, 2022),
('1-20-00-00101', 'RSUD ASY-SYIFA', 'dr. CARLOF', '198201242010011014', '500000', '0', '', 1, 2023),
('1-20-00-00101', 'RSUD ASY-SYIFA', 'dr. CARLOF', '198201242010011014', '500000', '0', '', 2, 2021),
('1-20-00-00102', 'PUSKESMAS TALIWANG', '', '', '500000', '0', '', 0, 2021),
('1-20-00-00102', 'PUSKESMAS TALIWANG', '-', '-', '4541671200', '0', '', 1, 2022),
('1-20-00-00102', 'PUSKESMAS TALIWANG', '', '', '500000', '0', '', 1, 2023),
('1-20-00-00102', 'PUSKESMAS TALIWANG', '', '', '500000', '0', '', 2, 2021),
('1-20-00-00103', 'PUSKESMAS SETELUK', '', '', '500000', '0', '', 0, 2021),
('1-20-00-00103', 'PUSKESMAS SETELUK', '-', '-', '2093454440', '0', '', 1, 2022),
('1-20-00-00103', 'PUSKESMAS SETELUK', '', '', '500000', '0', '', 1, 2023),
('1-20-00-00103', 'PUSKESMAS SETELUK', '', '', '500000', '0', '', 2, 2021),
('1-20-00-00104', 'PUSKESMAS JEREWEH', '', '', '500000', '0', '', 0, 2021),
('1-20-00-00104', 'PUSKESMAS JEREWEH', '-', '-', '1429782457', '0', '', 1, 2022),
('1-20-00-00104', 'PUSKESMAS JEREWEH', '', '', '500000', '0', '', 1, 2023),
('1-20-00-00104', 'PUSKESMAS JEREWEH', '', '', '500000', '0', '', 2, 2021),
('1-20-00-00105', 'PUSKESMAS BRANG REA', '', '', '500000', '0', '', 0, 2021),
('1-20-00-00105', 'PUSKESMAS BRANG REA', '-', '-', '2011905157', '0', '', 1, 2022),
('1-20-00-00105', 'PUSKESMAS BRANG REA', '', '', '500000', '0', '', 1, 2023),
('1-20-00-00105', 'PUSKESMAS BRANG REA', '', '', '500000', '0', '', 2, 2021),
('1-20-00-00106', 'PUSKESMAS MALUK', '', '', '500000', '0', '', 0, 2021),
('1-20-00-00106', 'PUSKESMAS MALUK', '-', '-', '1378399200', '0', '', 1, 2022),
('1-20-00-00106', 'PUSKESMAS MALUK', '', '', '500000', '0', '', 1, 2023),
('1-20-00-00106', 'PUSKESMAS MALUK', '', '', '500000', '0', '', 2, 2021),
('1-20-00-00107', 'PUSKESMAS SEKONGKANG', '', '', '500000', '0', '', 0, 2021),
('1-20-00-00107', 'PUSKESMAS SEKONGKANG', '-', '-', '713752700', '0', '', 1, 2022),
('1-20-00-00107', 'PUSKESMAS SEKONGKANG', '', '', '500000', '0', '', 1, 2023),
('1-20-00-00107', 'PUSKESMAS SEKONGKANG', '', '', '500000', '0', '', 2, 2021),
('1-20-00-00108', 'PUSKESMAS POTO TANO', '', '', '500000', '0', '', 0, 2021),
('1-20-00-00108', 'PUSKESMAS POTO TANO', '-', '-', '1462775200', '0', '', 1, 2022),
('1-20-00-00108', 'PUSKESMAS POTO TANO', '', '', '500000', '0', '', 1, 2023),
('1-20-00-00108', 'PUSKESMAS POTO TANO', '', '', '500000', '0', '', 2, 2021),
('1-20-00-00109', 'PUSKESMAS BRANG ENE', '', '', '500000', '0', '', 0, 2021),
('1-20-00-00109', 'PUSKESMAS BRANG ENE', '-', '-', '988519400', '0', '', 1, 2022),
('1-20-00-00109', 'PUSKESMAS BRANG ENE', '', '', '500000', '0', '', 1, 2023),
('1-20-00-00109', 'PUSKESMAS BRANG ENE', '', '', '500000', '0', '', 2, 2021),
('1-20-00-00110', 'PUSKESMAS TONGO', '', '', '500000', '0', '', 0, 2021),
('1-20-00-00110', 'PUSKESMAS TONGO', '-', '-', '639983300', '0', '', 1, 2022),
('1-20-00-00110', 'PUSKESMAS TONGO', '', '', '500000', '0', '', 1, 2023),
('1-20-00-00110', 'PUSKESMAS TONGO', '', '', '500000', '0', '', 2, 2021),
('1-30-00-001', 'DINAS PEKERJAAN UMUM PENATAAN RUANG PERUMAHAN PEMUKIMAN', 'AMAR NURMANSYAH, ST., M. Si', '197512282005011006', '500000', '0', '', 0, 2021),
('1-30-00-001', 'DINAS PEKERJAAN UMUM PENATAAN RUANG PERUMAHAN PEMUKIMAN', '-', '-', '151113710223', '0', '', 1, 2022),
('1-30-00-001', 'DINAS PEKERJAAN UMUM PENATAAN RUANG PERUMAHAN PEMUKIMAN', 'AMAR NURMANSYAH, ST., M. Si', '197512282005011006', '500000', '0', '', 1, 2023),
('1-30-00-001', 'DINAS PEKERJAAN UMUM PENATAAN RUANG PERUMAHAN PEMUKIMAN', 'AMAR NURMANSYAH, ST., M. Si', '197512282005011006', '500000', '0', '', 2, 2021),
('1-50-00-001', 'SATUAN POLISI PAMONG PRAJA', 'Drs. H. HAMZAH', '196306151993031011', '500000', '0', '', 0, 2021),
('1-50-00-001', 'SATUAN POLISI PAMONG PRAJA', '-', '-', '9717808452', '0', '', 1, 2022),
('1-50-00-001', 'SATUAN POLISI PAMONG PRAJA', 'Drs. H. HAMZAH', '196306151993031011', '500000', '0', '', 1, 2023),
('1-50-00-001', 'SATUAN POLISI PAMONG PRAJA', 'Drs. H. HAMZAH', '196306151993031011', '500000', '0', '', 2, 2021),
('1-50-00-002', 'DINAS PEMADAM KEBAKARAN', 'Ir. MUHAMMAD SALEH, M.Si.', '196412311992031227', '500000', '0', '', 0, 2021),
('1-50-00-002', 'DINAS PEMADAM KEBAKARAN', '-', '-', '5753706828', '0', '', 1, 2022),
('1-50-00-002', 'DINAS PEMADAM KEBAKARAN', 'Ir. MUHAMMAD SALEH, M.Si.', '196412311992031227', '500000', '0', '', 1, 2023),
('1-50-00-002', 'DINAS PEMADAM KEBAKARAN', 'Ir. MUHAMMAD SALEH, M.Si.', '196412311992031227', '500000', '0', '', 2, 2021),
('1-50-00-004', 'BADAN PENANGGULANGAN BENCANA DAERAH', 'Ir. LALU MUHAMMAD AZHAR', '196312311990031216', '500000', '0', '', 0, 2021),
('1-50-00-004', 'BADAN PENANGGULANGAN BENCANA DAERAH', '-', '-', '5014065230', '0', '', 1, 2022),
('1-50-00-004', 'BADAN PENANGGULANGAN BENCANA DAERAH', 'Ir. LALU MUHAMMAD AZHAR', '196312311990031216', '500000', '0', '', 1, 2023),
('1-50-00-004', 'BADAN PENANGGULANGAN BENCANA DAERAH', 'Ir. LALU MUHAMMAD AZHAR', '196312311990031216', '500000', '0', '', 2, 2021),
('1-60-00-001', 'DINAS SOSIAL', 'dr. H. SYAIFUDDIN', '196907181999031002', '500000', '0', '', 0, 2021),
('1-60-00-001', 'DINAS SOSIAL', '-', '-', '10296939697', '500000', '', 1, 2022),
('1-60-00-001', 'DINAS SOSIAL', 'dr. H. SYAIFUDDIN', '196907181999031002', '20500000', '0', '', 1, 2023),
('1-60-00-001', 'DINAS SOSIAL', 'dr. H. SYAIFUDDIN', '196907181999031002', '20500000', '0', '', 2, 2021),
('2-110-00-001', 'DINAS LINGKUNGAN HIDUP', 'PERIAL, S.K.M', '196809101988032012', '500000', '0', '', 0, 2021),
('2-110-00-001', 'DINAS LINGKUNGAN HIDUP', '-', '-', '10011523576', '0', '', 1, 2022),
('2-110-00-001', 'DINAS LINGKUNGAN HIDUP', 'PERIAL, S.K.M', '196809101988032012', '500000', '0', '', 1, 2023),
('2-110-00-001', 'DINAS LINGKUNGAN HIDUP', 'PERIAL, S.K.M', '196809101988032012', '500000', '0', '', 2, 2021),
('2-120-00-001', 'DINAS KEPENDUDUKAN DAN PENCATATAN SIPIL', 'IBRAHIM, S.Sos., MM', '196510281986111001', '500000', '0', '', 0, 2021),
('2-120-00-001', 'DINAS KEPENDUDUKAN DAN PENCATATAN SIPIL', '-', '-', '5556846134', '0', '', 1, 2022),
('2-120-00-001', 'DINAS KEPENDUDUKAN DAN PENCATATAN SIPIL', 'IBRAHIM, S.Sos., MM', '196510281986111001', '500000', '0', '', 1, 2023),
('2-120-00-001', 'DINAS KEPENDUDUKAN DAN PENCATATAN SIPIL', 'IBRAHIM, S.Sos., MM', '196510281986111001', '500000', '0', '', 2, 2021),
('2-130-00-001', 'DINAS PEMBERDAYAAN MASYARAKAT DAN DESA', 'Drs. MULYADI.,M. Si', '196512311986081006', '500000', '0', '', 0, 2021),
('2-130-00-001', 'DINAS PEMBERDAYAAN MASYARAKAT DAN DESA', '-', '-', '15498309456', '500000', '', 1, 2022),
('2-130-00-001', 'DINAS PEMBERDAYAAN MASYARAKAT DAN DESA', 'Drs. MULYADI.,M. Si', '196512311986081006', '1400500000', '0', '', 1, 2023),
('2-130-00-001', 'DINAS PEMBERDAYAAN MASYARAKAT DAN DESA', 'Drs. MULYADI.,M. Si', '196512311986081006', '1400500000', '0', '', 2, 2021),
('2-140-00-001', 'DINAS PENGENDALIAN PENDUDUK PEMBERDAYAAN PEREMPUAN PERLINDUNGAN ANAK DAN KELUARGA BERENCANA', 'MUHAMMAD SUHARNO, S. Sos', '196811101998031014', '500000', '0', '', 0, 2021),
('2-140-00-001', 'DINAS PENGENDALIAN PENDUDUK PEMBERDAYAAN PEREMPUAN PERLINDUNGAN ANAK DAN KELUARGA BERENCANA', '-', '-', '9935192080', '0', '', 1, 2022),
('2-140-00-001', 'DINAS PENGENDALIAN PENDUDUK PEMBERDAYAAN PEREMPUAN PERLINDUNGAN ANAK DAN KELUARGA BERENCANA', 'MUHAMMAD SUHARNO, S. Sos', '196811101998031014', '500000', '0', '', 1, 2023),
('2-140-00-001', 'DINAS PENGENDALIAN PENDUDUK PEMBERDAYAAN PEREMPUAN PERLINDUNGAN ANAK DAN KELUARGA BERENCANA', 'MUHAMMAD SUHARNO, S. Sos', '196811101998031014', '500000', '0', '', 2, 2021),
('2-150-00-001', 'DINAS PERHUBUNGAN', 'H. ABDUL HAMID, S. Pd., M. Pd', '196902201989031005', '500000', '0', '', 0, 2021),
('2-150-00-001', 'DINAS PERHUBUNGAN', '-', '-', '18967473779', '500000', '', 1, 2022),
('2-150-00-001', 'DINAS PERHUBUNGAN', 'H. ABDUL HAMID, S. Pd., M. Pd', '196902201989031005', '100500000', '0', '', 1, 2023),
('2-150-00-001', 'DINAS PERHUBUNGAN', 'H. ABDUL HAMID, S. Pd., M. Pd', '196902201989031005', '100500000', '0', '', 2, 2021),
('2-160-00-001', 'DINAS KOMUNIKASI DAN INFORMATIKA', 'Drs. BURHANUDDIN, MM', '196412121989031028', '500000', '0', '', 0, 2021),
('2-160-00-001', 'DINAS KOMUNIKASI DAN INFORMATIKA', '-', '-', '5288074468', '0', '', 1, 2022),
('2-160-00-001', 'DINAS KOMUNIKASI DAN INFORMATIKA', 'Drs. BURHANUDDIN, MM', '196412121989031028', '500000', '0', '', 1, 2023),
('2-160-00-001', 'DINAS KOMUNIKASI DAN INFORMATIKA', 'Drs. BURHANUDDIN, MM', '196412121989031028', '500000', '0', '', 2, 2021),
('2-173-313-3007', 'DINAS KOPERASI USAHA KECIL DAN MENENGAH PERINDUSTRIAN DAN PERDAGANGAN', 'Ir. AMIN SUDIONO, MM', '196512311992031218', '500000', '0', '', 0, 2021),
('2-173-313-3007', 'DINAS KOPERASI USAHA KECIL DAN MENENGAH PERINDUSTRIAN DAN PERDAGANGAN', '-', '-', '19227654107', '0', '', 1, 2022),
('2-173-313-3007', 'DINAS KOPERASI USAHA KECIL DAN MENENGAH PERINDUSTRIAN DAN PERDAGANGAN', 'Ir. AMIN SUDIONO, MM', '196512311992031218', '500000', '0', '', 1, 2023),
('2-173-313-3007', 'DINAS KOPERASI USAHA KECIL DAN MENENGAH PERINDUSTRIAN DAN PERDAGANGAN', 'Ir. AMIN SUDIONO, MM', '196512311992031218', '500000', '0', '', 2, 2021),
('2-180-00-001', 'DINAS PENANAMAN MODAL PELAYANAN TERPADU SATU PINTU', 'Drs. TAJUDDIN, M, Si', '196612311993111006', '500000', '0', '', 0, 2021),
('2-180-00-001', 'DINAS PENANAMAN MODAL PELAYANAN TERPADU SATU PINTU', '-', '-', '5424248748', '0', '', 1, 2022),
('2-180-00-001', 'DINAS PENANAMAN MODAL PELAYANAN TERPADU SATU PINTU', 'Drs. TAJUDDIN, M, Si', '196612311993111006', '500000', '0', '', 1, 2023),
('2-180-00-001', 'DINAS PENANAMAN MODAL PELAYANAN TERPADU SATU PINTU', 'Drs. TAJUDDIN, M, Si', '196612311993111006', '500000', '0', '', 2, 2021),
('2-240-00-001', 'DINAS KEARSIPAN DAN PERPUSTAKAAN', 'Drs. H. SYAMSUL KAMIL, MM', '196211121991031008', '500000', '0', '', 0, 2021),
('2-240-00-001', 'DINAS KEARSIPAN DAN PERPUSTAKAAN', '-', '-', '4358466422', '0', '', 1, 2022),
('2-240-00-001', 'DINAS KEARSIPAN DAN PERPUSTAKAAN', 'Drs. H. SYAMSUL KAMIL, MM', '196211121991031008', '500000', '0', '', 1, 2023),
('2-240-00-001', 'DINAS KEARSIPAN DAN PERPUSTAKAAN', 'Drs. H. SYAMSUL KAMIL, MM', '196211121991031008', '500000', '0', '', 2, 2021),
('2-70-00-001', 'DINAS TENAGA KERJA DAN TRANSMIGRASI', 'Ir. H. MUSLIMIN, M.Si', '196312311993031162', '500000', '0', '', 0, 2021),
('2-70-00-001', 'DINAS TENAGA KERJA DAN TRANSMIGRASI', '-', '-', '6470795424', '0', '', 1, 2022),
('2-70-00-001', 'DINAS TENAGA KERJA DAN TRANSMIGRASI', 'Ir. H. MUSLIMIN, M.Si', '196312311993031162', '500000', '0', '', 1, 2023),
('2-70-00-001', 'DINAS TENAGA KERJA DAN TRANSMIGRASI', 'Ir. H. MUSLIMIN, M.Si', '196312311993031162', '500000', '0', '', 2, 2021),
('2-90-00-001', 'DINAS KETAHANAN PANGAN', 'Ir. H. M. ALIMIN', '196412311992021226', '500000', '0', '', 0, 2021),
('2-90-00-001', 'DINAS KETAHANAN PANGAN', '-', '-', '10786044295', '500000', '', 1, 2022),
('2-90-00-001', 'DINAS KETAHANAN PANGAN', 'Ir. H. M. ALIMIN', '196412311992021226', '-819500000', '0', '', 1, 2023),
('2-90-00-001', 'DINAS KETAHANAN PANGAN', 'Ir. H. M. ALIMIN', '196412311992021226', '-819500000', '0', '', 2, 2021),
('3-250-00-001', 'DINAS PERIKANAN', 'Ir. MANSYUR SOFYAN.,MM', '196205251986031000', '500000', '0', '', 0, 2021),
('3-250-00-001', 'DINAS PERIKANAN', '-', '-', '13213064171', '500000', '', 1, 2022),
('3-250-00-001', 'DINAS PERIKANAN', 'Ir. MANSYUR SOFYAN.,MM', '196205251986031000', '113000000', '0', '', 1, 2023),
('3-250-00-001', 'DINAS PERIKANAN', 'Ir. MANSYUR SOFYAN.,MM', '196205251986031000', '113000000', '0', '', 2, 2021),
('3-260-00-001', 'DINAS PARIWISATA PEMUDA DAN OLAH RAGA', 'Ir. IGB. SUMBAWANTO,M.Si', '196211171990031009', '500000', '0', '', 0, 2021),
('3-260-00-001', 'DINAS PARIWISATA PEMUDA DAN OLAH RAGA', '-', '-', '10739959353', '0', '', 1, 2022),
('3-260-00-001', 'DINAS PARIWISATA PEMUDA DAN OLAH RAGA', 'Ir. IGB. SUMBAWANTO,M.Si', '196211171990031009', '500000', '0', '', 1, 2023),
('3-260-00-001', 'DINAS PARIWISATA PEMUDA DAN OLAH RAGA', 'Ir. IGB. SUMBAWANTO,M.Si', '196211171990031009', '500000', '0', '', 2, 2021),
('3-270-00-001', 'DINAS PERTANIAN', 'SUHADI, SP.,M.Si', '197405202005011010', '500000', '0', '', 0, 2021),
('3-270-00-001', 'DINAS PERTANIAN', '-', '-', '49962654216', '0', '', 1, 2022),
('3-270-00-001', 'DINAS PERTANIAN', 'SUHADI, SP.,M.Si', '197405202005011010', '500000', '0', '', 1, 2023),
('3-270-00-001', 'DINAS PERTANIAN', 'SUHADI, SP.,M.Si', '197405202005011010', '500000', '0', '', 2, 2021),
('4-10-00-001', 'SEKRETARIAT DAERAH', 'H. A. AZIS, SH. MH.', '196508181993031012', '500000', '0', 'TAPD', 0, 2021),
('4-10-00-001', 'SEKRETARIAT DAERAH', '-', '-', '38589892461', '0', 'TAPD', 1, 2022),
('4-10-00-001', 'SEKRETARIAT DAERAH', 'H. A. AZIS, SH. MH.', '196508181993031012', '500000', '0', 'TAPD', 1, 2023),
('4-10-00-001', 'SEKRETARIAT DAERAH', 'H. A. AZIS, SH. MH.', '196508181993031012', '500000', '0', 'TAPD', 2, 2021),
('4-20-00-001', 'SEKRETARIAT DPRD', 'Ir. IRHAS R. RAYES, M.Si.', '196511021990031011', '500000', '0', '', 0, 2021),
('4-20-00-001', 'SEKRETARIAT DPRD', '-', '-', '34516906593', '0', '', 1, 2022),
('4-20-00-001', 'SEKRETARIAT DPRD', 'Ir. IRHAS R. RAYES, M.Si.', '196511021990031011', '500000', '0', '', 1, 2023),
('4-20-00-001', 'SEKRETARIAT DPRD', 'Ir. IRHAS R. RAYES, M.Si.', '196511021990031011', '500000', '0', '', 2, 2021),
('5-15-40-002', 'BADAN PERENCANAAN, PENELITIAN DAN PENGEMBANGAN DAERAH', 'drh. HAIRUL, MM.', '197505072002121003', '500000', '0', 'TAPD', 0, 2021),
('5-15-40-002', 'BADAN PERENCANAAN, PENELITIAN DAN PENGEMBANGAN DAERAH', '-', '-', '8924294158', '0', 'TAPD', 1, 2022),
('5-15-40-002', 'BADAN PERENCANAAN, PENELITIAN DAN PENGEMBANGAN DAERAH', 'drh. HAIRUL, MM.', '197505072002121003', '500000', '0', 'TAPD', 1, 2023),
('5-15-40-002', 'BADAN PERENCANAAN, PENELITIAN DAN PENGEMBANGAN DAERAH', 'drh. HAIRUL, MM.', '197505072002121003', '500000', '0', 'TAPD', 2, 2021),
('5-20-00-001', 'BADAN PENGELOLAAN KEUANGAN DAERAH', 'NURDIN RAHMAN, SE', '196807081998031010', '500000', '0', 'TAPD', 0, 2021),
('5-20-00-001', 'BADAN PENGELOLAAN KEUANGAN DAERAH', '-', '-', '149395707117', '0', 'TAPD', 1, 2022),
('5-20-00-001', 'BADAN PENGELOLAAN KEUANGAN DAERAH', 'NURDIN RAHMAN, SE', '196807081998031010', '500000', '0', 'TAPD', 1, 2023),
('5-20-00-001', 'BADAN PENGELOLAAN KEUANGAN DAERAH', 'NURDIN RAHMAN, SE', '196807081998031010', '500000', '0', 'TAPD', 2, 2021),
('5-20-00-003', 'BADAN PENDAPATAN DAN ASET DAERAH', 'MUHAMMAD YUSUF, S. IP', '196512081986021006', '500000', '0', 'TAPD', 0, 2021),
('5-20-00-003', 'BADAN PENDAPATAN DAN ASET DAERAH', '-', '-', '18629288124', '0', 'TAPD', 1, 2022),
('5-20-00-003', 'BADAN PENDAPATAN DAN ASET DAERAH', 'MUHAMMAD YUSUF, S. IP', '196512081986021006', '500000', '0', 'TAPD', 1, 2023),
('5-20-00-003', 'BADAN PENDAPATAN DAN ASET DAERAH', 'MUHAMMAD YUSUF, S. IP', '196512081986021006', '500000', '0', 'TAPD', 2, 2021),
('5-30-00-001', 'BADAN KEPEGAWAIAN DAN PENGEMBANGAN SUMBERDAYA MANUSIA', 'H. ABDUL MALIK, S. Sos., M. Si', '196410081986031018', '500000', '0', '', 0, 2021),
('5-30-00-001', 'BADAN KEPEGAWAIAN DAN PENGEMBANGAN SUMBERDAYA MANUSIA', '-', '-', '6866452507', '0', '', 1, 2022),
('5-30-00-001', 'BADAN KEPEGAWAIAN DAN PENGEMBANGAN SUMBERDAYA MANUSIA', 'H. ABDUL MALIK, S. Sos., M. Si', '196410081986031018', '500000', '0', '', 1, 2023),
('5-30-00-001', 'BADAN KEPEGAWAIAN DAN PENGEMBANGAN SUMBERDAYA MANUSIA', 'H. ABDUL MALIK, S. Sos., M. Si', '196410081986031018', '500000', '0', '', 2, 2021),
('6-10-00-001', 'INSPEKTORAT DAERAH', 'I MADE BUDI ARTHA, S.Sos,. MM', '197403161993011001', '500000', '0', 'TAPD', 0, 2021),
('6-10-00-001', 'INSPEKTORAT DAERAH', '-', '-', '11574289592', '0', 'TAPD', 1, 2022),
('6-10-00-001', 'INSPEKTORAT DAERAH', 'I MADE BUDI ARTHA, S.Sos,. MM', '197403161993011001', '500000', '0', 'TAPD', 1, 2023),
('6-10-00-001', 'INSPEKTORAT DAERAH', 'I MADE BUDI ARTHA, S.Sos,. MM', '197403161993011001', '500000', '0', 'TAPD', 2, 2021),
('7-10-00-001', 'KECAMATAN TALIWANG', 'AKU NUR RAHMADIN,S.Pd', '197009241991021001', '500000', '0', '', 0, 2021),
('7-10-00-001', 'KECAMATAN TALIWANG', '-', '-', '8508454270', '0', '', 1, 2022),
('7-10-00-001', 'KECAMATAN TALIWANG', 'AKU NUR RAHMADIN,S.Pd', '197009241991021001', '500000', '0', '', 1, 2023),
('7-10-00-001', 'KECAMATAN TALIWANG', 'AKU NUR RAHMADIN,S.Pd', '197009241991021001', '500000', '0', '', 2, 2021),
('7-10-00-00101', 'KELURAHAN KUANG', '', '', '500000', '0', '', 0, 2021),
('7-10-00-00101', 'KELURAHAN KUANG', '-', '-', '740336000', '0', '', 1, 2022),
('7-10-00-00101', 'KELURAHAN KUANG', '', '', '500000', '0', '', 1, 2023),
('7-10-00-00101', 'KELURAHAN KUANG', '', '', '500000', '0', '', 2, 2021),
('7-10-00-00102', 'KELURAHAN DALAM', '', '', '500000', '0', '', 0, 2021),
('7-10-00-00102', 'KELURAHAN DALAM', '-', '-', '742300000', '0', '', 1, 2022),
('7-10-00-00102', 'KELURAHAN DALAM', '', '', '500000', '0', '', 1, 2023),
('7-10-00-00102', 'KELURAHAN DALAM', '', '', '500000', '0', '', 2, 2021),
('7-10-00-00103', 'KELURAHAN SAMPIR', '', '', '500000', '0', '', 0, 2021),
('7-10-00-00103', 'KELURAHAN SAMPIR', '-', '-', '735504000', '0', '', 1, 2022),
('7-10-00-00103', 'KELURAHAN SAMPIR', '', '', '500000', '0', '', 1, 2023),
('7-10-00-00103', 'KELURAHAN SAMPIR', '', '', '500000', '0', '', 2, 2021),
('7-10-00-00104', 'KELURAHAN BUGIS', '', '', '500000', '0', '', 0, 2021),
('7-10-00-00104', 'KELURAHAN BUGIS', '-', '-', '737008000', '0', '', 1, 2022),
('7-10-00-00104', 'KELURAHAN BUGIS', '', '', '500000', '0', '', 1, 2023),
('7-10-00-00104', 'KELURAHAN BUGIS', '', '', '500000', '0', '', 2, 2021),
('7-10-00-00105', 'KELURAHAN MENALA', '', '', '500000', '0', '', 0, 2021),
('7-10-00-00105', 'KELURAHAN MENALA', '-', '-', '743000000', '0', '', 1, 2022),
('7-10-00-00105', 'KELURAHAN MENALA', '', '', '500000', '0', '', 1, 2023),
('7-10-00-00105', 'KELURAHAN MENALA', '', '', '500000', '0', '', 2, 2021),
('7-10-00-00106', 'KELURAHAN TELAGA BERTONG', '', '', '500000', '0', '', 0, 2021),
('7-10-00-00106', 'KELURAHAN TELAGA BERTONG', '-', '-', '782900000', '0', '', 1, 2022),
('7-10-00-00106', 'KELURAHAN TELAGA BERTONG', '', '', '500000', '0', '', 1, 2023),
('7-10-00-00106', 'KELURAHAN TELAGA BERTONG', '', '', '500000', '0', '', 2, 2021),
('7-10-00-00107', 'KELURAHAN ARAB KENANGAN', '', '', '500000', '0', '', 0, 2021),
('7-10-00-00107', 'KELURAHAN ARAB KENANGAN', '-', '-', '737948000', '0', '', 1, 2022),
('7-10-00-00107', 'KELURAHAN ARAB KENANGAN', '', '', '500000', '0', '', 1, 2023),
('7-10-00-00107', 'KELURAHAN ARAB KENANGAN', '', '', '500000', '0', '', 2, 2021),
('7-10-00-002', 'KECAMATAN SETELUK', 'TAUFIK HIKMAWAN, S. PSi,. M. Si', '197702102005011007', '500000', '0', '', 0, 2021),
('7-10-00-002', 'KECAMATAN SETELUK', '-', '-', '2818700888', '0', '', 1, 2022),
('7-10-00-002', 'KECAMATAN SETELUK', 'TAUFIK HIKMAWAN, S. PSi,. M. Si', '197702102005011007', '500000', '0', '', 1, 2023),
('7-10-00-002', 'KECAMATAN SETELUK', 'TAUFIK HIKMAWAN, S. PSi,. M. Si', '197702102005011007', '500000', '0', '', 2, 2021),
('7-10-00-003', 'KECAMATAN JEREWEH', 'H. BADARUDDIN, S. Pd', '196510011986051001', '500000', '0', '', 0, 2021),
('7-10-00-003', 'KECAMATAN JEREWEH', '-', '-', '3009487178', '0', '', 1, 2022),
('7-10-00-003', 'KECAMATAN JEREWEH', 'H. BADARUDDIN, S. Pd', '196510011986051001', '500000', '0', '', 1, 2023),
('7-10-00-003', 'KECAMATAN JEREWEH', 'H. BADARUDDIN, S. Pd', '196510011986051001', '500000', '0', '', 2, 2021),
('7-10-00-004', 'KECAMATAN BRANG REA', 'KHUSNARTI, S. Pd', '197004251997032004', '500000', '0', '', 0, 2021),
('7-10-00-004', 'KECAMATAN BRANG REA', '-', '-', '2727557278', '0', '', 1, 2022),
('7-10-00-004', 'KECAMATAN BRANG REA', 'KHUSNARTI, S. Pd', '197004251997032004', '500000', '0', '', 1, 2023),
('7-10-00-004', 'KECAMATAN BRANG REA', 'KHUSNARTI, S. Pd', '197004251997032004', '500000', '0', '', 2, 2021),
('7-10-00-005', 'KECAMATAN SEKONGKANG', 'Syarifuddin, S. Pd.', '196907091993071003', '500000', '0', '', 0, 2021),
('7-10-00-005', 'KECAMATAN SEKONGKANG', '-', '-', '2542424011', '0', '', 1, 2022),
('7-10-00-005', 'KECAMATAN SEKONGKANG', 'Syarifuddin, S. Pd.', '196907091993071003', '500000', '0', '', 1, 2023),
('7-10-00-005', 'KECAMATAN SEKONGKANG', 'Syarifuddin, S. Pd.', '196907091993071003', '500000', '0', '', 2, 2021),
('7-10-00-006', 'KECAMATAN POTO TANO', 'AGUSMAN, S.Pt', '197108151994031008', '500000', '0', '', 0, 2021),
('7-10-00-006', 'KECAMATAN POTO TANO', '-', '-', '2504912542', '0', '', 1, 2022),
('7-10-00-006', 'KECAMATAN POTO TANO', 'AGUSMAN, S.Pt', '197108151994031008', '500000', '0', '', 1, 2023),
('7-10-00-006', 'KECAMATAN POTO TANO', 'AGUSMAN, S.Pt', '197108151994031008', '500000', '0', '', 2, 2021),
('7-10-00-007', 'KECAMATAN BRANG ENE', 'Drs. ABDUL RAZAK', '196802011995121004', '500000', '0', '', 0, 2021),
('7-10-00-007', 'KECAMATAN BRANG ENE', '-', '-', '2545984399', '0', '', 1, 2022),
('7-10-00-007', 'KECAMATAN BRANG ENE', 'Drs. ABDUL RAZAK', '196802011995121004', '500000', '0', '', 1, 2023),
('7-10-00-007', 'KECAMATAN BRANG ENE', 'Drs. ABDUL RAZAK', '196802011995121004', '500000', '0', '', 2, 2021),
('7-10-00-008', 'KECAMATAN MALUK', 'ANUGERAH', '196310191985021002', '500000', '0', '', 0, 2021),
('7-10-00-008', 'KECAMATAN MALUK', '-', '-', '2030144651', '0', '', 1, 2022),
('7-10-00-008', 'KECAMATAN MALUK', 'ANUGERAH', '196310191985021002', '500000', '0', '', 1, 2023),
('7-10-00-008', 'KECAMATAN MALUK', 'ANUGERAH', '196310191985021002', '500000', '0', '', 2, 2021),
('8-10-00-001', 'BADAN KESATUAN BANGSA DAN POLITIK', 'ABDUL HAMID, S, Pd', '196412311986051177', '500000', '0', '', 0, 2021),
('8-10-00-001', 'BADAN KESATUAN BANGSA DAN POLITIK', '-', '-', '5901620850', '0', '', 1, 2022),
('8-10-00-001', 'BADAN KESATUAN BANGSA DAN POLITIK', 'ABDUL HAMID, S, Pd', '196412311986051177', '500000', '0', '', 1, 2023),
('8-10-00-001', 'BADAN KESATUAN BANGSA DAN POLITIK', 'ABDUL HAMID, S, Pd', '196412311986051177', '500000', '0', '', 2, 2021);

-- --------------------------------------------------------

--
-- Table structure for table `disposisi`
--

CREATE TABLE `disposisi` (
  `kdDisposisi` int(3) NOT NULL,
  `kdUsulan` int(3) NOT NULL,
  `tglTerima` date NOT NULL COMMENT 'tanggal disposisi di terima oleh bupati',
  `tglPenyelsaian` date NOT NULL COMMENT 'tanggal Penyelasaian bupati',
  `tujuanBupati` varchar(100) NOT NULL COMMENT 'tujuan bupati',
  `nmTujuanBupati` varchar(150) NOT NULL,
  `isi` varchar(250) NOT NULL COMMENT 'isi disposisi bupati',
  `files` varchar(150) NOT NULL,
  `tglTerima1` date NOT NULL,
  `tglPenyelsaian1` date NOT NULL,
  `tujuanDisposisi1` varchar(100) NOT NULL,
  `nmTujuanDisposisi1` varchar(150) NOT NULL,
  `isi1` varchar(250) NOT NULL,
  `files1` varchar(150) NOT NULL,
  `tglTerima2` date NOT NULL,
  `tglPenyelsaian2` date NOT NULL,
  `tujuanDisposisi2` varchar(100) NOT NULL,
  `nmTujuanDisposisi2` varchar(150) NOT NULL,
  `isi2` varchar(200) NOT NULL,
  `files2` varchar(250) NOT NULL,
  `pertimbangan` varchar(250) NOT NULL,
  `filePertimbangan` varchar(150) NOT NULL,
  `kdMember` varchar(25) NOT NULL,
  `noPembahasan` int(3) NOT NULL,
  `perkada` int(3) NOT NULL DEFAULT 1,
  `tahun` year(4) NOT NULL,
  `ins` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(25) NOT NULL DEFAULT '-'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `disposisi`
--

INSERT INTO `disposisi` (`kdDisposisi`, `kdUsulan`, `tglTerima`, `tglPenyelsaian`, `tujuanBupati`, `nmTujuanBupati`, `isi`, `files`, `tglTerima1`, `tglPenyelsaian1`, `tujuanDisposisi1`, `nmTujuanDisposisi1`, `isi1`, `files1`, `tglTerima2`, `tglPenyelsaian2`, `tujuanDisposisi2`, `nmTujuanDisposisi2`, `isi2`, `files2`, `pertimbangan`, `filePertimbangan`, `kdMember`, `noPembahasan`, `perkada`, `tahun`, `ins`, `status`) VALUES
(1, 1, '2022-01-03', '2022-01-04', '4-10-00-001', 'SEKRETARIS DAERAH', 'next aja', 'logout-2022-01-06-05-02-30pm.png', '2022-01-05', '2022-01-06', '5-20-00-003', 'BADAN PENDAPATAN DAN ASET DAERAH', 'ok', 'mie-ayam-2022-01-06-05-02-49pm.jpg', '0000-00-00', '0000-00-00', '', '', '', '', '', '', '2G18-memb-2', 1, 1, 2021, '2022-01-06 22:02:30', 'terarsipkan'),
(2, 2, '2022-01-03', '2022-01-04', '4-10-00-001', 'SEKRETARIS DAERAH', 'next', 'informasi-2022-01-06-05-01-37pm.png', '2022-01-05', '2022-01-06', '5-20-00-001', 'BADAN PENGELOLAAN KEUANGAN DAERAH', 'ok', 'email-2022-01-06-05-01-58pm.png', '0000-00-00', '0000-00-00', '', '', '', '', '', '', '2G18-memb-2', 1, 1, 2021, '2022-01-06 22:01:37', 'terarsipkan'),
(3, 3, '2021-11-29', '2021-11-30', '4-10-00-001', 'SEKRETARIS DAERAH', 'sesuaikan', 'musrenbang-2022-01-06-04-53-16pm.jpg', '2022-01-03', '2022-01-04', '4-10-00-001', 'Asisten II', 'siapkan kajiannya', 'budgeting-2022-01-06-04-53-51pm.png', '2022-01-05', '2022-01-06', '5-15-40-002', 'BADAN PERENCANAAN, PENELITIAN DAN PENGEMBANGAN DAERAH', 'tunaikan ', 'mie-2022-01-06-04-54-25pm.jpg', 'bahas di tapd', 'assets/upload/files/PERBUP SPPD TA 2021-2022-01-06-04-57-25pm.pdf', '2G18-memb-2', 1, 1, 2021, '2022-01-06 21:53:16', 'terarsipkan'),
(4, 4, '2022-01-03', '2022-01-04', '4-10-00-001', 'SEKRETARIS DAERAH', 'proses sesuai ketentuan', 'informasi2-2022-01-06-04-51-13pm.png', '2022-01-05', '2022-01-06', '4-10-00-001', 'SEKRETARIS TAPD', 'sesuai kan', 'kec-2022-01-06-04-51-47pm.png', '0000-00-00', '0000-00-00', '', '', '', '', 'disetujui', 'assets/upload/files/MODUL MENJAR 2017_(1)-2022-01-06-04-56-59pm.pdf', '2G18-memb-2', 1, 1, 2021, '2022-01-06 21:51:13', 'terarsipkan'),
(1, 1, '2022-01-03', '2022-01-04', '4-10-00-001', 'SEKRETARIS DAERAH', 'ok', 'p33-2022-01-06-05-03-14pm.png', '2022-01-05', '2022-01-06', '5-20-00-003', 'BADAN PENDAPATAN DAN ASET DAERAH', 'ol', 'Picture2-2022-01-06-05-03-37pm.png', '0000-00-00', '0000-00-00', '', '', '', '', '', '', '2G18-memb-4', 1, 1, 2021, '2022-01-06 22:03:14', 'terarsipkan'),
(2, 2, '2022-01-03', '2022-01-05', '4-10-00-001', 'SEKRETARIS DAERAH', 'tes', 'ayamSuper-2022-01-01-10-55-39pm.jpg', '2022-01-04', '2022-01-05', '4-10-00-001', 'SEKRETARIS TAPD', 'tes', 'deposit-2022-01-01-10-55-53pm.png', '0000-00-00', '0000-00-00', '', '', '', '', '', '', '2G18-memb-4', 1, 1, 2021, '2022-01-02 03:55:39', 'terarsipkan'),
(1, 1, '2021-12-29', '2021-12-30', '4-10-00-001', 'SEKRETARIS DAERAH', 'Proses sesuai prosedur', 'd1-2022-01-11-08-43-46am.png', '2022-01-03', '2022-01-03', '4-10-00-001', 'Asisten II', 'Untuk bahan rapat TAPD', 'd2-2022-01-11-08-46-45am.png', '2022-01-03', '2022-01-03', '4-10-00-001', 'SEKRETARIS TAPD', 'Inventarisir sebagai bahan rapat TAPD', 'd33-2022-01-11-08-49-26am.png', 'Disetujui untuk selanjutnya dibahas di Forum TAPD', 'assets/upload/files/pertimbangan-2022-01-11-08-58-32am.pdf', '2G18-memb-2', 1, 1, 2022, '2022-01-11 13:43:46', 'terarsipkan');

-- --------------------------------------------------------

--
-- Table structure for table `dkegiatan`
--

CREATE TABLE `dkegiatan` (
  `kdProgram` varchar(15) NOT NULL,
  `kdKegiatan` varchar(15) NOT NULL,
  `nmKegiatan` varchar(250) NOT NULL,
  `paguKegiatan` varchar(25) DEFAULT NULL,
  `insKegiatan` timestamp NOT NULL DEFAULT current_timestamp(),
  `taKegiatan` year(4) NOT NULL DEFAULT current_timestamp(),
  `perkadaK` int(3) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dkegiatan`
--

INSERT INTO `dkegiatan` (`kdProgram`, `kdKegiatan`, `nmKegiatan`, `paguKegiatan`, `insKegiatan`, `taKegiatan`, `perkadaK`) VALUES
('10102', '101022.01', 'Pengelolaan Pendidikan Sekolah Dasar', '', '2021-09-30 12:46:08', 2021, 1),
('10102', '101022.02', 'Pengelolaan Pendidikan Sekolah Menengah Pertama', '', '2021-09-30 12:46:08', 2021, 1),
('10102', '101022.03', 'Pengelolaan Pendidikan Anak Usia Dini (PAUD)', '', '2021-09-30 12:46:08', 2021, 1),
('10102', '101022.04', 'Pengelolaan Pendidikan Nonformal/Kesetaraan', '', '2021-09-30 12:46:08', 2021, 1),
('10202', '102022.01', 'Penyediaan Fasilitas Pelayanan Kesehatan untuk UKM dan UKP Kewenangan Daerah Kabupaten/Kota', '', '2021-09-30 12:46:08', 2021, 1),
('10302', '103022.01', 'Pengelolaan SDA dan Bangunan Pengaman Pantai pada Wilayah Sungai (WS) dalam 1 (satu) Daerah Kabupaten/Kota', '', '2021-09-30 12:46:08', 2021, 1),
('10303', '103032.01', 'Pengelolaan dan Pengembangan Sistem Penyediaan Air Minum (SPAM) di Daerah Kabupaten/Kota', '', '2021-09-30 12:46:08', 2021, 1),
('10305', '103052.01', 'Pengelolaan dan Pengembangan Sistem Air Limbah Domestik dalam Daerah Kabupaten/Kota', '', '2021-09-30 12:46:08', 2021, 1),
('10306', '103062.01', 'Pengelolaan dan Pengembangan Sistem Drainase yang Terhubung Langsung dengan Sungai dalam Daerah Kabupaten/Kota', '', '2021-09-30 12:46:08', 2021, 1),
('10310', '103102.01', 'Penyelenggaraan Jalan Kabupaten/Kota', '', '2021-09-30 12:46:08', 2021, 1),
('10311', '103112.01', 'Penyelenggaraan Pelatihan Tenaga Terampil Konstruksi', '', '2021-09-30 12:46:08', 2021, 1),
('10402', '104022.03', 'Pembangunan dan Rehabilitasi Rumah Korban Bencana atau Relokasi Program Kabupaten/Kota', '', '2021-09-30 12:46:08', 2021, 1),
('10403', '104032.03', 'Peningkatan Kualitas Kawasan Permukiman Kumuh dengan Luas di Bawah 10 (sepuluh) Ha', '', '2021-09-30 12:46:08', 2021, 1),
('10502', '105022.01', '\"Penanganan Gangguan Ketenteraman dan Ketertiban Umum dalam 1 (satu) Daerah Kabupaten/Kota\"', '', '2021-09-30 12:46:08', 2021, 1),
('10503', '105032.01', 'Pelayanan Informasi Rawan Bencana Kabupaten/Kota', '', '2021-09-30 12:46:08', 2021, 1),
('10503', '105032.02', 'Pelayanan Pencegahan dan Kesiapsiagaan Terhadap Bencana', '', '2021-09-30 12:46:08', 2021, 1),
('10504', '105042.01', 'Pencegahan, Pengendalian, Pemadaman, Penyelamatan dan Penanganan Bahan Berbahaya dan Beracun Kebakaran Kabupaten/Kota', '', '2021-09-30 12:46:08', 2021, 1),
('10504', '105042.04', 'Pemberdayaan Masyarakat dalam Pencegahan Kebakaran ', '', '2021-09-30 12:46:08', 2021, 1),
('10603', '106032.01', 'Pemulangan Warga Negara Migran Korban Tindak Kekerasan dari Titik Debarkasi di Daerah Kabupaten/Kota untuk dipulangkan ke Desa/Kelurahan Asal', '', '2021-09-30 12:46:08', 2021, 1),
('10604', '106042.01', 'Rehabilitasi Sosial Dasar Penyandang Disabilitas Terlantar, Anak Terlantar, Lanjut Usia Terlantar, serta Gelandangan Pengemis di Luar Panti Sosial', '', '2021-09-30 12:46:08', 2021, 1),
('10604', '106042.02', 'Rehabilitasi Sosial Penyandang Masalah Kesejahteraan Sosial (PMKS) Lainnya Bukan Korban HIV/AIDS dan NAPZA di Luar Panti Sosial', '', '2021-09-30 12:46:08', 2021, 1),
('10605', '106052.02', 'Pengelolaan Data Fakir Miskin Cakupan Daerah Kabupaten/Kota', '', '2021-09-30 12:46:08', 2021, 1),
('20703', '207032.01', 'Pelaksanaan Pelatihan berdasarkan Unit Kompetensi', '', '2021-09-30 12:46:08', 2021, 1),
('20703', '207032.02', 'Pembinaan Lembaga Pelatihan Kerja Swasta', '', '2021-09-30 12:46:08', 2021, 1),
('20704', '207042.04', 'Pelindungan PMI (Pra dan Purna Penempatan) di Daerah Kabupaten/Kota', '', '2021-09-30 12:46:08', 2021, 1),
('20705', '207052.02', 'Pencegahan dan Penyelesaian Perselisihan Hubungan Industrial, Mogok Kerja dan Penutupan Perusahaan di Daerah Kabupaten/Kota', '', '2021-09-30 12:46:08', 2021, 1),
('20802', '208022.02', '\"Pemberdayaan Perempuan Bidang Politik, Hukum, Sosial, dan Ekonomi pada Organisasi Kemasyarakatan Kewenangan Kabupaten/Kota\"', '', '2021-09-30 12:46:08', 2021, 1),
('20902', '209022.01', 'Penyediaan Infrastruktur dan Seluruh Pendukung Kemandirian Pangan Sesuai Kewenangan Daerah Kabupaten/Kota', '', '2021-09-30 12:46:08', 2021, 1),
('20903', '209032.01', 'Penyediaan dan Penyaluran Pangan Pokok atau Pangan Lainnya Sesuai Dengan Kebutuhan Daerah Kabupaten/Kota dalam rangka Stabilisasi Pasokan dan Harga Pa', '', '2021-09-30 12:46:08', 2021, 1),
('20903', '209032.04', 'Pelaksanaan Pencapaian Target Konsumsi Pangan Perkapita/Tahun sesuai dengan Angka Kecukupan Gizi', '', '2021-09-30 12:46:08', 2021, 1),
('21104', '211042.01', 'Pengelolaan Keanekaragaman Hayati Kabupaten/Kota', '', '2021-09-30 12:46:08', 2021, 1),
('21109', '211092.01', 'Pemberian Penghargaan Lingkungan Hidup Tingkat Daerah Kabupaten/Kota', '', '2021-09-30 12:46:08', 2021, 1),
('21111', '211112.01', 'Pengelolaan Sampah', '', '2021-09-30 12:46:08', 2021, 1),
('21302', '213022.01', 'Penyelenggaraan Penataan Desa', '', '2021-09-30 12:46:08', 2021, 1),
('21304', '213042.01', 'Pembinaan dan Pengawasan Penyelenggaraan Administrasi Pemerintahan Desa', '', '2021-09-30 12:46:08', 2021, 1),
('21305', '213052.01', 'Pemberdayaan Lembaga Kemasyarakatan yang Bergerak di Bidang Pemberdayaan Desa dan Lembaga Adat Tingkat Daerah Kabupaten/Kota serta Pemberdayaan Masyar', '', '2021-09-30 12:46:08', 2021, 1),
('21403', '214032.04', 'Pemberdayaan dan Peningkatan Peran serta Organisasi Kemasyarakatan Tingkat Daerah Kabupaten/Kota dalam Pelaksanaan Pelayanan dan Pembinaan Kesertaan B', '', '2021-09-30 12:46:08', 2021, 1),
('21404', '214042.01', 'Pelaksanaan Pembangunan Keluarga melalui Pembinaan Ketahanan dan Kesejahteraan Keluarga', '', '2021-09-30 12:46:08', 2021, 1),
('21404', '214042.02', 'Pelaksanaan dan Peningkatan Peran Serta Organisasi Kemasyarakatan Tingkat Daerah Kabupaten/Kota dalam Pembangunan Keluarga Melalui Pembinaan Ketahanan', '', '2021-09-30 12:46:08', 2021, 1),
('21502', '215022.02', 'Penyediaan Perlengkapan Jalan di Jalan Kabupaten/Kota', '', '2021-09-30 12:46:08', 2021, 1),
('21602', '216022.01', 'Pengelolaan Informasi dan Komunikasi Publik Pemerintah Daerah Kabupaten/Kota', '', '2021-09-30 12:46:08', 2021, 1),
('21603', '216032.02', 'Pengelolaan e-government Di Lingkup Pemerintah Daerah Kabupaten/Kota', '', '2021-09-30 12:46:08', 2021, 1),
('21706', '217062.01', 'Pemberdayaan dan Perlindungan Koperasi yang Keanggotaannya dalam Daerah Kabupaten/ Kota', '', '2021-09-30 12:46:08', 2021, 1),
('21707', '217072.01', 'Pemberdayaan Usaha Mikro yang Dilakukan Melalui Pendataan, Kemitraan, Kemudahan Perijinan, Penguatan Kelembagaan dan Koordinasi dengan Para Pemangku K', '', '2021-09-30 12:46:08', 2021, 1),
('21804', '218042.01', 'Pelayanan Perizinan dan Nonperizinan Secara Terpadu Satu Pintu Dibidang Penanaman Modal yang Menjadi Kewenangan Daerah Kabupaten/Kota', '', '2021-09-30 12:46:08', 2021, 1),
('21903', '219032.01', 'Pembinaan dan Pengembangan Olahraga Pendidikan Pada Jenjang Pendidikan yang Menjadi Kewenangan Daerah Kabupaten/Kota', '', '2021-09-30 12:46:08', 2021, 1),
('22202', '222022.01', 'Pengelolaan Kebudayaan yang Masyarakat Pelakunya dalam Daerah Kabupaten/Kota', '', '2021-09-30 12:46:08', 2021, 1),
('22202', '222022.02', 'Pelestarian Kesenian Tradisional yang Masyarakat Pelakunya dalam Daerah Kabupaten/Kota', '', '2021-09-30 12:46:08', 2021, 1),
('22202', '222022.03', 'Pembinaan Lembaga Adat yang Penganutnya dalam Daerah Kabupaten/Kota', '', '2021-09-30 12:46:08', 2021, 1),
('22302', '223022.01', 'Pengelolaan Perpustakaan Tingkat Daerah Kabupaten/Kota', '', '2021-09-30 12:46:08', 2021, 1),
('22403', '224032.03', 'Penyelamatan Arsip Perangkat Daerah Kabupaten/Kota yang Digabung dan/atau Dibubarkan, dan Pemekaran Daerah Kecamatan dan Desa/Kelurahan', '', '2021-09-30 12:46:08', 2021, 1),
('32503', '325032.01', 'Pengelolaan Penangkapan Ikan di Wilayah Sungai, Danau, Waduk, Rawa, dan Genangan Air Lainnya Yang Dapat Diusahakan dalam 1 (Satu) Daerah Kabupaten/ Ko', '', '2021-09-30 12:46:08', 2021, 1),
('32503', '325032.02', 'Pemberdayaan Nelayan Kecil Dalam Daerah Kabupaten/Kota', '', '2021-09-30 12:46:08', 2021, 1),
('32504', '325042.02', 'Pemberdayaan Pembudidaya Ikan kecil', '', '2021-09-30 12:46:08', 2021, 1),
('32504', '325042.04', 'Pengelolaan Pembudidayaan Ikan', '', '2021-09-30 12:46:08', 2021, 1),
('32602', '326022.02', 'Pengelolaan Kawasan Strategis Pariwisata Kabupaten/Kota', '', '2021-09-30 12:46:08', 2021, 1),
('32702', '327022.01', 'Pengawasan Penggunaan Sarana Pertanian', '', '2021-09-30 12:46:08', 2021, 1),
('32702', '327022.02', 'Pengelolaan Sumber Daya Genetik (SDG) Hewan, Tumbuhan, dan Mikro Organisme Kewenangan Kabupaten/Kota', '', '2021-09-30 12:46:08', 2021, 1),
('32702', '327022.06', 'Penyediaan Benih/Bibit Ternak dan Hijauan Pakan Ternak yang Sumbernya dalam 1 (satu) Daerah Kabupaten/Kota Lain', '', '2021-09-30 12:46:08', 2021, 1),
('32703', '327032.02', 'Pembangunan Prasarana Pertanian', '', '2021-09-30 12:46:08', 2021, 1),
('32703', '327032.03', 'Pengelolaan Wilayah Sumber Bibit Ternak dan Rumpun/Galur Ternak dalam Daerah Kabupaten/ Kota', '', '2021-09-30 12:46:08', 2021, 1),
('32705', '327052.01', 'Pengendalian dan Penanggulangan Bencana Pertanian Kabupaten/Kota', '', '2021-09-30 12:46:08', 2021, 1),
('32707', '327072.01', 'Pelaksanaan Penyuluhan Pertanian', '', '2021-09-30 12:46:08', 2021, 1),
('33102', '331022.01', 'Penyusunan, Penerapan dan Evaluasi Rencana Pembangunan Industri Kabupaten/Kota', '', '2021-09-30 12:46:08', 2021, 1),
('33204', '332042.01', 'Pengembangan Satuan Permukiman pada Tahap Kemandirian', '', '2021-09-30 12:46:08', 2021, 1),
('40102', '401022.02', 'Pelaksanaan Kebijakan Kesejahteraan Rakyat', '', '2021-09-30 12:46:08', 2021, 1);

-- --------------------------------------------------------

--
-- Table structure for table `dokumentasi`
--

CREATE TABLE `dokumentasi` (
  `kdDokumentasi` int(3) NOT NULL,
  `noPembahasan` int(3) NOT NULL,
  `perkada` int(3) NOT NULL,
  `tahun` year(4) NOT NULL DEFAULT current_timestamp(),
  `files` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dokumentasi`
--

INSERT INTO `dokumentasi` (`kdDokumentasi`, `noPembahasan`, `perkada`, `tahun`, `files`) VALUES
(2, 1, 1, 2023, 'kec-2021-12-18-01-14-56am.png'),
(3, 1, 1, 2023, 'mapicon-2021-12-18-06-46-19pm.png'),
(4, 1, 1, 2023, 'petaindonesiasipd-2021-12-18-06-46-32pm.png');

-- --------------------------------------------------------

--
-- Table structure for table `dprogram`
--

CREATE TABLE `dprogram` (
  `kdBidang` varchar(15) NOT NULL,
  `kdProgram` varchar(15) NOT NULL,
  `nmProgram` varchar(250) NOT NULL,
  `paguProgram` varchar(25) DEFAULT NULL,
  `insProgram` timestamp NOT NULL DEFAULT current_timestamp(),
  `taProgram` year(4) NOT NULL DEFAULT current_timestamp(),
  `perkadaP` int(3) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dprogram`
--

INSERT INTO `dprogram` (`kdBidang`, `kdProgram`, `nmProgram`, `paguProgram`, `insProgram`, `taProgram`, `perkadaP`) VALUES
('101', '10102', 'PROGRAM PENGELOLAAN PENDIDIKAN', '', '2021-09-30 12:32:05', 2021, 1),
('102', '10202', 'PROGRAM PEMENUHAN UPAYA KESEHATAN PERORANGAN DAN UPAYA KESEHATAN MASYARAKAT', '', '2021-09-30 12:32:05', 2021, 1),
('103', '10302', 'PROGRAM PENGELOLAAN SUMBER DAYA AIR (SDA)', '', '2021-09-30 12:32:05', 2021, 1),
('103', '10303', 'PROGRAM PENGELOLAAN DAN PENGEMBANGAN SISTEM PENYEDIAAN AIR MINUM', '', '2021-09-30 12:32:05', 2021, 1),
('103', '10305', 'PROGRAM PENGELOLAAN DAN PENGEMBANGAN SISTEM AIR LIMBAH', '', '2021-09-30 12:32:05', 2021, 1),
('103', '10306', 'PROGRAM PENGELOLAAN DAN PENGEMBANGAN SISTEM DRAINASE', '', '2021-09-30 12:32:05', 2021, 1),
('103', '10310', 'PROGRAM PENYELENGGARAAN JALAN', '', '2021-09-30 12:32:05', 2021, 1),
('103', '10311', 'PROGRAM PENGEMBANGAN JASA KONSTRUKSI', '', '2021-09-30 12:32:05', 2021, 1),
('104', '10402', 'PROGRAM PENGEMBANGAN PERUMAHAN', '', '2021-09-30 12:32:05', 2021, 1),
('104', '10403', 'PROGRAM KAWASAN PERMUKIMAN', '', '2021-09-30 12:32:05', 2021, 1),
('105', '10502', 'PROGRAM PENINGKATAN KETENTERAMAN DAN KETERTIBAN UMUM', '', '2021-09-30 12:32:05', 2021, 1),
('105', '10503', 'PROGRAM PENANGGULANGAN BENCANA', '', '2021-09-30 12:32:05', 2021, 1),
('105', '10504', 'PROGRAM PENCEGAHAN, PENANGGULANGAN, PENYELAMATAN KEBAKARAN DAN PENYELAMATAN NON KEBAKARAN', '', '2021-09-30 12:32:05', 2021, 1),
('106', '10603', 'PROGRAM PENANGANAN WARGA NEGARA MIGRAN KORBAN TINDAK KEKERASAN', '', '2021-09-30 12:32:05', 2021, 1),
('106', '10604', 'PROGRAM REHABILITASI SOSIAL', '', '2021-09-30 12:32:05', 2021, 1),
('106', '10605', 'PROGRAM PERLINDUNGAN DAN JAMINAN SOSIAL', '', '2021-09-30 12:32:05', 2021, 1),
('207', '20703', 'PROGRAM PELATIHAN KERJA DAN PRODUKTIVITAS TENAGA KERJA', '', '2021-09-30 12:32:05', 2021, 1),
('207', '20704', 'PROGRAM PENEMPATAN TENAGA KERJA', '', '2021-09-30 12:32:05', 2021, 1),
('207', '20705', 'PROGRAM HUBUNGAN INDUSTRIAL', '', '2021-09-30 12:32:05', 2021, 1),
('208', '20802', 'PROGRAM PENGARUS UTAMAAN GENDER DAN PEMBERDAYAAN PEREMPUAN', '', '2021-09-30 12:32:05', 2021, 1),
('209', '20902', 'PROGRAM PENGELOLAAN SUMBER DAYA EKONOMI UNTUK KEDAULATAN DAN KEMANDIRIAN PANGAN', '', '2021-09-30 12:32:05', 2021, 1),
('209', '20903', 'PENINGKATAN DIVERIFIKASI DAN KETAHANAN PANGAN MASYARAKAT', '', '2021-09-30 12:32:05', 2021, 1),
('211', '21104', 'PROGRAM PENGELOLAAN KEANEKARAGAMAN HAYATI (KEHATI)', '', '2021-09-30 12:32:05', 2021, 1),
('211', '21109', 'PROGRAM PENGHARGAAN LINGKUNGAN HIDUP UNTUK MASYARAKAT', '', '2021-09-30 12:32:05', 2021, 1),
('211', '21111', 'PROGRAM PENGELOLAAN PERSAMPAHAN', '', '2021-09-30 12:32:05', 2021, 1),
('213', '21302', 'PROGRAM PENATAAN DESA', '', '2021-09-30 12:32:05', 2021, 1),
('213', '21304', 'PROGRAM ADMINISTRASI PEMERINTAHAN DESA', '', '2021-09-30 12:32:05', 2021, 1),
('213', '21305', 'PROGRAM PEMBERDAYAAN LEMBAGA KEMASYARAKATAN, LEMBAGA ADAT DAN MASYARAKAT HUKUM ADAT', '', '2021-09-30 12:32:05', 2021, 1),
('214', '21403', 'PROGRAM PEMBINAAN KELUARGA BERENCANA (KB)', '', '2021-09-30 12:32:05', 2021, 1),
('214', '21404', 'PROGRAM PEMBERDAYAAN DAN PENINGKATAN KELUARGA SEJAHTERA (KS)', '', '2021-09-30 12:32:05', 2021, 1),
('215', '21502', 'Program Penyelenggaraan Lalu Lintas Dan Angkutan Jalan (LLAJ)', '', '2021-09-30 12:32:05', 2021, 1),
('216', '21602', 'PROGRAM PENGELOLAAN INFORMASI DAN KOMUNIKASI PUBLIK', '', '2021-09-30 12:32:05', 2021, 1),
('216', '21603', 'PROGRAM PENGELOLAAN APLIKASI INFORMATIKA', '', '2021-09-30 12:32:05', 2021, 1),
('217', '21706', 'PROGRAM PEMBERDAYAAN DAN PERLINDUNGAN KOPERASI', '', '2021-09-30 12:32:05', 2021, 1),
('217', '21707', 'PROGRAM PEMBERDAYAAN USAHA MENENGAH, USAHA KECIL, DAN USAHA MIKRO (UMKM)', '', '2021-09-30 12:32:05', 2021, 1),
('218', '21804', 'PROGRAM PELAYANAN PENANAMAN MODAL', '', '2021-09-30 12:32:05', 2021, 1),
('219', '21903', 'PROGRAM PENGEMBANGAN KAPASITAS DAYA SAING KEOLAHRAGAAN', '', '2021-09-30 12:32:05', 2021, 1),
('222', '22202', 'PROGRAM PENGEMBANGAN KEBUDAYAAN', '', '2021-09-30 12:32:05', 2021, 1),
('223', '22302', 'PROGRAM PEMBINAAN PERPUSTAKAAN', '', '2021-09-30 12:32:05', 2021, 1),
('224', '22403', 'PROGRAM PERLINDUNGAN DAN PENYELAMATAN ARSIP', '', '2021-09-30 12:32:05', 2021, 1),
('325', '32503', 'PROGRAM PENGELOLAAN PERIKANAN TANGKAP', '', '2021-09-30 12:32:05', 2021, 1),
('325', '32504', 'PROGRAM PENGELOLAAN PERIKANAN BUDIDAYA', '', '2021-09-30 12:32:05', 2021, 1),
('326', '32602', 'PROGRAM PENINGKATAN DAYA TARIK DESTINASI PARIWISATA', '', '2021-09-30 12:32:05', 2021, 1),
('327', '32702', 'PROGRAM PENYEDIAAN DAN PENGEMBANGAN SARANA PERTANIAN', '', '2021-09-30 12:32:05', 2021, 1),
('327', '32703', 'PROGRAM PENYEDIAAN DAN PENGEMBANGAN PRASARANA PERTANIAN', '', '2021-09-30 12:32:05', 2021, 1),
('327', '32705', 'PROGRAM PENGENDALIAN DAN PENANGGULANGAN BENCANA PERTANIAN', '', '2021-09-30 12:32:05', 2021, 1),
('327', '32707', 'PROGRAM PENYULUHAN PERTANIAN', '', '2021-09-30 12:32:05', 2021, 1),
('331', '33102', 'PROGRAM PERENCANAAN DAN PEMBANGUNAN INDUSTRI', '', '2021-09-30 12:32:05', 2021, 1),
('332', '33204', 'PROGRAM PENGEMBANGAN KAWASAN TRANSMIGRASI', '', '2021-09-30 12:32:05', 2021, 1),
('401', '40102', 'PROGRAM PEMERINTAHAN DAN KESEJAHTERAAN RAKYAT', '', '2021-09-30 12:32:05', 2021, 1);

-- --------------------------------------------------------

--
-- Table structure for table `dsub`
--

CREATE TABLE `dsub` (
  `kdKegiatan` varchar(15) NOT NULL,
  `kdDinas` varchar(20) NOT NULL,
  `kdSub` varchar(20) NOT NULL,
  `nmSub` varchar(250) NOT NULL,
  `paguSub` varchar(25) DEFAULT NULL,
  `insSub` timestamp NOT NULL DEFAULT current_timestamp(),
  `taSub` year(4) NOT NULL DEFAULT current_timestamp(),
  `perkadaS` int(3) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dsub`
--

INSERT INTO `dsub` (`kdKegiatan`, `kdDinas`, `kdSub`, `nmSub`, `paguSub`, `insSub`, `taSub`, `perkadaS`) VALUES
('101022.01', '1-12-220-002', '101022.0101', 'Pembangunan Unit Sekolah Baru (USB)', '', '2021-09-30 13:06:29', 2021, 1),
('101022.01', '1-12-220-002', '101022.0102', 'Penambahan Ruang Kelas Baru', '', '2021-09-30 13:06:29', 2021, 1),
('101022.01', '1-12-220-002', '101022.0106', 'Pembangunan Sarana, Prasarana dan Utilitas Sekolah', '', '2021-09-30 13:06:29', 2021, 1),
('101022.01', '1-12-220-002', '101022.0108', 'Rehabilitasi Sedang/Berat Ruang Kelas', '', '2021-09-30 13:06:29', 2021, 1),
('101022.01', '1-12-220-002', '101022.0109', 'Rehabilitasi Sedang/Berat Ruang Guru/Kepala Sekolah/TU', '', '2021-09-30 13:06:29', 2021, 1),
('101022.01', '1-12-220-002', '101022.0112', 'Rehabilitasi Sedang/Berat Sarana, Prasarana dan Utilitas Sekolah', '', '2021-09-30 13:06:29', 2021, 1),
('101022.01', '1-12-220-002', '101022.0114', 'Pengadaan Mebel Sekolah', '', '2021-09-30 13:06:29', 2021, 1),
('101022.01', '1-12-220-002', '101022.0117', 'Pengadaan Perlengkapan Siswa', '', '2021-09-30 13:06:29', 2021, 1),
('101022.01', '1-12-220-002', '101022.0122', 'Pengadaan Alat Praktik dan Peraga Siswa', '', '2021-09-30 13:06:29', 2021, 1),
('101022.02', '1-12-220-002', '101022.0201', 'Pembangunan Unit Sekolah Baru (USB)', '', '2021-09-30 13:06:29', 2021, 1),
('101022.02', '1-12-220-002', '101022.0202', 'Penambahan Ruang Kelas Baru', '', '2021-09-30 13:06:29', 2021, 1),
('101022.02', '1-12-220-002', '101022.0212', 'Pembangunan Sarana, Prasarana dan Utilitas Sekolah', '', '2021-09-30 13:06:29', 2021, 1),
('101022.02', '1-12-220-002', '101022.0214', 'Rehabilitasi Sedang/Berat Ruang Kelas Sekolah', '', '2021-09-30 13:06:29', 2021, 1),
('101022.02', '1-12-220-002', '101022.0215', 'Rehabilitasi Sedang/Berat Ruang Guru Sekolah', '', '2021-09-30 13:06:29', 2021, 1),
('101022.02', '1-12-220-002', '101022.0224', 'Rehabilitasi Sedang/Berat Sarana, Prasarana dan Utilitas Sekolah', '', '2021-09-30 13:06:29', 2021, 1),
('101022.02', '1-12-220-002', '101022.0225', 'Pengadaan Mebel Sekolah', '', '2021-09-30 13:06:29', 2021, 1),
('101022.02', '1-12-220-002', '101022.0228', 'Pengadaan Perlengkapan Siswa', '', '2021-09-30 13:06:29', 2021, 1),
('101022.02', '1-12-220-002', '101022.0235', 'Pengadaan Alat Praktik dan Peraga Siswa', '', '2021-09-30 13:06:29', 2021, 1),
('101022.03', '1-12-220-002', '101022.0301', 'Pembangunan Gedung/Ruang Kelas/Ruang Guru PAUD', '', '2021-09-30 13:06:29', 2021, 1),
('101022.03', '1-12-220-002', '101022.0302', 'Pembangunan Sarana, Prasarana dan Utilitas PAUD', '', '2021-09-30 13:06:29', 2021, 1),
('101022.03', '1-12-220-002', '101022.0303', 'Rehabilitasi Sedang/Berat Gedung/Ruang Kelas/Ruang Guru PAUD', '', '2021-09-30 13:06:29', 2021, 1),
('101022.03', '1-12-220-002', '101022.0304', 'Rehabilitasi Sedang/Berat Pembangunan Sarana, Prasarana dan Utilitas PAUD', '', '2021-09-30 13:06:29', 2021, 1),
('101022.03', '1-12-220-002', '101022.0307', 'Pengadaan Mebel PAUD', '', '2021-09-30 13:06:29', 2021, 1),
('101022.03', '1-12-220-002', '101022.0310', 'Pengadaan Perlengkapan Siswa PAUD', '', '2021-09-30 13:06:29', 2021, 1),
('101022.03', '1-12-220-002', '101022.0312', 'Pengadaan Alat Praktik dan Peraga Siswa PAUD', '', '2021-09-30 13:06:29', 2021, 1),
('101022.04', '1-12-220-002', '101022.0401', 'Pembangunan Gedung/Ruang Kelas/Ruang Guru Nonformal/Kesetaraan', '', '2021-09-30 13:06:29', 2021, 1),
('101022.04', '1-12-220-002', '101022.0402', 'Pembangunan Sarana, Prasarana dan Utilitas Sekolah Nonformal/Kesetaraan', '', '2021-09-30 13:06:29', 2021, 1),
('101022.04', '1-12-220-002', '101022.0403', 'Rehabilitasi Sedang/Berat Gedung/Ruang Kelas/Ruang Guru Nonformal/Kesetaraan', '', '2021-09-30 13:06:29', 2021, 1),
('101022.04', '1-12-220-002', '101022.0404', 'Rehabilitasi Sedang/Berat Pembangunan Sarana, Prasarana dan Utilitas Sekolah Nonformal/Kesetaraan', '', '2021-09-30 13:06:29', 2021, 1),
('101022.04', '1-12-220-002', '101022.0412', 'Pengadaan Alat Praktik dan Peraga Siswa Nonformal/Kesetaraan', '', '2021-09-30 13:06:29', 2021, 1),
('102022.01', '1-20-00-001', '102022.0103', 'Pembangunan Fasilitas Kesehatan Lainnya', '', '2021-09-30 13:06:29', 2021, 1),
('102022.01', '1-20-00-001', '102022.0109', 'Rehabilitasi dan Pemeliharaan Puskesmas ', '', '2021-09-30 13:06:29', 2021, 1),
('102022.01', '1-20-00-001', '102022.0110', 'Rehabilitasi dan Pemeliharaan Fasilitas Kesehatan Lainya', '', '2021-09-30 13:06:29', 2021, 1),
('103022.01', '1-30-00-001', '103022.0107', 'Pembangunan Sumur Air Tanah untuk Air Baku', '', '2021-09-30 13:06:29', 2021, 1),
('103022.01', '1-30-00-001', '103022.0109', 'Pembangunan Tanggul Sungai', '', '2021-09-30 13:06:29', 2021, 1),
('103022.01', '1-30-00-001', '103022.0110', 'Pembangunan Bangunan Perkuatan Tebing', '', '2021-09-30 13:06:29', 2021, 1),
('103022.01', '1-30-00-001', '103022.0120', 'Rehabilitasi Bendungan', '', '2021-09-30 13:06:29', 2021, 1),
('103022.01', '1-30-00-001', '103022.0121', 'Rehabilitasi Embung dan Penampungan Air Lainnya', '', '2021-09-30 13:06:29', 2021, 1),
('103022.01', '1-30-00-001', '103022.0122', 'Rehabilitasi Sumur Air Tanah untuk Air Baku', '', '2021-09-30 13:06:29', 2021, 1),
('103022.01', '1-30-00-001', '103022.0124', 'Rehabilitasi Tanggul Sungai', '', '2021-09-30 13:06:29', 2021, 1),
('103022.01', '1-30-00-001', '103022.0125', 'Rehabilitasi Bangunan Perkuatan Tebing', '', '2021-09-30 13:06:29', 2021, 1),
('103022.01', '1-30-00-001', '103022.0134', 'Peningkatan Tanggul Sungai', '', '2021-09-30 13:06:29', 2021, 1),
('103022.01', '1-30-00-001', '103022.0135', 'Peningkatan Bangunan Perkuatan Tebing', '', '2021-09-30 13:06:29', 2021, 1),
('103022.01', '1-30-00-001', '103022.0146', 'Normalisasi/Restorasi Sungai', '', '2021-09-30 13:06:29', 2021, 1),
('103032.01', '1-30-00-001', '103032.0103', 'Pembangunan SPAM Jaringan Perpipaan di Kawasan Perkotaan', '', '2021-09-30 13:06:29', 2021, 1),
('103032.01', '1-30-00-001', '103032.0104', 'Pembangunan SPAM Jaringan Perpipaan di Kawasan Perdesaan', '', '2021-09-30 13:06:29', 2021, 1),
('103032.01', '1-30-00-001', '103032.0105', 'Peningkatan SPAM Jaringan Perpipaan di Kawasan Perkotaan', '', '2021-09-30 13:06:29', 2021, 1),
('103032.01', '1-30-00-001', '103032.0106', 'Peningkatan SPAM Jaringan Perpipaan di Kawasan Perdesaan', '', '2021-09-30 13:06:29', 2021, 1),
('103052.01', '1-30-00-001', '103052.0113', 'Penyediaan Sarana Pengangkutan Lumpur Tinja', '', '2021-09-30 13:06:29', 2021, 1),
('103052.01', '1-30-00-001', '103052.0114', 'Penyediaan Jasa Penyedotan Lumpur Tinja', '', '2021-09-30 13:06:29', 2021, 1),
('103052.01', '1-30-00-001', '103052.0115', 'Pembangunan/Penyediaan Sarana dan Prasarana IPLT', '', '2021-09-30 13:06:29', 2021, 1),
('103062.01', '1-30-00-001', '103062.0105', 'Pembangunan Sistem Drainase Perkotaan', '', '2021-09-30 13:06:29', 2021, 1),
('103062.01', '1-30-00-001', '103062.0106', 'Peningkatan Saluran Drainase Perkotaan', '', '2021-09-30 13:06:29', 2021, 1),
('103062.01', '1-30-00-001', '103062.0112', 'Pembangunan Sistem Drainase Lingkungan', '', '2021-09-30 13:06:29', 2021, 1),
('103062.01', '1-30-00-001', '103062.0113', 'Peningkatan Saluran Drainase Lingkungan', '', '2021-09-30 13:06:29', 2021, 1),
('103102.01', '1-30-00-001', '103102.0105', 'Pembangunan Jalan', '', '2021-09-30 13:06:29', 2021, 1),
('103102.01', '1-30-00-001', '103102.0109', 'Rehabilitasi Jalan', '', '2021-09-30 13:06:29', 2021, 1),
('103102.01', '1-30-00-001', '103102.0110', 'Pemeliharaan Berkala Jalan', '', '2021-09-30 13:06:29', 2021, 1),
('103102.01', '1-30-00-001', '103102.0112', 'Pembangunan Jembatan', '', '2021-09-30 13:06:29', 2021, 1),
('103102.01', '1-30-00-001', '103102.0120', 'Pemeliharaan Berkala Jembatan', '', '2021-09-30 13:06:29', 2021, 1),
('103112.01', '1-30-00-001', '103112.0104', 'Pelaksanaan Pelatihan Tenaga Terampil Konstruksi', '', '2021-09-30 13:06:29', 2021, 1),
('104022.03', '1-30-00-001', '104022.0304', 'Pembangunan Rumah bagi Korban Bencana', '', '2021-09-30 13:06:29', 2021, 1),
('104032.03', '1-30-00-001', '104032.0302', 'Perbaikan Rumah Tidak Layak Huni', '', '2021-09-30 13:06:29', 2021, 1),
('104032.03', '1-30-00-001', '104032.0306', 'Pelaksanaan Pembangunan Pemugaran/Peremajaan Permukiman Kumuh', '', '2021-09-30 13:06:29', 2021, 1),
('105022.01', '1-50-00-001', '105022.0105', 'Peningkatan Kapasitas SDM Satuan Polisi Pamong praja dan Satuan Perlindungan Masyarakat termasuk dalam Pelaksanaan Tugas yang Bernuansa Hak Asasi Manusia', '', '2021-09-30 13:06:29', 2021, 1),
('105032.01', '1-50-00-004', '105032.0102', 'Sosialisasi, Komunikasi, Informasi dan Edukasi (KIE) Rawan Bencana Kabupaten/Kota (Per Jenis Bencana) ', '', '2021-09-30 13:06:29', 2021, 1),
('105032.02', '1-50-00-004', '105032.0206', 'Penguatan Kapasitas Kawasan untuk Pencegahan dan Kesiapsiagaan', '', '2021-09-30 13:06:29', 2021, 1),
('105042.01', '1-50-00-002', '105042.0101', 'Pencegahan Kebakaran dalam Daerah Kabupaten/Kota', '', '2021-09-30 13:06:29', 2021, 1),
('105042.04', '1-50-00-002', '105042.0401', 'Pemberdayaan Masyarakat dalam Pencegahan dan Penanggulangan Kebakaran melalui Sosialisasi dan Edukasi Masyarakat', '', '2021-09-30 13:06:29', 2021, 1),
('105042.04', '1-50-00-002', '105042.0403', 'Dukungan Pemberdayaan Masyarakat/Relawan Pemadam Kebakaran melalui Penyediaan Sarana dan Prasarana', '', '2021-09-30 13:06:29', 2021, 1),
('106022.01', '1-50-00-001', '106022.0105', 'Peningkatan Kapasitas SDM Satuan Polisi Pamong praja dan Satuan Perlindungan Masyarakat termasuk dalam Pelaksanaan Tugas yang Bernuansa Hak Asasi Manusia', '', '2021-09-30 13:06:29', 2021, 1),
('106032.01', '1-60-00-001', '106032.0101', 'Fasilitasi Pemulangan Warga Negara Migran Korban Tindak Kekerasan dari Titik Debarkasi di Daerah Kabupaten/Kota untuk dipulangkan ke Desa/Kelurahan Asal', '', '2021-09-30 13:06:29', 2021, 1),
('106042.01', '1-60-00-001', '106042.0103', 'Penyediaan Alat Bantu', '', '2021-09-30 13:06:29', 2021, 1),
('106042.02', '1-60-00-001', '106042.0207', 'Pemberian Bimbingan Fisik, Mental, Spiritual, dan Sosial', '', '2021-09-30 13:06:29', 2021, 1),
('106052.02', '1-60-00-001', '106052.0203', 'Fasilitasi Bantuan Sosial Kesejahteraan Keluarga ', '', '2021-09-30 13:06:29', 2021, 1),
('106052.02', '1-60-00-001', '106052.0204', 'Fasilitasi Bantuan Pengembangan Ekonomi Masyarakat', '', '2021-09-30 13:06:29', 2021, 1),
('207032.01', '2-70-00-001', '207032.0101', 'Proses Pelaksanaan Pendidikan dan Pelatihan Keterampilan bagi Pencari Kerja berdasarkan Klaster Kompetensi', '', '2021-09-30 13:06:29', 2021, 1),
('207032.02', '2-70-00-001', '207032.0201', 'Pembinaan Lembaga Pelatihan Kerja Swasta', '', '2021-09-30 13:06:29', 2021, 1),
('207042.04', '2-70-00-001', '207042.0401', 'Peningkatan Pelindungan dan Kompetensi Calon Pekerja Migran Indonesia (PMI)/Pekerja Migran Indonesia (PMI)', '', '2021-09-30 13:06:29', 2021, 1),
('207052.02', '2-70-00-001', '207052.0201', 'Pencegahan Perselisihan Hubungan Industrial, Mogok Kerja, dan Penutupan Perusahaan yang Berakibat/Berdampak pada Kepentingan di 1 (satu) Daerah Kabupaten/Kota', '', '2021-09-30 13:06:29', 2021, 1),
('208022.02', '2-140-00-001', '208022.0201', 'Sosialisasi Peningkatan Partisipasi Perempuan di Bidang Politik, Hukum, Sosial dan Ekonomi ', '', '2021-09-30 13:06:29', 2021, 1),
('209022.01', '2-90-00-001', '209022.0102', 'Penyediaan infrastruktur lantai jemur', '', '2021-09-30 13:06:29', 2021, 1),
('209022.01', '2-90-00-001', '209022.0103', 'Penyediaan infrastruktur pendukung Kemandirian pangan lainnya', '', '2021-09-30 13:06:29', 2021, 1),
('209032.01', '2-90-00-001', '209032.0102', 'Penyediaan Pangan Berbasis Sumber Daya Lokal', '', '2021-09-30 13:06:29', 2021, 1),
('209032.04', '2-90-00-001', '209032.0403', 'Pemberdayaan masyarakat dalam penganekaragaman konsumsi pangan berbasis sumber daya lokal', '', '2021-09-30 13:06:29', 2021, 1),
('211042.01', '2-110-00-001', '211042.0104', 'Pengelolaan Ruang Terbuka Hijau (RTH)', '', '2021-09-30 13:06:29', 2021, 1),
('211092.01', '2-110-00-001', '211092.0101', 'Penilaian Kinerja Masyarakat/Lembaga Masyarakat/Dunia Usaha/Dunia Pendidikan/Filantropi dalam Perlindungan dan Pengelolaan Lingkungan Hidup', '', '2021-09-30 13:06:29', 2021, 1),
('211112.01', '2-110-00-001', '211112.0103', 'Penanganan Sampah dengan Melakukan Pemilahan, Pengumpulan, Pengangkutan, Pengolahan, dan Pemrosesan Akhir Sampah di TPA/TPST/SPA Kabupaten/Kota', '', '2021-09-30 13:06:29', 2021, 1),
('211112.01', '2-110-00-001', '211112.0104', 'Peningkatan Peran serta Masyarakat dalam Pengelolaan Persampahan', '', '2021-09-30 13:06:29', 2021, 1),
('213022.01', '2-130-00-001', '213022.0102', 'Fasilitasi Tata Wilayah Desa', '', '2021-09-30 13:06:29', 2021, 1),
('213042.01', '2-130-00-001', '213042.0105', 'Pembinaan Peningkatan Kapasitas Aparatur Pemerintah Desa', '', '2021-09-30 13:06:29', 2021, 1),
('213042.01', '2-130-00-001', '213042.0108', 'Pembinaan dan Pemberdayaan BUM Desa dan Lembaga Kerja sama antar Desa', '', '2021-09-30 13:06:29', 2021, 1),
('213042.01', '2-130-00-001', '213042.0114', 'Pembinaan Peningkatan Kapasitas Anggota BPD', '', '2021-09-30 13:06:29', 2021, 1),
('213052.01', '2-130-00-001', '213052.0103', 'Peningkatan Kapasitas Kelembagaan Lembaga Kemasyarakatan Desa/Kelurahan (RT, RW, PKK, Posyandu, LPM, dan Karang Taruna), Lembaga Adat Desa/Kelurahan dan Masyarakat Hukum Adat', '', '2021-09-30 13:06:29', 2021, 1),
('213052.01', '2-130-00-001', '213052.0106', 'Fasilitasi Pemerintah Desa dalam Pemanfaatan Teknologi Tepat Guna', '', '2021-09-30 13:06:29', 2021, 1),
('213052.01', '2-130-00-001', '213052.0109', 'Fasilitasi Tim Penggerak PKK dalam Penyelenggaraan Gerakan Pemberdayaan Masyarakat dan Kesejahteraan Keluarga', '', '2021-09-30 13:06:29', 2021, 1),
('214032.04', '2-140-00-001', '214032.0404', 'Pembinaan Terpadu Kampung KB', '', '2021-09-30 13:06:29', 2021, 1),
('214042.01', '2-140-00-001', '214042.0104', 'Orientasi/Pelatihan Teknis Pelaksana/Kader Ketahanan dan Kesejahteraan Keluarga (BKB, BKR, BKL, PPPKS, PIK-R dan Pemberdayaan Ekonomi Keluarga/UPPKS)', '', '2021-09-30 13:06:29', 2021, 1),
('214042.02', '2-140-00-001', '214042.0203', 'Pelaksanaan Peningkatan Kapasitas Mitra dan Organisasi Kemasyarakatan dalam Pengelolaan Program Ketahanan dan Kesejahteraan Keluarga (BKB, BKR, BKL, PPPKS, PIK-R dan Pemberdayaan Ekonomi Keluarga/UPPKS)', '', '2021-09-30 13:06:29', 2021, 1),
('215022.02', '2-150-00-001', '215022.0203', 'Rehabilitasi dan Pemeliharaan Prasarana Jalan', '', '2021-09-30 13:06:29', 2021, 1),
('215022.02', '2-150-00-001', '215022.0204', 'Rehabilitasi dan Pemeliharaan Perlengkapan Jalan', '', '2021-09-30 13:06:29', 2021, 1),
('216022.01', '2-160-00-001', '216022.0106', 'Pelayanan Informasi Publik', '', '2021-09-30 13:06:29', 2021, 1),
('216032.02', '2-160-00-001', '216032.0207', 'Pengembangan Aplikasi dan Proses Bisnis Pemerintahan Berbasis Elektronik', '', '2021-09-30 13:06:29', 2021, 1),
('217062.01', '2-173-313-3007', '217062.0101', 'Pemberdayaan Peningkatan Produktivitas, Nilai Tambah, Akses Pasar, Akses Pembiayaan, Penguatan Kelembagaan, Penataan Manajemen, Standarisasi, dan Restrukturisasi Usaha Koperasi Kewenangan Provinsi', '', '2021-09-30 13:06:29', 2021, 1),
('217072.01', '2-173-313-3007', '217072.0102', 'Pemberdayaan Melalui Kemitraan Usaha Mikro', '', '2021-09-30 13:06:29', 2021, 1),
('218042.01', '2-180-00-001', '218042.0102', 'Pemantauan Pemenuhan Komitmen Perizinan dan Nonperizinan Penanaman Modal', '', '2021-09-30 13:06:29', 2021, 1),
('219032.01', '3-260-00-001', '219032.0103', 'Koordinasi, Sinkronisasi dan Pelaksanaan Penyediaan Sarana dan Prasarana Olahraga Kabupaten/Kota', '', '2021-09-30 13:06:29', 2021, 1),
('222022.01', '1-12-220-002', '222022.0101', 'Pelindungan, Pengembangan, Pemanfaatan Objek Pemajuan Kebudayaan', '', '2021-09-30 13:06:29', 2021, 1),
('222022.01', '1-12-220-002', '222022.0102', 'Pembinaan Sumber Daya Manusia, Lembaga, dan Pranata Kebudayaan', '', '2021-09-30 13:06:29', 2021, 1),
('222022.02', '1-12-220-002', '222022.0201', 'Pelindungan, Pengembangan, Pemanfaatan Objek Pemajuan Tradisi Budaya', '', '2021-09-30 13:06:29', 2021, 1),
('222022.02', '1-12-220-002', '222022.0202', 'Pembinaan Sumber Daya Manusia, Lembaga, dan Pranata Tradisional', '', '2021-09-30 13:06:29', 2021, 1),
('222022.03', '1-12-220-002', '222022.0303', 'Penyediaan Sarana dan Prasarana Pembinaan Lembaga Adat', '', '2021-09-30 13:06:29', 2021, 1),
('223022.01', '2-240-00-001', '223022.0104', 'Pembinaan Perpustakaan pada Satuan Pendidikan Dasar di Seluruh Wilayah Kabupaten/Kota sesuai dengan Standar Nasional Perpustakaan', '', '2021-09-30 13:06:29', 2021, 1),
('223022.01', '2-240-00-001', '223022.0105', 'Pembinaan Perpustakaan Khusus Tingkat Kabupaten/Kota', '', '2021-09-30 13:06:29', 2021, 1),
('224032.03', '2-240-00-001', '224032.0304', 'Pendampingan Penyelamatan Arsip Bagi Pemekaran Desa/Kelurahan', '', '2021-09-30 13:06:29', 2021, 1),
('325032.01', '3-250-00-001', '325032.0102', 'Penyediaan Prasarana Usaha Perikanan Tangkap', '', '2021-09-30 13:06:29', 2021, 1),
('325032.01', '3-250-00-001', '325032.0103', 'Penjaminan Ketersediaan Sarana Usaha Perikanan Tangkap', '', '2021-09-30 13:06:29', 2021, 1),
('325032.02', '3-250-00-001', '325032.0201', 'Pengembangan Kapasitas Nelayan Kecil', '', '2021-09-30 13:06:29', 2021, 1),
('325042.02', '3-250-00-001', '325042.0201', 'Pengembangan Kapasitas Pembudidaya Ikan Kecil ', '', '2021-09-30 13:06:29', 2021, 1),
('325042.04', '3-250-00-001', '325042.0403', 'Penjaminan Ketersediaan Sarana Pembudidayaan Ikan dalam 1 (satu) Daerah Kabupaten/Kota', '', '2021-09-30 13:06:29', 2021, 1),
('325042.04', '3-250-00-001', '325042.0406', 'Perencanaan, Pengembangan, Pemanfaatan dan Perlindungan Lahan Untuk Pembudidayaan Ikan di Darat', '', '2021-09-30 13:06:29', 2021, 1),
('326022.02', '3-260-00-001', '326022.0204', 'Pengadaan dan Pemeliharaan Sarana dan Prasarana dalam Pengelolaan Kawasan Wisata Strategis Pariwisata Kabupaten/Kota', '', '2021-09-30 13:06:29', 2021, 1),
('326022.02', '3-260-00-001', '326022.0206', 'Pemberdayaan Masyarakat dalam Pengelolaan Kawasan Strategis Pariwisata Kabupaten/Kota', '', '2021-09-30 13:06:29', 2021, 1),
('327022.01', '3-270-00-001', '327022.0102', 'Pendampingan Penggunaan Sarana Pendukung Pertanian', '', '2021-09-30 13:06:29', 2021, 1),
('327022.02', '3-270-00-001', '327022.0202', 'Peningkatan Kualitas SDG Hewan/Tanaman', '', '2021-09-30 13:06:29', 2021, 1),
('327022.06', '3-270-00-001', '327022.0601', 'Pengadaan Benih/Bibit Ternak yang Sumbernya dari Daerah Kabupaten/Kota Lain', '', '2021-09-30 13:06:29', 2021, 1),
('327022.06', '3-270-00-001', '327022.0602', 'Pengadaan Hijauan Pakan Ternak yang Sumbernya dari Daerah Kabupaten/Kota Lain', '', '2021-09-30 13:06:29', 2021, 1),
('327032.02', '3-270-00-001', '327032.0201', 'Pembangunan, Rehabilitasi dan Pemeliharaan Jaringan Irigasi Usaha Tani', '', '2021-09-30 13:06:29', 2021, 1),
('327032.02', '3-270-00-001', '327032.0202', 'Pembangunan, Rehabilitasi dan Pemeliharaan Embung Pertanian', '', '2021-09-30 13:06:29', 2021, 1),
('327032.02', '3-270-00-001', '327032.0203', 'Pembangunan, Rehabilitasi dan Pemeliharaan Jalan Usaha Tani', '', '2021-09-30 13:06:29', 2021, 1),
('327032.02', '3-270-00-001', '327032.0204', 'Pembangunan, Rehabilitasi dan Pemeliharaan DAM Parit', '', '2021-09-30 13:06:29', 2021, 1),
('327032.02', '3-270-00-001', '327032.0206', 'Pembangunan, Rehabilitasi dan Pemeliharaan Pintu Air', '', '2021-09-30 13:06:29', 2021, 1),
('327032.02', '3-270-00-001', '327032.0209', 'Pembangunan, Rehabilitasi dan Pemeliharaan Prasarana Pertanian Lainnya', '', '2021-09-30 13:06:29', 2021, 1),
('327032.03', '3-270-00-001', '327032.0301', 'Pelestarian dan Pemanfaatan Wilayah Sumber Bibit Ternak dan Rumpun/Galur Ternak', '', '2021-09-30 13:06:29', 2021, 1),
('327052.01', '3-270-00-001', '327052.0105', 'Penanggulangan Pasca Bencana Alam Bidang Tanaman Pangan, Hortikultura, Perkebunan, Peternakan dan Kesehatan Hewan', '', '2021-09-30 13:06:29', 2021, 1),
('327072.01', '3-270-00-001', '327072.0102', 'Pengembangan Kapasitas Kelembagaan Petani di Kecamatan dan Desa', '', '2021-09-30 13:06:29', 2021, 1),
('327072.01', '3-270-00-001', '327072.0105', 'Pembentukan dan Penyelenggaraan Sekolah Lapang Kelompok Tani Tingkat Kabupaten/Kota', '', '2021-09-30 13:06:29', 2021, 1),
('331022.01', '2-173-313-3007', '331022.0105', 'Koordinasi, Sinkronisasi, dan Pelaksanaan Pemberdayaan Industri dan Peran Serta Masyarakat', '', '2021-09-30 13:06:29', 2021, 1),
('332042.01', '2-70-00-001', '332042.0101', 'Penguatan SDM dalam rangka Kemandirian Satuan Pemukiman', '', '2021-09-30 13:06:29', 2021, 1),
('332042.01', '2-70-00-001', '332042.0102', 'Penguatan Infrastruktur Sosial, Ekonomi dan Kelembagaan dalam rangka Kemandirian Satuan Pemukiman', '', '2021-09-30 13:06:29', 2021, 1),
('401022.02', '4-10-00-001', '401022.0201', 'Fasilitasi Pengelolaan Bina Mental Spiritual', '', '2021-09-30 13:06:29', 2021, 1);

-- --------------------------------------------------------

--
-- Table structure for table `durusan`
--

CREATE TABLE `durusan` (
  `kdUrusan` varchar(4) NOT NULL,
  `nmUrusan` varchar(250) NOT NULL,
  `paguUrusan` varchar(25) DEFAULT NULL,
  `insUrusan` timestamp NOT NULL DEFAULT current_timestamp(),
  `taUrusan` year(4) NOT NULL DEFAULT current_timestamp(),
  `perkadaU` int(3) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `durusan`
--

INSERT INTO `durusan` (`kdUrusan`, `nmUrusan`, `paguUrusan`, `insUrusan`, `taUrusan`, `perkadaU`) VALUES
('1', 'URUSAN PEMERINTAHAN WAJIB YANG BERKAITAN DENGAN PELAYANAN DASAR', '', '2021-09-30 12:24:07', 2021, 1),
('2', 'URUSAN PEMERINTAHAN WAJIB YANG TIDAK BERKAITAN DENGAN PELAYANAN DASAR', '', '2021-09-30 12:24:07', 2021, 1),
('3', 'URUSAN PEMERINTAHAN PILIHAN', '', '2021-09-30 12:24:07', 2021, 1),
('4', 'UNSUR PENDUKUNG URUSAN PEMERINTAHAN', '', '2021-09-30 12:24:07', 2021, 1),
('5', 'UNSUR PENUNJANG URUSAN PEMERINTAHAN', '', '2021-09-30 12:24:07', 2021, 1),
('6', 'UNSUR PENGAWASAN URUSAN PEMERINTAHAN', '', '2021-09-30 12:24:07', 2021, 1),
('7', 'UNSUR KEWILAYAHAN', '', '2021-09-30 12:24:07', 2021, 1),
('8', 'UNSUR PEMERINTAHAN UMUM', '', '2021-09-30 12:24:07', 2021, 1),
('9', 'URUSAN PEMERINTAHAN BIDANG KEBUDAYAAN', '', '2021-09-30 12:24:07', 2021, 1);

-- --------------------------------------------------------

--
-- Table structure for table `jabatan`
--

CREATE TABLE `jabatan` (
  `kdJabatan` int(2) NOT NULL,
  `kdJabatan1` varchar(20) NOT NULL,
  `nmJabatan` varchar(50) NOT NULL,
  `setingkat` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `jabatan`
--

INSERT INTO `jabatan` (`kdJabatan`, `kdJabatan1`, `nmJabatan`, `setingkat`) VALUES
(1, 'jaba-1', 'Admin OPD', 1),
(2, 'jaba-2', 'Admin Disposisi', 2),
(3, 'jaba-3', 'TAPD', 3),
(4, 'jaba-4', 'SEKRETARIAT TAPD', 3),
(5, 'jaba-5', 'TIM TEKNIS', 3),
(6, 'jaba-6', 'Developer', 4);

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `kdMember` int(15) NOT NULL,
  `kdMember1` varchar(15) NOT NULL,
  `nmMember` varchar(50) NOT NULL,
  `kdJabatan` varchar(15) NOT NULL,
  `kdDinas` varchar(15) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `aktif` tinyint(1) NOT NULL DEFAULT 1,
  `email` varchar(150) NOT NULL,
  `ins` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`kdMember`, `kdMember1`, `nmMember`, `kdJabatan`, `kdDinas`, `username`, `password`, `aktif`, `email`, `ins`) VALUES
(1, '2G18-memb-1', 'Bagus H', 'jaba-6', '5-15-40-002', 'M0-dev', 'aaa', 1, '', '2021-09-28 14:46:56'),
(2, '2G18-memb-2', 'admin1', 'jaba-4', '4-10-00-001', 'AP1-admin1', 'aaa', 1, '', '2022-01-06 16:45:14'),
(3, '2G18-memb-3', 'admin2', 'jaba-4', '4-10-00-001', 'AP2-admin2', 'aaa', 1, '', '2022-01-06 16:45:52'),
(4, '2G18-memb-4', 'admin3', 'jaba-4', '4-10-00-001', 'AP3-admin3', 'aaa', 1, '', '2022-01-06 16:46:07'),
(5, '2G18-memb-5', 'admin4', 'jaba-4', '4-10-00-001', 'AP4-admin4', 'aaa', 1, '', '2022-01-06 16:46:27');

-- --------------------------------------------------------

--
-- Table structure for table `notif`
--

CREATE TABLE `notif` (
  `kdNotif` int(11) NOT NULL,
  `fitur` varchar(150) NOT NULL,
  `isiNotif` varchar(250) NOT NULL,
  `nmTombol` varchar(50) NOT NULL,
  `url` varchar(250) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'tanggal usulan dikirm'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notif`
--

INSERT INTO `notif` (`kdNotif`, `fitur`, `isiNotif`, `nmTombol`, `url`, `date`) VALUES
(1, 'INFORMASI', 'Proses penginputan usulan TAPD akan segera dibuka !!!', 'Lihat Usulan', '', '2021-12-30 03:43:58'),
(2, 'INFORMASI', 'Proses penginputan usulan TAPD akan segera dibuka !!!', 'Lihat Usulan', '', '2021-12-30 03:50:24'),
(3, 'INFORMASI', 'Proses penginputan usulan telah dibuka', 'Lihat Usulan', '', '2022-01-01 15:29:55'),
(4, 'USULAN', 'SEKRETARIAT DAERAH telah mengirimkan usulan pada tahapan pembahasan ke-1', 'Lihat Usulan', 'control/usulan', '2022-01-02 03:49:08'),
(5, 'DISPOSISI', 'terdapat disposisi usulan dari SEKRETARIAT DAERAH yang ditujukan kepada SEKRETARIAT DAERAH dalam pembahasan ke-1', 'Lihat Disposisi', 'control/disposisi', '2022-01-02 03:56:03'),
(6, 'INFORMASI', 'Proses penginputan usulan TAPD akan segera dibuka !!!', 'Lihat Usulan', '', '2022-01-06 16:50:05'),
(7, 'INFORMASI', 'Proses penginputan usulan telah dibuka', 'Lihat Usulan', '', '2022-01-06 17:50:27'),
(8, 'USULAN', 'SEKRETARIAT DAERAH telah mengirimkan usulan pada tahapan pembahasan ke-1', 'Lihat Usulan', 'control/usulan', '2022-01-06 18:46:40'),
(9, 'DISPOSISI', 'terdapat disposisi usulan dari SEKRETARIAT DAERAH yang ditujukan kepada SEKRETARIAT DAERAH dalam pembahasan ke-1', 'Lihat Disposisi', 'control/disposisi', '2022-01-06 21:51:51'),
(10, 'DISPOSISI', 'terdapat disposisi usulan dari SEKRETARIAT DAERAH yang ditujukan kepada SEKRETARIAT DAERAH dalam pembahasan ke-1', 'Lihat Disposisi', 'control/disposisi', '2022-01-06 21:54:28'),
(11, 'DISPOSISI', 'terdapat disposisi usulan dari SEKRETARIAT DAERAH yang ditujukan kepada BADAN PENGELOLAAN KEUANGAN DAERAH dalam pembahasan ke-1', 'Lihat Disposisi', 'control/disposisi', '2022-01-06 22:02:02'),
(12, 'DISPOSISI', 'terdapat disposisi usulan dari SEKRETARIAT DAERAH yang ditujukan kepada BADAN PENDAPATAN DAN ASET DAERAH dalam pembahasan ke-1', 'Lihat Disposisi', 'control/disposisi', '2022-01-06 22:02:51'),
(13, 'DISPOSISI', 'terdapat disposisi usulan dari SEKRETARIAT DAERAH yang ditujukan kepada BADAN PENDAPATAN DAN ASET DAERAH dalam pembahasan ke-1', 'Lihat Disposisi', 'control/disposisi', '2022-01-06 22:03:40'),
(14, 'INFORMASI', 'Proses penginputan usulan TAPD akan segera dibuka !!!', 'Lihat Usulan', '', '2022-01-09 14:51:15'),
(15, 'INFORMASI', 'Proses penginputan usulan telah dibuka', 'Lihat Usulan', '', '2022-01-11 04:10:16'),
(16, 'USULAN', 'SEKRETARIAT DAERAH telah mengirimkan usulan pada tahapan pembahasan ke-1', 'Lihat Usulan', 'control/usulan', '2022-01-11 13:34:19'),
(17, 'DISPOSISI', 'terdapat disposisi usulan dari SEKRETARIAT DAERAH yang ditujukan kepada SEKRETARIAT DAERAH dalam pembahasan ke-1', 'Lihat Disposisi', 'control/disposisi', '2022-01-11 13:49:54');

-- --------------------------------------------------------

--
-- Table structure for table `notifuser`
--

CREATE TABLE `notifuser` (
  `kdMember` varchar(25) NOT NULL,
  `kdNotif` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `date` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'usulan ditampilkan / dilihat',
  `date1` varchar(25) NOT NULL COMMENT 'informasi dimengerti'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notifuser`
--

INSERT INTO `notifuser` (`kdMember`, `kdNotif`, `status`, `date`, `date1`) VALUES
('2G18-memb-1', 1, 1, '2021-12-30 03:54:58', '2022-01-06 23:40:30'),
('2G18-memb-1', 2, 1, '2021-12-30 03:54:58', '2022-01-06 23:40:30'),
('2G18-memb-1', 3, 1, '2022-01-06 16:32:09', '2022-01-06 23:40:30'),
('2G18-memb-1', 4, 1, '2022-01-06 16:32:09', '2022-01-06 23:40:30'),
('2G18-memb-1', 5, 1, '2022-01-06 16:32:09', '2022-01-06 23:40:30'),
('2G18-memb-1', 6, 0, '2022-01-06 16:50:05', ''),
('2G18-memb-1', 7, 0, '2022-01-06 17:50:27', ''),
('2G18-memb-1', 8, 0, '2022-01-06 18:46:40', ''),
('2G18-memb-1', 9, 0, '2022-01-06 21:51:51', ''),
('2G18-memb-1', 10, 0, '2022-01-06 21:54:28', ''),
('2G18-memb-1', 11, 0, '2022-01-06 22:02:02', ''),
('2G18-memb-1', 12, 0, '2022-01-06 22:02:51', ''),
('2G18-memb-1', 13, 0, '2022-01-06 22:03:40', ''),
('2G18-memb-1', 14, 0, '2022-01-09 14:51:15', ''),
('2G18-memb-1', 15, 0, '2022-01-11 04:10:16', ''),
('2G18-memb-1', 16, 0, '2022-01-11 13:34:19', ''),
('2G18-memb-1', 17, 0, '2022-01-11 13:49:54', ''),
('2G18-memb-10', 1, 0, '2021-12-30 03:43:58', ''),
('2G18-memb-10', 2, 0, '2021-12-30 03:50:24', ''),
('2G18-memb-10', 3, 0, '2022-01-01 15:29:55', ''),
('2G18-memb-10', 4, 0, '2022-01-02 03:49:08', ''),
('2G18-memb-10', 5, 0, '2022-01-02 03:56:03', ''),
('2G18-memb-11', 3, 0, '2022-01-01 15:29:55', ''),
('2G18-memb-11', 4, 0, '2022-01-02 03:49:08', ''),
('2G18-memb-11', 5, 0, '2022-01-02 03:56:03', ''),
('2G18-memb-2', 1, 1, '2022-01-06 16:49:27', '2022-01-06 23:49:46'),
('2G18-memb-2', 2, 1, '2022-01-06 16:49:27', '2022-01-06 23:49:46'),
('2G18-memb-2', 3, 1, '2022-01-06 16:49:27', '2022-01-06 23:49:46'),
('2G18-memb-2', 6, 1, '2022-01-06 16:57:00', '2022-01-06 23:57:04'),
('2G18-memb-2', 7, 1, '2022-01-06 17:50:42', '2022-01-07 00:50:46'),
('2G18-memb-2', 8, 1, '2022-01-06 18:46:40', '2022-01-07 01:46:46'),
('2G18-memb-2', 9, 1, '2022-01-06 21:54:35', '2022-01-07 04:54:39'),
('2G18-memb-2', 10, 1, '2022-01-06 21:54:35', '2022-01-07 04:54:39'),
('2G18-memb-2', 11, 1, '2022-01-06 22:03:43', '2022-01-07 05:03:49'),
('2G18-memb-2', 12, 1, '2022-01-06 22:03:43', '2022-01-07 05:03:49'),
('2G18-memb-2', 13, 1, '2022-01-06 22:03:43', '2022-01-07 05:03:49'),
('2G18-memb-2', 14, 1, '2022-01-09 14:51:32', '2022-01-09 21:51:36'),
('2G18-memb-2', 15, 1, '2022-01-11 04:10:29', '2022-01-11 11:10:34'),
('2G18-memb-2', 16, 1, '2022-01-11 13:34:20', '2022-01-11 20:58:16'),
('2G18-memb-2', 17, 1, '2022-01-11 13:50:33', '2022-01-11 20:58:16'),
('2G18-memb-3', 1, 1, '2022-01-07 13:54:07', '2022-01-07 20:54:14'),
('2G18-memb-3', 2, 1, '2022-01-07 13:54:07', '2022-01-07 20:54:14'),
('2G18-memb-3', 3, 1, '2022-01-07 13:54:07', '2022-01-07 20:54:14'),
('2G18-memb-3', 4, 1, '2022-01-07 13:54:07', '2022-01-07 20:54:14'),
('2G18-memb-3', 5, 1, '2022-01-07 13:54:07', '2022-01-07 20:54:14'),
('2G18-memb-3', 6, 1, '2022-01-07 13:54:07', '2022-01-07 20:54:14'),
('2G18-memb-3', 7, 1, '2022-01-07 13:54:07', '2022-01-07 20:54:14'),
('2G18-memb-3', 8, 1, '2022-01-07 13:54:07', '2022-01-07 20:54:14'),
('2G18-memb-3', 9, 1, '2022-01-07 13:54:07', '2022-01-07 20:54:14'),
('2G18-memb-3', 10, 1, '2022-01-07 13:54:07', '2022-01-07 20:54:14'),
('2G18-memb-3', 11, 1, '2022-01-07 13:54:07', '2022-01-07 20:54:14'),
('2G18-memb-3', 12, 1, '2022-01-07 13:54:07', '2022-01-07 20:54:14'),
('2G18-memb-3', 13, 1, '2022-01-07 13:54:07', '2022-01-07 20:54:14'),
('2G18-memb-3', 14, 0, '2022-01-09 14:51:15', ''),
('2G18-memb-3', 15, 0, '2022-01-11 04:10:16', ''),
('2G18-memb-3', 16, 0, '2022-01-11 13:34:19', ''),
('2G18-memb-3', 17, 0, '2022-01-11 13:49:54', ''),
('2G18-memb-4', 1, 1, '2022-01-01 15:27:00', '2022-01-01 22:27:06'),
('2G18-memb-4', 2, 1, '2022-01-01 15:27:00', '2022-01-01 22:27:06'),
('2G18-memb-4', 3, 1, '2022-01-01 15:30:07', '2022-01-01 22:30:11'),
('2G18-memb-4', 4, 1, '2022-01-02 03:49:08', '2022-01-02 10:49:12'),
('2G18-memb-4', 5, 1, '2022-01-02 03:56:07', '2022-01-02 10:56:11'),
('2G18-memb-4', 6, 0, '2022-01-06 16:50:05', ''),
('2G18-memb-4', 7, 0, '2022-01-06 17:50:27', ''),
('2G18-memb-4', 8, 0, '2022-01-06 18:46:40', ''),
('2G18-memb-4', 9, 0, '2022-01-06 21:51:51', ''),
('2G18-memb-4', 10, 0, '2022-01-06 21:54:28', ''),
('2G18-memb-4', 11, 0, '2022-01-06 22:02:02', ''),
('2G18-memb-4', 12, 0, '2022-01-06 22:02:51', ''),
('2G18-memb-4', 13, 0, '2022-01-06 22:03:40', ''),
('2G18-memb-4', 14, 0, '2022-01-09 14:51:15', ''),
('2G18-memb-4', 15, 0, '2022-01-11 04:10:16', ''),
('2G18-memb-4', 16, 0, '2022-01-11 13:34:19', ''),
('2G18-memb-4', 17, 0, '2022-01-11 13:49:54', ''),
('2G18-memb-5', 1, 0, '2021-12-30 03:43:58', ''),
('2G18-memb-5', 2, 0, '2021-12-30 03:50:24', ''),
('2G18-memb-5', 3, 0, '2022-01-01 15:29:55', ''),
('2G18-memb-5', 4, 0, '2022-01-02 03:49:08', ''),
('2G18-memb-5', 5, 0, '2022-01-02 03:56:03', ''),
('2G18-memb-5', 6, 0, '2022-01-06 16:50:05', ''),
('2G18-memb-5', 7, 0, '2022-01-06 17:50:27', ''),
('2G18-memb-5', 8, 0, '2022-01-06 18:46:40', ''),
('2G18-memb-5', 9, 0, '2022-01-06 21:51:51', ''),
('2G18-memb-5', 10, 0, '2022-01-06 21:54:28', ''),
('2G18-memb-5', 11, 0, '2022-01-06 22:02:02', ''),
('2G18-memb-5', 12, 0, '2022-01-06 22:02:51', ''),
('2G18-memb-5', 13, 0, '2022-01-06 22:03:40', ''),
('2G18-memb-5', 14, 0, '2022-01-09 14:51:15', ''),
('2G18-memb-5', 15, 0, '2022-01-11 04:10:16', ''),
('2G18-memb-5', 16, 0, '2022-01-11 13:34:19', ''),
('2G18-memb-5', 17, 0, '2022-01-11 13:49:54', ''),
('2G18-memb-6', 1, 0, '2021-12-30 03:43:58', ''),
('2G18-memb-6', 2, 0, '2021-12-30 03:50:24', ''),
('2G18-memb-6', 3, 0, '2022-01-01 15:29:55', ''),
('2G18-memb-7', 1, 0, '2021-12-30 03:43:58', ''),
('2G18-memb-7', 2, 0, '2021-12-30 03:50:24', ''),
('2G18-memb-7', 3, 0, '2022-01-01 15:29:55', ''),
('2G18-memb-7', 4, 0, '2022-01-02 03:49:08', ''),
('2G18-memb-7', 5, 0, '2022-01-02 03:56:03', ''),
('2G18-memb-8', 1, 0, '2021-12-30 03:43:58', ''),
('2G18-memb-8', 2, 0, '2021-12-30 03:50:24', ''),
('2G18-memb-8', 3, 0, '2022-01-01 15:29:55', ''),
('2G18-memb-9', 1, 0, '2021-12-30 03:43:58', ''),
('2G18-memb-9', 2, 0, '2021-12-30 03:50:24', ''),
('2G18-memb-9', 3, 0, '2022-01-01 15:29:55', ''),
('2G18-memb-9', 4, 0, '2022-01-02 03:49:08', ''),
('2G18-memb-9', 5, 0, '2022-01-02 03:56:03', '');

-- --------------------------------------------------------

--
-- Table structure for table `pembahasan`
--

CREATE TABLE `pembahasan` (
  `noPembahasan` int(3) NOT NULL,
  `perkada` int(3) NOT NULL,
  `tahun` year(4) NOT NULL,
  `ins` timestamp NOT NULL DEFAULT current_timestamp(),
  `insFinal` date NOT NULL DEFAULT current_timestamp(),
  `insFinalPerkada` date NOT NULL DEFAULT current_timestamp(),
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `progres` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'progress jika 1 menandakan forum telah mulai dan penginputan dibuka',
  `finals` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'final pembahasan',
  `finalPerkada` varchar(200) NOT NULL DEFAULT '0',
  `files` varchar(250) NOT NULL,
  `notulen` text NOT NULL,
  `fileNotulen` varchar(200) DEFAULT NULL COMMENT 'file absensi & untuk menandakan pengarsipan notulen'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pembahasan`
--

INSERT INTO `pembahasan` (`noPembahasan`, `perkada`, `tahun`, `ins`, `insFinal`, `insFinalPerkada`, `status`, `progres`, `finals`, `finalPerkada`, `files`, `notulen`, `fileNotulen`) VALUES
(0, 1, 2022, '2022-01-09 14:51:15', '2022-01-09', '2022-01-09', 1, 1, 0, '0', '', '\r\n            <div style=\"text-align: center; margin-top:0px; padding:0px;\">\r\n                <p style=\"text-align: center;\">\r\n                    <strong>\r\n                        BERITA ACARA RAPAT <br>\r\n                        TIM ANGGARAN PEMERINTAH DAERAH (TAPD) KE-0 <br>\r\n                        KABUPATEN SUMBAWA BARAT\r\n                    </strong>\r\n                </p>\r\n                <p><strong>&nbsp;</strong></p>\r\n                <p style=\"text-align: left;\">&nbsp;&nbsp;&nbsp;\r\n                Pada hari ini Kamis Tanggal Tujug Bulan Agustus Tahun Dua Ribu Dua Puluh Satu (07-08-2021) Pukul 13.30 Wita bertempat di Ruang Sidang I Sekretariat Daerah Kabupaten Sumbawa Barat telah dilaksanakan Rapat Koordinasi TAPD untuk Pembahasan Program/Kegiatan Tahun Anggaran 2021 yang dipimpin oleh <strong>Ketua TAPD Kabupaten Sumbawa Barat</strong> dan dihadari oleh:</p>\r\n                <table style=\"border-collapse: collapse; width: 70%;\" border=\"0\">\r\n                        <tbody>\r\n                            <tr style=\"height: 15px;\">\r\n                                <td style=\"width: 4%; \">1.</td>\r\n                                <td style=\"width: 35%;  text-align: left;\">Tim Anggaran Pemerintah Daerah</td>\r\n                                <td style=\"width: 17%;  text-align: left;\">:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Orang</td>\r\n                            </tr>\r\n                                <tr style=\"height: 15px;\">\r\n                                <td style=\"width: 4%; \">2.</td>\r\n                                <td style=\"width: 35%;  text-align: left;\">Tim Teknis TAPD</td>\r\n                                <td style=\"width: 17%;  text-align: left;\">:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Orang</td>\r\n                            </tr>\r\n                                <tr style=\"height: 15px;\">\r\n                                <td style=\"width: 4%; \">3.</td>\r\n                                <td style=\"width: 35%;  text-align: left;\">Tim Sekretariat TAPD</td>\r\n                                <td style=\"width: 17%;  text-align: left;\">:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Orang</td>\r\n                            </tr>\r\n                        </tbody>\r\n                    </table>\r\n                <p style=\"text-align:left;\">sesuai daftar hadir terlampir dengan keputusan sebagai berikut:</p>\r\n                <ol style=\"text-align:left;\">\r\n                    <li>&nbsp;</li>\r\n                </ol>\r\n                <p>&nbsp;</p>\r\n                <p style=\"text-align:left;\">Demikian berita acara rapat ini dibuat pada hari, tanggal, jam dan tempat tersebut di atas dengan sebenar-benarnya.</p>\r\n                <table style=\"border-collapse: collapse; width: 100%; height: 196px;\" border=\"0\">\r\n                    <tbody>\r\n                        <tr style=\"height: 96px;\">\r\n                            <td style=\"width: 71.9771%; height: 96px;\">&nbsp;</td>\r\n                            <td style=\"width: 28.023%; height: 96px;\">\r\n                            <p style=\"text-align: center;\">Taliwang, 15 April 2021<br />Penjabat Sekretaris Daerah<br />Kabupaten Sumbawa Barat<br />selaku KetuaTAPD,</p>\r\n                            </td>\r\n                        </tr>\r\n                        <tr style=\"height: 12px;\">\r\n                            <td style=\"width: 71.9771%; height: 12px;\">&nbsp;</td>\r\n                            <td style=\"width: 28.023%; height: 12px;\">&nbsp;</td>\r\n                        </tr>\r\n                        <tr style=\"height: 88px;\">\r\n                            <td style=\"width: 71.9771%; height: 88px;\">&nbsp;</td>\r\n                            <td style=\"width: 28.023%; height: 88px;\">\r\n                                <p style=\"text-align: center;\">\r\n                                    <strong>AMAR NURMANSYAH, ST., M.Si<br /></strong>\r\n                                    Pembina Tingkat I, IV/b\r\n                                    <br>NIP. 19751228 200501 1 006\r\n                                </p>\r\n                            </td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n            ', NULL),
(1, 1, 2022, '2022-01-11 04:10:16', '2022-01-17', '2022-01-17', 1, 1, 1, '0', '', '<div style=\"text-align: center;\">\n<div style=\"text-align: center; margin-top: 0px; padding: 0px;\">\n<p style=\"text-align: center;\"><strong> BERITA ACARA RAPAT <br />TIM ANGGARAN PEMERINTAH DAERAH (TAPD) KE-1 <br />KABUPATEN SUMBAWA BARAT </strong></p>\n<p><strong>&nbsp;</strong></p>\n<p style=\"text-align: left;\">&nbsp;&nbsp;&nbsp; Pada hari ini Kamis Tanggal Tujug Bulan Agustus Tahun Dua Ribu Dua Puluh Satu (07-08-2021) Pukul 13.30 Wita bertempat di Ruang Sidang I Sekretariat Daerah Kabupaten Sumbawa Barat telah dilaksanakan Rapat Koordinasi TAPD untuk Pembahasan Program/Kegiatan Tahun Anggaran 2021 yang dipimpin oleh <strong>Ketua TAPD Kabupaten Sumbawa Barat</strong> dan dihadari oleh:</p>\n<table style=\"border-collapse: collapse; width: 70%;\" border=\"0\">\n<tbody>\n<tr style=\"height: 15px;\">\n<td style=\"width: 4%;\">1.</td>\n<td style=\"width: 35%; text-align: left;\">Tim Anggaran Pemerintah Daerah</td>\n<td style=\"width: 17%; text-align: left;\">: 15 Orang</td>\n</tr>\n<tr style=\"height: 15px;\">\n<td style=\"width: 4%;\">2.</td>\n<td style=\"width: 35%; text-align: left;\">Tim Teknis TAPD</td>\n<td style=\"width: 17%; text-align: left;\">: 20 Orang</td>\n</tr>\n<tr style=\"height: 15px;\">\n<td style=\"width: 4%;\">3.</td>\n<td style=\"width: 35%; text-align: left;\">Tim Sekretariat TAPD</td>\n<td style=\"width: 17%; text-align: left;\">: 10 Orang</td>\n</tr>\n</tbody>\n</table>\n<p style=\"text-align: left;\">sesuai daftar hadir terlampir dengan keputusan sebagai berikut:</p>\n<ol style=\"text-align: left;\">\n<li>&nbsp;</li>\n</ol>\n<p>&nbsp;</p>\n<p style=\"text-align: left;\">Demikian berita acara rapat ini dibuat pada hari, tanggal, jam dan tempat tersebut di atas dengan sebenar-benarnya.</p>\n<table style=\"border-collapse: collapse; width: 100%; height: 196px;\" border=\"0\">\n<tbody>\n<tr style=\"height: 96px;\">\n<td style=\"width: 71.9771%; height: 96px;\">&nbsp;</td>\n<td style=\"width: 28.023%; height: 96px;\">\n<p style=\"text-align: center;\">Taliwang, 15 April 2021<br />Penjabat Sekretaris Daerah<br />Kabupaten Sumbawa Barat<br />selaku KetuaTAPD,</p>\n</td>\n</tr>\n<tr style=\"height: 12px;\">\n<td style=\"width: 71.9771%; height: 12px;\">&nbsp;</td>\n<td style=\"width: 28.023%; height: 12px;\">&nbsp;</td>\n</tr>\n<tr style=\"height: 88px;\">\n<td style=\"width: 71.9771%; height: 88px;\">&nbsp;</td>\n<td style=\"width: 28.023%; height: 88px;\">\n<p style=\"text-align: center;\"><strong>AMAR NURMANSYAH, ST., M.Si<br /></strong> Pembina Tingkat I, IV/b <br />NIP. 19751228 200501 1 006</p>\n</td>\n</tr>\n</tbody>\n</table>\n</div>\n</div>', 'unnamed-2022-01-17-08-52-12am.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `perda`
--

CREATE TABLE `perda` (
  `noPerda` int(3) NOT NULL,
  `judul` varchar(150) NOT NULL,
  `deskripsi` varchar(250) NOT NULL,
  `files` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `perda`
--

INSERT INTO `perda` (`noPerda`, `judul`, `deskripsi`, `files`) VALUES
(1, 'Peraturan Pemerintah Nomor 12 Tahun 2019 tentang Pengelolaan Keuangan Daerah', 'Peraturan Pemerintah sebagai pelaksanaan ketentuan Pasal 293 dan Pasal 330 Undang-Undang Nomor 23 Tahun 2014 tentang Pemerintahan Daerah, perlu menetapkan Peraturan Pemerintah tentang Pengelolaan Keuangan Daerah', 'assets/upload/files/PP Nomor 12 Tahun 2019-2022-01-17-09-19-32am.pdf'),
(2, 'Peraturan Menteri Dalam Negeri Nomor 77 Tahun 2020 tentang Pedoman Teknis Pengelolaan Keuangan Daerah', 'Pelaksanaan ketentuan Pasal 221 ayat (1) Peraturan Pemerintah Nomor 12 Tahun 2019 tentang Pengelolaan Keuangan Daerah, perlu menetapkan Peraturan\nMenteri Dalam Negeri tentang Pedoman Teknis Pengelolaan Keuangan Daerah', 'assets/upload/files/Permendagri Nomor 77 Tahun 2020-2022-01-17-09-22-51am.pdf'),
(3, 'Peraturan Menteri Dalam Negeri Nomor 27 Tahun 2021 tentang Pedoman Penyusunan Anggaran Pendapatan dan Belanja Daerah Tahun Anggaran 2022', 'Pelaksanaan ketentuan Pasal 308 UndangUndang Nomor 23 Tahun 2014 tentang Pemerintahan Daerah dan Pasal 89 ayat (2) Peraturan Pemerintah Nomor 12 Tahun 2019 tentang Pengelolaan Keuangan Daerah, perlu menetapkan Peraturan Menteri Dalam Negeri tentang P', 'assets/upload/files/Permendagri Nomor 27 Tahun 2021-2022-01-17-09-26-27am.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `usulan`
--

CREATE TABLE `usulan` (
  `kdUsulan` int(3) NOT NULL,
  `kdMember` varchar(25) NOT NULL,
  `kdDinas` varchar(15) NOT NULL,
  `kdSub1` int(5) NOT NULL,
  `kdSubJenis` varchar(25) NOT NULL COMMENT 'antara sub 1 - 7',
  `kdSub` varchar(25) NOT NULL COMMENT 'kd sub kegiatan',
  `nmUsulan` text NOT NULL,
  `no` varchar(50) NOT NULL,
  `date` varchar(15) NOT NULL,
  `vol` int(25) NOT NULL,
  `sat` varchar(50) NOT NULL,
  `nilai` varchar(25) NOT NULL,
  `volx` int(25) NOT NULL,
  `satx` varchar(50) NOT NULL,
  `nilaix` varchar(25) NOT NULL DEFAULT '0',
  `keteranganx` varchar(250) NOT NULL,
  `files` varchar(150) NOT NULL,
  `status` varchar(25) NOT NULL DEFAULT 'progress',
  `statusx` varchar(25) NOT NULL,
  `statusPendanaan` varchar(100) NOT NULL,
  `noPembahasan` int(3) NOT NULL DEFAULT 0,
  `tahun` year(4) NOT NULL DEFAULT current_timestamp(),
  `perkada` int(3) NOT NULL,
  `ins` timestamp NOT NULL DEFAULT current_timestamp(),
  `finals` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usulan`
--

INSERT INTO `usulan` (`kdUsulan`, `kdMember`, `kdDinas`, `kdSub1`, `kdSubJenis`, `kdSub`, `nmUsulan`, `no`, `date`, `vol`, `sat`, `nilai`, `volx`, `satx`, `nilaix`, `keteranganx`, `files`, `status`, `statusx`, `statusPendanaan`, `noPembahasan`, `tahun`, `perkada`, `ins`, `finals`) VALUES
(1, '2G18-memb-2', '1-20-00-00101', 4, '4.1.01.08.05', '', 'tester', '101/dikbud/1', '2022-01-03', 1, 'paket', '120300000', 1, 'paket', '', '', 'assets/upload/files/PERBUP SPPD TA 2021-2022-01-06-01-09-28pm.pdf', 'terkirim', 'DISETUJUI', 'ANGGARAN BARU', 1, 2021, 1, '2022-01-06 18:09:28', '2022-01-07'),
(1, '2G18-memb-2', '4-10-00-001', 5, '5.1', '', 'Permohonan Alokasi Anggaran Belanja Tidak Terduga (BTT) untuk Pembiayaan Pembangunan dan Rehab Infrastruktur Pasca Bencana di Kecamatan Sekongkang', '600/883/DPUPRPP/XII/2021', '2021-12-29', 1, 'Paket', '208209000', 1, 'Paket', '500000000', 'Dipenuhi dari penyesuaian nilai BTT', 'assets/upload/files/DPUPRPP usul Perkada-2022-01-11-08-31-39am.pdf', 'terkirim', 'DISETUJUI', 'PERGESERAN ANGGARAN', 1, 2022, 1, '2022-01-11 13:31:39', '2022-01-11'),
(2, '2G18-memb-2', '1-20-00-00101', 4, '4.1.01.11.01', '', 'asysifa', '202/rsud/2', '2022-01-04', 1, 'paket', '50000000', 1, 'paket', '85000000', 'disesuaikan saja', 'assets/upload/files/PERBUP SPPD TA 2021-2022-01-06-01-11-03pm.pdf', 'terkirim', 'DISETUJUI', 'PERGESERAN ANGGARAN', 1, 2021, 1, '2022-01-06 18:11:03', '2022-01-07'),
(2, '2G18-memb-2', '5-20-00-001', 5, '5.2', '', 'Penyesuaian BTT untuk DPUPRPP', '-', '2012-01-06', 1, 'Paket', '-200000000', 1, 'Paket', '-500000000', '', '', 'terkirim', 'DISETUJUI', 'PERGESERAN ANGGARAN', 1, 2022, 1, '2022-01-11 14:57:54', '2022-01-11'),
(3, '2G18-memb-2', '2-150-00-001', 5, '5', '', 'jalanan', '303/dishub/3', '2022-01-06', 1, 'kegiatan', '1330002000', 0, '', '0', '', 'assets/upload/files/ 2021-2022-01-06-01-14-17pm.pdf', 'terkirim', '', '', 1, 2021, 1, '2022-01-06 18:14:17', '2022-01-07'),
(3, '2G18-memb-2', '4-10-00-001', 5, '5.1', '', 'Pembangunan RKB', '-', '2022-01-11', 1, 'unit', '1000000000', 1, 'unit', '1000000000', '', '', 'terkirim', 'DISETUJUI', 'PERGESERAN ANGGARAN', 1, 2022, 1, '2022-01-11 15:46:27', '2022-01-11'),
(4, '2G18-memb-2', '2-140-00-001', 6, '6.2.02', '', 'tes biaya ', '404/duduk/4', '2022-01-03', 1, 'tahunan', '301220000', 0, '', '0', '', 'assets/upload/files/Layla & Majnun-2022-01-06-01-46-27pm.pdf', 'terkirim', '', '', 1, 2021, 1, '2022-01-06 18:46:27', '2022-01-07'),
(4, '2G18-memb-2', '5-20-00-001', 5, '5.4', '', 'Tambahan ADD Desa Mantar', '-', '2022-01-09', 1, 'paket', '100000000', 1, 'paket', '200000000', '', '', 'terkirim', 'DISETUJUI', 'PERGESERAN ANGGARAN', 1, 2022, 1, '2022-01-11 15:47:58', '2022-01-11'),
(5, '2G18-memb-2', '5-20-00-001', 5, '5.2', '', 'BTT', '-', '2022-01-11', 1, 'paket', '1100000000', 1, 'paket', '-1100000000', '', '', 'terkirim', 'DISETUJUI', 'PERGESERAN ANGGARAN', 1, 2022, 1, '2022-01-11 15:52:02', '2022-01-11'),
(6, '2G18-memb-2', '5-20-00-001', 5, '5.3', '', 'Penambahan bagi hasil', '-', '2022-01-11', 1, 'Paket', '500000000', 1, 'Paket', '500000000', '', '', 'terkirim', 'DISETUJUI', 'PERGESERAN ANGGARAN', 1, 2022, 1, '2022-01-12 06:10:52', '2022-01-12'),
(7, '2G18-memb-2', '4-10-00-001', 4, '4.1.01.06', '', 'Penambahan PAD ', '-', '2022-01-11', 1, 'Paket', '600000000', 1, 'Paket', '600000000', '', '', 'terkirim', 'DISETUJUI', 'ANGGARAN BARU', 1, 2022, 1, '2022-01-12 06:14:09', '2022-01-12'),
(8, '2G18-memb-2', '5-20-00-001', 6, '6.1.01', '', 'Penambahan SiLPA', '-', '2022-01-11', 1, 'Paket', '200000000', 1, 'Paket', '200000000', '', '', 'terkirim', 'DISETUJUI', 'ANGGARAN BARU', 1, 2022, 1, '2022-01-12 06:16:53', '2022-01-12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `absensi`
--
ALTER TABLE `absensi`
  ADD PRIMARY KEY (`kdAbsensi`,`noPembahasan`,`perkada`,`tahun`,`kdMember`,`noUpd`);

--
-- Indexes for table `apbdsub1`
--
ALTER TABLE `apbdsub1`
  ADD PRIMARY KEY (`kdSub1`,`date1`,`noPembahasan1`,`perkada1`);

--
-- Indexes for table `apbdsub2`
--
ALTER TABLE `apbdsub2`
  ADD PRIMARY KEY (`kdSub1`,`kdSub2`,`date2`,`noPembahasan2`,`perkada2`);

--
-- Indexes for table `apbdsub3`
--
ALTER TABLE `apbdsub3`
  ADD PRIMARY KEY (`kdSub2`,`kdSub3`,`date3`,`noPembahasan3`,`perkada3`);

--
-- Indexes for table `apbdsub4`
--
ALTER TABLE `apbdsub4`
  ADD PRIMARY KEY (`kdSub3`,`kdSub4`,`date4`,`noPembahasan4`,`perkada4`);

--
-- Indexes for table `apbdsub5`
--
ALTER TABLE `apbdsub5`
  ADD PRIMARY KEY (`kdSub4`,`kdSub5`,`date5`,`noPembahasan5`,`perkada5`);

--
-- Indexes for table `apbdsub6`
--
ALTER TABLE `apbdsub6`
  ADD PRIMARY KEY (`kdSub5`,`kdSub6`,`date6`,`noPembahasan6`,`perkada6`);

--
-- Indexes for table `apbdsub7`
--
ALTER TABLE `apbdsub7`
  ADD PRIMARY KEY (`kdSub6`,`kdSub7`,`date7`,`noPembahasan7`,`perkada7`);

--
-- Indexes for table `app`
--
ALTER TABLE `app`
  ADD PRIMARY KEY (`kdApp`);

--
-- Indexes for table `appfitur`
--
ALTER TABLE `appfitur`
  ADD PRIMARY KEY (`kdApp`,`kdFitur`);

--
-- Indexes for table `appkey`
--
ALTER TABLE `appkey`
  ADD PRIMARY KEY (`kdApp`,`kdFitur`,`kdMember`);

--
-- Indexes for table `ci_sessions`
--
ALTER TABLE `ci_sessions`
  ADD KEY `ci_sessions_timestamp` (`timestamp`);

--
-- Indexes for table `dbidang`
--
ALTER TABLE `dbidang`
  ADD PRIMARY KEY (`kdUrusan`,`kdBidang`,`taBidang`,`perkadaB`);

--
-- Indexes for table `dinas`
--
ALTER TABLE `dinas`
  ADD PRIMARY KEY (`kdDinas`,`perkada`,`tahun`);

--
-- Indexes for table `disposisi`
--
ALTER TABLE `disposisi`
  ADD PRIMARY KEY (`tahun`,`noPembahasan`,`kdMember`,`kdUsulan`,`kdDisposisi`);

--
-- Indexes for table `dkegiatan`
--
ALTER TABLE `dkegiatan`
  ADD PRIMARY KEY (`kdProgram`,`kdKegiatan`,`taKegiatan`,`perkadaK`);

--
-- Indexes for table `dokumentasi`
--
ALTER TABLE `dokumentasi`
  ADD PRIMARY KEY (`tahun`,`perkada`,`noPembahasan`,`kdDokumentasi`);

--
-- Indexes for table `dprogram`
--
ALTER TABLE `dprogram`
  ADD PRIMARY KEY (`kdBidang`,`kdProgram`,`taProgram`,`perkadaP`);

--
-- Indexes for table `dsub`
--
ALTER TABLE `dsub`
  ADD PRIMARY KEY (`kdKegiatan`,`kdDinas`,`kdSub`,`taSub`,`perkadaS`);

--
-- Indexes for table `durusan`
--
ALTER TABLE `durusan`
  ADD PRIMARY KEY (`kdUrusan`,`taUrusan`,`perkadaU`);

--
-- Indexes for table `jabatan`
--
ALTER TABLE `jabatan`
  ADD PRIMARY KEY (`kdJabatan`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`kdMember`);

--
-- Indexes for table `notif`
--
ALTER TABLE `notif`
  ADD PRIMARY KEY (`kdNotif`);

--
-- Indexes for table `notifuser`
--
ALTER TABLE `notifuser`
  ADD PRIMARY KEY (`kdMember`,`kdNotif`);

--
-- Indexes for table `pembahasan`
--
ALTER TABLE `pembahasan`
  ADD PRIMARY KEY (`noPembahasan`,`perkada`,`tahun`);

--
-- Indexes for table `perda`
--
ALTER TABLE `perda`
  ADD PRIMARY KEY (`noPerda`);

--
-- Indexes for table `usulan`
--
ALTER TABLE `usulan`
  ADD PRIMARY KEY (`kdUsulan`,`kdMember`,`kdDinas`,`noPembahasan`,`tahun`,`perkada`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `jabatan`
--
ALTER TABLE `jabatan`
  MODIFY `kdJabatan` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
