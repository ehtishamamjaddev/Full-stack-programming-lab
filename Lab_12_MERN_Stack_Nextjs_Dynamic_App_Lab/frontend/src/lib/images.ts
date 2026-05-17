/** Local image paths — served from /public/images */
export const IMAGES = {
  chair: '/images/chair.jpg',
  chair2: '/images/chair-2.jpg',
  bed: '/images/bed.jpg',
  table: '/images/table.jpg',
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
  blogDining: '/images/blog-dining.jpg',
  placeholder: '/images/placeholder.jpg'
} as const;

const CATEGORY_FALLBACK: Record<string, string> = {
  chairs: IMAGES.chair,
  beds: IMAGES.bed,
  tables: IMAGES.table,
  cabinets: IMAGES.cabinet,
  bookcases: IMAGES.bookcase,
  boxes: IMAGES.box
};

/** Normalize product/blog image URLs (local paths + legacy Unsplash fallbacks) */
export function productImage(path?: string, category?: string) {
  if (path?.startsWith('/images/')) return path;

  if (path?.includes('unsplash.com')) {
    if (path.includes('1506439773649') || path.includes('1567538096630')) return IMAGES.chair;
    if (path.includes('1505693416388')) return IMAGES.bed;
    if (path.includes('1532372320572')) return IMAGES.table;
    if (path.includes('1555041469') || path.includes('1595428774223')) return IMAGES.cabinet;
    if (path.includes('1617806118413')) return IMAGES.dining;
    if (path.includes('1618221195710')) return IMAGES.living;
    if (path.includes('1615873964953') || path.includes('1594620302200')) return IMAGES.console;
    if (path.includes('1616486338812')) return IMAGES.box;
    if (path.includes('1518455027359')) return IMAGES.office;
    return IMAGES.placeholder;
  }

  if (path && !path.startsWith('http')) return path;

  if (category) {
    const key = category.toLowerCase();
    if (CATEGORY_FALLBACK[key]) return CATEGORY_FALLBACK[key];
  }

  return IMAGES.placeholder;
}
