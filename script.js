// costruiamo le varibili principali
const url = "https://jsonplaceholder.typicode.com/users";
const filterInput = document.getElementById(`filterInput`); // ciò che inseriamo nell'imput
const userTable = document.getElementById(`userTable`) // la tabella che popoleremo
const filterSelect = document.getElementById(`filterSelect`) // la selezione "nome, cognome e email"

// Funzione ascincreona per recuperare gli utenti
async function fetchUser () {
    const response = await fetch(url);
    const users = await response.json();
    return users; 
}

// Gestione delle informazioni in output (popolazione tabella)
function renderUsers(users) {
    // Pulisco tutto
    userTable.innerHTML=``;
    users.forEach(user => {
        // creo l'elemento tr per la tabella
        const row = document.createElement(`tr`);
        row.innerHTML=`
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.email.toLowerCase()}</td>
        `;
        userTable.appendChild(row);
    });
};

fetchUser().then((users) => {
    renderUsers(users);
    filterInput.addEventListener(`input`, () => {
        const searchText = filterInput.value;
        const selectValue = filterSelect.value;
        const filteredUsers = users.filter((user) => {
            const output = user[selectValue].toLowerCase().includes(searchText.toLowerCase());
            return output;
        });
        renderUsers(filteredUsers);
    });
});