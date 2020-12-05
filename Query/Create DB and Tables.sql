CREATE DATABASE gamlabdb;
USE gamlabdb;

CREATE TABLE User (
  User_No varchar(5) NOT NULL,
  ID varchar(30) NOT NULL,
  Password varchar(30) NOT NULL,
  Email varchar(50) NOT NULL,
  Name varchar(10) NOT NULL,
  Birthday DATE NOT NULL,
  Phone_No varchar(10) NOT NULL,
  Gender varchar(1) NULL,
  PRIMARY KEY(User_No)
);

CREATE TABLE Seller (
  User_No varchar(5) NOT NULL,
  Bank_account varchar(15) NOT NULL,
  PRIMARY KEY(User_No)
  /*FOREIGN KEY (User_No) REFERENCES User(User_No)*/
);

CREATE TABLE Buyer (
  User_No varchar(5) NOT NULL,
  Member_Lvl INT NOT NULL,
  Wallet INT NOT NULL,
  PRIMARY KEY(User_No)
  /*FOREIGN KEY (User_No) REFERENCES User(User_No)*/
);

CREATE TABLE Coupon (
  Coupon_No varchar(5) NOT NULL,
  User_No varchar(5) NOT NULL,
  Discount_type INT NOT NULL,
  Discount_amount INT NOT NULL,
  Expiry_date DATE NOT NULL,
  PRIMARY KEY(Coupon_No)
  /*FOREIGN KEY (User_No) REFERENCES User(User_No)*/
);

CREATE TABLE Game (
  Game_No varchar(5) NOT NULL,
  Seller_No varchar(5) NOT NULL,
  Price INT NOT NULL,
  Sales_volume INT NOT NULL,
  Category varchar(10) NOT NULL,
  Name varchar(50) NOT NULL,
  Description varchar(500) NOT NULL,
  PRIMARY KEY(Game_No)
);

CREATE TABLE Order_list (
  User_No varchar(5) NOT NULL,
  Order_No varchar(5) NOT NULL,
  Game_No varchar(5) NOT NULL,
  Purchase_date DATE NOT NULL
  /*FOREIGN KEY (Game_No) REFERENCES Game(Game_No)*/
);

CREATE TABLE User_Comment (
  Comment_No varchar(5) NOT NULL,
  User_No varchar(5) NOT NULL,
  Game_No varchar(5) NOT NULL,
  Content varchar(500) NOT NULL,
  PRIMARY KEY(Comment_No)
  /*FOREIGN KEY (Game_No) REFERENCES Game(Game_No),
  FOREIGN KEY (User_No) REFERENCES User(User_No)*/
);
