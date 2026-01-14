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
const onScroll = () => {
    // Check if the user has scrolled to the bottom
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        currentPage++;  // Increment the page number
        fetchImages();  // Fetch the next set of images
    }
};
window.addEventListener('scroll', onScroll);

fetchImages();



