const app = require('../app') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)
const mongoose = require('mongoose');
const dbConfig = require('../config/config')
beforeEach((done) => {
mongoose.connect(dbConfig.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        () => done());
});
it('login successfully', async done => {
    const res = await request.get('/admin').send({
        "phoneNumber": "0696235668",
        "password": "123456789",
    })
    expect(res.status).toBe(200)
    done()
})

it('admin information not correct ', async done => {
    const res = await request.get('/admin').send({
        "phoneNumber": "06962368",
        "password": "12345689",
    })
    expect(res.body.message).toBe(
         "user not found"
    )
    done()
})