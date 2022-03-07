const mongoose = require('mongoose');

//! ----- BUS STOP MODEL -----
const BusStopSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    zone: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Zone',
        required: true
    },
}, {
    timestamps: true
});

//! ----- BUS MODEL -----
const BusSchema = mongoose.Schema({
    plateNumber: {
        type: String,
        required: true,
    },
    available: {
        type: Boolean,
        required: true,
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    issuingDate: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true
});


//! ----- USER MODEL -----
const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    phone: {
        type: Number,
        required: true,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
}, {
    timestamps: true
});



//! ----- RIDE MODEL -----
const RideSchema = mongoose.Schema({
    passenger: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pickupTime: {
        type: Date,
        required: true,
    },
    departureLocation: {
        type: String,
        required: true,
    },
    destinationLocation: {
        type: String,
        required: true,
    },
    numberOfSits: {
        type: Number,
        required: true,
    },
    disabledPeople: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
});


//! ----- ROUTE MODEL -----
const RouteSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});


//! ----- ZONE MODEL -----
const ZoneSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    route: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Route',
        required: true
    },
}, {
    timestamps: true
});

module.exports = {
    Zone: mongoose.model('Zone', ZoneSchema),
    BusRoute: mongoose.model('Route', RouteSchema),
    Ride: mongoose.model('Rides', RideSchema),
    User: mongoose.model('User', UserSchema),
    Bus: mongoose.model('Bus', BusSchema),
    BusStop: mongoose.model('BusStop', BusStopSchema)
}