import {createIcons, Search} from 'lucide';
import {courses} from './data.js';

createIcons({
    icons: {
        Search,
    }
});

let currentCategory = 'all';
let searchQuery = '';

const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.querySelector('.search');
const catalogContent = document.querySelector('.catalog-content');

function renderCards(data) {
    if (data.length === 0) {
        catalogContent.innerHTML = '<p class="catalog-content__empty">No courses found.</p>';
        return;
    }

    catalogContent.innerHTML = data.map(course => {
        return `
            <article class="card">
                <div class="card__image-wrapper">
                    <img src="${course.image}" alt="${course.title}" class="card__image">
                </div>
                <div class="card__body">
                    <span class="badge badge--${course.category}">${course.badgeText}</span>
                    <h3 class="card__title">${course.title}</h3>
                    <div class="card__footer">
                        <span class="card__price">$${course.price}</span>
                        <span class="card__author">| by ${course.author}</span>
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

function updateCatalog() {
    const filteredCourses = courses.filter(course => {
        const isCategoryMatch = currentCategory === 'all' || course.category === currentCategory;

        const isSearchMatch = course.title.toLowerCase().includes(searchQuery);

        return isCategoryMatch && isSearchMatch;
    });

    renderCards(filteredCourses);
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        currentCategory = button.dataset.filter;

        updateCatalog();
    });
});

searchInput.addEventListener('input', (event) => {
    searchQuery = event.target.value.toLowerCase().trim();

    updateCatalog();
});

const searchBtn = document.querySelector('.search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
    });
}

renderCards(courses);

function updateFilterCounts() {
    filterButtons.forEach(button => {
        const category = button.dataset.filter;

        const count = category === 'all'
            ? courses.length
            : courses.filter(course => course.category === category).length;

        button.innerHTML += ` <sup>${count}</sup>`;
    });
}

updateFilterCounts();