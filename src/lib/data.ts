export interface Product {
  id: string;
  name: string;
  slug: string;
  originalPrice: number;
  price: number;
  weight: string;
  images: string[];
  benefits: string[];
  category: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "saffron-5g",
    name: "SAFFRON - 5 Gram",
    slug: "saffron-5-gram",
    originalPrice: 1750,
    price: 1000,
    weight: "5 Gram",
    images: [
      "/products/saffron-5g.jpg"
    ],
    benefits: [
      "Helps during pregnancy",
      "Helps in fighting cancer and tumor growth",
      "Helps regulating high blood pressure",
      "Helps in treatment of heart diseases",
      "Treats insomnia & depression",
      "Good for skin care",
      "Helps in improving vision"
    ],
    category: "Saffron"
  },
  {
    id: "saffron-1g",
    name: "SAFFRON - 1 Gram",
    slug: "saffron-1-gram",
    originalPrice: 350,
    price: 220,
    weight: "1 Gram",
    images: [
      "/products/saffron-1g.jpg"
    ],
    benefits: [
      "Helps during pregnancy",
      "Helps in fighting cancer and tumor growth",
      "Helps regulating high blood pressure",
      "Helps in treatment of heart diseases",
      "Treats insomnia & depression",
      "Good for skin care",
      "Helps in improving vision"
    ],
    category: "Saffron"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "Over a Century of Passion: The Saffron Fields of Pampore",
    slug: "over-a-century-of-passion",
    excerpt: "Nurturing saffron in the dry limestone soils of J&K over four generations. Discover our traditional harvesting methods.",
    content: "For over a century, the families behind India Kesar Company have tended to the dry, cold, high-altitude limestone fields of Pampore, J&K. Saffron sativus cultivation isn't just an agricultural practice to us — it is our heritage. It is a family dream preserved over four generations of growers. \n\nEvery year during late autumn, our growers hand-pluck the fresh purple crocus blooms at sunrise, carefully separating the three crimson red stigmas by hand. It takes over 75,000 flowers to yield just one pound of pure saffron. We dry-cure each batch using historical shade curing techniques, ensuring our Crocin coloring levels exceed Grade I standards.",
    category: "Heritage",
    date: "November 23, 2025",
    author: "Irfan Khanday",
    readTime: "4 min read",
    image: "/blog/harvest.jpg"
  },
  {
    id: "blog-2",
    title: "How to Detect Adulterated Saffron: Purity Certification Guide",
    slug: "detect-fake-saffron-purity-guide",
    excerpt: "Cheaper dyed threads are often sold as authentic saffron. Learn simple tests to verify crop purity.",
    content: "Cheap saffron, dyed corn silk, and old coconut threads are frequently dyed red and passed off as pure saffron. At India Kesar, we believe in complete consumer transparency.\n\nTo check your saffron, put a few threads in hot water or warm milk. Genuine saffron slowly releases a golden yellow pigment while the thread itself stays dark red. Dyed fake saffron bleeds an artificial red or deep orange instantly, and the thread itself turns white or falls apart in seconds. All our products support direct laboratory seals.",
    category: "Education",
    date: "December 12, 2025",
    author: "Zahoor Ahmad",
    readTime: "3 min read",
    image: "/blog/saffron-quality.jpg"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Blooming Saffron Fields of Pampore",
    category: "Fields",
    image: "/gallery/fields.jpg",
    description: "The historical plateaus of Pampore covered in purple crocus blossoms during the cold late-autumn mornings."
  },
  {
    id: "gal-2",
    title: "Hand Harvesting at Sunrise",
    category: "Harvesting",
    image: "/gallery/picking.jpg",
    description: "Growers hand-plucking saffron flowers before the sun causes the petals to wilt."
  },
  {
    id: "gal-3",
    title: "Sorting the Crimson Threads",
    category: "Processing",
    image: "/gallery/sorting.jpg",
    description: "Carefully separating the red Lacha stigmas from the purple petals, an art of extreme precision."
  }
];
