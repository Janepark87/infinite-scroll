'user strict';

const imageContainer = document.querySelector('.image-container');
const loader = document.querySelector('.loader');

let photosArray = [];

const COUNT = 10;
const API_KEY = 'STE4ufYNSDONWjYpi8of1p4BEpCPV_0QV7R2oGsqlag';
const API_URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${COUNT}`;

function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

function displayPhotos() {
	photosArray.forEach((photo) => {
		const item = document.createElement('a');
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank',
		});

		const img = document.createElement('img');
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});

		// put img inside a tag
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

async function getPhotos() {
	try {
		const data = await (await fetch(API_URL)).json();
		console.log(data);
		photosArray = data;
		displayPhotos();
	} catch (error) {
		console.error(error.message);
	}
}

// on load
getPhotos();
