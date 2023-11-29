function add(name) {
    // Construct the URL with the provided name
    const url = `/add?item=${encodeURIComponent(name)}`;
    // Send a GET request to the endpoint
    fetch(url, {
        method: 'GET',
    })
    .then(response => {
        if (!response.ok) {
            // If server responds with a non-200 status, reject the promise
            return Promise.reject('Failed to add item');
        }
        update();
        return; // Assuming server responds with json
    })
    .then(data => {
        console.log('Item added successfully:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function update() {
var xhr = new XMLHttpRequest();

xhr.open('GET', '/list', true);
xhr.onreadystatechange = function() {
if (xhr.readyState == 4 && xhr.status == 200) {
    var data = JSON.parse(xhr.responseText);

    data.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

    var completedList = document.getElementById('completed-list');
    var notCompletedList = document.getElementById('not-completed-list');
    completedList.innerHTML = "";
    notCompletedList.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        console.log(data[i]._id);
        let label = document.createElement('label');
        label.textContent = data[i].item;

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = "circularCheckbox";
        let temp=data[i]._id;
        checkbox.onclick = function() {toggle(temp);};

        let deadline = document.createElement('input');
        deadline.type = 'date';
        deadline.id = 'deadline';
        deadline.onkeydown = function() {
            return false;
        };
        deadline.onchange = function() {updateDueDate(temp, deadline.value)}
        deadline.value = data[i].deadline;

        let img=document.createElement('img');
        img.src='/static/cage.png';
        img.alt='cage';
        img.className='cage'
        img.onclick = function() {remove(temp);};
        
        let listItem = document.createElement('li');
        
        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        listItem.appendChild(deadline);
        label.appendChild(img);
        
        // Create a horizontal line element
        let hr = document.createElement('hr');

        if (data[i].is_complete) {
            checkbox.checked = true;
            completedList.appendChild(listItem);
            completedList.appendChild(hr);  // Add the horizontal line
        } else {
            notCompletedList.appendChild(listItem);
            notCompletedList.appendChild(hr);  // Add the horizontal line
        }
    }
}
};
xhr.send();
}

function process() {
    let elem = document.getElementById('task_name');
    // let dueDateInput = document.getElementById('deadline'); // Assuming this is the ID of your due date input element
    // let dueDate = dueDateInput.value || new Date().toISOString().split('T')[0]; // Default to today's date if no date is selected
    add(elem.value);
    elem.value = "";
}

// New function to handle due date update
function updateDueDate(id, newDate) {
    // Construct the URL with the provided id and new date
    const url = `/updateDueDate/${id}?newDate=${encodeURIComponent(newDate)}`;

    fetch(url, {
        method: 'GET',
    })
    .then(response => {
        if (!response.ok) {
            return Promise.reject('Failed to update due date');
        }
        update(); // Refresh the list
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function toggle(id) {
    console.log(id);
    // Construct the URL with the provided id
    const url = `/toggle/${id}`;

    // Send a GET request to the endpoint
    fetch(url, {
        method: 'GET',
    })
    .then(response => {
        if (!response.ok) {
            // If server responds with a non-200 status, reject the promise
            return Promise.reject('Failed to toggle item');
        }
        update();
        return; // Assuming server responds with json
    })
    .then(data => {
        console.log('Item toggled successfully:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function remove(id) {
    console.log(id);
    // Construct the URL with the provided id
    const url = `/remove/${id}`;

    // Send a GET request to the endpoint
    fetch(url, {
        method: 'GET',
    })
    .then(response => {
        if (!response.ok) {
            // If server responds with a non-200 status, reject the promise
            return Promise.reject('Failed to toggle item');
        }
        update();
        return; // Assuming server responds with json
    })
    .then(data => {
        console.log('Item deleted successfully:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

