//Sub 1
    DELIMITER $$
    CREATE PROCEDURE IF NOT EXISTS  paddSub1(
        IN kd varchar(5),
        nm varchar(150),
        pagu varchar (25),
        pembahasan int(2),
        perkada int(2),
        tahun year(4)
    )
    BEGIN
        DECLARE countSub int DEFAULT 0;
        SELECT a.selected1 INTO countSub FROM apbdsub1 a WHERE a.kdSub1=kd AND a.noPembahasan1=pembahasan AND a.perkada1=perkada AND a.date1=tahun;
        IF countSub>0 THEN
            SELECT false as status;
        ELSE
            INSERT INTO apbdsub1(kdSub1,nmSub1,pagu1,noPembahasan1,perkada1,date1) VALUES (kd,nm,pagu,pembahasan,perkada,tahun);
            SELECT true as status;
        END IF;
    END$$;


    DELIMITER $$
    CREATE PROCEDURE IF NOT EXISTS  pupdSub1(
        IN kd varchar(5),
        nm varchar(150),
        pagu varchar (25),
        pembahasan int(2),
        perkada int(2),
        tahun year(4) 
    )
    BEGIN
        UPDATE apbdsub1 SET nmSub1=nm,pagu1=pagu WHERE kdSub1=kd and date1=tahun  AND perkada1=perkada AND noPembahasan1=pembahasan;
    END$$;

    DELIMITER $$
    CREATE PROCEDURE IF NOT EXISTS  responSub1(
        IN kdSub varchar(2),
        selected tinyint(1),
        pembahasan int(2),
        perkada int(2),
        tahun year(4) 
    )
    BEGIN
        update apbdsub1 set 
            pagu1=(SELECT sum(a.pagu2) FROM apbdsub2 a WHERE a.noPembahasan2=pembahasan  AND a.perkada2=perkada AND a.date2=tahun AND a.kdSub1=kdSub),
            selected1=selected
        where kdSub1=kdSub and noPembahasan1=pembahasan AND perkada1=perkada and date1=tahun;
    END$$;

    
//SUB2
    DELIMITER $$
    CREATE PROCEDURE IF NOT EXISTS  paddSub2(
        IN kdSub varchar(2),
        kd varchar(5),
        nm varchar(150),
        pagu varchar (25),
        pembahasan int(2),
        perkada int(2),
        tahun year(4) 
    )
    BEGIN
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
    END$$;


    DELIMITER $$
    CREATE PROCEDURE IF NOT EXISTS  pupdSub2(
        IN kdSub varchar(2),
        kd varchar(5),
        nm varchar(150),
        pagu varchar (25),
        pembahasan int(2),
        perkada int(2),
        tahun year(4) 
    )
    BEGIN
        DECLARE countSub int DEFAULT 0;
        SELECT a.selected2 INTO countSub FROM apbdsub2 a WHERE a.kdSub2=kd AND a.noPembahasan2=pembahasan AND 
            a.date2=tahun AND a.kdSub1=kdSub and a.perkada2=perkada;
        IF countSub>0 THEN
            UPDATE apbdsub2 a SET a.nmSub2=nm,a.pagu2=pagu WHERE a.kdSub2=kd AND a.kdSub1=kdSub and a.date2=tahun and a.perkada2=perkada AND a.noPembahasan2=pembahasan;
            call responSub1(kdSub,0,pembahasan,perkada,tahun);
        ELSE
            UPDATE apbdsub2 a SET a.nmSub2=nm WHERE a.kdSub2=kd AND a.kdSub1=kdSub and a.date2=tahun and a.perkada2=perkada AND a.noPembahasan2=pembahasan;
        END IF;
    END$$;


    DELIMITER $$
    CREATE PROCEDURE IF NOT EXISTS  pdelSub2(
        IN kdSub varchar(2),
        kd varchar(5),
        pembahasan int(2),
        perkada int(2),
        tahun year(4) 
    )
    BEGIN
        DECLARE countSub int DEFAULT 0;
        SELECT count(a.kdSub2) INTO countSub FROM apbdsub2 a WHERE a.noPembahasan2=pembahasan and a.perkada2=perkada AND 
            a.date2=tahun AND a.kdSub1=kdSub;
        delete from apbdSub2 where kdSub2=kd and kdSub1=kdSub and perkada2=perkada and noPembahasan2=pembahasan and date2=tahun;
        IF countSub=1 THEN
            call responSub1(kdSub,1,pembahasan,perkada,tahun);
        ELSE
            call responSub1(kdSub,0,pembahasan,perkada,tahun);
        END IF;
    END$$;
    
    DELIMITER $$
    CREATE PROCEDURE IF NOT EXISTS  responSub2(
        IN kdSub varchar(25),
        selected tinyint(1),
        pembahasan int(2),
        perkada int(2),
        tahun year(4) 
    )
    BEGIN
        update apbdsub2 set 
            pagu2=(SELECT sum(a.pagu3) FROM apbdsub3 a WHERE a.noPembahasan3=pembahasan and a.perkada3=perkada AND a.date3=tahun AND a.kdSub2=kdSub),
            selected2=selected
        where kdSub2=kdSub and noPembahasan2=pembahasan and perkada2=perkada and date2=tahun;
        call responSub1((select kdSub1 from apbdsub2 where kdSub2=kdSub and noPembahasan2=pembahasan and perkada2=perkada and date2=tahun limit 1),0,pembahasan,perkada,tahun);
    END$$;


//SUB 3
    DELIMITER $$
    CREATE PROCEDURE IF NOT EXISTS  paddSub3(
        IN kdSub varchar(25),
        kd varchar(25),
        nm varchar(150),
        pagu varchar (25),
        pembahasan int(2),
        perkada int(2),
        tahun year(4) 
    )
    BEGIN
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
    END$$;


    DELIMITER $$
    CREATE PROCEDURE IF NOT EXISTS  pupdSub3(
        IN kdSub varchar(25),
        kd varchar(25),
        nm varchar(150),
        pagu varchar (25),
        pembahasan int(2),
        perkada int(2),
        tahun year(4) 
    )
    BEGIN
        DECLARE countSub int DEFAULT 0;
        SELECT a.selected3 INTO countSub FROM apbdsub3 a WHERE a.kdSub3=kd AND a.noPembahasan3=pembahasan AND 
            a.date3=tahun AND a.kdSub2=kdSub  and a.perkada3=perkada;
        IF countSub>0 THEN
            UPDATE apbdsub3 a SET a.nmSub3=nm,a.pagu3=pagu WHERE a.kdSub3=kd AND a.kdSub2=kdSub and a.date3=tahun AND a.noPembahasan3=pembahasan and a.perkada3=perkada;
            call responSub2(kdSub,0,pembahasan,perkada,tahun);
        ELSE
            UPDATE apbdsub3 a SET a.nmSub3=nm WHERE a.kdSub3=kd AND a.kdSub2=kdSub and a.date3=tahun AND a.noPembahasan3=pembahasan and a.perkada3=perkada;
        END IF;
    END$$;


    DELIMITER $$
    CREATE PROCEDURE IF NOT EXISTS  pdelSub3(
        IN kdSub varchar(25),
        kd varchar(25),
        pembahasan int(2),
        perkada int(2),
        tahun year(4) 
    )
    BEGIN
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
    END$$;

    DELIMITER $$
    CREATE PROCEDURE IF NOT EXISTS  responSub3(
        IN kdSub varchar(25),
        selected tinyint(1),
        pembahasan int(2),
        perkada int(2),
        tahun year(4) 
    )
    BEGIN
        update apbdsub3 set 
            pagu3=(SELECT sum(a.pagu4) FROM apbdsub4 a WHERE a.noPembahasan4=pembahasan AND a.date4=tahun and a.perkada4=perkada AND a.kdSub3=kdSub),
            selected3=selected
        where kdSub3=kdSub and noPembahasan3=pembahasan and perkada3=perkada and date3=tahun;
        call responSub2((select kdSub2 from apbdsub3 where kdSub3=kdSub and noPembahasan3=pembahasan and perkada3=perkada and date3=tahun limit 1),0,pembahasan,perkada,tahun);
    END$$;

//SUB 4
    DELIMITER $$
    CREATE PROCEDURE IF NOT EXISTS  paddSub4(
        IN kdSub varchar(25),
        kd varchar(25),
        nm varchar(150),
        pagu varchar (25),
        pembahasan int(2),
        perkada int(2),
        tahun year(4) 
    )
    BEGIN
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
    END$$;


    DELIMITER $$
    CREATE PROCEDURE IF NOT EXISTS  pupdSub4(
        IN kdSub varchar(25),
        kd varchar(25),
        nm varchar(150),
        pagu varchar (25),
        pembahasan int(2),
        perkada int(2),
        tahun year(4) 
    )
    BEGIN
        DECLARE countSub int DEFAULT 0;
        SELECT a.selected4 INTO countSub FROM apbdsub4 a WHERE a.kdSub4=kd AND a.noPembahasan4=pembahasan AND 
            a.date4=tahun AND a.kdSub3=kdSub and a.perkada4=perkada;
        IF countSub>0 THEN
            UPDATE apbdsub4 a SET a.nmSub4=nm,a.pagu4=pagu WHERE a.kdSub4=kd AND a.kdSub3=kdSub and a.date4=tahun and and a.perkada4=perkada AND a.noPembahasan4=pembahasan;
            call responSub3(kdSub,0,pembahasan,perkada,tahun);
        ELSE
            UPDATE apbdsub4 a SET a.nmSub4=nm WHERE a.kdSub4=kd AND a.kdSub3=kdSub and a.date4=tahun AND a.noPembahasan4=pembahasan and a.perkada4=perkada;
        END IF;
    END$$;


    DELIMITER $$
    CREATE PROCEDURE IF NOT EXISTS  pdelSub4(
        IN kdSub varchar(25),
        kd varchar(25),
        pembahasan int(2),
        perkada int(2),
        tahun year(4) 
    )
    BEGIN
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
    END$$;

    DELIMITER $$
    CREATE PROCEDURE IF NOT EXISTS  responSub4(
        IN kdSub varchar(25),
        selected tinyint(1),
        pembahasan int(2),
        perkada int(2),
        tahun year(4) 
    )
    BEGIN
        update apbdsub4 set 
            pagu4=(SELECT sum(a.pagu5) FROM apbdsub5 a WHERE a.noPembahasan5=pembahasan AND a.date5=tahun  and a.perkada5=perkada AND  a.kdSub4=kdSub),
            selected4=selected
        where kdSub4=kdSub and noPembahasan4=pembahasan and date4=tahun  and perkada4=perkada;
        call responSub3((select kdSub3 from apbdsub4 where kdSub4=kdSub and noPembahasan4=pembahasan and date4=tahun  and perkada4=perkada limit 1),0,pembahasan,perkada,tahun);
    END$$;

//SUB 5
    DELIMITER $$
    CREATE PROCEDURE IF NOT EXISTS  paddSub5(
        IN kdSub varchar(25),
        kd varchar(25),
        nm varchar(150),
        pagu varchar (25),
        pembahasan int(2),
        perkada int(2),
        tahun year(4) 
    )
    BEGIN
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
    END$$;


    DELIMITER $$
    CREATE PROCEDURE IF NOT EXISTS  pupdSub5(
        IN kdSub varchar(25),
        kd varchar(25),
        nm varchar(150),
        pagu varchar (25),
        pembahasan int(2),
        perkada int(2),
        tahun year(4) 
    )
    BEGIN
        DECLARE countSub int DEFAULT 0;
        SELECT a.selected5 INTO countSub FROM apbdsub5 a WHERE a.kdSub5=kd AND a.noPembahasan5=pembahasan AND 
            a.date5=tahun AND a.kdSub4=kdSub and a.perkada5=perkada;
        IF countSub>0 THEN
            UPDATE apbdsub5 a SET a.nmSub5=nm,a.pagu5=pagu WHERE a.kdSub5=kd AND a.kdSub4=kdSub and a.date5=tahun and a.perkada5=perkada AND a.noPembahasan5=pembahasan;
            call responSub4(kdSub,0,pembahasan,perkada,tahun);
        ELSE
            UPDATE apbdsub5 a SET a.nmSub5=nm WHERE a.kdSub5=kd AND a.kdSub4=kdSub and a.date5=tahun and a.perkada5=perkada AND a.noPembahasan5=pembahasan;
        END IF;
    END$$;


    DELIMITER $$
    CREATE PROCEDURE IF NOT EXISTS  pdelSub5(
        IN kdSub varchar(25),
        kd varchar(25),
        pembahasan int(2),
        perkada int(2),
        tahun year(4) 
    )
    BEGIN
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
    END$$;

    DELIMITER $$
    CREATE PROCEDURE IF NOT EXISTS  responSub5(
        IN kdSub varchar(25),
        selected tinyint(1),
        pembahasan int(2),
        perkada int(2),
        tahun year(4) 
    )
    BEGIN
        update apbdsub5 set 
            pagu5=(SELECT sum(a.pagu6) FROM apbdsub6 a WHERE a.noPembahasan6=pembahasan and a.perkada6=perkada AND a.date6=tahun AND 
                   a.kdSub5=kdSub),
            selected5=selected
        where kdSub5=kdSub and noPembahasan5=pembahasan and perkada5=perkada and date5=tahun;
        call responSub4((select kdSub4 from apbdsub5 where kdSub5=kdSub and noPembahasan5=pembahasan and perkada5=perkada and date5=tahun limit 1),0,pembahasan,perkada,tahun);
    END$$;

//SUB 6
    DELIMITER $$
    CREATE PROCEDURE IF NOT EXISTS  paddSub6(
        IN kdSub varchar(25),
        kd varchar(25),
        nm varchar(150),
        pagu varchar (25),
        pembahasan int(2),
        perkada int(2),
        tahun year(4) 
    )
    BEGIN
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
    END$$;


    DELIMITER $$
    CREATE PROCEDURE IF NOT EXISTS  pupdSub6(
        IN kdSub varchar(25),
        kd varchar(25),
        nm varchar(150),
        pagu varchar (25),
        pembahasan int(2),
        perkada int(2),
        tahun year(4) 
    )
    BEGIN
        DECLARE countSub int DEFAULT 0;
        SELECT a.selected6 INTO countSub FROM apbdsub6 a WHERE a.kdSub6=kd AND a.noPembahasan6=pembahasan AND 
            a.date6=tahun AND a.kdSub5=kdSub and a.perkada6=perkada;
        IF countSub>0 THEN
            UPDATE apbdsub6 a SET a.nmSub6=nm,a.pagu6=pagu WHERE a.kdSub6=kd AND a.kdSub5=kdSub and a.date6=tahun and a.perkada6=perkada AND a.noPembahasan6=pembahasan;
            call responSub5(kdSub,0,pembahasan,perkada,tahun);
        ELSE
            UPDATE apbdsub6 a SET a.nmSub6=nm WHERE a.kdSub6=kd AND a.kdSub5=kdSub and a.date6=tahun and a.perkada6=perkada AND a.noPembahasan6=pembahasan;
        END IF;
    END$$;


    DELIMITER $$
    CREATE PROCEDURE IF NOT EXISTS  pdelSub6(
        IN kdSub varchar(25),
        kd varchar(25),
        pembahasan int(2),
        perkada int(2),
        tahun year(4) 
    )
    BEGIN
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
    END$$;

    DELIMITER $$
    CREATE PROCEDURE IF NOT EXISTS  responSub6(
        IN kdSub varchar(25),
        selected tinyint(1),
        pembahasan int(2),
        perkada int(2),
        tahun year(4) 
    )
    BEGIN
        update apbdsub6 set 
            pagu6=(SELECT sum(a.pagu7) FROM apbdsub7 a WHERE a.noPembahasan7=pembahasan AND a.date7=tahun AND 
                   a.kdSub6=kdSub and a.perkada7=perkada),
            selected6=selected
        where kdSub6=kdSub and noPembahasan6=pembahasan and date6=tahun and perkada6=perkada;
        call responSub5((select kdSub5 from apbdsub6 where kdSub6=kdSub and noPembahasan6=pembahasan and date6=tahun and perkada6=perkada limit 1),0,pembahasan,perkada,tahun);
    END$$;

//SUB 7

    DELIMITER $$
    CREATE PROCEDURE IF NOT EXISTS  paddSub7(
        IN kdSub varchar(25),
        kd varchar(25),
        nm varchar(150),
        pagu varchar (25),
        pembahasan int(2),
        perkada int(2),
        tahun year(4) 
    )
    BEGIN
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
    END$$;


    DELIMITER $$
    CREATE PROCEDURE IF NOT EXISTS  pupdSub7(
        IN kdSub varchar(25),
        kd varchar(25),
        nm varchar(150),
        pagu varchar (25),
        pembahasan int(2),
        perkada int(2),
        tahun year(4) 
    )
    BEGIN
        DECLARE countSub int DEFAULT 0;
        SELECT a.selected7 INTO countSub FROM apbdsub7 a WHERE a.kdSub7=kd AND a.noPembahasan7=pembahasan AND 
            a.date7=tahun AND a.kdSub6=kdSub and a.perkada7=perkada;
        IF countSub>0 THEN
            UPDATE apbdsub7 a SET a.nmSub7=nm,a.pagu7=pagu WHERE a.kdSub7=kd AND a.kdSub6=kdSub and a.date7=tahun and a.perkada7=perkada AND a.noPembahasan7=pembahasan;
            call responSub6(kdSub,0,pembahasan,perkada,tahun);
        ELSE
            UPDATE apbdsub7 a SET a.nmSub7=nm WHERE a.kdSub7=kd AND a.kdSub6=kdSub and a.perkada7=perkada and a.date7=tahun AND a.noPembahasan7=pembahasan;
        END IF;
    END$$;


    DELIMITER $$
    CREATE PROCEDURE IF NOT EXISTS  pdelSub7(
        IN kdSub varchar(25),
        kd varchar(25),
        pembahasan int(2),
        perkada int(2),
        tahun year(4) 
    )
    BEGIN
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
    END$$;


// tabel

    <div style="text-align: center;">
    <div style="text-align: left;">
    <p style="text-align: center;"><strong>BERITA ACARA</strong><strong> RAPAT</strong></p>
    <p style="text-align: center;"><strong>TIM ANGGARAN PEMERINTAH DAERAH</strong><strong> (TAPD) KE-</strong></p>
    <p style="text-align: center;"><strong>KABUPATEN SUMBAWA BARAT</strong></p>
    <p><strong>&nbsp;</strong></p>
    <p style="text-align: left;">Pada hari ini Kamis Tanggal Lima Belas Bulan April Tahun Dua Ribu Dua Puluh Satu (15-04-2021) Pukul 13.30 Wita bertempat di Ruang Sidang I Sekretariat Daerah Kabupaten Sumbawa Barat telah dilaksanakan Rapat Koordinasi TAPD untuk Pembahasan Program/Kegiatan Tahun Anggaran 2021 yang dipimpin oleh <strong>Ketua TAPD Kabupaten Sumbawa Barat</strong> (ada opsi pimpinan forum) dan dihadari oleh:</p>
    <table style="border-collapse: collapse; width: 39.5971%; height: 54px; margin-left: 25px;" border="0">
    <tbody>
    <tr style="height: 18px;">
    <td style="width: 2.68456%; height: 18px;">1.</td>
    <td style="width: 19.9664%; height: 18px; text-align: left;">Tim Anggaran Pemerintah Daerah</td>
    <td style="width: 16.9463%; height: 18px; text-align: left;">:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Orang</td>
    </tr>
    <tr style="height: 18px;">
    <td style="width: 2.68456%; height: 18px;">2.</td>
    <td style="width: 19.9664%; height: 18px; text-align: left;">Tim Teknis TAPD</td>
    <td style="width: 16.9463%; height: 18px; text-align: left;">:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Orang</td>
    </tr>
    <tr style="height: 18px;">
    <td style="width: 2.68456%; height: 18px;">3.</td>
    <td style="width: 19.9664%; height: 18px; text-align: left;">Tim Sekretariat TAPD</td>
    <td style="width: 16.9463%; height: 18px; text-align: left;">:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Orang</td>
    </tr>
    </tbody>
    </table>
    sesuai daftar hadir terlampir dengan keputusan sebagai berikut:
    <ol>
    <li>&nbsp;</li>
    </ol>
    <p>&nbsp;</p>
    <p>Demikian berita acara rapat ini dibuat pada hari, tanggal, jam dan tempat tersebut di atas dengan sebenar-benarnya.</p>
    
    <table style="border-collapse: collapse; width: 39.5971%; height: 54px; margin-left: 25px;" border="0">
    <tbody>
    <tr style="height: 18px;">
        <td style="width: 2.68456%; height: 18px;">
            <p style="padding-left: 920px; text-align: center;">Taliwang, 15 April 2021</p>
            <p style="padding-left: 920px; text-align: center;">Penjabat Sekretaris Daerah</p>
            <p style="padding-left: 920px; text-align: center;">Kabupaten Sumbawa Barat</p>
            <p style="padding-left: 920px; text-align: center;">selaku KetuaTAPD,</p>
            <p style="padding-left: 920px; text-align: center;">&nbsp;</p>
            <p style="padding-left: 920px; text-align: center;">&nbsp;</p>
            <p style="padding-left: 920px; text-align: center;"><strong>AMAR NURMANSYAH, ST., M.Si</strong></p>
            <p style="padding-left: 920px; text-align: center;">Pembina Tingkat I, IV/b</p>
            <p style="padding-left: 920px; text-align: center;">NIP. 19751228 200501 1 006</p>
        </td>
    </tr>
    </tbody>
    </table>
    </div>
    </div>



