// Lista de usuários
const usuarios = [
    { user: "mimmarcelo", pass: "Teste123" },
    { user: "harry", pass: "123" },
    { user: "ron", pass: "123" },
    { user: "hermione", pass: "123" },
    { user: "draco", pass: "123" }
];

// Função de login
function login() {
    const user = document.getElementById("user").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!user || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    // Verificar se existe
    const valido = usuarios.find(u => u.user === user && u.pass === senha);

    if (valido) {
        // Salva usuário logado
        localStorage.setItem("username", user);

        // Redireciona pro chat
        window.location.href = "chat.html";
    } else {
        alert("Usuário ou senha inválidos!");
    }
}

// Login com enter
document.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        login();
    }
});

// Função do olho
function mostrarSenha() {

    let senha = document.getElementById("senha");

    if (senha.type === "password") {
        senha.type = "text";
    } else {
        senha.type = "password";
    }
} 