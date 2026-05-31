const listeMeteos = [
    {"idMeteo":"1","meteo":"Soleil"},
    {"idMeteo":"2","meteo":"Nuageux"},
    {"idMeteo":"3","meteo":"Pluie"},
    {"idMeteo":"4","meteo":"Forte pluie"},
    {"idMeteo":"5","meteo":"Brouillard"},
    {"idMeteo":"6","meteo":"Neige"}
];

const listeTrafics = [
    {"idTrafic":"1","trafic":"Faible"},
    {"idTrafic":"2","trafic":"Moyen"},
    {"idTrafic":"3","trafic":"Dense"},
    {"idTrafic":"4","trafic":"Embouteillage"}
];

const listeRoutes = [
    {"idRoute":"1","route":"Ville"},
    {"idRoute":"2","route":"Route départementale"},
    {"idRoute":"3","route":"Autoroute"},
    {"idRoute":"4","route":"Campagne"},
    {"idRoute":"5","route":"Parking et manœuvres"}
];

const listeMoments = [
    {"idMoment":"1","moment":"Matin"},
    {"idMoment":"2","moment":"Après-midi"},
    {"idMoment":"3","moment":"Soir"},
    {"idMoment":"4","moment":"Nuit"}
];

const listeCompetences = [
    {"idCompetence":"1","competence":"Démarrage et arrêt"},
    {"idCompetence":"2","competence":"Changement de voie"},
    {"idCompetence":"3","competence":"Rond-point"},
    {"idCompetence":"4","competence":"Stationnement"},
    {"idCompetence":"5","competence":"Insertion sur autoroute"},
    {"idCompetence":"6","competence":"Anticipation des dangers"}
];

const listeDifficultes = [
    {"idDifficulte":"1","difficulte":"Très facile"},
    {"idDifficulte":"2","difficulte":"Facile"},
    {"idDifficulte":"3","difficulte":"Moyenne"},
    {"idDifficulte":"4","difficulte":"Difficile"},
    {"idDifficulte":"5","difficulte":"Très difficile"}
];

const listeExperiencesExemple = [
    {
        "idExperience":"1",
        "dateExperience":"2026-05-20",
        "heureDepart":"14:00",
        "heureArrivee":"15:10",
        "kilometres":"22.5",
        "idMeteo":"1",
        "idTrafic":"2",
        "idRoute":"1",
        "idMoment":"2",
        "idCompetence":"3",
        "idDifficulte":"3",
        "commentaire":"Travail des ronds-points en ville."
    },
    {
        "idExperience":"2",
        "dateExperience":"2026-05-23",
        "heureDepart":"18:30",
        "heureArrivee":"19:20",
        "kilometres":"16",
        "idMeteo":"3",
        "idTrafic":"3",
        "idRoute":"2",
        "idMoment":"3",
        "idCompetence":"6",
        "idDifficulte":"4",
        "commentaire":"Conduite sous la pluie avec trafic dense."
    },
    {
        "idExperience":"3",
        "dateExperience":"2026-05-26",
        "heureDepart":"10:15",
        "heureArrivee":"11:45",
        "kilometres":"35",
        "idMeteo":"2",
        "idTrafic":"1",
        "idRoute":"3",
        "idMoment":"1",
        "idCompetence":"5",
        "idDifficulte":"3",
        "commentaire":"Insertion et sortie d'autoroute."
    }
];

console.log(listeExperiencesExemple);
console.log(listeMeteos);
console.log(listeTrafics);
console.log(listeRoutes);
console.log(listeMoments);
console.log(listeCompetences);
console.log(listeDifficultes);
