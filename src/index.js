import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from "slim-select";
import 'slim-select/dist/slimselect.css'
import { Notify } from "notiflix";

Notify.init({
    width: '300px',
    position: 'center-center',
    fontSize: '16px',
});

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfoCard = document.querySelector('.cat-info');
const errText = document.querySelector('.error');

errText.style.display = 'none';
select.style.display = 'none';
catInfoCard.style.display = 'none';

select.addEventListener('change', onSelect);

function createSectionOptionsMarkup(breedsArr) {
    const result = breedsArr.map(
        ({ id, name }) => `<option value="${id}">${name}</option>`
    );
    result.unshift(`<option data-placeholder="true"></option>`);
    return result.join('');
};

function onSelect(evt) {
    loader.style.display = 'initial';
    catInfoCard.style.display = 'none';

    const breedId = evt.target.value;

    fetchCatByBreed(breedId)
        .then(catData => {
            catInfoCard.style.display = "flex";
            catInfoCard.innerHTML = createCatCardMarkup(catData);
        })
        .catch((err) => {
            catInfoCard.style.display = 'none';
            console.error(err);
            Notify.failure('Oops! Something went wrong! Try reloading the page!');
        })
        .finally(_ => loader.style.display = 'none');
}

function createCatCardMarkup(catData) {
    const { url, breeds } = catData[0];
    const { name, description, temperament } = breeds[0];

    return `
        <img class="cat-img" src="${url}" alt="${name}">
        <div class="cat-text">
        <h1 class="cat-name">${name}</h1>
        <p class="cat-description">${description}</p>
        <p class="cat-temperament"><span class="cat-temperament-span">Temperament:</span>${temperament}</p>
        </div>`;
}

fetchBreeds()
    .then(breeds => {
        select.style.display = "flex";
        select.innerHTML = createSectionOptionsMarkup(breeds);
        new SlimSelect({
            select: select,
            settings: {
                placeholderText: 'Please choose a cat..',
            },
        })
    })
    .catch((err) => {
        console.error(err);
        Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(_ => loader.style.display = "none")
    
