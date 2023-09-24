document.getElementById('create-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let id = document.getElementById('id').value;
    let language = document.getElementById('language').value;
    let framework = document.getElementById('framework').value;

    fetch('http://localhost:8080/servers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": name,
            "id": id,
            "language": language,
            "framework": framework
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('Server created successfully!');
        document.getElementById('create-form').reset();
        loadServerList();
    })
    .catch(error => console.error('Error:', error));
});

function loadServerList() {
    fetch('http://localhost:8080/servers')
    .then(response => response.json())
    .then(data => {
        let serverList = document.getElementById('server-list');
        serverList.innerHTML = '';

        data.forEach(server => {
            let li = document.createElement('li');
            li.textContent = `Name: ${server.name}, ID: ${server.id}, Language: ${server.language}, Framework: ${server.framework}`;

            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function() {
                deleteServer(server.id);
            });

            li.appendChild(deleteButton);
            serverList.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));
}

function deleteServer(id) {
    fetch(`http://localhost:8080/servers/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.status === 200) {
            alert('Server deleted successfully!');
            loadServerList();
        } else {
            alert('Error deleting server. Server not found.');
        }
    })
    .catch(error => console.error('Error:', error));
}

loadServerList();
