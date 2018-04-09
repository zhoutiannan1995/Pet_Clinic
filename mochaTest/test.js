let assert = require('assert');
let request = require('supertest');
let app = require('../app');
let should = require('should');

let Cookies = null;
describe('获取首页模块', function () {

    it('should respond with message:"Welcome to the Pet Clinic System!"', function (done) {
        request(app)
            .get('/')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.have.property('code', '000');
                res.body.should.have.property('msg', 'Welcome to the Pet Clinic System!');
                done();
            });
    });
});

describe('登录模块', function () {

    it('should respond with message:"登录成功"', function (done) {
        request(app)
            .post('/login')
            .send({ data: { username: 'admin', password: 'admin' } })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.have.property('code', '000');
                res.body.should.have.property('msg', '登录成功');
                Cookies = res.headers['set-cookie'].pop().split(';')[0];
                done();
            });
    });
    it('wrong username should respond with message:"用户名或密码错误"', function (done) {
        request(app)
            .post('/login')
            .send({ data: { username: 'asuna', password: 'admin' } })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.have.property('code', '999');
                res.body.should.have.property('msg', '用户名或密码错误');
                done();
            });
    });
    it('wrong password should respond with message:"用户名或密码错误"', function (done) {
        request(app)
            .post('/login')
            .send({ data: { username: 'admin', password: 'kirito' } })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.have.property('code', '999');
                res.body.should.have.property('msg', '用户名或密码错误');
                done();
            });
    });
    // it('should respond with redirect on post', function (done) {
    //     // need help here
    // });
});

describe('登出模块', function () {

    it('should respond with message:"注销成功"', function (done) {
        var req = request(app).get('/logout');
        req.cookies = Cookies;
        req
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.have.property('code', '000');
                res.body.should.have.property('msg', '注销成功');
                done();
            });
    });

    it('no sessionId should respond with message:"请先登录"', function (done) {
        var req = request(app).get('/logout');
        req.cookies = Cookies;
        req
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.have.property('code', '999');
                res.body.should.have.property('msg', '请先登录');
                done();
            });
    });
});

describe('用户管理模块', function () {
    it('should be login already', function (done) {
        request(app)
            .post('/login')
            .send({ data: { username: 'admin', password: 'admin' } })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.have.property('code', '000');
                res.body.should.have.property('msg', '登录成功');
                Cookies = res.headers['set-cookie'].pop().split(';')[0];
                done();
            });
    });

    it('should respond with a list of all users', function (done) {
        var req = request(app).get('/users/allList?pageSize=5&curPage=0');
        req.cookies = Cookies;
        req
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.have.property('code', '000');
                res.body.data.should.be.instanceof(Array);
                done();
            });
    });

    it('should respond with code 000 when add user xiaogang', function (done) {
        var req = request(app).post('/users/addUser');
        req.cookies = Cookies;
        req
            .send({
                "data": {
                    "username": "xiaogang",
                    "password": "xiaogang",
                    "authority": 0
                }
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.have.property('code', '000');
                done();
            });
    });

    it('should respond with code 000 when modify user xiaogang', function (done) {
        var req = request(app).post('/users/modifyUser');
        req.cookies = Cookies;
        req
            .send({
                "data": {
                    "username": "xiaogang",
                    "password": "xiaogang2",
                    "create_time": "2018-03-12 00:00:00",
                    "authority": 1
                }
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.have.property('code', '000');
                done();
            });
    });    

    it('should respond with code 000 when del user xiaogang', function (done) {
        var req = request(app).post('/users/delUser');
        req.cookies = Cookies;
        req
            .send({
                "data": {
                    "username": "xiaogang"
                }
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.have.property('code', '000');
                done();
            });
    });

});


describe('病种管理模块', function () {
    it('should be login already', function (done) {
        request(app)
            .post('/login')
            .send({ data: { username: 'admin', password: 'admin' } })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.have.property('code', '000');
                Cookies = res.headers['set-cookie'].pop().split(';')[0];
                done();
            });
    });

    it('should respond with a list of all dikinds', function (done) {
        var req = request(app).get('/dikind/allList?pageSize=5&curPage=0');
        req.cookies = Cookies;
        req
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.have.property('code', '000');
                res.body.data.should.be.instanceof(Array);
                done();
            });
    });

    it('should respond with code 000 when add dikind 新病种3', function (done) {
        var req = request(app).post('/dikind/addDikind');
        req.cookies = Cookies;
        req
            .send({
                "data": {
                    "dikind_name": "新病种3",
                    "dikind_des": "一种新病种"
                }
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.have.property('code', '000');
                done();
            });
    });

     it('should respond with code 000 when modify dikind 新病种3', function (done) {
        var req = request(app).post('/dikind/modifyDikind');
        req.cookies = Cookies;
        req
            .send({
                "data": {
                    "dikind_name": "新病种3",
                    "dikind_des": "新的描述3"
                }
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.have.property('code', '000');
                done();
            });
    });

    it('should respond with a list of  dikind_name 科', function (done) {
        var req = request(app).get('/dikind/find?dikind_name=%E7%A7%91');
        req.cookies = Cookies;
        req
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                console.log("IIIIIIIIIII" + res.data);
                if (err) return done(err);
                res.body.should.have.property('code', '000');
                res.body.data.should.be.instanceof(Array);
                done();
            });
    });
    
    it('should respond with a list of  dikind_id=7', function (done) {
        var req = request(app).get('/dikind/find?dikind_id=7');
        req.cookies = Cookies;
        req
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                console.log("IIIIIIIIIII" + res.data);
                if (err) return done(err);
                res.body.should.have.property('code', '000');
                res.body.data.should.be.instanceof(Array);
                done();
            });
    });

    it('should respond with code 000 when del dikind 新病种3', function (done) {
        var req = request(app).post('/dikind/delDikind');
        req.cookies = Cookies;
        req
            .send({
                "data": {
                    "dikind_name": "新病种3"
                }
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.have.property('code', '000');
                done();
            });
    });

    
   
});

describe('病名管理模块', function () {
    it('should be login already', function (done) {
        request(app)
            .post('/login')
            .send({ data: { username: 'admin', password: 'admin' } })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.have.property('code', '000');
                Cookies = res.headers['set-cookie'].pop().split(';')[0];
                done();
            });
    });

    it('should respond with a list of all dinames', function (done) {
        var req = request(app).get('/diname/allList?pageSize=5&curPage=0');
        req.cookies = Cookies;
        req
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.have.property('code', '000');
                res.body.data.should.be.instanceof(Array);
                done();
            });
    });

    it('should respond with code 000 when add diname 新病名', function (done) {
        var req = request(app).post('/diname/addDiname');
        req.cookies = Cookies;
        req
            .send({
                 "data": {
                    "diname_name": "新病名",
                    "diname_des": "一种新病名",
                    "dikind_id": 1
            }
        })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.have.property('code', '000');
                done();
            });
    });

    it('should respond with code 000 when modify dikind 新病名', function (done) {
        var req = request(app).post('/diname/modifyDiname');
        req.cookies = Cookies;
        req
            .send({
                "data": {
                    "diname_name": "新病名",
                    "diname_des": "新的描述",
                    "dikind_id": 2
                }
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.have.property('code', '000');
                done();
            });
    });

    it('should respond with code 000 when del diname 新病名', function (done) {
        var req = request(app).post('/diname/delDiname');
        req.cookies = Cookies;
        req
            .send({
                "data": {
                    "diname": "新病名"
                }
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.have.property('code', '000');
                done();
            });
    });

});

