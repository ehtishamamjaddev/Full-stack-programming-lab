/**
 * Seed script for Rustik Plank — rich sample catalog, blog posts, and users
 */
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Product = require('../models/Product');
const Blog = require('../models/Blog');

/** Paths match frontend/public/images — served by Next.js at /images/* */
const IMG = {
  chair: '/images/chair.jpg',
  chair2: '/images/chair-2.jpg',
  table: '/images/table.jpg',
  bed: '/images/bed.jpg',
  cabinet: '/images/cabinet.jpg',
  bookcase: '/images/bookcase.jpg',
  box: '/images/box.jpg',
  living: '/images/living.jpg',
  dining: '/images/dining.jpg',
  console: '/images/console.jpg',
  office: '/images/office.jpg',
  coffeeTable: '/images/coffee-table.jpg',
  heroChair: '/images/hero-chair.jpg',
  blogWood: '/images/blog-wood.jpg',
  blogDining: '/images/blog-dining.jpg'
};

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to DB for seeding');

  await User.deleteMany({});
  await Product.deleteMany({});
  await Blog.deleteMany({});

  const passwordHash = await bcrypt.hash('Password123', 10);

  const users = await User.insertMany([
    {
      name: 'M Ehtisham Amjad',
      email: 'ehtisham@example.com',
      password: passwordHash,
      role: 'admin',
      phone: '+92-300-1234567',
      addresses: [
        {
          street: 'F-7 Markaz',
          city: 'Islamabad',
          province: 'ICT',
          postalCode: '44000',
          isDefault: true
        }
      ]
    },
    {
      name: 'Maryam Khan',
      email: 'maryam@example.com',
      password: passwordHash,
      role: 'user',
      phone: '+92-301-7654321',
      addresses: [
        {
          street: 'DHA Phase 5',
          city: 'Lahore',
          province: 'Punjab',
          postalCode: '54000',
          isDefault: true
        }
      ]
    },
    {
      name: 'Demo Customer',
      email: 'demo@rustikplank.com',
      password: passwordHash,
      role: 'user',
      phone: '+92-333-0001111'
    }
  ]);

  const admin = users[0];

  const products = [
    {
      name: 'Heritage Oak Dining Chair',
      description: 'Solid oak frame with woven seat. Hand-finished for durability and comfort.',
      price: 18500,
      discountPrice: 15499,
      category: 'Chairs',
      sku: 'RP-CH-001',
      images: [IMG.chair],
      stock: 24,
      featured: true,
      popular: true,
      special: true,
      ratings: { average: 4.8, count: 42 }
    },
    {
      name: 'Reclaimed Teak Console',
      description: 'Rustic console table crafted from reclaimed teak with iron accents.',
      price: 52000,
      discountPrice: 44999,
      category: 'Tables',
      sku: 'RP-TB-002',
      images: [IMG.console],
      stock: 8,
      featured: true,
      popular: true,
      special: true,
      ratings: { average: 4.9, count: 31 }
    },
    {
      name: 'Minimal Platform Bed — Queen',
      description: 'Low-profile queen bed in walnut veneer with slatted support.',
      price: 89000,
      category: 'Beds',
      sku: 'RP-BD-003',
      images: [IMG.bed],
      stock: 6,
      featured: true,
      popular: true,
      ratings: { average: 4.7, count: 18 }
    },
    {
      name: 'Artisan Display Cabinet',
      description: 'Glass-front cabinet with adjustable shelves and soft-close doors.',
      price: 67500,
      discountPrice: 53999,
      category: 'Cabinets',
      sku: 'RP-CB-004',
      images: [IMG.cabinet],
      stock: 10,
      featured: true,
      special: true,
      ratings: { average: 4.6, count: 22 }
    },
    {
      name: 'Walnut Ladder Bookcase',
      description: 'Five-tier ladder bookcase ideal for living rooms and home offices.',
      price: 32000,
      category: 'Bookcases',
      sku: 'RP-BC-005',
      images: [IMG.bookcase],
      stock: 15,
      popular: true,
      ratings: { average: 4.5, count: 27 }
    },
    {
      name: 'Handwoven Storage Trunk',
      description: 'Decorative storage box with brass hardware and linen lining.',
      price: 14500,
      discountPrice: 10999,
      category: 'Boxes',
      sku: 'RP-BX-006',
      images: [IMG.box],
      stock: 30,
      special: true,
      ratings: { average: 4.4, count: 15 }
    },
    {
      name: 'Farmhouse Dining Table — 6 Seater',
      description: 'Solid pine dining table with distressed finish, seats six comfortably.',
      price: 95000,
      category: 'Tables',
      sku: 'RP-TB-007',
      images: [IMG.dining],
      stock: 5,
      featured: true,
      ratings: { average: 4.9, count: 12 }
    },
    {
      name: 'Velvet Accent Armchair',
      description: 'Deep-seat accent chair in charcoal velvet with walnut legs.',
      price: 42000,
      discountPrice: 35999,
      category: 'Chairs',
      sku: 'RP-CH-008',
      images: [IMG.living],
      stock: 12,
      popular: true,
      special: true,
      ratings: { average: 4.7, count: 33 }
    },
    {
      name: 'King Canopy Bed Frame',
      description: 'Statement canopy bed in matte black steel and solid ash wood.',
      price: 145000,
      category: 'Beds',
      sku: 'RP-BD-009',
      images: [IMG.bed],
      stock: 3,
      popular: true,
      ratings: { average: 5, count: 8 }
    },
    {
      name: 'Modular TV Unit',
      description: 'Wall-mounted media unit with cable management and open shelving.',
      price: 38500,
      category: 'Cabinets',
      sku: 'RP-CB-010',
      images: [IMG.cabinet],
      stock: 14,
      ratings: { average: 4.3, count: 19 }
    },
    {
      name: 'Executive Writing Desk',
      description: 'Spacious desk with leather inlay and drawer organizers.',
      price: 58000,
      discountPrice: 49999,
      category: 'Tables',
      sku: 'RP-TB-011',
      images: [IMG.office],
      stock: 9,
      special: true,
      ratings: { average: 4.6, count: 14 }
    },
    {
      name: 'Bar Stool Set (2)',
      description: 'Counter-height stools with footrest and powder-coated legs.',
      price: 22000,
      category: 'Chairs',
      sku: 'RP-CH-012',
      images: [IMG.chair],
      stock: 20,
      popular: true,
      ratings: { average: 4.5, count: 25 }
    },
    {
      name: 'Open Shelf Bookcase — Wide',
      description: 'Industrial-style wide bookcase with metal frame and mango wood shelves.',
      price: 41000,
      category: 'Bookcases',
      sku: 'RP-BC-013',
      images: [IMG.bookcase],
      stock: 11,
      ratings: { average: 4.4, count: 11 }
    },
    {
      name: 'Under-Bed Storage Set',
      description: 'Set of three rolling storage boxes with fabric lids.',
      price: 9800,
      discountPrice: 7499,
      category: 'Boxes',
      sku: 'RP-BX-014',
      images: [IMG.box],
      stock: 40,
      special: true,
      ratings: { average: 4.2, count: 36 }
    },
    {
      name: 'Round Coffee Table',
      description: 'Live-edge round coffee table on hairpin legs.',
      price: 27500,
      category: 'Tables',
      sku: 'RP-TB-015',
      images: [IMG.table],
      stock: 16,
      featured: true,
      ratings: { average: 4.8, count: 20 }
    },
    {
      name: 'Kids Bunk Bed — Twin',
      description: 'Sturdy twin bunk bed with guard rails and integrated ladder.',
      price: 72000,
      category: 'Beds',
      sku: 'RP-BD-016',
      images: [IMG.bed],
      stock: 7,
      ratings: { average: 4.6, count: 9 }
    },
    {
      name: 'Shoe Storage Cabinet',
      description: 'Slim hallway cabinet with ventilation slats and 12 compartments.',
      price: 19800,
      category: 'Cabinets',
      sku: 'RP-CB-017',
      images: [IMG.cabinet],
      stock: 22,
      popular: true,
      ratings: { average: 4.3, count: 17 }
    },
    {
      name: 'Outdoor Patio Chair Pair',
      description: 'Weather-resistant acacia chairs with UV-treated cushions.',
      price: 33500,
      discountPrice: 28999,
      category: 'Chairs',
      sku: 'RP-CH-018',
      images: [IMG.chair2],
      stock: 18,
      special: true,
      ratings: { average: 4.5, count: 13 }
    }
  ].map((p) => ({ ...p, createdBy: admin._id }));

  await Product.insertMany(products);

  await Blog.insertMany([
    {
      title: 'How to Style Reclaimed Wood in Modern Homes',
      slug: 'style-reclaimed-wood',
      excerpt: 'Blend rustic textures with clean lines for a balanced Pakistani living space.',
      content:
        'Reclaimed wood brings warmth and character. Pair teak consoles with neutral walls, add brass accents, and keep silhouettes simple for a timeless look.',
      image: IMG.blogWood,
      author: admin._id,
      published: true
    },
    {
      title: 'Choosing the Right Dining Set for Family Gatherings',
      slug: 'choosing-dining-set',
      excerpt: 'Size, material, and comfort matter when hosting iftar and weekend dinners.',
      content:
        'Measure your room, allow 60cm per place setting, and prefer solid wood tops for longevity. Our farmhouse tables seat six with room to spare.',
      image: IMG.blogDining,
      author: admin._id,
      published: true
    },
    {
      title: 'Sustainable Furniture: What We Source Locally',
      slug: 'sustainable-furniture',
      excerpt: 'Rustik Plank partners with certified workshops across Punjab and KPK.',
      content:
        'We prioritize FSC-aligned timber, low-VOC finishes, and fair wages. Every piece is inspected before it reaches your home.',
      image: IMG.living,
      author: admin._id,
      published: true
    }
  ]);

  console.log('Seed complete — users:', users.length, '| products:', products.length);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
