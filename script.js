// Array of JSON file paths
const jsonFiles = [
    // Bottom underwear
    'bottomunderwear1.json',
	'eye.json',
	'mouth.json',

    // Top underwear
    'topunderwear1.json',
	'onepiece1.json',
	
	'expression1.json',

    // Boxers
    'boxers1.json',

    // Sweatshirts
    'sweatshirt1.json',
	'socks1.json',

    // Shoes
    'shoes1.json',

    // Pants
    'pants1.json', 
	
	// Skirts
    'skirt1.json', 

    // Tops
    'top1.json',

    // Dresses
    'dress1.json', 

    // Jackets
    'jacket1.json', 

    // Accessories
    'accessories1.json', 

    // Hats
    'hat1.json', 
];

// Helper function to set z-index for categories
function getZIndex(categoryName) {
    const zIndexMap = {
        eye: 2,
        mouth: 3,
        expression: 4,
        bottomunderwear: 5,
        topunderwear: 6,
        onepiece: 7,
        boxer: 8,
        sweatshirt: 9,
		socks:9,
        shoe: 10,
        pants: 11,
        skirt: 12,
        top: 13,
        dress: 14,
        jacket: 15,
        accessories: 16,
        hat: 17,
    };

    // Return a default value if not found
    return zIndexMap[categoryName] || 0;
}

// Load each JSON file
async function loadItemFile(file) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Error loading file: ${file}`);
        return await response.json();
    } catch (error) {
        console.error(`Failed to load ${file}:`, error);
        return [];
    }
}

// Load items in batches to reduce load time and improve responsiveness
async function loadItemsInBatches(batchSize = 5) {
    const baseContainer = document.querySelector('.base-container');
    const controlsContainer = document.querySelector('.controls');
    
    for (let i = 0; i < jsonFiles.length; i += batchSize) {
        const batch = jsonFiles.slice(i, i + batchSize);

        await Promise.all(batch.map(async file => {
            const data = await loadItemFile(file);
            const categoryName = file.replace('.json', '');
            const categoryContainer = document.createElement('div');
            categoryContainer.classList.add('category');

            const categoryHeading = document.createElement('h3');
            categoryHeading.textContent = categoryName;
            categoryContainer.appendChild(categoryHeading);

            data.forEach(item => {
                const itemId = item.id.endsWith('.png') ? item.id : `${item.id}.png`;

                const img = document.createElement('img');
                img.id = itemId;
                img.src = item.src;
                img.alt = item.alt;
                img.classList.add(categoryName);
                img.setAttribute('data-file', file);
                img.style.visibility = item.visibility === "visible" ? "visible" : "hidden";
                img.style.position = 'absolute'; // Ensure z-index applies
                img.style.zIndex = getZIndex(categoryName); // Apply z-index dynamically
                baseContainer.appendChild(img);

                const button = document.createElement('img');
                const buttonFile = item.src.replace('.png', 'b.png');
                button.src = buttonFile;
                button.alt = item.alt + ' Button';
                button.classList.add('item-button');
                button.onclick = () => toggleVisibility(itemId, categoryName);
                categoryContainer.appendChild(button);
            });

            controlsContainer.appendChild(categoryContainer);
        }));

        await new Promise(resolve => setTimeout(resolve, 50));
    }
}

// Toggle visibility of item images, ensuring mutual exclusivity and mandatory visibility for eyes and mouth
function toggleVisibility(itemId, categoryName) {
    const categoryItems = document.querySelectorAll(`.${categoryName}`);
    let anyVisible = false;

    // Ensure mutual exclusivity within the category
    categoryItems.forEach(item => {
        if (item.id !== itemId) {
            item.style.visibility = 'hidden';
        } else if (item.style.visibility === 'visible') {
            anyVisible = true;
        }
    });

    const selectedItem = document.getElementById(itemId);
    selectedItem.style.visibility = selectedItem.style.visibility === 'visible' ? 'hidden' : 'visible';

    // Ensure at least one is visible for eyes and mouth
    if (categoryName === 'eye' || categoryName === 'mouth') {
        if (!anyVisible || selectedItem.style.visibility === 'hidden') {
            selectedItem.style.visibility = 'visible';
        }
    }

    // Additional logic for specific categories
    if (selectedItem.style.visibility === 'visible') {
        if (categoryName === 'onepiece1') {
            // Hide top and bottom underwear when a one-piece is selected
            hideSpecificCategories(['topunderwear', 'bottomunderwear']);
        } else if (categoryName === 'dress1') {
            // Hide items related to number 1 when wearing dress1
            hideSpecificCategories(['top1', 'pants1', 'skirt1', 'sweatshirt1']);
        }
    }
}

// Helper function to hide items for specific categories
function hideSpecificCategories(categories) {
    categories.forEach(category => {
        const items = document.querySelectorAll(`.${category}`);
        items.forEach(item => {
            item.style.visibility = 'hidden';
        });
    });
}

// Adjust canvas layout dynamically for responsive design on smaller screens
// Adjust canvas layout dynamically for responsive design
function adjustCanvasLayout() {
    const baseContainer = document.querySelector('.base-container');
    const controlsContainer = document.querySelector('.controls');

    const screenWidth = window.innerWidth;

    if (screenWidth <= 600) {
        baseContainer.style.display = 'flex';
        baseContainer.style.flexDirection = 'column';
        baseContainer.style.width = '90%';
        baseContainer.style.height = 'auto';
        controlsContainer.style.flexWrap = 'wrap';
    } else {
        baseContainer.style.display = 'block';
        baseContainer.style.width = '500px';
        baseContainer.style.height = '400px';
        controlsContainer.style.flexWrap = 'nowrap';
    }
}

// Apply layout adjustment on load and resize
window.onload = () => {
    loadItemsInBatches();
    adjustCanvasLayout();
};

window.addEventListener('resize', adjustCanvasLayout);
// Apply layout adjustment on load and resize
window.onload = () => {
    loadItemsInBatches();
    adjustCanvasLayout();
};

window.addEventListener('resize', adjustCanvasLayout);

// Function to enter game mode
function enterGame() {
    document.querySelector('.main-menu').style.display = 'none';
    document.querySelector('.game-container').style.display = 'block';
}