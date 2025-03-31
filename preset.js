function applyCustomPreset() {
    // Hide all clothing items first (except underwear, boxers, and sweatshirt)
    hideSpecificCategories([
        "top1", "top2", "pants1", "pants2", "skirt1", "skirt2", 
        "shoes1", "shoes2", "jacket1", "jacket2", "dress1", "dress2", "hat1", "hat2"
    ]);

    // Show updated items from your latest upload
    showItem("top1_1.png", "top1"); 
    showItem("pants1_1.png", "pants1"); 
    showItem("jacket1_1.png", "jacket1"); 
    showItem("shoes1_1.png", "shoes1");
    showItem("socks1_1.png", "socks1"); // Optional, include only if needed
}

function showItem(itemId, categoryName) {
    const selectedItem = document.getElementById(itemId);
    if (selectedItem) {
        selectedItem.style.visibility = "visible"; 
        selectedItem.style.display = "block"; 
        selectedItem.style.position = "absolute"; 
        selectedItem.style.left = "0"; 
        selectedItem.style.top = "0"; 
        selectedItem.style.zIndex = getZIndex(categoryName); 
    } else {
        console.warn(`Item not found: ${itemId} in category ${categoryName}`);
    }
}



function applyUnderwearOnlyPreset() {
    // Hide all clothing items except underwear and boxers
    hideSpecificCategories([
                "top1", "top2", "pants1", "pants2", "skirt1", "skirt2", 
        "shoes1", "shoes2", "jacket1", "jacket2", "dress1", "dress2","hat1","hat2","socks1"
    ]);

    // Ensure top and bottom underwear remain visible
    showItem("underwear_top.png", "underwear_top"); 
    showItem("underwear_bottom.png", "underwear_bottom"); 

    // Check if boxers exist and show them too
    if (document.getElementById("boxers.png")) {
        showItem("boxers.png", "boxers");
    }
}
function showItem(itemId, categoryName) {
    const selectedItem = document.getElementById(itemId);
    if (selectedItem) {
        selectedItem.style.visibility = "visible"; // Force visibility
        selectedItem.style.display = "block"; // Ensure it's not hidden
        selectedItem.style.position = "absolute"; // Keep absolute positioning
        selectedItem.style.left = "0"; // Ensure alignment
        selectedItem.style.top = "0"; // Reset any displacement
        selectedItem.style.zIndex = getZIndex(categoryName); // Apply correct layering
    } else {
        console.warn(`Item not found: ${itemId} in category ${categoryName}`);
    }
}

function applyPreset1() {
    // Hide all clothing items first
    hideSpecificCategories([
        "top1", "top2", "pants1", "pants2", "skirt1", "skirt2", 
        "shoes1", "shoes2", "jacket1", "jacket2", "dress1", "dress2", 
        "sweatshirt1", "sweatshirt2", "hat1", "accessories"
    ]);

    // Show only the uploaded files
    showItem("pants2_2.png", "pants2");
    showItem("hat1_1.png", "hat1");
    showItem("dress1_1.png", "dress1");
    showItem("shoes1_2.png", "shoes1");
    showItem("jacket2_1.png", "jacket2");
    showItem("top2_2.png", "top2");
    showItem("shoes2_2.png", "shoes2");
}

function showItem(itemId, categoryName) {
    const selectedItem = document.getElementById(itemId);
    if (selectedItem) {
        selectedItem.style.visibility = "visible"; // Force visibility
        selectedItem.style.display = "block"; // Ensure it's not hidden
        selectedItem.style.position = "absolute"; // Keep absolute positioning
        selectedItem.style.left = "0"; // Ensure alignment
        selectedItem.style.top = "0"; // Reset any displacement
        selectedItem.style.zIndex = getZIndex(categoryName); // Apply correct layering
    } else {
        console.warn(`Item not found: ${itemId} in category ${categoryName}`);
    }
}