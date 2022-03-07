const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const { User } = require('./models');
const { Ride } = require('./models');
const { Bus } = require('./models');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config');

// MIDDLEWARES 
app.use(express.json());
app.use(cors());

// CONNECT TO DB
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('DB CONNECTED!'))
.catch(err => {
    console.log(`DB Connection Error: ${err.message}`)
})

app.get('/', (req, res) => {
        res.status(200).send("Simple bus transport API");
});

//! ----- ROUTES FOR USERS ------
app.post('/api/users/register', async(req, res) => {
    // VALIDATE BEFORE ADDING USER
    // const { error } = registerValidation(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    // CHECK IF USER EXISTS
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');


    // CREATE USER
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        role: req.body.role,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        res.status(200).send({ user: user._id, firstname: user.firstname, role: user.role, code: 200, message: 'Successfully created user' });

    } catch (err) {
        res.status(400).send(err);
    }
});

app.post('/api/users/login', async(req, res) => {
    // VALIDATE
    // const { error } = loginValidation(req.body);
    // if (error) return res.status(400).send({ code: 400, details: error.details[0].message });

    // CHECK IF EMAIL EXISTS
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ code: 400, details: 'Email or Password is invalid' });

    // CHECK IF PASSWORD IS CORRECT
    const validPass = req.body.password === user.password;
    if (!validPass) return res.status(400).send({ code: 400, details: 'Email or Password is invalid' });


    // CREATE AND ASSIGN A TOKEN
    try {
        const token = await jwt.sign({ _id: user._id }, 'skdnvkdsjnvsdkjn');
        res.header('auth-token', token).status(200).send({ user: user._id, firstname: user.firstname, role: user.role, token: token, message: 'successfully Logged in', code: 200 });

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// GET SPECIFIC USER
app.get('/api/users/:userID', async(req, res) => {
    try {
        const user = await User.findById(req.params.userID);
        res.status(200).send(user);
    } catch (err) {
        res.json({ message: err });
    }
});



//! ----- ROUTES FOR RIDES ------
app.post('/api/rides/request', async(req, res) => {
    const ride = new Ride({
        passenger: req.body.passenger,
        pickupTime: req.body.pickupTime,
        departureLocation: req.body.departureLocation,
        destinationLocation: req.body.destinationLocation,
        numberOfSits: req.body.numberOfSits,
        disabledPeople: req.body.disabledPeople,
    });
    try {
        await ride.save();
        res.status(200).send({ code: 200, message: 'Successfully requested ride.' });

    } catch (err) {
        res.status(400).send(err);
    }
});

// GET ALL RIDE REQUESTS
app.get('/api/rides', async(req, res) => {
    try {
        const rides = await Ride.find().populate('passenger');
        res.json(rides);

    } catch (err) {
        res.json({ message: err });
    }
});

// GET A SPECIFIC USER'S RIDES
app.get('/api/rides/:userID', async(req, res) => {
    try {
        const rides = await Ride.find({ passenger: req.params.userID });
        res.json(rides);

    } catch (err) {
        res.json({ message: err });
    }
});


//! ----- ROUTES FOR BUSES ------
app.post('/api/buses', async(req, res) => {
    const bus = new Bus({
        plateNumber: req.body.plateNumber,
        available: req.body.available,
        driver: req.body.driver,
        issuingDate: req.body.issuingDate,
    });
    try {
        await bus.save();
        res.status(200).send({ code: 200, message: 'Successfully created bus.' });

    } catch (err) {
        res.status(400).send(err);
    }
})

// GET ALL BUSES
app.get('/api/buses', async(req, res) => {
    try {
        const buses = await Bus.find().populate('driver');
        res.json(buses);

    } catch (err) {
        res.json({ message: err });
    }
});

// GET A SPECIFIC DRIVER'S BUSES
app.get('/api/buses/:userID', async(req, res) => {
    try {
        const buses = await Bus.find({ driver: req.params.userID });
        res.json(buses);

    } catch (err) {
        res.json({ message: err });
    }
});

//! ----- ROUTES FOR BUS STOPS ------

//! ----- ROUTES FOR ZONES ------

app.listen(process.env.PORT || 5000);