let person
let experiences
let formations
$(function () {
    // Charger les données
    $.getJSON("ajax/id.json", { format: "json" }).done(function (msg) {
     person = JSON.parse(msg);
    });
    $.getJSON("ajax/experiences.json", { format: "json" }).done(function (msg) {
        experiences = JSON.parse(msg);
    });
    $.getJSON("ajax/formations.json", { format: "json" }).done(function (msg) {
        formations = JSON.parse(msg);
    });

    // Rendre la page fonctionnelle
    $("body").accordion({
        header: "h3",
        active : 1
    });

});

