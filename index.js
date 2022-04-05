async function getPhotos() {
	let response = await fetch("photos.json");
	let photos = await response.json();
	return photos;
}

function getPhotoHTML(photos) {
	let photosHTML = photos
		.map((photo) => {
			return `<img class="my-photo" src="https://picsum.photos/id/${photo.id}/100/100"/>`;
		})
		.join(" ");
	return `<div class="photos-container">
    ${photosHTML}
    </div>`;
}

getPhotos().then((photos) => {
	document.body.innerHTML = `<div class="my-gallery">
    <img style="display:none" id="my-selected-photo" src="https://picsum.photos/id/${photos[2]}/300/300" />    
    ${getPhotoHTML(photos)}
    </div>`;
	let myPhoto = Array.from(document.getElementsByClassName("my-photo"));
	myPhoto.forEach((photo) => {
		photo.addEventListener("click", () => {
			let selectedPhotoSrc = `${photo.src.substr(0, photo.src.length - 7)}/300/300`;
			let selectedPhoto = document.getElementById("my-selected-photo");
			selectedPhoto.src = selectedPhotoSrc;
			selectedPhoto.style.display = "inline";
		});
	});
});
