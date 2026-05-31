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
