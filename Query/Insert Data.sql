USE gamlabdb;
INSERT INTO gamlab_user
VALUES('00001', 'buyer@gamlab.com', 'buyer', 'buyer', '2021-01-01', '0912345678', 'M');
INSERT INTO gamlab_user
VALUES('00002', 'seller@gamlab.com', 'seller', 'seller', '2021-01-01', '0912345678', 'M');
INSERT INTO buyer
VALUES('00001', 2000);
INSERT INTO seller
VALUES('00002', 0);
INSERT INTO coupon
VALUES('00001', '00001',150, True, '2021-02-01');
INSERT INTO coupon
VALUES('00002', '00001',300, False, '2021-03-01');
INSERT INTO order_info
VALUES('00001', '00001', NULL, '2020-12-24', 552, True);
INSERT INTO order_info
VALUES('00002', '00001', '00001', '2020-12-25', 300, True);
INSERT INTO order_list
VALUES('00001', '00001');
INSERT INTO order_list
VALUES('00001', '00003');
INSERT INTO order_list
VALUES('00002', '00003');
INSERT INTO game
VALUES('00001', '00002', 102, 2, 'multi', 'Amoung Us', '一個在線和本地聚會的團隊合作和背叛遊戲，適合4-10位玩家...在太空中！', './img/Among Us.jpg', True);
INSERT INTO game
VALUES('00002', '00002', 1599, 1, 'single', 'Cyberpunk 2077', '動作冒險開放世界《電馭叛客 2077》將讓你深入沉溺於肉體改造、爭權奪利又紙醉金迷的巨型都市「夜城」。', './img/Cyberpunk 2077.jpg', True);
INSERT INTO game
VALUES('00003', '00002', 450, 3, 'battle', 'Counter-Strike: Global Offensive', '《絕對武力：全球攻勢》（CS: GO）延續了 1999 年原作在團隊競技類遊戲上取得的傲人成就。', './img/Counter-Strike： Global Offensive.jpg', True);
INSERT INTO game
VALUES('00004', '00002', 1299, 1, 'battle', 'DayZ', '你能在殘酷的後末日世界中生存多久？這片土地遍地都是受感染的「殭屍」，你必須和其倖存者展開競爭，爭奪有限的資源。你會和陌生人一起組隊合作？還是選擇成為一名孤狼，以避免遭到背叛？', './img/DayZ.jpg', True);
INSERT INTO game
VALUES('00005', '00002', 318, 1, 'multi', 'Fall Guys', 'Fall Guys是一款超大型多人派對遊戲，最多可容納60人同時線上混戰。一輪又一輪敵我難分的比賽中，刺激和混亂程度無限升級。', './img/Fall Guys.jpg', True);
INSERT INTO game
VALUES('00006', '00002', 990, 1, 'battle', 'Grand Theft Auto V', 'Grand Theft Auto V 可讓玩家以 4K 或更高的解析度，探索獲得大獎肯定的洛聖都和布雷恩郡遊戲世界，而且也可讓玩家體驗每秒 60 影格的遊戲執行效果。', './img/Grand Theft Auto V.jpg', True);
INSERT INTO user_comment
VALUES('00001', '00001', '00001', "好玩");
INSERT INTO user_comment
VALUES('00002', '00001', '00003', "好玩");
INSERT INTO user_comment
VALUES('00003', '00001', '00003', "一堆外掛");