let person;
let experiences;
let formations;
let competences = [];
$(function () {
    // Charger les données
    $.getJSON("ajax/id.json", { format: "json" }).done(function (msg) {
     person = msg;
     $("blocName h3").text($("blocName h3").text().replace("{lastname}",person.lastname))
    });
    $.getJSON("ajax/experiences.json", { format: "json" }).done(function (msg) {
        experiences = msg;
        // Affiche Experiences et Compétences
        let ajout;
        for (let cpt = 0; cpt < experiences.length; cpt++) {
            ajout = "<div>";
            ajout += experiences[cpt].mission;
            ajout += "</div>";
            $("#blocExperience > div").prepend(ajout);
        }
    });
    $.getJSON("ajax/formations.json", { format: "json" }).done(function (msg) {
        formations = msg;
    });

    // Rendre la page fonctionnelle
    $("body").accordion({
        header: "h3",
        active : 1
    });

});


