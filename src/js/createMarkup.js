
export function createMarkup(fetched) {
    return fetched.hits.map(hit => {
        return `
        <a class="links" href="${hit.largeImageURL}">
        <div class="photo-card">
                    <img class="gallery-image" src="${hit.webformatURL}" alt="${hit.tags} loading="lazy" width="300" height="180""/>
                    
                    <div class="info">
                    <p class="info-item">
                        <b>Likes</b>
                        <br>${hit.likes}
                    </p>
                    <p class="info-item">
                        <b>Views</b>
                        <br>${hit.views}
                    </p>
                    <p class="info-item">
                        <b>Comments</b>
                        <br>${hit.comments}
                    </p>
                    <p class="info-item">
                        <b>Downloads</b>
                        <br>${hit.downloads}
                    </p>
                    </div>
                </div>
                </a>`
    }).join('')
}