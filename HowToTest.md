# 登录
curl -X POST -H "Content-Type: application/json" -d @test/json/login.json -D ./test/cookie/cookie.txt http://localhost:5188/login

# 登出
curl -b ./test/cookie/cookie.txt http://localhost:5188/logout

# 查询用户
curl -b ./test/cookie/cookie.txt "http://localhost:5188/users/allList?pageSize=5&curPage=0"
curl -b ./test/cookie/cookie.txt http://localhost:5188/users/allList/xiaoming

# 增加用户
curl -X POST -H "Content-Type: application/json" -d @test/json/userInfo.json -b ./test/cookie/cookie.txt http://localhost:5188/users/addUser

# 修改用户
curl -X POST -H "Content-Type: application/json" -d @test/json/userInfo.json -b ./test/cookie/cookie.txt http://localhost:5188/users/modifyUser

# 删除用户
curl -X POST -H "Content-Type: application/json" -d @test/json/userInfo.json -b ./test/cookie/cookie.txt http://localhost:5188/users/delUser

# 查询病种
curl -b ./test/cookie/cookie.txt "http://localhost:5188/dikind/allList?pageSize=5&curPage=0"
curl -b ./test/cookie/cookie.txt "http://localhost:5188/dikind/allList/%E5%86%85%E7%A7%91%E7%97%85"

# 增加病种
curl -X POST -H "Content-Type: application/json" -d @test/json/dikind.json -b ./test/cookie/cookie.txt http://localhost:5188/dikind/addDikind

# 修改病种
curl -X POST -H "Content-Type: application/json" -d @test/json/dikind.json -b ./test/cookie/cookie.txt http://localhost:5188/dikind/modifyDikind

# 删除病种
curl -X POST -H "Content-Type: application/json" -d @test/json/dikind.json -b ./test/cookie/cookie.txt http://localhost:5188/dikind/delDikind

# 查询病名
curl -b ./test/cookie/cookie.txt "http://localhost:5188/diname/allList?pageSize=5&curPage=0"
curl -b ./test/cookie/cookie.txt "http://localhost:5188/diname/allList/%E8%82%BE%E7%BB%93%E7%9F%B3"

# 增加病名
curl -X POST -H "Content-Type: application/json" -d @test/json/diname.json -b ./test/cookie/cookie.txt http://localhost:5188/diname/addDiname

# 修改病名
curl -X POST -H "Content-Type: application/json" -d @test/json/diname.json -b ./test/cookie/cookie.txt http://localhost:5188/diname/modifyDiname

# 删除病名
curl -X POST -H "Content-Type: application/json" -d @test/json/diname.json -b ./test/cookie/cookie.txt http://localhost:5188/diname/delDiname