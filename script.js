'user strict';

const imageContainer = document.querySelector('.image-container');
const imageNumber = document.querySelector('.total-images');
const loader = document.querySelector('.loader');

let initialLoad = true;
let photosArray = [];
let imagesLoaded = 0;
let totalImages = 0;
let ready = false;

// check if all images were loaded
function imageLoaded(item) {
	imagesLoaded++;
	item.classList.remove('placeholder');

	if (imagesLoaded === totalImages) {
		ready = true;
		initialLoad = false;
		loader.hidden = true;
	}
}

function createNewElement(tagName, attributes) {
	const element = document.createElement(tagName);
	for (const key in attributes) element.setAttribute(key, attributes[key]);
	return element;
}

function htmlImage(photo) {
	const item = createNewElement('a', {
		href: photo.links.html,
		class: 'placeholder',
		target: '_blank',
	});

	const img = createNewElement('img', {
		src: photo.urls.regular,
		alt: photo.alt_description,
		title: photo.alt_description,
		loading: 'lazy',
	});

	item.appendChild(img);
	imageContainer.appendChild(item);

	return { item, img };
}

function displayPhotos() {
	totalImages = totalImages + photosArray.length;

	photosArray.forEach((photo) => {
		const { item, img } = htmlImage(photo);

		// check when each is finished loading
		img.addEventListener('load', () => imageLoaded(item));
	});

	imageNumber.innerHTML = totalImages;
}

async function getPhotos() {
	const imageNum = initialLoad ? 10 : 30;
	const API_KEY = 'XqBcjJGDQ9MjEoU1XpTO3YMz6PmyesL4Ywey029IpWQ';
	const API_URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${imageNum}`;

	try {
		const data = await (await fetch(API_URL)).json();
		photosArray = data;
		displayPhotos();
	} catch (error) {
		console.error(error.message);
	}
}

window.addEventListener('scroll', () => {
	const isNearBottom = innerHeight + scrollY >= document.body.offsetHeight - 500;

	if (isNearBottom && ready) {
		ready = false;
		getPhotos();
	}
});

// on load
getPhotos();
