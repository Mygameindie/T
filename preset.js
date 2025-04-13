function applyCustomPreset() {
    // Hide all clothing items first (except underwear, boxers, and sweatshirt)
    hideSpecificCategories([
    "top1", "pants1", "skirt1", 
    "shoes1", "jacket1", "dress1", "hat1",
    "onepiece1", "topunderwear1", "expression1", "accessories1",
    "sweatshirt1", "socks1", "boxers1", "bottomunderwear1"
]);

    // Show updated items from your latest upload
	showItem("jacket1_1.png", "jacket1"); 
    showItem("top1_1.png", "top1"); 
    showItem("pants1_1.png", "pants1"); 
    showItem("socks1_1.png", "socks1"); // Optional, include only if needed
	showItem("shoes1_1.png", "shoes1");
	showItem("topunderwear1_1.png", "topunderwear1");
    showItem("bottomunderwear1_1.png", "bottomunderwear1");
}

function showItem(itemId, categoryName) {
    const selectedItem = document.getElementById(itemId);
    if (selectedItem) {
        selectedItem.style.visibility = "visible"; // Force visibility
        selectedItem.style.display = "block"; // Ensure it's not hidden
        selectedItem.style.position = "absolute"; // Keep absolute positioning
        selectedItem.style.left = "0"; // Ensure alignment
        selectedItem.style.top = "0"; // Reset any displacement// Apply correct layering
    } else {
        console.warn(`Item not found: ${itemId} in category ${categoryName}`);
    }
}



function applyUnderwearOnlyPreset() {
    // Hide all clothing items except underwear and boxers
    hideSpecificCategories([
    "top1", "pants1", "skirt1", 
    "shoes1", "jacket1", "dress1", "hat1",
    "onepiece1", "topunderwear1", "expression1", "accessories1",
    "sweatshirt1", "socks1", "boxers1", "bottomunderwear1"
]);
    showItem("topunderwear1_1.png", "topunderwear1");
    showItem("bottomunderwear1_1.png", "bottomunderwear1");

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
        // Apply correct layering
    } else {
        console.warn(`Item not found: ${itemId} in category ${categoryName}`);
    }
}

function applyPreset1() {
    // Hide all clothing items first
    hideSpecificCategories([
    "top1", "pants1", "skirt1", 
    "shoes1", "jacket1", "dress1", "hat1",
    "onepiece1", "topunderwear1", "expression1", "accessories1",
    "sweatshirt1", "socks1", "boxers1", "bottomunderwear1"
]);

    showItem("shoes1_2.png", "shoes1");
    showItem("skirt1_3.png", "skirt1");
    showItem("socks1_1.png", "socks1");
    showItem("top1_3.png", "top1");

}

function showItem(itemId, categoryName) {
    const selectedItem = document.getElementById(itemId);
    if (selectedItem) {
        selectedItem.style.visibility = "visible"; // Force visibility
        selectedItem.style.display = "block"; // Ensure it's not hidden
        selectedItem.style.position = "absolute"; // Keep absolute positioning
        selectedItem.style.left = "0"; // Ensure alignment
        selectedItem.style.top = "0"; // Reset any displacement
         // Apply correct layering
    } else {
        console.warn(`Item not found: ${itemId} in category ${categoryName}`);
    }
}