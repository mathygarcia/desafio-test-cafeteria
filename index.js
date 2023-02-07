const express = require('express');
const app = express();
const port = 3000

const cafes = require("./cafes.json")

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.use(express.json())

app.get("/cafes", (req, res) => {
    res.status(200).send(cafes)
})

app.get("/cafes/:id", (req, res) => {
    const { id } = req.params
    const coffee = cafes.find(c => c.id == id)
    if (coffee) res.status(200).send(coffee)
    else res.status(404).send({ message: "I don't know that coffee" })
})

app.post("/cafes", (req, res) => {
    const coffee = req.body
    const { id } = coffee
    therIsThatCoffee
    const therIsThatCoffee = cafes.some(c => c.id == id)
    if (therIsThatCoffee) res.status(400).send({ message: "That coffee already exists" })
    else {
        cafes.push(coffee)
        res.status(201).send(cafes)
    }
})

app.put("/cafes/:id", (req, res) => {
    const coffe = req.body;
    const { id } = req.params;
    if (id !== coffe.id)
        return res
            .status(400)
            .send({
                message: "The id of the parameter is not equal to the id of the coffee received",
            });

    const coffeIndexFound = cafes.findIndex((p) => p.id == id);
    if (coffeIndexFound >= 0) {
        cafes[coffeIndexFound] = coffe;
        res.send(cafes);
    } else {
        res
            .status(404)
            .send({ message: "No coffee found" });
    }
});

app.delete("/cafes/:id", (req, res) => {
    const jwt = req.header("Authorization")
    if (jwt) {
        const { id } = req.params
        const coffeIndexFound = cafes.findIndex(c => c.id == id)

        if (coffeIndexFound >= 0) {
            cafes.splice(coffeIndexFound, 1)
            console.log(coffeIndexFound, cafes)
            res.send(cafes)
        } else {
            res.status(404).send({ message: "No coffee found" })
        }

    } else res.status(400).send({ message: "no token found in headers" })
})

app.use("*", (req, res) => {
    res.status(404).send({ message: "this route does not exist search again with another route" })
})

module.exports = app