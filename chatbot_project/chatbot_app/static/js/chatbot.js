function appendMessage(sender, message) {
    var messagesElement = document.getElementById('chatbot-messages');
    var isScrolledToBottom = messagesElement.scrollHeight - messagesElement.clientHeight <= messagesElement.scrollTop + 1;

    var messageElement = document.createElement('div');
    messageElement.innerHTML = '<strong>' + sender + ':</strong> ' + message;
    messagesElement.appendChild(messageElement);

    messageArray.push({ sender, message });

    if (isScrolledToBottom) {
        messagesElement.scrollTop = messagesElement.scrollHeight;
    }
}

var messageArray = [];

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function sendMessage(event) {
    event.preventDefault();
    var inputElement = document.getElementById('chatbot-input');
    var message = inputElement.value;

    console.log('User Message:', message);

    appendMessage('User', message);

    fetch('/chatbot/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': window.csrf_token,
        },
        body: 'message=' + encodeURIComponent(message),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    
    .then(data => {
        console.log('Response from server:', data);
        appendMessage('Chatbot', data.response);
        updateChatInterface();
    })
    .catch(error => {
        console.error('Error:', error);
    });

    inputElement.value = '';
}

function updateChatInterface() {
    var messagesElement = document.getElementById('chatbot-messages');
    messagesElement.innerHTML = '';

    for (let i = 0; i < messageArray.length; i++) {
        let message = messageArray[i];
        let newMessageElement = document.createElement('div');
        newMessageElement.innerHTML = '<strong>' + message.sender + ':</strong> ' + message.message;
        messagesElement.appendChild(newMessageElement);
    }

    messagesElement.scrollTop = messagesElement.scrollHeight;
}