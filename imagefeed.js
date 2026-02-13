const imageContainer = document.getElementById('imageContainer');
const loadingIndicator = document.getElementById('loading-indicator');
let currentPage = 1; 
const imagesPerPage = 10;

// Function to fetch images
const fetchImages = async () => {
    loadingIndicator.style.display = 'block';  // Show loading indicator
    try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=${imagesPerPage}`);
        if (!response.ok) throw new Error('Network response was not okay'); //Throws in the error message if the response is not okay

        const images = await response.json();
        displayImages(images);
    } catch (error) {
        console.log('Error fetching images:', error);
    } finally {
        loadingIndicator.style.display = 'none';  // Hide loading indicator
    }
};

// Function to display images
const displayImages = (images) => {
    images.forEach((image) => {
        const imgElement = document.createElement('div');
        imgElement.classList.add('image');
        imgElement.innerHTML = `<img src="${image.download_url}" alt="${image.author}">`;
        imageContainer.appendChild(imgElement);  // Append image to container
    });
};

// Detect when the user reaches the bottom of the page
let isLoading = false;

const sentinel = document.getElementById("sentinel");

const observer = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting && !isLoading) {
        isLoading = true;
        currentPage++;

        try {
            await fetchImages();
        } catch (err) {
            console.error("Error fetching images:", err);
        }

        isLoading = false;
    }
}, {
    rootMargin: "200px" // loads slightly before bottom
});

observer.observe(sentinel);

fetchImages();



