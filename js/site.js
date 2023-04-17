var events = [{
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 240000,
    date: "06/01/2017",
},
{
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 250000,
    date: "06/01/2018",
},
{
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 257000,
    date: "06/01/2019",
},
{
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 130000,
    date: "06/01/2017",
},
{
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 140000,
    date: "06/01/2018",
},
{
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 150000,
    date: "06/01/2019",
},
{
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 40000,
    date: "06/01/2017",
},
{
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 45000,
    date: "06/01/2018",
},
{
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 50000,
    date: "06/01/2019",
},
];

//Build dropdown for specific cities
function buildDropDown() {
    let dropdownMenu = document.getElementById('eventDropdown');
    dropdownMenu.innerHTML = '';

    let currentEvents = events; // TODO - GET EVENTS FROM STORAGE

    let cityNames = currentEvents.map(event => event.city);
    let citySet = new Set(cityNames);
    let uniqueCityNames = [...citySet]; // ['San Diego', 'Charlotte', ...]

    const dropdownTemplate = document.getElementById('dropdownItemTemplate');

    //Copy template
    let dropdownItemNode = document.importNode(dropdownTemplate.content, true);

    //Make All Cities Menu
    let dropdownItemLink = dropdownItemNode.querySelector("a");
    dropdownItemLink.innerText = 'All Cities';
    dropdownItemLink.setAttribute('data-string', 'ALL');

    //Add to our page
    dropdownMenu.appendChild(dropdownItemNode);

    for (let i = 0; i < uniqueCityNames.length; i++) {

        //Copy template
        let dropdownItemNode = document.importNode(dropdownTemplate.content, true);

        //get the city name
        let cityName = uniqueCityNames[i];
        
        //Make City Menu
        let dropdownItemLink = dropdownItemNode.querySelector("a");
        dropdownItemLink.innerText = cityName;
        dropdownItemLink.setAttribute('data-string', cityName);

        //Add City Menu to Page
        dropdownMenu.appendChild(dropdownItemNode);
    };

    displayEventData(currentEvents);
};

function displayEventData(currentEvents) {

    const eventTable = document.getElementById('eventsTableBody');
    const template = document.getElementById('tableRowTemplate');

    eventTable.innerHTML = '';

    for (let i = 0; i < currentEvents.length; i++) {
        const event = currentEvents[i];
        let tableRow = document.importNode(template.content, true);

        tableRow.querySelector('[data-id="event"]').textContent = event.event;
        tableRow.querySelector('[data-id="city"]').textContent = event.city;
        tableRow.querySelector('[data-id="state"]').textContent = event.state;
        tableRow.querySelector('[data-id="attendance"]').textContent = event.attendance;
        tableRow.querySelector('[data-id="date"]').textContent = event.date;

        eventTable.appendChild(tableRow);
    };
}