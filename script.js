// Array of JSON file paths
const jsonFiles = [
    // Bottom underwear
    'eye.json',
    'mouth.json',
	'bottomunderwear1.json',
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
        socks: 9,
        shoes: 10,
        pants: 11,
        skirt: 12,
        top: 13,
        dress: 14,
        jacket: 15,
        accessories: 16,
        hat: 17,
    };

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

// Load items in batches
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
                img.style.position = 'absolute';
                img.style.zIndex = getZIndex(categoryName);
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

// Toggle visibility
function toggleVisibility(itemId, categoryName) {
    const categoryItems = document.querySelectorAll(`.${categoryName}`);
    let anyVisible = false;

    categoryItems.forEach(item => {
        if (item.id !== itemId) {
            item.style.visibility = 'hidden';
        } else if (item.style.visibility === 'visible') {
            anyVisible = true;
        }
    });

    const selectedItem = document.getElementById(itemId);
    selectedItem.style.visibility = selectedItem.style.visibility === 'visible' ? 'hidden' : 'visible';

    if (categoryName === 'eye' || categoryName === 'mouth') {
        if (!anyVisible || selectedItem.style.visibility === 'hidden') {
            selectedItem.style.visibility = 'visible';
        }
    }

    if (selectedItem.style.visibility === 'visible') {
        if (categoryName === 'onepiece1') {
            hideSpecificCategories(['topunderwear', 'bottomunderwear']);
        } else if (categoryName === 'dress1') {
            hideSpecificCategories(['top1', 'pants1', 'skirt1', 'sweatshirt1']);
        } else if (categoryName === 'dress2') {
            hideSpecificCategories(['top2', 'pants2', 'skirt2', 'sweatshirt2']);
        } else if (categoryName.startsWith('top1') || categoryName.startsWith('pants1') || categoryName.startsWith('skirt1') || categoryName.startsWith('sweatshirt1')) {
            hideSpecificCategories(['dress1']);
        } else if (categoryName.startsWith('top2') || categoryName.startsWith('pants2') || categoryName.startsWith('skirt2') || categoryName.startsWith('sweatshirt2')) {
            hideSpecificCategories(['dress2']);
        } else if (categoryName === 'topunderwear1' || categoryName === 'bottomunderwear1') {
            hideSpecificCategories(['onepiece1']);
        }
    }
}

// Hide specified categories
function hideSpecificCategories(categories) {
    categories.forEach(category => {
        const items = document.querySelectorAll(`.${category}`);
        items.forEach(item => {
            item.style.visibility = 'hidden';
        });
    });
}

// Adjust layout for screen size
function adjustCanvasLayout() {
    const baseContainer = document.querySelector('.base-container');
    const controlsContainer = document.querySelector('.controls');
    const screenWidth = window.innerWidth;

    requestAnimationFrame(() => {
        if (screenWidth <= 600) {
            baseContainer.classList.add('mobile-layout');
            baseContainer.classList.remove('desktop-layout');
            controlsContainer.classList.add('mobile-controls');
            controlsContainer.classList.remove('desktop-controls');
        } else {
            baseContainer.classList.add('desktop-layout');
            baseContainer.classList.remove('mobile-layout');
            controlsContainer.classList.add('desktop-controls');
            controlsContainer.classList.remove('mobile-controls');
        }
    });
}

// On load
window.onload = () => {
    loadItemsInBatches();
    adjustCanvasLayout();
};

window.addEventListener('resize', adjustCanvasLayout);

// Game start
function enterGame() {
    document.querySelector('.main-menu').style.display = 'none';
    document.querySelector('.game-container').style.display = 'block';
}

// Blur button
function blurButton(event) {
    event.preventDefault();
    event.target.blur();
}

// Button 1
function pressButton1(event) {
    blurButton(event);
    document.getElementById("base2-image").style.display = "block";
}

function releaseButton1(event) {
    blurButton(event);
    document.getElementById("base2-image").style.display = "none";
}

// Button 2
function pressButton2(event) {
    blurButton(event);
    document.getElementById("base3-image").style.display = "block";
}

function releaseButton2(event) {
    blurButton(event);
    document.getElementById("base3-image").style.display = "none";
}

// Button listeners
document.addEventListener("DOMContentLoaded", () => {
    const button1 = document.querySelector(".button-1");
    const button2 = document.querySelector(".button-2");

    button1?.addEventListener("mousedown", pressButton1);
    button1?.addEventListener("mouseup", releaseButton1);
    button1?.addEventListener("touchstart", pressButton1, { passive: false });
    button1?.addEventListener("touchend", releaseButton1, { passive: false });

    button2?.addEventListener("mousedown", pressButton2);
    button2?.addEventListener("mouseup", releaseButton2);
    button2?.addEventListener("touchstart", pressButton2, { passive: false });
    button2?.addEventListener("touchend", releaseButton2, { passive: false });
});
