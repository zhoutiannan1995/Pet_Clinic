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
    //葫芦O
});
describe('病例管理模块', function () {
    //葫芦O
});