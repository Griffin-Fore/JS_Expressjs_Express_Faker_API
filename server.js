import express from "express";
const app = express()
const port = 8000;
import {faker} from "@faker-js/faker"

app.use(express.json());

function middleWare(req, res, next) {
    console.log('middleWare')
    next()
}

// Create an object creation method that prepopulates a person from faker
const createFakePerson = () => {
    const newPerson = {
        password: faker.internet.password(), 
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        lastName: faker.person.lastName(),
        firstName: faker.person.firstName(),
        _id: faker.string.uuid()
    }
    return newPerson;
}
// Create an object creation method that prepopulates a company from faker
const createFakeCompany = () => {
    const newCompany = {
        id: faker.string.uuid(),
        name: faker.company.name(),
        address: {
            street: faker.location.street(),
            city: faker.location.cityName(),
            state: faker.location.state(),
            zipCode: faker.location.zipCode(),
            country: faker.location.country()
        }
    }
    return newCompany
}
// Create a push method that sets as a variable the return from the person faker method, 
    // and then pushes that person object to the database
app.post("/api/users/new", (req, res) => {
    const personToPost = createFakePerson();
    res.json(personToPost);
})
// Create a push method that sets as a variable the return from the company faker method, and then 
    // pushes that company object to the database
app.post("/api/companies/new", (req, res) => {
    const companyToPost = createFakeCompany();
    res.json(companyToPost);
})
// create a push method that creates as variables person and comapnyy objects from the faker method, 
// then pushes that person and that company object to the database
app.post("/api/user/company", (req, res) => {
    const userToPost = createFakePerson();
    const companyToPost = createFakeCompany();
    const userAndCompany = [userToPost, companyToPost];
    res.json(userAndCompany);
})

app.listen(port, ()=> console.log(`Listening on port ${port}`))