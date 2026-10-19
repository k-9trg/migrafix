let products=JSON.parse(localStorage.getItem(\'store_products\'))||defaultProducts;
let settings=JSON.parse(localStorage.getItem(\'store_settings\'))||defaultSettings;
products.forEach(p=>{if(!p.images && p.image) p.images=[p.image];});
document.getElementById(\'whatsappNumber\').value=settings.whatsappNumber;
document.getElementById(\'siteName\').value=settings.siteName;

let tempImages = []; // holds base64 or urls for current editing product

// Handle file select from PC - convert to base64
document.getElementById(\'pImageFiles\').addEventListener(\'change\', function(e){
  const files = Array.from(e.target.files);
  if(files.length + tempImages.length > 5){ alert("Max 5 images allowed"); return; }
  files.forEach(file=>{
    const reader = new FileReader();
    reader.onload = ev => {
      tempImages.push(ev.target.result); // base64
      renderPreview();
    };
    reader.readAsDataURL(file);
  });
});

// Also allow single URL add
document.getElementById(\'pImage\').addEventListener(\'change\', function(e){
  if(e.target.value.trim() && tempImages.length < 5){
    tempImages.push(e.target.value.trim());
    renderPreview();
    e.target.value="";
  }
});

function renderPreview(){
  document.getElementById(\'preview\').innerHTML = tempImages.map((src,i)=>`
    <div class="relative">
      <img src="${src}" class="w-20 h-20 object-cover rounded border">
      <button type="button" onclick="removeImage(${i})" class="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 text-xs">x</button>
    </div>
  `).join(\'\');
}
function removeImage(i){ tempImages.splice(i,1); renderPreview(); }
function clearImages(){ tempImages=[]; renderPreview(); document.getElementById(\'pImageFiles\').value=""; }

function saveSettings(){settings.whatsappNumber=document.getElementById(\'whatsappNumber\').value.replace(/[^0-9]/g,\'\');settings.siteName=document.getElementById(\'siteName\').value;localStorage.setItem(\'store_settings\',JSON.stringify(settings));alert(\'Settings Saved!\');}
function renderAdminList(){
  document.getElementById(\'adminProductList\').innerHTML=products.map(p=>{
    const imgs = p.images || [p.image];
    return `<div class="flex gap-4 items-center border p-3 rounded"><img src="${imgs[0]}" class="w-16 h-16 object-cover rounded"><div class="flex-1"><b>${p.name}</b><br><small>${p.category} - Rs.${p.price} | ${imgs.length} images</small></div><button onclick="editProduct(${p.id})" class="bg-blue-500 text-white px-3 py-1 rounded">Edit</button><button onclick="deleteProduct(${p.id})" class="bg-red-500 text-white px-3 py-1 rounded">Delete</button></div>`;
  }).join(\'\');
}
function deleteProduct(id){if(confirm(\'Delete this product?\')){products=products.filter(p=>p.id!==id);localStorage.setItem(\'store_products\',JSON.stringify(products));renderAdminList();}}
function editProduct(id){
  const p=products.find(x=>x.id===id);
  document.getElementById(\'pId\').value=p.id;
  document.getElementById(\'pName\').value=p.name;
  document.getElementById(\'pPrice\').value=p.price;
  document.getElementById(\'pCategory\').value=p.category;
  document.getElementById(\'pDesc\').value=p.desc;
  tempImages = [...(p.images || [p.image])];
  renderPreview();
  document.getElementById(\'formBtn\').innerText=\'Update Product\';
  window.scrollTo(0,0);
}
function resetForm(){document.getElementById(\'productForm\').reset();document.getElementById(\'pId\').value=\'\';tempImages=[];renderPreview();document.getElementById(\'formBtn\').innerText=\'Add Product\';}

document.getElementById(\'productForm\').onsubmit=e=>{
  e.preventDefault();
  if(tempImages.length===0){ alert("Please add at least 1 image from PC or URL"); return; }
  const id=document.getElementById(\'pId\').value;
  const obj={id:id?parseInt(id):Date.now(),name:document.getElementById(\'pName\').value,price:parseInt(document.getElementById(\'pPrice\').value),category:document.getElementById(\'pCategory\').value,images:[...tempImages],image:tempImages[0],desc:document.getElementById(\'pDesc\').value};
  if(id){products=products.map(p=>p.id==id?obj:p);}else{products.push(obj);}
  localStorage.setItem(\'store_products\',JSON.stringify(products));
  renderAdminList();resetForm();
  alert("Product Saved! Now click Export to make it live on GitHub");
};

function exportData(){
  const data={products,settings};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:\'application/json\'});
  const a=document.createElement(\'a\');a.href=URL.createObjectURL(blob);a.download=\'products.json\';a.click();
  alert(\'Downloaded! Now upload this products.json to GitHub to make changes LIVE.\');
}
// FIXED IMPORT
function importData(e){
  const file=e.target.files[0];
  if(!file) return;
  const reader=new FileReader();
  reader.onload=ev=>{
    try{
      const data=JSON.parse(ev.target.result);
      let incomingProducts = data.products || data; // supports both formats
      let incomingSettings = data.settings || settings;
      if(!Array.isArray(incomingProducts)) throw new Error("Invalid JSON - products not found");
      // normalize
      incomingProducts.forEach(p=>{if(!p.images && p.image) p.images=[p.image]; if(!p.image && p.images) p.image=p.images[0];});
      localStorage.setItem(\'store_products\',JSON.stringify(incomingProducts));
      localStorage.setItem(\'store_settings\',JSON.stringify(incomingSettings));
      alert(`Import Successful! ${incomingProducts.length} products imported. Reloading...`);
      location.reload();
    }catch(err){ alert("Import Failed: "+err.message); }
  };
  reader.readAsText(file);
}
function clearData(){if(confirm(\'Reset to default 15 stationery products?\')){localStorage.clear();location.reload();}}
renderAdminList();
