USE gamlabdb;
INSERT INTO gamlab_user
VALUES('00001', 'buyer@gamlab.com', 'buyer', 'buyer', '2021-01-01', '0912345678', 'M');
INSERT INTO gamlab_user
VALUES('00002', 'seller@gamlab.com', 'seller', 'seller', '2021-01-01', '0912345678', 'M');
INSERT INTO buyer
VALUES('00001', 0, 2000);
INSERT INTO seller
VALUES('00002', '0123456789');
INSERT INTO coupon
VALUES('00001', '00001',150, True, '2021-02-01');
INSERT INTO coupon
VALUES('00002', '00001',300, False, '2021-03-01');
INSERT INTO order_info
VALUES('00001', '00001', NULL, '2020-12-24', 552, True);
INSERT INTO order_info
VALUES('00002', '00001', '00001', '2020-12-25', 300, False);
INSERT INTO order_list
VALUES('00001', '00001');
INSERT INTO order_list
VALUES('00001', '00003');
INSERT INTO order_list
VALUES('00002', '00003');
INSERT INTO game
VALUES('00001', '00002', 102, 1, 'multi', 'Amoung Us', '一個在線和本地聚會的團隊合作和背叛遊戲，適合4-10位玩家...在太空中！', './img/Among Us.jpg', True);
INSERT INTO game
VALUES('00002', '00002', 1599, 0, 'single', 'Cyberpunk 2077', '動作冒險開放世界《電馭叛客 2077》將讓你深入沉溺於肉體改造、爭權奪利又紙醉金迷的巨型都市「夜城」。', './img/Cyberpunk 2077.jpg', True);
INSERT INTO game
VALUES('00003', '00002', 450, 2, 'battle', 'Counter-Strike: Global Offensive', '《絕對武力：全球攻勢》（CS: GO）延續了 1999 年原作在團隊競技類遊戲上取得的傲人成就。', './img/Counter-Strike： Global Offensive.jpg', True);
INSERT INTO user_comment
VALUES('00001', '00001', '00001', "好玩");
INSERT INTO user_comment
VALUES('00002', '00001', '00003', "好玩");
INSERT INTO user_comment
VALUES('00003', '00001', '00003', "一堆外掛");