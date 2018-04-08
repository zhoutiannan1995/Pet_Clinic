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
  `diname_des` varchar(255) NOT NULL,
  `dikind_id` int(11) NOT NULL,
  PRIMARY KEY (`diname_id`),
  UNIQUE KEY (`diname_name`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `pc_dicase`;
CREATE TABLE `pc_dicase` (
  `dicase_id` int(11) NOT NULL AUTO_INCREMENT,
  `dicase_name` varchar(255) NOT NULL,
  `diagnosis_des` varchar(255) NOT NULL,
  `diagnosis_pic` varchar(255) NOT NULL,
  `diagnosis_video` varchar(255) NOT NULL,
  `treatment_des` varchar(255) NOT NULL,
  `diname_id` int(11) NOT NULL,
  PRIMARY KEY (`dicase_id`),
  UNIQUE KEY (`dicase_name`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `pc_department`;
CREATE TABLE `pc_department` (
  `dpm_id` int(11) NOT NULL AUTO_INCREMENT,
  `dpm_name` varchar(255) NOT NULL,
  `dpm_des` varchar(255) NOT NULL,
  PRIMARY KEY (`dpm_id`),
  UNIQUE KEY (`dpm_name`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `pc_stay`;
CREATE TABLE `pc_stay` (
  `stay_id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_name` varchar(255) NOT NULL,
  `stay_starttime` datetime NOT NULL,
  `stay_endtime` datetime NOT NULL,
  PRIMARY KEY (`stay_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `pc_medicine`;
CREATE TABLE `pc_medicine` (
  `medicine_id` int(11) NOT NULL AUTO_INCREMENT,
  `medicine_name` varchar(255) NOT NULL,
  `medicine_des` varchar(255) NOT NULL,
  PRIMARY KEY (`medicine_id`),
  UNIQUE KEY (`medicine_name`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `pc_pay`;
CREATE TABLE `pc_pay` (
  `pay_id` int(11) NOT NULL AUTO_INCREMENT,
  `pay_name` varchar(255) NOT NULL,
  `pay_amount` varchar(255) NOT NULL,
  PRIMARY KEY (`pay_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `pc_assay`;
CREATE TABLE `pc_assay` (
  `assay_id` int(11) NOT NULL AUTO_INCREMENT,
  `assay_name` varchar(255) NOT NULL,
  PRIMARY KEY (`assay_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `pc_test`;
CREATE TABLE `pc_test` (
  `test_id` int(11) NOT NULL AUTO_INCREMENT,
  `test_question` varchar(255) NOT NULL,
  `choice_A` varchar(255) NOT NULL,
  `choice_B` varchar(255) NOT NULL,
  `choice_C` varchar(255) NOT NULL,
  `choice_D` varchar(255) NOT NULL,
  `choice_correct` varchar(255) NOT NULL,
  PRIMARY KEY (`test_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

INSERT INTO `pc_user` SET username = "admin", password = "admin", authority=0, create_time="2018-04-08";
INSERT INTO `pc_user` SET username = "xiaoming", password = "12345", authority=1, create_time="2018-04-08";

INSERT INTO `pc_dikind` SET dikind_name = "内科病", dikind_des = "这是内科病啊啊啊啊";
INSERT INTO `pc_dikind` SET dikind_name = "外科病", dikind_des = "这是外科病啊啊啊啊";

INSERT INTO `pc_diname` SET diname_name = "肾结石", dikind_id = 1, diname_des = "这是内科病-肾结石啊啊啊啊";
INSERT INTO `pc_diname` SET diname_name = "骨折", dikind_id = 2, diname_des = "这是外科病-骨折啊啊啊啊";

INSERT INTO `pc_dicase` SET dicase_name = "一起肾结石案例", diname_id = 1, diagnosis_des = "治好了", diagnosis_pic = "./1.jpg", diagnosis_video = "./1.avi", treatment_des = "熊氏老方1味";
INSERT INTO `pc_dicase` SET dicase_name = "一起骨折案例", diname_id = 2, diagnosis_des = "治好了", diagnosis_pic = "./2.jpg", diagnosis_video = "./2.avi", treatment_des = "去德国骨科";