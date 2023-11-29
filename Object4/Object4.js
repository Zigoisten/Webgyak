let heroes = [
    { firstName: "Ahsoka", lastName: "Tano", job: "padawan" },
    { firstName: "Boba", lastName: "Fett", job: "fejvadász" },
    { firstName: "Han", lastName: "Solo", job: "csempész" },
    { firstName: "Leia", lastName: "Organa", job: "szenátor" }
];

heroes.push(
    { firstName: "Luke", lastName: "Skywalker", job: "jedi" },
    { firstName: "Darth", lastName: "Vader", job: "sith lord" }
);

function renderHeroes() {
    const heroesContainer = document.getElementById('heroes-container');
    heroesContainer.innerHTML = '';

    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'card-container';

    heroes.forEach(hero => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${hero.firstName} ${hero.lastName}</h3>
            <p>Job: ${hero.job}</p>
        `;
        cardsContainer.appendChild(card);
    });

    const tableContainer = document.createElement('div');
    tableContainer.className = 'table-container';

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Job</th>
            </tr>
        </thead>
        <tbody>
            ${heroes.map(hero => `
                <tr>
                    <td>${hero.firstName}</td>
                    <td>${hero.lastName}</td>
                    <td>${hero.job}</td>
                </tr>
            `).join('')}
        </tbody>
    `;

    tableContainer.appendChild(table);

    heroesContainer.appendChild(cardsContainer);
    heroesContainer.appendChild(tableContainer);
}

renderHeroes();
