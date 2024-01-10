const articleData = data.data;
let loadBtn = document.querySelector('.view_btn');
let moreBtn = document.querySelector('.sm_more_btn');
let cardsToShow = 3;
let viewAll = false;
function card() {
    const articleBodies = document.querySelector('.article_body');
    articleBodies.innerHTML = articleData.slice(0, cardsToShow).map(element => {
        return `<div class="card">
            <img src="${element.img}" alt="article img">
            <div class="card_body">
                <h2>${element.title}</h2>
                <div class="info-container">
                    <p class="hidden">${element.info}</p>
                </div>
            </div>
            <div class="card_footer">
                <button type="button" class="readMore" onclick="toggleInfo(this)">Read more <i class="fa-solid fa-arrow-right load_btn_arrow"></i></button>
            </div>
        </div>`;
    }).join('');
    loadBtn.textContent = viewAll ? 'Show Less Items' : 'View All';
}

function toggleInfo(button) {
    const card = button.closest('.card');
    const infoHidden = card.querySelector('.hidden');
    infoHidden.classList.toggle('full-info');
}

function showAllItems() {
    viewAll = !viewAll;
    cardsToShow = viewAll ? articleData.length : 3;
    card();
    moreBtn.textContent = viewAll ? 'Show Less Articles' : 'More Articles';
}

loadBtn.addEventListener('click', showAllItems);
moreBtn.addEventListener('click', showAllItems);
card();
