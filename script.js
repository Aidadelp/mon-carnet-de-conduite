const CLE_STORAGE = "experiencesConduite";

document.addEventListener("DOMContentLoaded", function () {

    remplirSelect("idMeteo", listeMeteos, "idMeteo", "meteo");
    remplirSelect("idTrafic", listeTrafics, "idTrafic", "trafic");
    remplirSelect("idRoute", listeRoutes, "idRoute", "route");
    remplirSelect("idMoment", listeMoments, "idMoment", "moment");
    remplirSelect("idCompetence", listeCompetences, "idCompetence", "competence");
    remplirSelect("idDifficulte", listeDifficultes, "idDifficulte", "difficulte");

    const bouton = document.getElementById("btnEnregistrer");

    if (bouton) {
        bouton.addEventListener("click", enregistrerExperience);
        afficherBilan();
    }
});

function remplirSelect(idSelect, liste, proprieteId, proprieteTexte) {

    const select = document.getElementById(idSelect);

    if (!select) {
        return;
    }

    liste.forEach(function (element) {

        const option = document.createElement("option");

        option.value = element[proprieteId];
        option.textContent = element[proprieteTexte];

        select.appendChild(option);

    });
}

function lireExperiences() {

    const donnees = localStorage.getItem(CLE_STORAGE);

    if (donnees === null) {
        return [];
    }

    return JSON.parse(donnees);
}

function sauvegarderExperiences(experiences) {

    localStorage.setItem(
        CLE_STORAGE,
        JSON.stringify(experiences)
    );

}


function enregistrerExperience() {

    const form = document.getElementById("formConduite");

    if (!form.reportValidity()) {
        return;
    }

    const experiences = lireExperiences();

    let nouvelId = 1;

    if (experiences.length > 0) {
        nouvelId = Number(experiences[experiences.length - 1].idExperience) + 1;
    }

    const experience = {
        idExperience: String(nouvelId),
        dateExperience: document.getElementById("dateExperience").value,
        heureDepart: document.getElementById("heureDepart").value,
        heureArrivee: document.getElementById("heureArrivee").value,
        kilometres: document.getElementById("kilometres").value,
        idMeteo: document.getElementById("idMeteo").value,
        idTrafic: document.getElementById("idTrafic").value,
        idRoute: document.getElementById("idRoute").value,
        idMoment: document.getElementById("idMoment").value,
        idCompetence: document.getElementById("idCompetence").value,
        idDifficulte: document.getElementById("idDifficulte").value,
        commentaire: document.getElementById("commentaire").value
    };

    experiences.push(experience);
    sauvegarderExperiences(experiences);

    form.reset();
    afficherBilan();
}

function calculerDistanceTotale(experiences) {

    let total = 0;

    experiences.forEach(function (experience) {
        total = total + Number(experience.kilometres);
    });

    return total;
}

function afficherBilan() {

    const experiences = lireExperiences();
    const total = calculerDistanceTotale(experiences);

    const nombre = document.getElementById("nombreExperiences");
    const distance = document.getElementById("distanceTotale");

    if (nombre) {
        nombre.textContent = experiences.length;
    }

    if (distance) {
        distance.textContent = total.toFixed(1);
    }
}
document.addEventListener("DOMContentLoaded", function () {

    if (document.getElementById("tableExperiences")) {
        afficherDashboard();
    }

});

function afficherDashboard() {

    const experiences = lireExperiences();
    const total = calculerDistanceTotale(experiences);
    const moyenne = experiences.length > 0 ? total / experiences.length : 0;

    document.getElementById("dashNombre").textContent = experiences.length;
    document.getElementById("dashDistance").textContent = total.toFixed(1);
    document.getElementById("dashMoyenne").textContent = moyenne.toFixed(1);

    afficherTableau(experiences);
    afficherStatsMeteo(experiences);
    afficherStatsRoute(experiences);
    dessinerGraphique(experiences);
}

function chercherMeteo(id) {
    const element = listeMeteos.find(function (m) {
        return m.idMeteo === id;
    });

    return element ? element.meteo : "";
}

function chercherTrafic(id) {
    const element = listeTrafics.find(function (t) {
        return t.idTrafic === id;
    });

    return element ? element.trafic : "";
}

function chercherRoute(id) {
    const element = listeRoutes.find(function (r) {
        return r.idRoute === id;
    });

    return element ? element.route : "";
}

function afficherTableau(experiences) {

    const tbody = document.getElementById("tableExperiences");
    tbody.innerHTML = "";

    experiences.forEach(function (experience) {

        const ligne = document.createElement("tr");

        ligne.innerHTML =
            "<td>" + experience.idExperience + "</td>" +
            "<td>" + experience.dateExperience + "</td>" +
            "<td>" + experience.heureDepart + "</td>" +
            "<td>" + experience.heureArrivee + "</td>" +
            "<td>" + experience.kilometres + "</td>" +
            "<td>" + chercherMeteo(experience.idMeteo) + "</td>" +
            "<td>" + chercherTrafic(experience.idTrafic) + "</td>" +
            "<td>" + chercherRoute(experience.idRoute) + "</td>";

        tbody.appendChild(ligne);
    });
}

function afficherStatsMeteo(experiences) {

    const zone = document.getElementById("statsMeteo");
    zone.innerHTML = "";

    listeMeteos.forEach(function (meteo) {

        const nombre = experiences.filter(function (experience) {
            return experience.idMeteo === meteo.idMeteo;
        }).length;

        zone.innerHTML += "<p><strong>" + meteo.meteo + "</strong> : " + nombre + "</p>";
    });
}

function afficherStatsRoute(experiences) {

    const zone = document.getElementById("statsRoute");
    zone.innerHTML = "";

    listeRoutes.forEach(function (route) {

        const nombre = experiences.filter(function (experience) {
            return experience.idRoute === route.idRoute;
        }).length;

        zone.innerHTML += "<p><strong>" + route.route + "</strong> : " + nombre + "</p>";
    });
}

function dessinerGraphique(experiences) {

    const canvas = document.getElementById("graphDistance");

    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#fff5fb";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#221122";
    ctx.beginPath();
    ctx.moveTo(60, 300);
    ctx.lineTo(850, 300);
    ctx.moveTo(60, 40);
    ctx.lineTo(60, 300);
    ctx.stroke();

    if (experiences.length === 0) {
        ctx.fillStyle = "#221122";
        ctx.font = "20px Arial";
        ctx.fillText("Aucune expérience enregistrée", 300, 170);
        return;
    }

    const valeurs = experiences.map(function (experience) {
        return Number(experience.kilometres);
    });

    const maximum = Math.max(...valeurs);

    experiences.forEach(function (experience, index) {

        const valeur = Number(experience.kilometres);
        const hauteur = (valeur / maximum) * 220;
        const x = 90 + index * 80;
        const y = 300 - hauteur;

        ctx.fillStyle = "#ff4fa3";
        ctx.fillRect(x, y, 45, hauteur);

        ctx.fillStyle = "#221122";
        ctx.font = "14px Arial";
        ctx.fillText(valeur + " km", x - 5, y - 8);
        ctx.fillText("ID " + experience.idExperience, x + 5, 325);
    });
}
