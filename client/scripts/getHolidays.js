function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

//for option value month
const Months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
for (let i = 0; i < Months.length; i++) {
    $('#monthSelect').append(`<option value="${i + 1}">${Months[i]}</option > `)
}
//for option value year
let thisYear = new Date().getFullYear()
for (let i = 0; i < 2; i++) {
    $('#yearSelect').append(`<option value="${thisYear + i}">${thisYear + i}</option > `)
}

function getHolidays() {
    const month = $("#monthSelect").val()
    const year = $("#yearSelect").val()
    return $.ajax({
        method: "POST",
        url: "http://localhost:3000/holidays",
        data: { month, year }
    })
}

//submit add todo
$("#formHolidays").submit(function (e) {
    e.preventDefault();
    getHolidays()
        .done(response => {
            $('#inputHolidays').empty();
            $('#captionHolidays').empty();
            $('#captionHolidays').prepend(`Found: ${response.holidays.length} Holidays`)
            let i = 1
            response.holidays.forEach(holiday => {
                if (formatDate(holiday.date.iso) < formatDate(new Date())) {
                    $('#inputHolidays').append(`<tr>
                    <th scope="row">${i}</th>
                    <td>${holiday.name}</td>
                    <td>${holiday.description}</td>
                    <td>${formatDate(holiday.date.iso)}</td>
                    <td><button class="btn btn-danger" disabled>Invalid Date</button></td>
                </tr>`)
                } else {
                    $('#inputHolidays').append(`<tr>
                    <th scope="row">${i}</th>
                    <td>${holiday.name}</td>
                    <td>${holiday.description}</td>
                    <td>${formatDate(holiday.date.iso)}</td>
                    <td><button class="btn btn-info" onclick="showAddTodoByDate('${formatDate(holiday.date.iso)}')">Create TODO</button></td>
                </tr>`)
                }
                i++
            })
        })
        .fail(err => {
            console.log(err)
        })
})