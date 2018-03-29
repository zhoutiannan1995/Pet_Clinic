# 登录
curl -X POST -H "Content-Type: application/json" -d @test/json/login.json -D ./test/cookie/cookie.txt http://localhost:5188/login

# 登出
curl -b ./test/cookie/cookie.txt http://localhost:5188/logout

# 查询用户
curl -b ./test/cookie/cookie.txt http://localhost:5188/users/allList
curl -b ./test/cookie/cookie.txt http://localhost:5188/users/allList/xiaoming

# 增加用户
curl -X POST -H "Content-Type: application/json" -d @test/json/userInfo.json -b ./test/cookie/cookie.txt http://localhost:5188/users/addUser

# 删除用户
curl -X POST -H "Content-Type: application/json" -d @test/json/userInfo.json -b ./test/cookie/cookie.txt http://localhost:5188/users/delUser