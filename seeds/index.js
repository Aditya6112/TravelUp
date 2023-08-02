const mongoose = require('mongoose');
const cities = require('./cities');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');

main().catch(err => {
    console.log("OH NO MONGO CONNECTION ERROR!!!")
    console.log(err)
});
async function main() {
    mongoose.set('strictQuery', true);
    await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
        .then(() => {
            //console.log("MONGO CONNECTION OPEN!!!")
            const db = mongoose.connection;
            db.on("error", console.error.bind(console, "connection error:"));
            db.once("open", () => {
                console.log("Database connected");
            })
        });
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64c94457bfa56c463a455ffc',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/2184453',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Quia accusamus inventore tenetur eligendi soluta quidem, numquam nihil optio ad deserunt sint, voluptates iure cupiditate quisquam vitae enim architecto animi sed?',
            price
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})