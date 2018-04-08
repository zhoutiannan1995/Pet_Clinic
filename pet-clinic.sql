DROP TABLE IF EXISTS `pc_user`;
CREATE TABLE `pc_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `create_time` datetime,
  `authority` int(11) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `pc_dikind`;
CREATE TABLE `pc_dikind` (
  `dikind_id` int(11) NOT NULL AUTO_INCREMENT,
  `dikind_name` varchar(255) NOT NULL,
  `dikind_des` varchar(255) NOT NULL,
  PRIMARY KEY (`dikind_id`),
  UNIQUE KEY (`dikind_name`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `pc_diname`;
CREATE TABLE `pc_diname` (
  `diname_id` int(11) NOT NULL AUTO_INCREMENT,
  `diname_name` varchar(255) NOT NULL,
  `dikind_id` int(11) NOT NULL,
  `diname_des` varchar(255) NOT NULL,
  PRIMARY KEY (`diname_id`),
  UNIQUE KEY (`diname_name`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `pc_case`;
CREATE TABLE `pc_case` (
  `case_id` int(11) NOT NULL AUTO_INCREMENT,
  `case_name` varchar(255) NOT NULL,
  `diname_id` int(11) NOT NULL,
  `diagnosis_des` varchar(255) NOT NULL,
  `diagnosis_pic` varchar(255) NOT NULL,
  `diagnosis_video` varchar(255) NOT NULL,
  `treatment_des` varchar(255) NOT NULL,
  PRIMARY KEY (`case_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

INSERT INTO `pc_user` SET username = "admin", password = "admin", authority=0, create_time="2018-04-08";
INSERT INTO `pc_user` SET username = "xiaoming", password = "12345", authority=1, create_time="2018-04-08";

INSERT INTO `pc_dikind` SET dikind_name = "内科病", dikind_des = "这是内科病啊啊啊啊";
INSERT INTO `pc_dikind` SET dikind_name = "外科病", dikind_des = "这是外科病啊啊啊啊";

INSERT INTO `pc_diname` SET diname_name = "肾结石", dikind_id = 1, diname_des = "这是内科病-肾结石啊啊啊啊";
INSERT INTO `pc_diname` SET diname_name = "骨折", dikind_id = 2, diname_des = "这是外科病-骨折啊啊啊啊";

INSERT INTO `pc_case` SET case_name = "一起肾结石案例", diname_id = 1, diagnosis_des = "治好了", diagnosis_pic = "./1.jpg", diagnosis_video = "./1.avi", treatment_des = "熊氏老方1味";
INSERT INTO `pc_case` SET case_name = "一起骨折案例", diname_id = 2, diagnosis_des = "治好了", diagnosis_pic = "./2.jpg", diagnosis_video = "./2.avi", treatment_des = "去德国骨科";