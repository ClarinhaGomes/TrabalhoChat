let username = localStorage.getItem("username");

// Se não estiver logado,
// volta para a tela de login
if (!username) {
    window.location.href = "login.html";

}

document.getElementById("profileName").innerText = username;

let currentChat = "chat1";

const chats = {
    chat1: [
        {
            text: "Bem-vindo à Sala Precisa!",
            user: "Sistema",
            sent: false
        },
        {
            text: "Aqui você pode usar feitiços como 'lumos' e 'nox'.",
            user: "Sistema",
            sent: false
        },
        {
            text: "Como funciona: digite mensagens no campo abaixo e interaja com o bot mágico.",
            user: "Sistema",
            sent: false
        },
        {
            text: "Dica: tente digitar 'oi' para começar.",
            user: "Sistema",
            sent: false
        }
    ],

    chat2: [
        {
            text: "Bem-vindo ao Manual do Bruxo!",
            user: "Sistema",
            sent: false
        },
        {
            text: "Aqui você aprende feitiços e curiosidades mágicas.",
            user: "Sistema",
            sent: false
        },
        {
            text: "Como funciona: digite 'c2' e 'c3' para desbloquear curiosidades mágicas.",
            user: "Sistema",
            sent: false
        },
        {
            text: "Curiosidade 1: 'Lumos' vem de 'lumen', que significa luz.",
            user: "Dumbledore",
            sent: false
        },
        {
            text: "Digite 'c2' para continuar aprendendo.",
            user: "Sistema",
            sent: false
        }
    ]
};

// Enter 
const input = document.getElementById("input");

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

// Função responsável por mostrar/renderizar
// todas as mensagens na tela do chat
function renderMessages() {
    const container = document.getElementById("chatMessages");
    container.innerHTML = "";

    chats[currentChat].forEach(msg => {
        const div = document.createElement("div");
        div.classList.add("message", msg.sent ? "sent" : "received");

        const sender = document.createElement("div");
        sender.classList.add("sender");
        sender.innerText = msg.user;

        const text = document.createElement("div");
        text.innerText = msg.text;

        div.appendChild(sender);
        div.appendChild(text);

        container.appendChild(div);
    });

    container.scrollTop = container.scrollHeight;
}

// Trocar Chat
function selectChat(chatId, element) {
    currentChat = chatId;

    document.querySelectorAll(".chat-item")
        .forEach(el => el.classList.remove("active"));

    element.classList.add("active");

    document.getElementById("chatTitle").innerText = element.innerText;

    renderMessages();
}

// Adicionar mensagem 
function addMessage(text, user, sent = true) {
    chats[currentChat].push({ text, user, sent });
    renderMessages();
}

// BOT
function botResponse(msg) {
    msg = msg.toLowerCase();

    if (currentChat === "chat1") {
        if (msg.includes("oi") || msg.includes("hello")) {
            return `Bem-vindo à Sala Precisa, ${username}!`;
        }
        if (msg.includes("lumos")) return "Luz ativada!";
        if (msg.includes("nox")) return "Escuridão...";
         if (msg.includes("avada kedavra")) return "Morreu...";
    }

    if (currentChat === "chat2") {

        if (msg.includes("oi") || msg.includes("hello")) {
            return "Olá, aprendiz! Aqui é o Manual do Bruxo.";
        }

        if (msg.includes("patronus")) {
            return "O Patronus afasta dementadores!";
        }

        if (msg.includes("c2")) {
            return "Curiosidade 2: 'Nox' apaga a luz do Lumos.";
        }

        if (msg.includes("c3")) {
            return "Curiosidade 3: Expelliarmus é muito usado em duelos.";
        }

        return "Digite 'c2' ou 'c3' para continuar aprendendo magia.";
    }

    return "Magia desconhecida...";
}

// Enviar
function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, username, true);
    input.value = "";

    setTimeout(() => {
        addMessage(botResponse(text), "Dumbledore", false);
    }, 500);
}

// Auto Iniciar
document.addEventListener("DOMContentLoaded", () => {
    const firstChat = document.querySelector(".chat-item");

    if (firstChat) {
        firstChat.click();
    } else {
        renderMessages();
    }
});

function logout() {

    localStorage.removeItem("username");

    window.location.href = "login.html";
}