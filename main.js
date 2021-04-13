pdfjsLib.GlobalWorkerOptions.workerSrc = '/PDFJS/build/pdf.worker.js';

var config = fetch("./config.json").then((data) => data.json()).then((data) => Chapitrage(data));
var Search = fetch("./Search.json").then((data) => data.json()).then((data) => { window.no = data });

// ajouts des div qui permettrons d'ajouter tous les chapitre
async function Chapitrage(config) {
    const divAllChapitre = document.getElementById("chapitre");
    window.AllHref = {}
    for (const indexChapitre in config) {
        var chapitre = config[indexChapitre]
        var divChapitre = document.createElement("div");
        divChapitre.className = "text-left p-0 m-0"
        var h3Titre = '<h3 class="text-lg pl-4 py-2 pr-0 align-middle select-none font-bold">' + chapitre.Titre_Chap + '</h3>'
        if (chapitre.Table_Des_Matière) {

            window.AllHref[chapitre.Pdf_Href] = chapitre.Titre_Chap

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
                            Spans += '<span onclick="pdfHhref(\'' + chapitre.Pdf_Href +'\','+ligne+')" class="cursor-pointer"><p class="pl-6 pr-0 py-1 hover:bg-gray-400 align-middle select-none">' + tempSpans.slice(2, tempSpans.length) + '</p></span>'
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
                    window.AllHref[SousChapitre.Href] = chapitre.Titre_Chap + "!$§" + SousChapitre.Titre
                    Spans += '<span onclick="pdfHhref(\'' + SousChapitre.Href +'\','+0+')" class="cursor-pointer"><p class="pl-6 pr-0 py-1 hover:bg-gray-400 align-middle select-none">' + SousChapitre.Titre + '</p></span>'
                } else {
                    Spans += '<a href="' + SousChapitre.Href + '" target="_blank"><span><p class="pl-6 pr-0 py-1 hover:bg-gray-400 align-middle select-none">' + SousChapitre.Titre + '</p></span></a>'
                }

            }

        }
        divChapitre.innerHTML = h3Titre + Spans
        divAllChapitre.appendChild(divChapitre)
    }
}


function buttonSearch() {
    let objectButton = document.getElementById("objectButton");
    objectButton.remove();
    let divSearch = document.getElementById("divSearch");
    divSearch.innerHTML = "<div class='relative'><input type='text' id='inputSearch' onblur='setTimeout(function(){afficherSvg();}, 100);' autocomplete='off' oninput='inputSearch(this.value)' name='mytext' placeholder='Recherche' class='py-0.5 wx-48 text-center outline-none box-border h-auto border-2 border-black sm:px-28' /><div class='absolute bg-white box-border h-auto w-full border-2 mt-8 border-black' id='searchSuggestion'><span onclick='' class='cursor-pointer'><p class='px-4 pr-0 py-1 align-middle select-none'><strong>Aucune correspondance trouver</strong></p></span><div>"
    document.getElementById("inputSearch").focus()
}

function afficherSvg() {
    let inputSearch = document.getElementById("inputSearch");
    inputSearch.remove();
    let divSearch = document.getElementById("divSearch");
    divSearch.innerHTML = '<button class="focus:outline-none" onclick=buttonSearch() id="objectButton"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="32" height="32" stroke="white"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></button>';
}

// Fonction Simple Ressemble a Sorted en python
function sort_object(dict) {
    var items = Object.keys(dict).map(function (key) {
        return [key, dict[key]];
    });

    // Sort the array based on the second element
    items.sort(function (first, second) {
        return second[1] - first[1];
    });

    // Create a new array with only the first 5 items
    return items;
}

function inputSearch(string) {
    let searchSuggestion = document.getElementById("searchSuggestion")

    string = string.toLowerCase();
    string = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    string = string.split(" ")
    DicoHrefName = {}

    for (w in string) {
        mot = string[w]
        if (mot != "") {
            for (i in window.no) {
                x = i.substr(0, mot.length)
                if (x != undefined) {
                    if (x.indexOf(mot) != -1) {
                        for (z in window.no[i]) {
                            if (z in DicoHrefName) {
                                DicoHrefName[z] += window.no[i][z]
                            } else {
                                DicoHrefName[z] = window.no[i][z]
                            }

                        }
                    }

                }

            }
        }
    }
    Dico = {}
    for (i in DicoHrefName) {
        Dico[window.AllHref[i.replace("\\", "/")]] = DicoHrefName[i]

    }
    Dico = sort_object(Dico)
    DicoHrefName = sort_object(DicoHrefName)
    if (Dico.length == 0) {
        searchSuggestion.innerHTML = "<span onclick='' class='cursor-pointer'><p class='px-4 pr-0 py-1 align-middle select-none'><strong>Aucune correspondance trouver</strong></p></span>" 
    } else {
        searchSuggestion.innerHTML = ""
    }

    for (i in Dico) {
        var suggestion = Dico[i][0]
        console.log(DicoHrefName[i][0].replace("\\", "/"))
        suggestion = suggestion.split("!$§")
        if (suggestion.length === 1) {
            searchSuggestion.innerHTML += '<span onmousedown="pdfHhref(\'' + DicoHrefName[i][0].replace("\\", "/") +'\','+0+')" class="cursor-pointer"><p class="px-4 pr-0 py-1 hover:bg-gray-400 align-middle select-none"><strong>' + suggestion[0] + '</strong></p></span>'
        } else {
            searchSuggestion.innerHTML += '<span onmousedown="pdfHhref(\'' + DicoHrefName[i][0].replace("\\", "/") +'\','+0+')" class="cursor-pointer"><p class="px-4 pr-0 py-1 hover:bg-gray-400 align-middle select-none"><strong>' + suggestion[0] + '</strong><br>' + suggestion[1] + '</p></span>'
        }

    }

}


function pdfHhref(url,page){
    console.log("/PDFJS/web/viewer.html?file=%2F"+url.replace("/","%2F")+"#page="+page+"")
    document.getElementById("pdf").src = "./Site_Nsi/PDFJS/web/viewer.html?file=%2FSite_Nsi%2F"+url.replace("/","%2F")+"#page="+page+"&view=fitH";
}