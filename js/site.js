//Seed event data
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

function buildDropDown() {
    //Build dropdown for specific cities

    //Reset menu
    let dropdownMenu = document.getElementById('eventDropdown');
    dropdownMenu.innerHTML = '';

    //Get Data for all events
    currentEvents = getEventData();

    //Create an array of unique cities
    let cityNames = currentEvents.map(event => event.city);
    let citySet = new Set(cityNames);
    let uniqueCityNames = [...citySet]; // ['San Diego', 'Charlotte', ...]

    //Get template for menu items
    const dropdownTemplate = document.getElementById('dropdownItemTemplate');
    let dropdownItemNode = document.importNode(dropdownTemplate.content, true);

    //Make Menu for all cities
    let dropdownItemLink = dropdownItemNode.querySelector("a");
    dropdownItemLink.innerText = 'All Cities';
    dropdownItemLink.setAttribute('data-string', 'All');
    dropdownMenu.appendChild(dropdownItemNode);

    //Make Menu for all individual cities
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

    //Display Stats and Event data for selected city(or all)
    displayEventData(currentEvents);
    displayStats(currentEvents);
    document.getElementById('location').innerText = "Stats for All Events";
}

function displayEventData(currentEvents) {
    //Display an array of events on page

    //Reset events table
    const eventTable = document.getElementById('eventsTableBody');
    eventTable.innerHTML = '';

    //Get template for table rows
    const template = document.getElementById('tableRowTemplate');

    //Format each event and add to table 
    for (let i = 0; i < currentEvents.length; i++) {
        const event = currentEvents[i];
        let tableRow = document.importNode(template.content, true);

        tableRow.querySelector('[data-id="event"]').textContent = event.event;
        tableRow.querySelector('[data-id="city"]').textContent = event.city;
        tableRow.querySelector('[data-id="state"]').textContent = event.state;
        tableRow.querySelector('[data-id="attendance"]').textContent = event.attendance.toLocaleString("en-US");
        tableRow.querySelector('[data-id="date"]').textContent = new Date(event.date).toLocaleDateString();

        tableRow.querySelector('tr').setAttribute('data-event', event.id);

        eventTable.appendChild(tableRow);
    };
}

function calculateStats(currentEvents) {
    //Takes an array of events and returns stats

    //Create stats variables
    let total = 0;
    let average = 0;
    let most = 0;
    let least = currentEvents[0].attendance;

    //Calculate total, most, and least
    for (let i = 0; i < currentEvents.length; i++) {
        let currentAttendance = currentEvents[i].attendance;

        total += currentAttendance;

        if (currentAttendance > most) {
            most = currentAttendance;
        };

        if (currentAttendance < least) {
            least = currentAttendance;
        };

    };

    //Calculate average
    average = total / currentEvents.length;
    average = Math.ceil(average);

    //Return stats as an object
    let stats = {
        total: total,
        average: average,
        most: most,
        least: least,
    };

    return stats;
}

function displayStats(currentEvents) {
    //Takes an array of events and displays them on page

    //Calculate stats
    let stats = calculateStats(currentEvents);

    //get stats from page
    let totalAttendance = document.getElementById('totalAttendance');
    let averageAttendance = document.getElementById('averageAttendance');
    let mostAttendance = document.getElementById('mostAttendance');
    let leastAttendance = document.getElementById('leastAttendance');

    //set elements to stats
    totalAttendance.textContent = stats.total.toLocaleString("en-US");
    averageAttendance.textContent = stats.average.toLocaleString("en-US");
    mostAttendance.textContent = stats.most.toLocaleString("en-US");
    leastAttendance.textContent = stats.least.toLocaleString("en-US");

}

function getEventData() {
    //Gets all current event data from local database

    let data = localStorage.getItem('nerdNookData');

    if (data == null) {

        let identifiedEvents = events.map(event => {
            event.id = generateId();
            return event;
        });

        localStorage.setItem('nerdNookData', JSON.stringify(identifiedEvents));
        data = localStorage.getItem('nerdNookData');
    };

    let currentEvents = JSON.parse(data);

    if (currentEvents.some(event => event.id == undefined)) {

        currentEvents.forEach(event => event.id = generateId());

        localStorage.setItem('nerdNookData', JSON.stringify(currentEvents));
    };

    return currentEvents;
}

function viewFilteredEvents(droppownItem) {
    //Takes a city name returns fltered events

    //Get city name from page
    let cityName = droppownItem.getAttribute('data-string');

    //get all my events
    let allEvents = getEventData();

    //Return all events if city name all is selected
    if (cityName == 'All') {
        displayStats(allEvents);
        displayEventData(allEvents);
        document.getElementById('location').innerText = 'All Events';

        return;
    };

    //filter those events to just the selected city
    let filteredEvents = allEvents.filter(event => event.city.toLowerCase() == cityName.toLowerCase());

    //display stats for those events
    displayStats(filteredEvents);

    //change the stats header
    document.getElementById('location').innerText = cityName;

    //display only those events in the table
    displayEventData(filteredEvents);
}

function saveNewEvent() {
    //Adds new event to local database

    //get the form input values
    let name = document.getElementById('newEventName').value;

    let city = document.getElementById('newEventCity').value;

    let attendance = parseInt(document.getElementById('newEventAttendance').value);

    let date = document.getElementById('newEventDate').value;
    date = new Date(date).toLocaleDateString();

    let stateSelect = document.getElementById('newEventState');
    let selectedIndex = stateSelect.selectedIndex;
    let state = stateSelect.options[selectedIndex].text;

    //create new event object
    let newEvent = {
        event: name,
        city: city,
        state: state,
        attendance: attendance,
        date: date,
        id: generateId(),
    };

    //add event to the array of the current events
    let events = getEventData();
    events.push(newEvent);

    //then, save the array with the new event
    localStorage.setItem('nerdNookData', JSON.stringify(events));

    buildDropDown();
}

function generateId() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function editEvent(eventRow) {
    let eventId = eventRow.getAttribute('data-event');

    let currentEvents = getEventData();

    let event = currentEvents.find(event => event.id == eventId);

    document.getElementById('editId').value = event.id;
    document.getElementById('editName').value = event.event;
    document.getElementById('editCity').value = event.city;
    document.getElementById('editAttendance').value = event.attendance;

    let eventDate = new Date(event.date);
    let eventDateString = eventDate.toISOString();
    let eventDateArray = eventDateString.split('T');
    let eventDateFormated = eventDateArray[0];
    document.getElementById('editDate').value = eventDateFormated;

    let eventStateSelect = document.getElementById('editState');
    let optionsArray = [...eventStateSelect.options];
    let index = optionsArray.findIndex(option => option.text == event.state);
    eventStateSelect.selectedIndex = index;

    // //for loop to find the options
    // for (let i = 0; i < eventStateSelect.length; i++) {
    //     let element = eventStateSelect[i];
        
    //     if (element.state == option.text) {
    //         eventStateSelect.selectedIndex = i;
    //     };
    // };
}

function deleteEvent() {
    let eventId = document.getElementById('editId').value;

    //get the events in local storage
    let currentEvents = getEventData();

    //filter out any event with id
    let filteredEvents = currentEvents.filter(event => event.id != eventId);

    //save that array to local storage
    localStorage.setItem('nerdNookData', JSON.stringify(filteredEvents));

    //Update stats and events tabel
    buildDropDown();
}

function updateEvent() {

    let name = document.getElementById('editName').value;

    let city = document.getElementById('editCity').value;

    let attendance = parseInt(document.getElementById('editAttendance').value);

    let date = document.getElementById('editDate').value;
    date = new Date(date).toLocaleDateString();

    let stateSelect = document.getElementById('editState');
    let selectedIndex = stateSelect.selectedIndex;
    let state = stateSelect.options[selectedIndex].text;

    let eventId = document.getElementById('editId').value;

    //create new event object
    let newEvent = {
        event: name,
        city: city,
        state: state,
        attendance: attendance,
        date: date,
        id: eventId,
    };

    //get my event array
    let currentEvents = getEventData();

    //find the location of the old event with this id
    let index = currentEvents.findIndex(event => event.id == eventId);

    //replace that event with newId
    currentEvents[index] = newEvent;

    //save it in local storage
    localStorage.setItem('nerdNookData', JSON.stringify(currentEvents));

    //Update stats & events table
    buildDropDown();
}