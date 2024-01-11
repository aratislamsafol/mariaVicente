const appointmentBtn = document.querySelector('.appointment_btn');
const appointmentBtnSm = document.querySelector('.appointment_btn_sm');
const appointmentBtnMd = document.querySelector('.appointment_btn_md');
const appointmentModal = document.querySelector('.appointment-modal');
const closeBtn = document.querySelector('.close');
const modalContent = document.querySelector('.modal-content');

function toggleModal() {
    if (appointmentModal.style.display === 'block') {
        modalContent.classList.add('closing-animation');
        setTimeout(() => {
            appointmentModal.style.display = 'none';
            modalContent.classList.remove('closing-animation');
        }, 200);
    } else {
        appointmentModal.style.display = 'block';
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        toggleModal();
    }
});

window.onclick = function(event) {
    if (event.target === appointmentModal) {
        toggleModal();
    }
};

appointmentBtn.addEventListener('click',toggleModal);
appointmentBtnSm.addEventListener('click',toggleModal);
appointmentBtnMd.addEventListener('click',toggleModal);
closeBtn.addEventListener('click',toggleModal)
