const allQuestion = document.querySelector('#allQuestion');

const accordionData = [{id:1, title:'Enim sodales consequat adipiscing facilisis massa venenatis, non lorem lobortis?', content:'Lorem ipsum dolor sit amet consectetur. Nunc senectus sed laoreet maecenas consectetur interdum nulla sed. Mollis arcu sit pretium non etiam quis iaculis nibh fermentum. Posuere mattis est elementum fringilla. Massa nullam malesuada tellus enim imperdiet ut vitae consectetur. Malesuada phasellus et sed cras ultrices quis amet erat morbi. Ut cursus.'},
{id:2, title:'Venenatis nulla sagittis nunc, lobortis nec sollicitudin neque, dolor?', content:'Lorem ipsum dolor sit amet consectetur. Nunc senectus sed laoreet maecenas consectetur interdum nulla sed. Mollis arcu sit pretium non etiam quis iaculis nibh fermentum. Posuere mattis est elementum fringilla. Massa nullam malesuada tellus enim imperdiet ut vitae consectetur. Malesuada phasellus et sed cras ultrices quis amet erat morbi. Ut cursus.'},
{id:3, title:'Varius ultricies molestie tellus fermentum, viverra ipsum scelerisque etiam lorem?', content:'Lorem ipsum dolor sit amet consectetur. Nunc senectus sed laoreet maecenas consectetur interdum nulla sed. Mollis arcu sit pretium non etiam quis iaculis nibh fermentum. Posuere mattis est elementum fringilla. Massa nullam malesuada tellus enim imperdiet ut vitae consectetur. Malesuada phasellus et sed cras ultrices quis amet erat morbi. Ut cursus.'},
{id:4, title:'Nulla etiam vitae, at sagittis, nibh ultrices mattis feugiat faucibus?          ', content:'Lorem ipsum dolor sit amet consectetur. Nunc senectus sed laoreet maecenas consectetur interdum nulla sed. Mollis arcu sit pretium non etiam quis iaculis nibh fermentum. Posuere mattis est elementum fringilla. Massa nullam malesuada tellus enim imperdiet ut vitae consectetur. Malesuada phasellus et sed cras ultrices quis amet erat morbi. Ut cursus.'},
{id:5, title:'Sagittis consectetur gravida nec turpis eros, id sit et, dictum?', content:'Lorem ipsum dolor sit amet consectetur. Nunc senectus sed laoreet maecenas consectetur interdum nulla sed. Mollis arcu sit pretium non etiam quis iaculis nibh fermentum. Posuere mattis est elementum fringilla. Massa nullam malesuada tellus enim imperdiet ut vitae consectetur. Malesuada phasellus et sed cras ultrices quis amet erat morbi. Ut cursus.'}
];

allQuestion.innerHTML = accordionData.map(element => {
    const truncatedTitle = window.innerWidth > 767 ? element.title.slice(0, 50) + '...' : element.title;

    return `<button class="accordion" id=${element.id} onclick="openPanel(${element.id})"><h4 title="${element.title}">${truncatedTitle}</h4><img src="assets/img/chevron-down.png" alt=""/></button>
    <div class="panel">
      <p>${element.content}</p>
    </div>`;
}).join("");



function openPanel(id) {
    accordionData.forEach(element => {
        let panel = document.getElementById(element.id);
        let content = panel.nextElementSibling;

        if (element.id === id) {
            panel.classList.toggle('activeTab');
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        } else {
            panel.classList.remove('activeTab');
            content.style.maxHeight = null;
        }
    });
}


