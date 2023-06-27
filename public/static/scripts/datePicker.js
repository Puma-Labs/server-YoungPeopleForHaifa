const datePickerForm = document.getElementById("datepickerForm");
const resetButton = document.getElementById("resetButton");
const datePickerInput = document.getElementById("datepicker");
const eventsContainer = document.getElementById("events-container");
const emptyCover = "/static/assets/images/preview-empty.png"

resetButton.addEventListener('click', () => {
    window.location.replace('/events')
})

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
  dateSelected: new URL(document.URL).searchParams.get("date") ? new Date(new URL(document.URL).searchParams.get("date")) : undefined,
  alwaysShow: true,
  customDays: ['В', 'П', 'В', 'С', 'Ч', 'П', 'С'],
  customMonths: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  overlayButton: 'Выбрать',
  overlayPlaceholder: 'Введите год',
});

document.getElementById('datepickerForm').addEventListener('submit', (event) => {
  event.preventDefault();

    const url = new URL(location.href);
    url.searchParams.set('date', new Date(selectedDate).toISOString());
    history.pushState(null, '', url);

    fetch(`/events/json?selectedDate=${selectedDate}`)
    .then(response => response.text())
    .then((section) => {
        eventsContainer.innerHTML = section
        initPagination()
    });
});

