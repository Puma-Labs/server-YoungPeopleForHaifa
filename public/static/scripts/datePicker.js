const datePickerForm = document.getElementById("datepickerForm");
const datePickerInput = document.getElementById("datepicker");
const eventsContainer = document.getElementById("allEvents-container");
const emptyCover = "/static/assets/images/preview-empty.png"

let selectedDate;

const datePicker = datepicker("#datepicker", {
  onSelect: (instance, date) => {
    selectedDate = date;
    console.log(selectedDate);
  },
    formatter: (input, date, instance) => {
    const value = date.toLocaleDateString()
    input.value = value
  },
  // alwaysShow: true,
  customDays: ['В', 'П', 'В', 'С', 'Ч', 'П', 'С'],
  customMonths: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  overlayButton: 'Выбрать',
  overlayPlaceholder: 'Введите год',
});

document.getElementById('datepickerForm').addEventListener('submit', (event) => {
  event.preventDefault();

  fetch(`/events?date=${selectedDate}`)
    .then(response => response.json())
    .then(data => {
      eventsContainer.innerHTML = '';

      data.forEach(event => {
        const eventElement = document.createElement("a");
        eventElement.href = "/events/" + event.id;
        eventElement.innerHTML = `
          <div class="event">
            <button class="options-menu _icon-ico-menu"></button>
            <div class="img-container ${(!event.cover) ? 'empty' : ''}">
              <img src="${event.cover || emptyCover}" alt=""/>
            </div>
            <h4 class="event-title">${event.title}</h4>
            <div class="event-info">
              ${moment(event.date).format("DD.MM.YYYY")} - ${moment(event.time).format("hh:mm")} - ${event.place}
            </div>
          </div>
        `;
        eventsContainer.appendChild(eventElement);
      });
    });
});

