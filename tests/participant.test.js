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
// it('login successfully', async done => {
//     const res = await request.post('/participant').send({
//     "fullName": "elmahdi souilmi",
//     "age": 30,
//     "phone": "0696235668",
//     "email": "elmahdi@souilmi.com",
//     "password": "123456"
//     })
//     expect(res.status).toBe(200)
//     expect(res.body.message).toBe("user created")
//     done()
// })

it(' Participant information not correct ', async done => {
    const res = await request.post('/participant').send({
    "fullName": "elmahdi souilmi",
    "age": 30,
    "phone": "0696235668",
    "email": "elmahdi@souilmi.com",
    })
    expect(res.body.message).toBe(
        "created did not created"
    )
    done()
})