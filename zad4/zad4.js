const clientId = 'smP8WEbj4N8WJGdSgCPablzTTLpG2sP5cVQl2aDJqRQ';  // Twój klucz API
const perPage = 8;  // Liczba zdjęć w jednym widoku
let totalImages = [];
let currentIndex = 0;  // Indeks aktualnie wyświetlanego zdjęcia

function searchImages() {
    const query = document.getElementById('search-input').value;
    if (!query) return;

    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=${perPage * 2}&page=1&client_id=${clientId}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            totalImages = data.results;
            displayImages();
        })
        .catch(error => console.error('Błąd:', error));
}

// Funkcja do wyświetlania zdjęć w karuzeli
function displayImages() {
    const carousel = document.getElementById('image-carousel');
    carousel.innerHTML = '';  // Czyści istniejące zdjęcia

    // Obliczamy zdjęcia do wyświetlenia na podstawie indeksu
    const currentImages = totalImages.slice(currentIndex, currentIndex + perPage);

    currentImages.forEach((image) => {
        const imgElement = document.createElement('img');
        imgElement.src = image.urls.thumb;
        imgElement.alt = image.alt_description || 'Zdjęcie';
        imgElement.onclick = () => openLightbox(image.urls.full);
        carousel.appendChild(imgElement);
    });

    // Kontrola widoczności strzałek
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    if (currentIndex === 0) {
        prevButton.classList.add('hidden');
    } else {
        prevButton.classList.remove('hidden');
    }
    if (currentIndex + perPage >= totalImages.length) {
        nextButton.classList.add('hidden');
    } else {
        nextButton.classList.remove('hidden');
    }
}

// Funkcja do przesuwania karuzeli o jedno zdjęcie
function moveCarousel(direction) {
    if (direction === 1) {
        currentIndex++;  // Przesuwamy o jedno zdjęcie do przodu
        if (currentIndex + perPage > totalImages.length) {
            currentIndex = totalImages.length - perPage;  // Zapobiegamy przekroczeniu zakresu
        }
    } else if (direction === -1) {
        currentIndex--;  // Przesuwamy o jedno zdjęcie w lewo
        if (currentIndex < 0) {
            currentIndex = 0;  // Zapobiegamy przekroczeniu zakresu
        }
    }

    displayImages();
}

// Funkcja do otwierania powiększonego zdjęcia
function openLightbox(imageUrl) {
    const lightbox = document.getElementById('lightbox');
    const largeImage = document.getElementById('large-image');
    largeImage.src = imageUrl;
    lightbox.style.display = 'flex';
}

// Funkcja do zamykania powiększonego zdjęcia
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}
