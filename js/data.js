const defaultProducts=[
  // 1. Notebooks & Journals
  {id:1,name:"A5 Dot Grid Journal 160 Pages",price:1299,category:"Notebooks & Journals",images:["https://images.unsplash.com/photo-1544816155-12df9643f363?w=500","https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500"],desc:"Hardcover, Beige Paper, Lay Flat"},
  {id:2,name:"Kraft Cover Spiral Notebook Set of 3",price:899,category:"Notebooks & Journals",images:["https://images.unsplash.com/photo-1516410529446-2c777cb7366d?w=500","https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500"],desc:"Recycled Paper, 80 Pages Each"},
  {id:3,name:"Leather Vintage Diary Brown",price:1899,category:"Notebooks & Journals",images:["https://images.unsplash.com/photo-1485981133625-f1a03c0e39f7?w=500"],desc:"PU Leather, 200 Pages, with Bookmark"},
  // 2. Pens & Writing
  {id:4,name:"Japanese Gel Pen Set 10 Colors",price:1499,category:"Pens & Writing",images:["https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=500","https://images.unsplash.com/photo-1568205612837-017257d2310a?w=500"],desc:"0.5mm, Quick Dry, for Journaling"},
  {id:5,name:"Fountain Pen with Ink Cartridges",price:2499,category:"Pens & Writing",images:["https://images.unsplash.com/photo-1568205612837-017257d2310a?w=500"],desc:"Matte Black, Smooth Writing"},
  {id:6,name:"Pastel Highlighters 6 Pack",price:699,category:"Pens & Writing",images:["https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500"],desc:"Mild Colors, Chisel Tip"},
  // 3. Art & Craft
  {id:7,name:"Watercolor Brush Pen Set 24 Colors",price:3299,category:"Art & Craft",images:["https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500","https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=500"],desc:"Real Brush Tip, Blendable"},
  {id:8,name:"Washi Tape Set 20 Rolls Aesthetic",price:1199,category:"Art & Craft",images:["https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=500"],desc:"Floral & Pastel Designs"},
  {id:9,name:"Acrylic Marker Pens 30 Colors",price:2799,category:"Art & Craft",images:["https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500"],desc:"For Rock, Glass, Wood Painting"},
  // 4. Desk Organizers
  {id:10,name:"Wooden Desk Organizer Pen Holder",price:1999,category:"Desk Organizers",images:["https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?w=500","https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?w=500"],desc:"Bamboo Wood, 5 Compartments"},
  {id:11,name:"Acrylic Drawer Organizer 5 Pcs",price:1599,category:"Desk Organizers",images:["https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500"],desc:"Transparent, for Stationery & Makeup"},
  {id:12,name:"Foldable Desk Storage Box",price:999,category:"Desk Organizers",images:["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500"],desc:"Canvas + Bamboo, Large Capacity"},
  // 5. Paper & Planners
  {id:13,name:"Sticky Notes Pastel 12 Pads",price:649,category:"Paper & Planners",images:["https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500"],desc:"76x76mm, 100 Sheets Each"},
  {id:14,name:"Weekly Planner Undated A5",price:1099,category:"Paper & Planners",images:["https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=500","https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500"],desc:"52 Weeks, Habit Tracker"},
  {id:15,name:"Origami Paper 200 Sheets Colorful",price:799,category:"Paper & Planners",images:["https://images.unsplash.com/photo-1603481588273-4b86f6e8b26c?w=500"],desc:"15x15cm, Double Sided"}
];
// Normalize old image field
defaultProducts.forEach(p=>{if(!p.images && p.image) p.images=[p.image]; if(!p.image && p.images) p.image=p.images[0];});
const defaultSettings={whatsappNumber:"923205003348",siteName:"Mi Grafix"};
