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
const monthDiv = document.querySelector('#month');
const calendarDays = document.querySelector('#days');
const preNextBtn = document.querySelectorAll('.pre_next span');
const nextBtn = document.querySelector('#next');
// Variable initialize
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October','November', 'December'];
const years = [2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032];
const daysName = ['sun', 'Mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

function appointmentDaysName(){
    selectAppointmentDaysName.innerHTML = `${daysName.map(element=>{
        return `<li>${element}</li>`
    }).join("")}`
}
function monthName(){
    monthDiv.innerHTML = `${months.map(month=>{
        return `<option value="${month}">${month}</option>`
    })}`
}
function yearShow(){
    document.querySelector('#year').innerHTML = `${years.map(element=>{
        return `<option value="${element}">${element}</option>`
    })}`
}

const manipulate = ()=> {
    // start to calendar in firstDay of the Month
    let firstDayMonth = new Date(year, month, 1).getDay();
    // Last Date of the Month
    let lastDateMonth = new Date(year, month+1, 0).getDate();
    // last day of the month
    let lastDayMonth = new Date(year, month, lastDateMonth).getDay(); 
    // last date of the previous month
    let prevMonthLastDate=new Date(year, month, 0).getDate();
    // my data store
    let days="";

    // previous Month Day Show
    for(let prevMonthDay = firstDayMonth; prevMonthDay >0; prevMonthDay-- ){
        days += `<li class="prev_date">${prevMonthLastDate-prevMonthDay+1}</li>`
    }
    // current MonthDay Show
    for(let day = 1; day <= lastDateMonth; day++){
        let isToday=day===date.getDate() && month===new Date().getMonth() && year===new Date().getFullYear() ? "active_date": "";
        days += `<li class="${isToday}">${day}</li>`;
    }

    // nextMonth Day Show
    for(let nextMonthDay = lastDayMonth; nextMonthDay <6; nextMonthDay++){
        days += `<li class="next_date">${nextMonthDay - lastDayMonth+1}</li>`;
    }

    calendarDays.innerHTML=days;
}
monthName();
appointmentDaysName();
yearShow();
manipulate();
preNextBtn.forEach(icons=>{
    icons.addEventListener('click',()=>{
        month=icons.id==="prev" ? month - 1 : month + 1;
        if(month < 0 || month > 11){
            date = new Date(year, month, date.getDate());
            // Set the year to the new year
            year=date.getFullYear();
            // Set the month to the new month
            month=date.getMonth();
        }else {
            // Set the date to the current date
            date=new Date();
        }

        manipulate();
    })
});


// Button Fire
appointmentBtn.addEventListener('click',toggleModal);
appointmentBtnSm.addEventListener('click',toggleModal);
appointmentBtnMd.addEventListener('click',toggleModal);
closeBtn.addEventListener('click',toggleModal)
