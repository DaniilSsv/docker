// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
const cors = require('cors');

console.log(process.env.MONGO_URI)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

// Define a Mongoose schema and model for car brands
const carBrandSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

const CarBrand = mongoose.model('CarBrand', carBrandSchema);

// Seed the database with dummy data
async function seedDatabase() {
    const dummyData = [
        { name: 'Toyota' },
        { name: 'Ford' },
        { name: 'Honda' },
        { name: 'BMW' },
        { name: 'Mercedes-Benz' }
    ];

    // Check if the database is already populated
    const count = await CarBrand.countDocuments();
    if (count === 0) {
        await CarBrand.insertMany(dummyData);
        console.log('Database seeded with dummy data');
    } else {
        console.log('Database already contains data');
    }
}

seedDatabase();

app.use(cors({
    origin: '*'  // Replace with your React app's URL (default is usually http://localhost:3000)
}));

// Define the endpoint to return a list of car brand names
app.get('/car-brands', async (req, res) => {
    try {
        const carBrands = await CarBrand.find({}, 'name');
        res.json(carBrands.map(brand => brand.name));
    } catch (err) {
        res.status(500).send('Error fetching car brands');
    }
});  

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
