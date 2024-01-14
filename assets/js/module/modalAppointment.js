const appointmentBtn = document.querySelectorAll('.appointment_btn');
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
const allSlot = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:30']
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let selectedDays = [];
let dateSelected = false; 
let selectedSlot = '';

function appointmentDaysName(){
    selectAppointmentDaysName.innerHTML = `${daysName.map(element=>{
        return `<li>${element}</li>`
    }).join("")}`
}
function monthName(){
    monthDiv.innerHTML = `${months.map((month, index)=>{
        return `<option value="${index}">${month}</option>`
    })}`
}
function yearShow(){
    document.querySelector('#year').innerHTML = `${years.map(element=>{
        return `<option value="${element}">${element}</option>`
    })}`
}

function slotShow(){
    document.querySelector('.slot').innerHTML = `${allSlot.map(element=>{
        return `<p class="slot-item">${element}</p>`
    }).join("")}`
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
        days += `<li class="${isToday}" value=${day}>${day}</li>`;
    }

    // nextMonth Day Show
    for(let nextMonthDay = lastDayMonth; nextMonthDay <6; nextMonthDay++){
        days += `<li class="next_date">${nextMonthDay - lastDayMonth+1}</li>`;
    }
    document.querySelector('.selected_date h5').innerText= new Date().toLocaleDateString();
    calendarDays.innerHTML=days;
}
monthName();
appointmentDaysName();
yearShow();
manipulate();
slotShow();
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
        monthDiv.value = month;
        document.querySelector('#year').value = year;
    })
});

document.querySelector('#month').addEventListener('change', function() {
    month = parseInt(this.value);
    manipulate();
    showLastSelectedDay();
});

document.querySelector('#year').addEventListener('change', function() {
    year = parseInt(this.value);
    manipulate();
});

document.querySelector('.slot').addEventListener('click', function(event) {
    // Check if a date is selected
    if (!dateSelected) {
        alert("Please select a date first.");
        return;
    }

    // Check if the clicked element is a slot item
    if (event.target.classList.contains('slot-item')) {
        selectedSlot = event.target.innerText;

        // Remove the 'active_date' class from all slots
        const allSlots = document.querySelectorAll('.slot-item');
        allSlots.forEach(slot => slot.classList.remove('selected_day'));

        // Add the 'active_date' class to the clicked slot
        event.target.classList.add('selected_day');

        updateSelectedSchedule();
    }
});

calendarDays.addEventListener("click", function(event) {
    const allDays = document.querySelectorAll('#days li');
    allDays.forEach(day => day.classList.remove('selected_day'));

    // Check if the clicked element is a day
    if (event.target.tagName === 'LI') {
        event.target.classList.add('selected_day');
        dateSelected = true; // Set the dateSelected variable to true
        selectedDays.push({
            date: event.target.value,
            month: month,
            year: year
        });
        showLastSelectedDay();
        updateSelectedSchedule();
    }
});

function updateSelectedSchedule() {
    if (dateSelected && selectedSlot !== '') {
        const lastSelectedDay = selectedDays[selectedDays.length - 1];
        const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date(lastSelectedDay.year, lastSelectedDay.month, lastSelectedDay.date).getDay()];

        const selectedScheduleText = `Your selected Time is - ${selectedSlot}, ${dayName}, ${months[lastSelectedDay.month]} ${lastSelectedDay.date}, ${lastSelectedDay.year}`;
        document.querySelector('.selected_schedule span').innerText = selectedScheduleText;
    }
}

function showLastSelectedDay() {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let lastSelectedDay = selectedDays[selectedDays.length - 1];
   
    const dayName = dayNames[new Date(lastSelectedDay.year, lastSelectedDay.month, lastSelectedDay.date).getDay()];
    document.querySelector('.calender_time_change p').innerText = `${dayName}, ${months[lastSelectedDay.month]} ${lastSelectedDay.year}`;
}

// Button Fire
appointmentBtn.forEach(apBtn=>{
    apBtn.addEventListener('click',toggleModal);
});

appointmentBtnSm.addEventListener('click',toggleModal);
appointmentBtnMd.addEventListener('click',toggleModal);
closeBtn.addEventListener('click',toggleModal)

