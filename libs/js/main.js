let person;
let experiences;
let formations;
let competences = [];
let personLoaded = false;
let experiencesLoaded = false;
let formationsLoaded = false;

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function functionalPage() {
    // Rendre la page fonctionnelle
    $("body").accordion({
        header: "h3",
        active: 1,
        heightStyle: "content"
    });
    $("#blocExperience > div").accordion({
        header: "h4",
        active: 0,
        heightStyle: "content"
    });
}

function decodeTools(data) {
    let toolsByCategories = {};
    return decodeToolsWith(data, toolsByCategories);
}

function decodeToolsWith(data, toolsByCategories) {
    let tools = data.split(",");
    for (let cpt = 0; cpt < tools.length; cpt++) {
        let toolsSplit = tools[cpt].split("/");
        if (toolsByCategories[toolsSplit[0]] == undefined) {
            toolsByCategories[toolsSplit[0]] = [];
        }
        if (toolsByCategories[toolsSplit[0]].indexOf(toolsSplit[1]) == -1) {
            toolsByCategories[toolsSplit[0]].push(toolsSplit[1]);
        }
    }
    return toolsByCategories;
}

$(function () {
    // Charger les données
    $.getJSON("ajax/id.json", {format: "json"}).done(function (msg) {
        person = msg;
        let enteteName = $("#blocName > h3")[0];
        enteteName.innerHTML = enteteName.innerHTML.replace("{lastname}", person.lastname);
        enteteName.innerHTML = enteteName.innerHTML.replace("{firstname}", person.firstname);
        let blocName = $("#blocName > div")[0];
        $.each(person, function (key, val) {
            blocName.innerHTML = blocName.innerHTML.replaceAll("{" + key + "}", val);
        });

        if (experiencesLoaded && formationsLoaded) {
            functionalPage();
        }
        personLoaded = true;
    });
    $.get("template/experiences/experience.html").done(function (msg) {
        let templateExperience = msg;
        $.getJSON("ajax/experiences.json", {format: "json"}).done(function (msg) {
            experiences = msg;
            // Affiche Experiences et Compétences
            let ajout;
            let blocExperiences = $("#blocExperience > div")[0];

            blocExperiences.innerHTML = "";
            let outilsGlobal = {}
            for (let cpt = 0; cpt < experiences.length; cpt++) {
                ajout = templateExperience;
                $.each(experiences[cpt], function (key, val) {
                    ajout = ajout.replaceAll("{" + key + "}", val);
                });
                let templateTool = '<span class="repeatTools">{key} : {val}</span>';
                let listTools = '';
                let outils = decodeTools(experiences[cpt].tools);
                outilsGlobal = decodeToolsWith(experiences[cpt].tools,outilsGlobal);
                $.each(outils, function (key, category) {
                    let ajout2 = templateTool;
                    ajout2 = ajout2.replace("{key}", key);
                    ajout2 = ajout2.replace("{val}", category.join(", "));

                    listTools+="<br><span>&nbsp - </span>" + ajout2;
                })
                ajout = ajout.replace(templateTool,listTools);
                blocExperiences.innerHTML = ajout + blocExperiences.innerHTML;
            }
            let templateTool = '<span class="repeatTools">{key} : {val}</span>';
            let listTools = '';
            let blocCompetences = $("#blocCompetence > div")[0];
            $.each(outilsGlobal, function (key, category) {
                let ajout = templateTool;
                ajout = ajout.replace("{key}", key);
                ajout = ajout.replace("{val}", category.join(", "));

                listTools+="<br><span>&nbsp - </span>" + ajout;
            })
            blocCompetences.innerHTML = blocCompetences.innerHTML.replace(templateTool,listTools);
            if (personLoaded && formationsLoaded) {
                functionalPage();
            }
            experiencesLoaded = true;
        });
    });
    $.getJSON("ajax/formations.json", {format: "json"}).done(function (msg) {
        formations = msg;
        let ajout;
        let blocFormations = $("#blocFormation > div")[0];
        let templateFormation = $("#blocFormation #formation")[0].innerHTML;
        blocFormations.innerHTML = "";
        for (let cpt = 0; cpt < formations.length; cpt++) {
            ajout = templateFormation;
            $.each(formations[cpt], function (key, val) {
                ajout = ajout.replaceAll("{" + key + "}", val);
            });
            blocFormations.innerHTML = ajout + blocFormations.innerHTML;
        }


        if (experiencesLoaded && personLoaded) {
            functionalPage();
        }
        formationsLoaded = true;
    });


});


