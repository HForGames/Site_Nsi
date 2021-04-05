// variable pour ajouter des nouveaux pdf

const config = [
    {
        Titre_Chap: "Réussir l'épreuve pratique",
        Table_Des_Matière: false,
        Sous_Chapitre: [
            { Titre: "Les algorithmes de recherches séquentielles", Type: "pdf", Href: "File/nsi_t_rech_o.pdf" },
            { Titre: "Le tri selection", Type: "pdf", Href: "File/nsi_t_tri_s.pdf" },
            { Titre: "Le tri insertion", Type: "pdf", Href: "File/nsi_t_tri_i.pdf" },
            { Titre: "La recherche dichotomique", Type: "pdf", Href: "File/nsi_t_rech_d.pdf" },
            { Titre: "Le tri fusion", Type: "pdf", Href: "File/nsi_t_tri_f.pdf" },
            { Titre: "KNN", Type: "pdf", Href: "File/nsi_t_ep_knn.pdf" }
        ]
    },
    {
        Titre_Chap: "Les projets",
        Table_Des_Matière: false,
        Sous_Chapitre: [
            { Titre: "Créer un annuaire téléphonique en utilisant une base de données", Type: "pdf", Href: null },
            { Titre: "Créer un jeu de morpion", Type: "pdf", Href: "File/projet_morpion.pdf" }
        ]
    },
    {
        Titre_Chap: "Les listes chaînées",
        Table_Des_Matière: true,
        Pdf_Href: "File/nsi_t_ch3.pdf",
        Table_Des_Matière_Length: 2
    },
    {
        Titre_Chap: "Les files",
        Table_Des_Matière: false,
        Sous_Chapitre: [
            { Titre: "Le cours et les savoir-faire", Type: "pdf", Href: "File/nsi_t_file.pdf" }
        ]
    },
    {
        Titre_Chap: "Les piles",
        Table_Des_Matière: false,
        Sous_Chapitre: [
            { Titre: "Le cours et les savoir-faire", Type: "pdf", Href: "File/nsi_t_pile.pdf" }
        ]
    },
    {
        Titre_Chap: "Les dictionnaires",
        Table_Des_Matière: false,
        Sous_Chapitre: [
            { Titre: "Le cours et les savoir-faire", Type: "pdf", Href: "File/nsi_t_ch8.pdf" },
            { Titre: "le fichier titanic pour le dernier exercice", Type: "download", Href: "File/titanic.csv" }
        ]
    },
    {
        Titre_Chap: "Les arbres",
        Table_Des_Matière: false,
        Sous_Chapitre: [
            { Titre: "Le cours et les savoir-faire", Type: "pdf", Href: "File/nsi_t_ch9.pdf" }
        ]
    },
    {
        Titre_Chap: "Les processus",
        Table_Des_Matière: true,
        Pdf_Href: "File/nsi_t_ch13.pdf",
        Table_Des_Matière_Length: 1
    },
    {
        Titre_Chap: "Le routage",
        Table_Des_Matière: true,
        Pdf_Href: "File/nsi_t_ch10.pdf",
        Table_Des_Matière_Length: 1
    },
    {
        Titre_Chap: "Diviser pour régner",
        Table_Des_Matière: true,
        Pdf_Href: "File/nsi_t_ch11.pdf",
        Table_Des_Matière_Length: 1
    },
    {
        Titre_Chap: "Les SoCs",
        Table_Des_Matière: true,
        Pdf_Href: "File/nsi_t_ch12.pdf",
        Table_Des_Matière_Length: 1
    },
    {
        Titre_Chap: "Les graphes",
        Table_Des_Matière: true,
        Pdf_Href: "File/nsi_t_ch14.pdf",
        Table_Des_Matière_Length: 1
    },
    {
        Titre_Chap: "Sécurisation",
        Table_Des_Matière: false,
        Sous_Chapitre: [
            { Titre: "Introduction à la sécurisation", Type: "pdf", Href: "File/nsi_t_securisation_1.pdf" },
            { Titre: "Cryptographie symétrique", Type: "pdf", Href: "File/nsi_t_securisation_2.pdf" },
            { Titre: "Cryptographie asymétrique", Type: "pdf", Href: null },
            { Titre: "Découvrir le kid RSA", Type: "link", Href: "https://www.cs.uri.edu/cryptography/publickeykidkrypto.htm" },
            { Titre: "Exercice kid rsa", Type: "pdf", Href: null },
            { Titre: "Authentification des participants", Type: "pdf", Href: "File/nsi_t_securisation_4.pdf" },
            { Titre: "Le protocole HTTPS", Type: "pdf", Href: "File/nsi_t_securisation_5.pdf" }
        ]
    },
    {
        Titre_Chap: "Recherche textuelle",
        Table_Des_Matière: false,
        Sous_Chapitre: [
            { Titre: "Introduction à la recherche textuelle", Type: "pdf", Href: "File/nsi_t_recherche_textuelle_1.pdf" },
            { Titre: "Algorithme naïfs", Type: "pdf", Href: "File/nsi_t_recherche_textuelle_2.pdf" },
            { Titre: "Algorithme de Boyer-Moore", Type: "pdf", Href: "File/nsi_t_recherche_textuelle_3.pdf" },
            { Titre: "Prolongements", Type: "pdf", Href: "File/nsi_t_recherche_textuelle_4.pdf" },
        ]
    }
];

pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

async function getTable_Des_Matière(Pdf_Href, maxPage) {


}

// ajouts des div qui permettrons d'ajouter tous les chapitre
async function Chapitrage() {
    const divAllChapitre = document.getElementById("chapitre");
    for (const indexChapitre in config) {
        var chapitre = config[indexChapitre]
        var divChapitre = document.createElement("div");
        divChapitre.className = "text-left p-0 m-0"
        var h3Titre = '<h3 class="text-lg pl-4 py-2 pr-0 align-middle select-none font-bold">' + chapitre.Titre_Chap + '</h3>'
        if (chapitre.Table_Des_Matière) {
            console.log(chapitre.Titre_Chap)
            var pdf = await pdfjsLib.getDocument(chapitre.Pdf_Href).promise.then((pdf) => { return pdf; });

            var Spans = ""
            var tempSpans = ""
            for (let i = 1; i < chapitre.Table_Des_Matière_Length + 1; i++) {
                var page = await pdf.getPage(i).then((page) => { return page; });

                var result = await page.getTextContent().then(function (result) { return result; });

                if (i >= 2) {
                    var data = result["items"]
                    data = data.slice(2, data.length - 2)
                } else {
                    var data = result["items"]
                    data = data.slice(2, data.length)
                }

                for (let w = 0; w < data.length; w++) {
                    var ligne = data[w].str
                    if (ligne.indexOf(" ") === -1) {
                        if (tempSpans != "") {
                            Spans += '<span onclick="pdfHhref(\'' + chapitre.Pdf_Href + ',' + ligne + '\')" class="cursor-pointer"><p class="pl-6 pr-0 py-1 hover:bg-gray-400 align-middle select-none">' + tempSpans.slice(2, tempSpans.length) + '</p></span>'
                            tempSpans = ""
                        }

                    } else if (ligne.indexOf(".") === -1) {
                        if (tempSpans === "") {
                            tempSpans += ligne
                        } else {
                            tempSpans += " " + ligne
                        }
                    }

                }

            }
        } else {
            var Spans = ''
            for (const indexSous_Chapitre in chapitre.Sous_Chapitre) {
                SousChapitre = chapitre.Sous_Chapitre[indexSous_Chapitre]
                if (SousChapitre.Type == "pdf") {
                    Spans += '<span onclick="pdfHhref(\'' + SousChapitre.Href + ',0\')" class="cursor-pointer"><p class="pl-6 pr-0 py-1 hover:bg-gray-400 align-middle select-none">' + SousChapitre.Titre + '</p></span>'
                } else {
                    Spans += '<a href="' + SousChapitre.Href + '" target="_blank"><span><p class="pl-6 pr-0 py-1 hover:bg-gray-400 align-middle select-none">' + SousChapitre.Titre + '</p></span></a>'
                }

            }

        }
        divChapitre.innerHTML = h3Titre + Spans
        divAllChapitre.appendChild(divChapitre)
    }
}
Chapitrage()



function buttonSearch() {
    let objectButton = document.getElementById("objectButton");
    objectButton.remove();
    let divSearch = document.getElementById("divSearch");
    divSearch.innerHTML = "<input type='text' id='inputSearch' onblur='afficherSvg()' name='mytext' placeholder='Recherche' class='py-1 wx-48 border-0 rounded-full text-center outline-none sm:px-28' />";
    document.getElementById("inputSearch").focus()
}

function afficherSvg() {
    let inputSearch = document.getElementById("inputSearch");
    inputSearch.remove();
    let divSearch = document.getElementById("divSearch");
    divSearch.innerHTML = '<button class="focus:outline-none" onclick=buttonSearch() id="objectButton"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="32" height="32" stroke="white"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></button>';
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

async function DataSearch() {
    var dict = {}
    for (const indexChapitre in config) {
        var chapitre = config[indexChapitre]
        var Titre = chapitre.Titre_Chap
        if (chapitre.Table_Des_Matière) {
            console.log(1)
            var pdf = await pdfjsLib.getDocument(chapitre.Pdf_Href).promise.then((pdf) => { return pdf; });
            var numPages = pdf.numPages;
            for (let i = 1; i <= numPages; i++) {
                var page = await pdf.getPage(i).then((page) => { return page; });
                var result = await page.getTextContent().then(function (result) { return result; });
                var data = result["items"]

                for (let w = 0; w < data.length; w++) {
                    var ligne = data[w]["str"]
                    if (ligne in dict) {
                        if (Titre in dict[ligne]) {
                            dict[ligne][Titre] += 1
                        } else {
                            dict[ligne][Titre] = 1
                        }
                    } else {
                        dict[ligne] = {}
                        dict[ligne][Titre] = 1
                    }
                }
            }
        } else {
            for (const indexSous_Chapitre in chapitre.Sous_Chapitre) {
                SousChapitre = chapitre.Sous_Chapitre[indexSous_Chapitre]
                if (SousChapitre.Type == "pdf" && SousChapitre.Href != null) {
                    console.log(SousChapitre)
                    var pdf = await pdfjsLib.getDocument(SousChapitre.Href).promise.then((pdf) => { return pdf; });
                    var numPages = pdf.numPages;
                    for (let i = 1; i <= numPages; i++) {
                        var page = await pdf.getPage(i).then((page) => { return page; });
                        var result = await page.getTextContent().then(function (result) { return result; });
                        var data = result["items"]
                        for (let w = 0; w < data.length; w++) {
                            var ligne = data[w]["str"]
                            if (ligne in dict) {
                                if (Titre in dict[ligne]) {
                                    dict[ligne][Titre] += 1
                                } else {
                                    dict[ligne][Titre] = 1
                                }
                            } else {
                                dict[ligne] = {}
                                dict[ligne][Titre] = 1
                            }


                        }
                    }
                }
            }
        }

    }
    console.log(dict)
}
DataSearch()