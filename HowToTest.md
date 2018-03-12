# 查询用户
curl http://localhost:3000/users/allList
curl http://localhost:3000/users/allList/xiaoming

# 增加用户
curl -X POST -H "Content-Type: application/json" -d @test/json/userInfo.json http://localhost:3000/users/addUser