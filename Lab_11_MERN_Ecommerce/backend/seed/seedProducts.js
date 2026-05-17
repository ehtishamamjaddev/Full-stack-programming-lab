const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config();

const products = [
    {
        name: "Apple MacBook Pro 16-inch",
        description: "The most advanced Mac ever. Features the M3 Max chip, 36GB RAM, and 1TB SSD for unprecedented performance.",
        price: 3499.00,
        category: "Electronics",
        stock: 15,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
        rating: 5.0
    },
    {
        name: "Sony WH-1000XM5 Headphones",
        description: "Industry-leading noise cancellation, 30-hour battery life, and superior sound quality.",
        price: 398.00,
        category: "Electronics",
        stock: 42,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop",
        rating: 4.8
    },
    {
        name: "Nike Air Zoom Pegasus 39",
        description: "Men's Road Running Shoes built with comfortable, breathable mesh and responsive cushioning.",
        price: 130.00,
        category: "Footwear",
        stock: 75,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
        rating: 4.6
    },
    {
        name: "Bellroy Leather Bifold Wallet",
        description: "Slim profile wallet crafted from premium, environmentally certified leather.",
        price: 89.00,
        category: "Accessories",
        stock: 200,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop",
        rating: 4.7
    },
    {
        name: "Apple Watch Series 9",
        description: "Track your fitness and stay connected with this sleek smartwatch featuring a high-res display.",
        price: 399.00,
        category: "Electronics",
        stock: 40,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
        rating: 4.9
    },
    {
        name: "Ray-Ban Classic Aviator",
        description: "Timeless gold-framed aviators featuring green lenses for ultimate UV protection.",
        price: 160.00,
        category: "Accessories",
        stock: 85,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
        rating: 4.8
    },
    {
        name: "Keychron K2 Mechanical Keyboard",
        description: "A 75% layout wireless mechanical keyboard with tactile brown switches.",
        price: 99.00,
        category: "Electronics",
        stock: 30,
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80",
        rating: 4.6
    },
    {
        name: "Levi's Men's Original Fit Jeans",
        description: "The classic straight-leg denim that started it all, featuring the iconic button fly.",
        price: 59.50,
        category: "Fashion",
        stock: 150,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
        rating: 4.5
    },
    {
        name: "Cole Haan Oxford Shoes",
        description: "Sophisticated leather oxfords built with modern cushioning technology.",
        price: 180.00,
        category: "Footwear",
        stock: 60,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
        rating: 4.7
    },
    {
        name: "Samsonite Classic Tote Bag",
        description: "Elegant, durable canvas tote bag perfect for office commutes and weekend errands alike.",
        price: 65.00,
        category: "Accessories",
        stock: 90,
        image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop",
        rating: 4.5
    },
    {
        name: "Zara Essential Cotton T-Shirt",
        description: "Clean, minimalist pure organic cotton crewneck tee. A versatile staple for every wardrobe.",
        price: 25.00,
        category: "Fashion",
        stock: 300,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
        rating: 4.4
    },
    {
        name: "The North Face Hiking Boots",
        description: "Waterproof, durable leather boots designed to offer superior grip and support on rugged trails.",
        price: 145.00,
        category: "Footwear",
        stock: 45,
        image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800&auto=format&fit=crop",
        rating: 4.6
    }
];

const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Product.deleteMany(); 
        await Product.insertMany(products);
        console.log('✅ 12 NEW products seeded successfully');
        await mongoose.disconnect();
        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

importData();