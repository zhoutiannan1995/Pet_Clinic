# 登录
curl -X POST -H "Content-Type: application/json" -d @test/json/login.json -D ./test/cookie/cookie.txt http://localhost:5188/login

# 登出
curl -b ./test/cookie/cookie.txt http://localhost:5188/logout

##---------------------------------------------------------------------------------------------
# 查询用户
curl -b ./test/cookie/cookie.txt "http://localhost:5188/users/allList"
curl -b ./test/cookie/cookie.txt "http://localhost:5188/users/allList?pageSize=5&curPage=0"
curl -b ./test/cookie/cookie.txt "http://localhost:5188/users/find?user_id=1"
curl -b ./test/cookie/cookie.txt "http://localhost:5188/users/find?user_name=xiaoming"

# 增加用户
curl -X POST -H "Content-Type: application/json" -d @test/json/userInfo.json -b ./test/cookie/cookie.txt http://localhost:5188/users/addUser

# 修改用户
curl -X POST -H "Content-Type: application/json" -d @test/json/userInfo.json -b ./test/cookie/cookie.txt http://localhost:5188/users/modifyUser

# 删除用户
curl -X POST -H "Content-Type: application/json" -d @test/json/userInfo.json -b ./test/cookie/cookie.txt http://localhost:5188/users/delUser

##---------------------------------------------------------------------------------------------
# 查询病种
curl -b ./test/cookie/cookie.txt "http://localhost:5188/dikind/allList"
curl -b ./test/cookie/cookie.txt "http://localhost:5188/dikind/allList?pageSize=5&curPage=0"
curl -b ./test/cookie/cookie.txt "http://localhost:5188/dikind/find?dikind_name=%E7%A7%91"
curl -b ./test/cookie/cookie.txt "http://localhost:5188/dikind/find?dikind_id=7"

# 增加病种
curl -X POST -H "Content-Type: application/json" -d @test/json/dikind.json -b ./test/cookie/cookie.txt http://localhost:5188/dikind/addDikind

# 修改病种
curl -X POST -H "Content-Type: application/json" -d @test/json/dikind.json -b ./test/cookie/cookie.txt http://localhost:5188/dikind/modifyDikind

# 删除病种
curl -X POST -H "Content-Type: application/json" -d @test/json/dikind.json -b ./test/cookie/cookie.txt http://localhost:5188/dikind/delDikind

##---------------------------------------------------------------------------------------------
# 查询病名
curl -b ./test/cookie/cookie.txt "http://localhost:5188/diname/allList"
curl -b ./test/cookie/cookie.txt "http://localhost:5188/diname/allList?pageSize=5&curPage=0"
curl -b ./test/cookie/cookie.txt "http://localhost:5188/diname/find?diname_name=%E8%82%BE"
curl -b ./test/cookie/cookie.txt "http://localhost:5188/diname/find?diname_id=1"
curl -b ./test/cookie/cookie.txt "http://localhost:5188/diname/find?dikind_id=1"

# 增加病名
curl -X POST -H "Content-Type: application/json" -d @test/json/diname.json -b ./test/cookie/cookie.txt http://localhost:5188/diname/addDiname

# 修改病名
curl -X POST -H "Content-Type: application/json" -d @test/json/diname.json -b ./test/cookie/cookie.txt http://localhost:5188/diname/modifyDiname

# 删除病名
curl -X POST -H "Content-Type: application/json" -d @test/json/diname.json -b ./test/cookie/cookie.txt http://localhost:5188/diname/delDiname

##---------------------------------------------------------------------------------------------
# 查询病例
curl -b ./test/cookie/cookie.txt "http://localhost:5188/dicase/allList"
curl -b ./test/cookie/cookie.txt "http://localhost:5188/dicase/allList?pageSize=5&curPage=0"
curl -b ./test/cookie/cookie.txt "http://localhost:5188/dicase/find?dicase_id=1"
curl -b ./test/cookie/cookie.txt "http://localhost:5188/dicase/find?dicase_id=%E4%BE%8B"

# 增加病例
curl -X POST -H "Content-Type: application/json" -d @test/json/dicase.json -b ./test/cookie/cookie.txt http://localhost:5188/dicase/addDicase

# 修改病例
curl -X POST -H "Content-Type: application/json" -d @test/json/dicase.json -b ./test/cookie/cookie.txt http://localhost:5188/dicase/modifyDicase

# 删除病例
curl -X POST -H "Content-Type: application/json" -d @test/json/dicase.json -b ./test/cookie/cookie.txt http://localhost:5188/dicase/delDicase

##---------------------------------------------------------------------------------------------
# 查询科室
curl -b ./test/cookie/cookie.txt "http://localhost:5188/department/allList"
curl -b ./test/cookie/cookie.txt "http://localhost:5188/department/allList?pageSize=5&curPage=0"
curl -b ./test/cookie/cookie.txt "http://localhost:5188/department/find?dpm_name=%E8%82%BE"
curl -b ./test/cookie/cookie.txt "http://localhost:5188/department/find?dpm_id=1"

# 增加科室
curl -X POST -H "Content-Type: application/json" -d @test/json/department.json -b ./test/cookie/cookie.txt http://localhost:5188/department/addDepartment

# 修改科室
curl -X POST -H "Content-Type: application/json" -d @test/json/department.json -b ./test/cookie/cookie.txt http://localhost:5188/department/modifyDepartment

# 删除科室
curl -X POST -H "Content-Type: application/json" -d @test/json/department.json -b ./test/cookie/cookie.txt http://localhost:5188/department/delDepartment

##---------------------------------------------------------------------------------------------
# 查询住院信息
curl -b ./test/cookie/cookie.txt "http://localhost:5188/stay/allList"
curl -b ./test/cookie/cookie.txt "http://localhost:5188/stay/allList?pageSize=5&curPage=0"
curl -b ./test/cookie/cookie.txt "http://localhost:5188/stay/find?stay_id=1"

# 增加住院信息
curl -X POST -H "Content-Type: application/json" -d @test/json/stay.json -b ./test/cookie/cookie.txt http://localhost:5188/stay/addStay

# 修改住院信息
curl -X POST -H "Content-Type: application/json" -d @test/json/stay.json -b ./test/cookie/cookie.txt http://localhost:5188/stay/modifyStay

# 删除住院信息
curl -X POST -H "Content-Type: application/json" -d @test/json/stay.json -b ./test/cookie/cookie.txt http://localhost:5188/stay/delStay

##---------------------------------------------------------------------------------------------
# 查询药品信息
curl -b ./test/cookie/cookie.txt "http://localhost:5188/medicine/allList"
curl -b ./test/cookie/cookie.txt "http://localhost:5188/medicine/allList?pageSize=5&curPage=0"
curl -b ./test/cookie/cookie.txt "http://localhost:5188/medicine/find?medicine_id=1"

# 增加药品信息
curl -X POST -H "Content-Type: application/json" -d @test/json/medicine.json -b ./test/cookie/cookie.txt http://localhost:5188/medicine/addMedicine

# 修改药品信息
curl -X POST -H "Content-Type: application/json" -d @test/json/medicine.json -b ./test/cookie/cookie.txt http://localhost:5188/medicine/modifyMedicine

# 删除药品信息
curl -X POST -H "Content-Type: application/json" -d @test/json/medicine.json -b ./test/cookie/cookie.txt http://localhost:5188/medicine/delMedicine

##---------------------------------------------------------------------------------------------
# 查询收费信息
curl -b ./test/cookie/cookie.txt "http://localhost:5188/pay/allList"
curl -b ./test/cookie/cookie.txt "http://localhost:5188/pay/allList?pageSize=5&curPage=0"
curl -b ./test/cookie/cookie.txt "http://localhost:5188/pay/find?pay_id=1"

# 增加收费信息
curl -X POST -H "Content-Type: application/json" -d @test/json/pay.json -b ./test/cookie/cookie.txt http://localhost:5188/pay/addPay

# 修改收费信息
curl -X POST -H "Content-Type: application/json" -d @test/json/pay.json -b ./test/cookie/cookie.txt http://localhost:5188/pay/modifyPay

# 删除收费信息
curl -X POST -H "Content-Type: application/json" -d @test/json/pay.json -b ./test/cookie/cookie.txt http://localhost:5188/pay/delPay

##---------------------------------------------------------------------------------------------
# 查询化验信息
curl -b ./test/cookie/cookie.txt "http://localhost:5188/assay/allList"
curl -b ./test/cookie/cookie.txt "http://localhost:5188/assay/allList?pageSize=5&curPage=0"
curl -b ./test/cookie/cookie.txt "http://localhost:5188/assay/find?assay_id=1"

# 增加化验信息
curl -X POST -H "Content-Type: application/json" -d @test/json/assay.json -b ./test/cookie/cookie.txt http://localhost:5188/assay/addAssay

# 修改化验信息
curl -X POST -H "Content-Type: application/json" -d @test/json/assay.json -b ./test/cookie/cookie.txt http://localhost:5188/assay/modifyAssay

# 删除化验信息
curl -X POST -H "Content-Type: application/json" -d @test/json/assay.json -b ./test/cookie/cookie.txt http://localhost:5188/assay/delAssay

##---------------------------------------------------------------------------------------------
# 查询试题信息
curl -b ./test/cookie/cookie.txt "http://localhost:5188/test/allList"
curl -b ./test/cookie/cookie.txt "http://localhost:5188/test/allList?pageSize=5&curPage=0"
curl -b ./test/cookie/cookie.txt "http://localhost:5188/test/find?test_id=1"

# 增加试题信息
curl -X POST -H "Content-Type: application/json" -d @test/json/test.json -b ./test/cookie/cookie.txt http://localhost:5188/test/addTest

# 修改试题信息
curl -X POST -H "Content-Type: application/json" -d @test/json/test.json -b ./test/cookie/cookie.txt http://localhost:5188/test/modifyTest

# 删除试题信息
curl -X POST -H "Content-Type: application/json" -d @test/json/test.json -b ./test/cookie/cookie.txt http://localhost:5188/test/delTest