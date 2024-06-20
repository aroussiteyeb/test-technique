const apiUrl = 'http://localhost:3000/api';
const ws = new WebSocket('ws://localhost:3000');

document.addEventListener('DOMContentLoaded', () => {
  loadParties();
  loadChatMessages();

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'partie-update') {
      loadParties();
    } else if (data.type === 'chat-message') {
      console.log(data)
      displayMessage(data.message.message);
    }
  };
});

function loadParties() {
  fetch(`${apiUrl}/parties`)
    .then(response => response.json())
    .then(parties => {
      const partieList = document.getElementById('partie-list');
      partieList.innerHTML = '';
      let unfinishedCount = 0;

      parties.forEach(partie => {
        const div = document.createElement('div');
        div.className = 'list-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = partie.status === 'finished';
        checkbox.disabled = partie.status === 'finished';
        checkbox.onchange = () => finishPartie(partie.id);

        const span = document.createElement('span');
        span.textContent = partie.name;
        if (partie.status === 'finished') {
          span.style.color = 'gray'; // Change color if the partie is finished
        }

        const deleteButton = document.createElement('span');
        deleteButton.className = 'delete';
        deleteButton.textContent = '×';
        deleteButton.onclick = () => deletePartie(partie.id);

        div.appendChild(checkbox);
        div.appendChild(span);
        div.appendChild(deleteButton);

        partieList.appendChild(div);

        if (partie.status !== 'finished') {
          unfinishedCount++;
        }
      });

      document.getElementById('unfinished-count').textContent = `Parties non terminées : ${unfinishedCount}`;
    });
}


function createPartie() {
  const partieName = document.getElementById('partie-name').value;
  fetch(`${apiUrl}/parties`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: partieName })
  }).then(() => {
    document.getElementById('partie-name').value = '';
    loadParties();
  });
}

function deletePartie(id) {
  fetch(`${apiUrl}/parties/${id}`, { method: 'DELETE' }).then(() => {
    loadParties();
  });
}

function finishPartie(id) {
  fetch(`${apiUrl}/parties/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'finished' })
  }).then(() => {
    loadParties();
  });
}

function loadChatMessages() {
  fetch(`${apiUrl}/chat`)
    .then(response => response.json())
    .then(messages => {
      const chatMessages = document.getElementById('chat-messages');
      chatMessages.innerHTML = '';
      messages.forEach(message => displayMessage(message));
    });
}

function sendMessage() {
  const chatInput = document.getElementById('chat-input').value;
  const nickname = document.getElementById('nickname').value;
  fetch(`${apiUrl}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nickname, message: chatInput })
  }).then(() => {
    document.getElementById('chat-input').value = '';
  });
}

function displayMessage({ nickname, message }) {
  const chatMessages = document.getElementById('chat-messages');
  const p = document.createElement('p');
  p.innerHTML = `<strong>${nickname}:</strong> ${message}`;
  chatMessages.appendChild(p);
}
