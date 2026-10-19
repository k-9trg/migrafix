let products=JSON.parse(localStorage.getItem(\'store_products\'))||defaultProducts;
let settings=JSON.parse(localStorage.getItem(\'store_settings\'))||defaultSettings;
// Normalize images field for old data
products.forEach(p=>{if(!p.images && p.image) p.images=[p.image]; if(!p.image && p.images.length>0) p.image=p.images[0];});

// Try load from GitHub products.json (for live visitors)
fetch(\'products.json\').then(r=>r.json()).then(data=>{
  let incoming = data.products || data;
  if(Array.isArray(incoming) && incoming.length>0){
    localStorage.setItem(\'store_products\',JSON.stringify(incoming));
    if(data.settings) localStorage.setItem(\'store_settings\',JSON.stringify(data.settings));
    // reload only if different
    if(JSON.stringify(incoming) !== JSON.stringify(products)) location.reload();
  }
}).catch(()=>{});

function getWhatsAppLink(p){
  const img = (p.images && p.images[0]) ? p.images[0] : p.image;
  const msg=`Hi Mi Grafix! I want to order:%0A%0A*Product:* ${p.name}%0A*Price:* Rs. ${p.price}%0A*Category:* ${p.category}%0A*Details:* ${p.desc}%0A*Image:* ${img}%0A%0APlease confirm availability.`;
  return `https://wa.me/${settings.whatsappNumber}?text=${msg}`;
}
function renderProducts(filter="All"){
  const grid=document.getElementById(\'productGrid\');
  let f=filter==="All"?products:products.filter(p=>p.category===filter);
  grid.innerHTML=f.map(p=>{
    const imgs = p.images || [p.image];
    const thumbs = imgs.map((im,i)=>`<img src="${im}" onclick="openModal(\'${im}\')" class="w-10 h-10 object-cover rounded border cursor-pointer ${i===0?\'ring-2 ring-black\':\'\'}">`).join(\'\');
    return `<div class="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden flex flex-col">
      <img src="${imgs[0]}" onclick="openModal(\'${imgs[0]}\')" class="w-full h-64 object-cover cursor-pointer">
      <div class="p-4 flex flex-col flex-1">
        <span class="text-xs bg-gray-100 px-2 py-1 rounded self-start">${p.category}</span>
        <h4 class="font-bold text-lg mt-2">${p.name}</h4>
        <p class="text-sm text-gray-500">${p.desc}</p>
        <div class="flex gap-2 mt-2">${thumbs}</div>
        <p class="font-black text-xl mt-3">Rs. ${p.price}</p>
        <a href="${getWhatsAppLink(p)}" target="_blank" class="mt-4 block bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-lg font-bold"><i class="fab fa-whatsapp"></i> Order on WhatsApp</a>
      </div>
    </div>`;
  }).join(\'\');
}
function renderCategories(){
  const cats=["All",...new Set(products.map(p=>p.category))];
  document.getElementById(\'categoryFilters\').innerHTML=cats.map(c=>`<button onclick="renderProducts(\'${c}\')" class="px-6 py-2 rounded-full border font-medium ${c===\'All\'?\'bg-black text-white\':\'bg-white hover:bg-black hover:text-white\'}">${c}</button>`).join(\'\');
}
function openModal(src){document.getElementById(\'modalImg\').src=src; document.getElementById(\'imgModal\').classList.remove(\'hidden\'); document.getElementById(\'imgModal\').classList.add(\'flex\');}
function closeModal(){document.getElementById(\'imgModal\').classList.add(\'hidden\');}
renderCategories();renderProducts();
