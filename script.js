document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "YKsuBrAOz7Wgpw1Ic3HxvhlRalP4dIS-fHVpaBNup9U";
    const photoElement = document.getElementById('photo');
    const photographerElement = document.getElementById('photographer');
    const likeButton = document.getElementById('like-btn');
    const likeCount = document.getElementById('like-count');
    const historyList = document.getElementById('history-list');

    let likeCountValue = 0;
    let likedPhotos = [];
    let historyPhotos = [];

    async function getRandomPhoto() {
        try {
            const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${apiKey}`);
            const data = await response.json();
            const { urls, user } = data;
            const { name } = user;
            const photoUrl = urls.regular;

            photoElement.src = photoUrl;
            photographerElement.textContent = `Photo by ${name}`;
            
            likeCountValue = 0;
            likedPhotos = [];
            likeCount.textContent = likeCountValue;

            historyPhotos.push(photoUrl);
            renderHistory();
        } catch (error) {
            console.error('Error fetching random photo:', error);
        }
    }

    function handleLike() {
        if (!likedPhotos.includes(photoElement.src)) {
            likeCountValue++;
            likedPhotos.push(photoElement.src);
            likeCount.textContent = likeCountValue;
            saveLikedPhotos();
        }
    }

    function saveLikedPhotos() {
        localStorage.setItem('likedPhotos', JSON.stringify(likedPhotos));
    }

    function loadLikedPhotos() {
        const likedPhotosJSON = localStorage.getItem('likedPhotos');
        if (likedPhotosJSON) {
            likedPhotos = JSON.parse(likedPhotosJSON);
            likeCountValue = likedPhotos.length;
            likeCount.textContent = likeCountValue;
        }
    }

    function renderHistory() {
        historyList.innerHTML = '';
        historyPhotos.forEach(photoUrl => {
            const li = document.createElement('li');
            li.textContent = photoUrl;
            historyList.appendChild(li);
        });
    }

    likeButton.addEventListener('click', handleLike);
    loadLikedPhotos();
    getRandomPhoto();
});
