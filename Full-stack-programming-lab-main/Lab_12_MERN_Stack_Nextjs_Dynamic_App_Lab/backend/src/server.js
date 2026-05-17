require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.get('/api/ping', (req, res) => res.json({ ok: true, message: 'Rustik Plank API is running' }));

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);
const productRoutes = require('./routes/product.routes');
app.use('/api/products', productRoutes);
const cartRoutes = require('./routes/cart.routes');
app.use('/api/cart', cartRoutes);
const orderRoutes = require('./routes/order.routes');
app.use('/api/orders', orderRoutes);
const blogRoutes = require('./routes/blog.routes');
app.use('/api/blog', blogRoutes);

// Global error handler
const errorHandler = require('./middleware/error.middleware');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
