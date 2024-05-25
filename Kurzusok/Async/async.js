const kurzusokUrl = "https://vvri.pythonanywhere.com/api/courses";
const diakokUrl = "https://vvri.pythonanywhere.com/api/students"; 
const modal = document.getElementById("adatModal");
const modalCim = document.getElementById("modalCim");
const modalAdatok = document.getElementById("modalAdatok");
const modalForm = document.getElementById("modalForm");
const modalIdInput = document.getElementById("modalId");
const closeBtn = document.querySelector(".close");

closeBtn.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

async function betöltKurzusok() {
  try {
    const response = await fetch(kurzusokUrl);
    const data = await response.json();

    const kurzusokLista = document.getElementById("kurzusok-lista");
    kurzusokLista.innerHTML = "";

    data.forEach(kurzus => {
      const kurzusElem = document.createElement("div");
      kurzusElem.classList.add("kurzus-elem");
      const torlesGomb = document.createElement("button");
      torlesGomb.textContent = "Törlés";
      torlesGomb.addEventListener("click", () => torolKurzus(kurzus.id));
      kurzusElem.innerHTML = `
        <h3>${kurzus.name}</h3>
        <p>${kurzus.description}</p>
        <button onclick="megjelenitKurzus(${kurzus.id})">Részletek</button>
      `;
      kurzusElem.appendChild(torlesGomb); 
      kurzusokLista.appendChild(kurzusElem);
    });
  } catch (error) {
    console.error("Hiba a kurzusok betöltése során:", error);
  }
}

async function megjelenitKurzus(kurzusId) {
  try {
    const url = `${kurzusokUrl}/${kurzusId}`;
    const response = await fetch(url);
    const data = await response.json();

    modalCim.textContent = data.name;
    modalAdatok.textContent = data.description;
    modalIdInput.value = data.id;
    modalForm.setAttribute("data-type", "kurzus"); 
    modal.style.display = "block"; 

    console.log(data);
  } catch (error) {
    console.error("Hiba a kurzus betöltése során:", error);
  }
}

async function torolKurzus(kurzusId) {
    if (!confirm("Biztosan törölni szeretnéd ezt a kurzust?")) {
      return;
    }
  
    try {
      const url = `${kurzusokUrl}/${kurzusId}`;
      const response = await fetch(url, {
        method: "DELETE"
      });
  
      if (response.ok) {
        alert("Kurzus sikeresen törölve!");
        betöltKurzusok();
      } else {
        alert("Hiba történt a kurzus törlése során.");
      }
    } catch (error) {
      console.error("Hiba a kurzus törlése során:", error);
    }
  }

const ujKurzusForma = document.getElementById("uj-kurzus-forma");
ujKurzusForma.addEventListener("submit", async (event) => {
  event.preventDefault();
  const nev = document.getElementById("nev").value;
  const leiras = document.getElementById("leiras").value;

  try {
    const data = { name: nev, description: leiras };
    const response = await fetch(kurzusokUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert("Kurzus sikeresen létrehozva!");
      betöltKurzusok();
    } else {
      alert("Hiba történt a kurzus létrehozása során.");
    }
  } catch (error) {
    console.error("Hiba a kurzus létrehozása során:", error);
  }
});

async function betöltDiakok() {
  try {
    const response = await fetch(diakokUrl);
    const data = await response.json();

    const diakokLista = document.getElementById("diakok-lista");
    diakokLista.innerHTML = "";

    data.forEach(diak => {
      const diakElem = document.createElement("div");
      diakElem.classList.add("diak-elem");
      diakElem.innerHTML = `
        <h3>${diak.name}</h3>
        <p>${diak.email}</p>
        <button onclick="megjelenitDiak(${diak.id})">Részletek</button>
      `;
      const torlesGomb = document.createElement("button");
        torlesGomb.textContent = "Törlés";
        torlesGomb.addEventListener("click", () => torolDiak(diak.id));
        diakElem.appendChild(torlesGomb);
      diakokLista.appendChild(diakElem);
    });
  } catch (error) {
    console.error("Hiba a diákok betöltése során:", error);
  }
}

async function megjelenitDiak(diakId) {
  try {
    const url = `${diakokUrl}/${diakId}`;
    const response = await fetch(url);
    const data = await response.json();

    modalCim.textContent = data.name;
    modalAdatok.textContent = data.description;
    modalIdInput.value = data.id;
    modalForm.setAttribute("data-type", "diak");
    modal.style.display = "block"; 

    console.log(data);
  } catch (error) {
    console.error("Hiba a diák betöltése során:", error);
  }
}

async function torolDiak(diakId) {
    if (!confirm("Biztosan törölni szeretnéd ezt a diákot?")) {
      return;
    }
  
    try {
      const url = `${diakokUrlk}/${diakId}`;
      const response = await fetch(url, {
        method: "DELETE"
      });
  
      if (response.ok) {
        alert("Diák sikeresen törölve!");
        betöltDiakok();
      } else {
        alert("Hiba történt a diák törlése során.");
      }
    } catch (error) {
      console.error("Hiba a diák törlése során:", error);
    }
  }

const hozzarendelForma = document.getElementById("hozzarendel-forma");
hozzarendelForma.addEventListener("submit", async (event) => {
  event.preventDefault();
  const kurzusId = document.getElementById("kurzus").value;
  const diakId = document.getElementById("diak").value;
  
  try {
    const response = await fetch(`${kurzusokUrl}/${kurzusId}/students/${diakId}`, {
    method: "POST"
    });
  } catch (error) {
    console.error("Hiba a hozzárendelés során:", error);
  }
}); 

const ujDiakForma = document.getElementById("uj-diak-forma");
ujDiakForma.addEventListener("submit", async (event) => {
  event.preventDefault();
  const nev = document.getElementById("nev").value;
  const email = document.getElementById("email").value;

  try {
    const data = { name: nev, email: email };
    const response = await fetch(diakokUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert("Diák sikeresen létrehozva!");
      betöltDiakok();
    } else {
      alert("Hiba történt a diák létrehozása során.");
    }
  } catch (error) {
    console.error("Hiba a diák létrehozása során:", error);
  }
});

betöltKurzusok();
betöltDiakok();