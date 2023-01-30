import Notiflix from "notiflix";
import { fetchCards, moreFetchCards, totalPages, page } from "./js/fetchCards";
import { createMarkup } from "./js/createMarkup";
import { lightbox } from "./js/SimpleLightBox";

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const moreBtn = document.querySelector(".load-more");
let quary = ''

form.addEventListener('submit', async (ev) => {
    ev.preventDefault()
    quary = ev.target.searchQuery.value
    const fetched = await fetchCards(quary)
    const totalHits = fetched.totalHits

    if (fetched.totalHits === 0) {
    return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }
    
    Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`)

    const firsMarkup = await createMarkup(fetched)
    gallery.innerHTML = firsMarkup
    lightbox.refresh()
    moreBtn.toggleAttribute('hidden')

    if (page > totalPages) {
        moreBtn.toggleAttribute('hidden')
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
    }
})

moreBtn.addEventListener("click", async (ev) => {
    let moreFetched = await moreFetchCards(quary)
    let nextMarkup = await createMarkup(moreFetched)
    gallery.insertAdjacentHTML("beforeend", nextMarkup)
    lightbox.refresh()
    if (page > totalPages) {
        moreBtn.toggleAttribute('hidden')
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
    }
})

