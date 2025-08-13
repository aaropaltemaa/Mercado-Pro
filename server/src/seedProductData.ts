import { Category, Brand } from "@prisma/client";

export const seedProductData = [
  {
    name: "Apple MacBook Pro 16-inch (M3 Pro)",
    description:
      "Apple’s latest 16-inch MacBook Pro with the M3 Pro chip, featuring Liquid Retina XDR display, 16GB unified memory, and 512GB SSD.",
    price: 2499,
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/macbook-pro-og-202410?wid=1200&hei=630&fmt=jpeg&qlt=90&.v=1728658184478",
    category: Category.Laptops,
    brand: Brand.Apple,
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description:
      "Flagship smartphone with Snapdragon 8 Gen 3, 200MP camera, and 5000mAh battery.",
    price: 1199,
    image: "https://hinta.fi/product_images/98/4632898_57424659_1_ouia.jpg",
    category: Category.Phones,
    brand: Brand.Samsung,
  },
  {
    name: "Logitech MX Master 3S",
    description:
      "Premium wireless mouse with ultra-precise MagSpeed scrolling and ergonomic design.",
    price: 99,
    image: "https://www.proshop.fi/Images/1600x1200/3067435_55a0cc2e8fa9.png",
    category: Category.Accessories,
    brand: Brand.Logitech,
  },
  {
    name: "Dell UltraSharp U4025QW",
    description:
      "40-inch ultrawide curved monitor with 5K2K resolution and Thunderbolt 4 connectivity.",
    price: 1899,
    image: "https://pricespy-75b8.kxcdn.com/product/standard/280/13440645.jpg",
    category: Category.Monitors,
    brand: Brand.Dell,
  },
  {
    name: "Sony WH-1000XM5",
    description:
      "Industry-leading noise-canceling wireless headphones with 30-hour battery life.",
    price: 399,
    image:
      "https://www.veikonkone.fi/media/catalog/product/cache/5d565e4af17a32c9d6f0b287c960a0ce/4/5/4548736134294_vanha_uusi_fullHD.jpeg",
    category: Category.Audio,
    brand: Brand.Sony,
  },
  {
    name: "Elgato Stream Deck MK.2",
    description:
      "Customizable control pad for streamers with LCD keys for quick actions.",
    price: 149,
    image:
      "https://www.maxgaming.fi/bilder/artiklar/zoom/19148_1.jpg?m=1681890358",
    category: Category.Other,
    brand: Brand.Other,
  },
];
