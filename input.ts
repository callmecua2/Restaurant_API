//   {
//     "name": "Signature Tonkotsu Special",
//     "description": "48-hour simmered pork bone broth, chashu pork belly, ajitama egg, wood ear mushrooms, and black garlic oil.",
//     "category": "Ramen",
//     "price": "14.50"
//   },
//   {
//     "name": "Spicy Hokkaido Miso",
//     "description": "Rich fermented soybean base with spicy minced pork, sweet corn, butter, and chili thread.",
//     "category": "Ramen",
//     "price": "13.50"
//   },
//   {
//     "name": "Truffle Shoyu Consommé",
//     "description": "Clear chicken and dashi broth, soy reduction, truffle oil, sous-vide chicken breast, and menma.",
//     "category": "Ramen",
//     "price": "16.00"
//   },
//   {
//     "name": "Tan Tan Men",
//     "description": "Creamy sesame and chili broth, spicy ground pork, bok choy, and toasted peanuts.",
//     "category": "Ramen",
//     "price": "13.00"
//   }
//   {
//     "name": "Yuzu Shio Seabreeze",
//     "description": "Light salt-based broth infused with Japanese citrus, grilled scallops, and nori.",
//     "category": "Ramen",
//     "price": "15.50"
//   }

//   {
//     "name": "Omakase Nigiri Selection",
//     "description": "8 pieces of premium chef-selected nigiri featuring seasonal catches from Toyosu Market.",
//     "category": "Sushi & Sashimi",
//     "price": "32.00"
//   },
//   {
//     "name": "Tsukiji Sashimi Platter",
//     "description": "15 pieces of assorted sliced raw fish, including Atlantic salmon, bluefin tuna, and yellowtail.",
//     "category": "Sushi & Sashimi",
//     "price": "38.00"
//   },
//   {
//     "name": "The Emperor's Bridge",
//     "description": "A grand assembly of 6 nigiri, 9 sashimi slices, and one signature dragon roll.",
//     "category": "Sushi & Sashimi",
//     "price": "55.00"
//   },
//   {
//     "name": "Salmon Zen Moriawase",
//     "description": "Combination of salmon sashimi, salmon nigiri, and spicy salmon maki.",
//     "category": "Sushi & Sashimi",
//     "price": "24.00"
//   },
//   {
//     "name": "Bluefin Trilogy",
//     "description": "A tasting of Akami, Chutoro, and Otoro in both sushi and sashimi styles.",
//     "category": "Sushi & Sashimi",
//     "price": "45.00"
//   }

//   {
//     "name": "A5 Wagyu Ishiyaki",
//     "description": "Premium A5 Wagyu beef slices served on a sizzling volcanic stone with garlic soy reduction.",
//     "category": "Grilled & Hot Plate",
//     "price": "85.00"
//   },
//   {
//     "name": "Miso-Glazed Gindara",
//     "description": "Black cod marinated for 72 hours in sweet saikyo miso, flame-grilled to perfection.",
//     "category": "Grilled & Hot Plate",
//     "price": "28.00"
//   },
//   {
//     "name": "Sizzling Seafood Teppan",
//     "description": "Jumbo prawns, scallops, and squid served on a hot iron plate with ginger-onion sauce.",
//     "category": "Grilled & Hot Plate",
//     "price": "26.00"
//   },
//   {
//     "name": "Kyoto Matcha Latte",
//     "description": "Ceremonial grade green tea whisked with creamy steamed milk and a hint of cane sugar.",
//     "category": "Beverage",
//     "price": "6.50"
//   },
//   {
//     "name": "Yuzu Sparkling Refresher",
//     "description": "Fresh Japanese citrus juice, soda water, mint leaves, and honey.",
//     "category": "Beverage",
//     "price": "5.50"
//   },
//   {
//     "name": "Roasted Hojicha Cold Brew",
//     "description": "Slow-steeped roasted green tea with a nutty, smoky finish.",
//     "category": "Beverage",
//     "price": "5.00"
//   },
//   {
//     "name": "Sakura Lychee Fizz",
//     "description": "Light floral cherry blossom syrup paired with sweet lychee and carbonated spring water.",
//     "category": "Beverage",
//     "price": "6.00"
//   },
//   {
//     "name": "Mochi Ice Cream Trio",
//     "description": "Soft rice cake dumplings filled with artisanal vanilla, matcha, and black sesame ice cream.",
//     "category": "Dessert",
//     "price": "7.50"
//   },
//   {
//     "name": "Raindrop Cake with Kinako",
//     "description": "Translucent agar jelly served with roasted soybean powder and black sugar syrup.",
//     "category": "Dessert",
//     "price": "8.00"
//   },
//   {
//     "name": "Matcha Lava Fondant",
//     "description": "Warm green tea cake with a molten center, served with a scoop of Hokkaido milk gelato.",
//     "category": "Dessert",
//     "price": "9.50"
//   }

interface MenuItem {
  name: string;
  description: string;
  category: string;
  price: number;
}

const menu: MenuItem[] = [
  {
    name: "Signature Tonkotsu Special",
    description:
      "48-hour simmered pork bone broth, chashu pork belly, ajitama egg, wood ear mushrooms, and black garlic oil.",
    category: "Ramen",
    price: 14.5,
  },
  {
    name: "Spicy Hokkaido Miso",
    description:
      "Rich fermented soybean base with spicy minced pork, sweet corn, butter, and chili thread.",
    category: "Ramen",
    price: 13.5,
  },
  {
    name: "Truffle Shoyu Consommé",
    description:
      "Clear chicken and dashi broth, soy reduction, truffle oil, sous-vide chicken breast, and menma.",
    category: "Ramen",
    price: 16.0,
  },
  {
    name: "Tan Tan Men",
    description:
      "Creamy sesame and chili broth, spicy ground pork, bok choy, and toasted peanuts.",
    category: "Ramen",
    price: 13.0,
  },
  {
    name: "Yuzu Shio Seabreeze",
    description:
      "Light salt-based broth infused with Japanese citrus, grilled scallops, and nori.",
    category: "Ramen",
    price: 15.5,
  },
  {
    name: "Omakase Nigiri Selection",
    description:
      "8 pieces of premium chef-selected nigiri featuring seasonal catches from Toyosu Market.",
    category: "Sushi & Sashimi",
    price: 32.0,
  },
  {
    name: "Tsukiji Sashimi Platter",
    description:
      "15 pieces of assorted sliced raw fish, including Atlantic salmon, bluefin tuna, and yellowtail.",
    category: "Sushi & Sashimi",
    price: 38.0,
  },
  {
    name: "The Emperor's Bridge",
    description:
      "A grand assembly of 6 nigiri, 9 sashimi slices, and one signature dragon roll.",
    category: "Sushi & Sashimi",
    price: 55.0,
  },
  {
    name: "Salmon Zen Moriawase",
    description:
      "Combination of salmon sashimi, salmon nigiri, and spicy salmon maki.",
    category: "Sushi & Sashimi",
    price: 24.0,
  },
  {
    name: "Bluefin Trilogy",
    description:
      "A tasting of Akami, Chutoro, and Otoro in both sushi and sashimi styles.",
    category: "Sushi & Sashimi",
    price: 45.0,
  },
  {
    name: "A5 Wagyu Ishiyaki",
    description:
      "Premium A5 Wagyu beef slices served on a sizzling volcanic stone with garlic soy reduction.",
    category: "Grilled & Hot Plate",
    price: 85.0,
  },
  {
    name: "Miso-Glazed Gindara",
    description:
      "Black cod marinated for 72 hours in sweet saikyo miso, flame-grilled to perfection.",
    category: "Grilled & Hot Plate",
    price: 28.0,
  },
  {
    name: "Sizzling Seafood Teppan",
    description:
      "Jumbo prawns, scallops, and squid served on a hot iron plate with ginger-onion sauce.",
    category: "Grilled & Hot Plate",
    price: 26.0,
  },
  {
    name: "Kyoto Matcha Latte",
    description:
      "Ceremonial grade green tea whisked with creamy steamed milk and a hint of cane sugar.",
    category: "Beverage",
    price: 6.5,
  },
  {
    name: "Yuzu Sparkling Refresher",
    description:
      "Fresh Japanese citrus juice, soda water, mint leaves, and honey.",
    category: "Beverage",
    price: 5.5,
  },
  {
    name: "Roasted Hojicha Cold Brew",
    description: "Slow-steeped roasted green tea with a nutty, smoky finish.",
    category: "Beverage",
    price: 5.0,
  },
  {
    name: "Sakura Lychee Fizz",
    description:
      "Light floral cherry blossom syrup paired with sweet lychee and carbonated spring water.",
    category: "Beverage",
    price: 6.0,
  },
  {
    name: "Mochi Ice Cream Trio",
    description:
      "Soft rice cake dumplings filled with artisanal vanilla, matcha, and black sesame ice cream.",
    category: "Dessert",
    price: 7.5,
  },
  {
    name: "Raindrop Cake with Kinako",
    description:
      "Translucent agar jelly served with roasted soybean powder and black sugar syrup.",
    category: "Dessert",
    price: 8.0,
  },
  {
    name: "Matcha Lava Fondant",
    description:
      "Warm green tea cake with a molten center, served with a scoop of Hokkaido milk gelato.",
    category: "Dessert",
    price: 9.5,
  },
];

const newMenu: MenuItem[] = [
  {
    name: "Signature Tonkotsu Special",
    description:
      "48-hour simmered pork bone broth, chashu pork belly, ajitama egg, wood ear mushrooms, and black garlic oil.",
    category: "Ramen",
    price: 145000,
  },
  {
    name: "Spicy Hokkaido Miso",
    description:
      "Rich fermented soybean base with spicy minced pork, sweet corn, butter, and chili thread.",
    category: "Ramen",
    price: 135000,
  },
  {
    name: "Truffle Shoyu Consommé",
    description:
      "Clear chicken and dashi broth, soy reduction, truffle oil, sous-vide chicken breast, and menma.",
    category: "Ramen",
    price: 160000,
  },
  {
    name: "Tan Tan Men",
    description:
      "Creamy sesame and chili broth, spicy ground pork, bok choy, and toasted peanuts.",
    category: "Ramen",
    price: 130000,
  },
  {
    name: "Yuzu Shio Seabreeze",
    description:
      "Light salt-based broth infused with Japanese citrus, grilled scallops, and nori.",
    category: "Ramen",
    price: 155000,
  },
  {
    name: "Omakase Nigiri Selection",
    description:
      "8 pieces of premium chef-selected nigiri featuring seasonal catches from Toyosu Market.",
    category: "Sushi & Sashimi",
    price: 320000,
  },
  {
    name: "Tsukiji Sashimi Platter",
    description:
      "15 pieces of assorted sliced raw fish, including Atlantic salmon, bluefin tuna, and yellowtail.",
    category: "Sushi & Sashimi",
    price: 380000,
  },
  {
    name: "The Emperor's Bridge",
    description:
      "A grand assembly of 6 nigiri, 9 sashimi slices, and one signature dragon roll.",
    category: "Sushi & Sashimi",
    price: 550000,
  },
  {
    name: "Salmon Zen Moriawase",
    description:
      "Combination of salmon sashimi, salmon nigiri, and spicy salmon maki.",
    category: "Sushi & Sashimi",
    price: 240000,
  },
  {
    name: "Bluefin Trilogy",
    description:
      "A tasting of Akami, Chutoro, and Otoro in both sushi and sashimi styles.",
    category: "Sushi & Sashimi",
    price: 450000,
  },
  {
    name: "A5 Wagyu Ishiyaki",
    description:
      "Premium A5 Wagyu beef slices served on a sizzling volcanic stone with garlic soy reduction.",
    category: "Grilled & Hot Plate",
    price: 850000,
  },
  {
    name: "Miso-Glazed Gindara",
    description:
      "Black cod marinated for 72 hours in sweet saikyo miso, flame-grilled to perfection.",
    category: "Grilled & Hot Plate",
    price: 280000,
  },
  {
    name: "Sizzling Seafood Teppan",
    description:
      "Jumbo prawns, scallops, and squid served on a hot iron plate with ginger-onion sauce.",
    category: "Grilled & Hot Plate",
    price: 260000,
  },
  {
    name: "Kyoto Matcha Latte",
    description:
      "Ceremonial grade green tea whisked with creamy steamed milk and a hint of cane sugar.",
    category: "Beverage",
    price: 65000,
  },
  {
    name: "Yuzu Sparkling Refresher",
    description:
      "Fresh Japanese citrus juice, soda water, mint leaves, and honey.",
    category: "Beverage",
    price: 55000,
  },
  {
    name: "Roasted Hojicha Cold Brew",
    description: "Slow-steeped roasted green tea with a nutty, smoky finish.",
    category: "Beverage",
    price: 50000,
  },
  {
    name: "Sakura Lychee Fizz",
    description:
      "Light floral cherry blossom syrup paired with sweet lychee and carbonated spring water.",
    category: "Beverage",
    price: 60000,
  },
  {
    name: "Mochi Ice Cream Trio",
    description:
      "Soft rice cake dumplings filled with artisanal vanilla, matcha, and black sesame ice cream.",
    category: "Dessert",
    price: 75000,
  },
  {
    name: "Raindrop Cake with Kinako",
    description:
      "Translucent agar jelly served with roasted soybean powder and black sugar syrup.",
    category: "Dessert",
    price: 80000,
  },
  {
    name: "Matcha Lava Fondant",
    description:
      "Warm green tea cake with a molten center, served with a scoop of Hokkaido milk gelato.",
    category: "Dessert",
    price: 95000,
  },
];

function check() {
  console.log(menu.length, newMenu.length);
}

async function inputFood() {
  try {
    const payload = newMenu;
    console.log(payload);

    const res = await fetch("http://localhost:8080/foodinput", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let result;
    try {
      result = await res.json();
    } catch {
      result = null;
    }

    if (res.ok) {
      alert("product has succesfully added");
      console.log(result);
    }

    if (!res.ok) {
      console.error("Error response:", result);
      alert("Failed to add product");
    }

    return result
  } catch (error) {
    console.log(error);
  }
}

inputFood();
