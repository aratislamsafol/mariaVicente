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

// Appointment date Calender
const selectAppointmentDaysName = document.querySelector('.days_name'); 
const allCalenderDays = document.querySelector('.days ul');
const monthDiv = document.querySelector('#month');

// Variable initialize
const date = new Date();
date.setDate(1);
const currentDay = new Date(date.getFullYear(), date.getMonth() +1, 0).getDate();
const firstDayIndex = date.getDay();
const prevDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
const nextDay = new Date(date.getFullYear(), date.getMonth() +1, 0).getDay();
const lastDayIndex = 7 - nextDay -1;
const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October','November', 'December'];
const years = [2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032];
const daysName = ['sun', 'Mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

// function for all

function monthName(){
    monthDiv.innerHTML = `${month.map(month=>{
        return `<option value="${month}">${month}</option>`
    })}`
}

function year(){
    document.querySelector('#year').innerHTML = `${years.map(year=>{
        return `<option value="${year}">${year}</option>`
    })}`
}

function appointmentDaysName(){
    selectAppointmentDaysName.innerHTML = `${daysName.map(element=>{
        return `<li>${element}</li>`
    }).join("")}`
}

function calenderDays() {
    let calendarHTML = "";

    for (let preMonthDay = firstDayIndex; preMonthDay > 0; preMonthDay--) {
        let passDay = prevDay - preMonthDay + 1;
        calendarHTML += `<li class="prev_date">${passDay}</li>`;
    }

    for (let day = 0; day < currentDay; day++) {
        calendarHTML += `<li>${day + 1}</li>`;
    }

    for (let nextMonthDay = 1; nextMonthDay <= lastDayIndex; nextMonthDay++) {
        calendarHTML += `<li class="next_date">${nextMonthDay}</li>`;
    }

    allCalenderDays.innerHTML = calendarHTML;
}

// Initial Call Item
monthName();
year();
appointmentDaysName();
calenderDays();

// Button Fire
appointmentBtn.addEventListener('click',toggleModal);
appointmentBtnSm.addEventListener('click',toggleModal);
appointmentBtnMd.addEventListener('click',toggleModal);
closeBtn.addEventListener('click',toggleModal)
