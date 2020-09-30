/********* Example object ***********/
let obj = {
    noFirstPage: 1,/*Optional - Default 1*/
    totalPages: 100,/*Needed*/
    noActualPage: 2,/*Needed*/
    idPaginator: "paginator",/*Needed*/
    ulClass: "",/*Needed*/
    noElementsPerPage: 5,/*Needed*/
    firstPage: {/*Optional*/
        namePage: "Primera",
        classPage: "",
        linkPage: "#/{page}",
        linkClass: ""
    },
    previousPage: {/*Optional*/
        namePage: "&laquo;",
        classPage: "",
        linkPage: "#/{page}",
        linkClass: ""
    },
    normalPage: {/*Needed*/
        namePage: "{page}",
        classPage: "",
        linkPage: "#/{page}",
        linkClass: ""
    },
    actualPage: {/*Needed*/
        namePage: "{page}",
        classPage: "actualPage",
        linkPage: "#/{page}",
        linkClass: ""
    },
    nextPage: {/*Optional*/
        namePage: "&raquo;",
        classPage: "",
        linkPage: "#/{page}",
        linkClass: ""
    },
    lastPage: {/*Optional*/
        namePage: "Última",
        classPage: "",
        linkPage: "#/{page}",
        linkClass: ""
    }

}
function createPaginator(obj) {
    let paginator = document.getElementById(obj.idPaginator);
    let ul = document.createElement("ul");
    paginator.appendChild(ul);
    ul.setAttribute("class", obj.ulClass);
    ul.setAttribute("id", "paginator-container");
    if (obj.noFirstPage == undefined) {
        obj.noFirstPage = 1;
    }
    
    if (obj.firstPage) {
        createPage(obj.firstPage, ul, "firstPage", obj.noFirstPage);
    }
    if (obj.previousPage) {
        createPage(obj.previousPage, ul, "previousPage", obj.noActualPage - 1);
    }
    let from, to;
    if (obj.totalPages <= obj.noElementsPerPage) {
        from = obj.noFirstPage;
        to = obj.totalPages;
    } else {
        if (obj.noActualPage <= obj.noElementsPerPage / 2) {
            from = obj.noFirstPage;
            to = obj.noElementsPerPage;
        } else if (obj.noActualPage >= obj.totalPages - obj.noElementsPerPage / 2) {
            from = obj.totalPages - obj.noElementsPerPage + 1;
            to = obj.noElementsPerPage;
        } else {
            from = obj.noActualPage - obj.noElementsPerPage / 2;
            to = obj.noElementsPerPage;
        }
    }

    for (let i = 0; i < to; i++) {
        if (obj.noActualPage == from + i) {
            createPage(obj.actualPage, ul, "page_" + (from + i), obj.noActualPage);
            lastPageFor = obj.noActualPage;
        } else {
            createPage(obj.normalPage, ul, "page_" + (from + i), (from + i));
            lastPageFor = (from + i);
        }
    }

    if (obj.nextPage) {
        createPage(obj.nextPage, ul, "nextPage", obj.noActualPage + 1);
    }

    if (obj.lastPage) {
        createPage(obj.lastPage, ul, "lastPage", obj.totalPages);
    }
}

function createPage(obj, ul, id, noPage) {
    let li = document.createElement("li");
    li.setAttribute("id", id);
    li.setAttribute("class", obj.classPage);
    ul.appendChild(li);
    let a = document.createElement("a");
    li.appendChild(a);
    let linkPage = obj.linkPage.replace("{page}", noPage);
    a.setAttribute("href", linkPage);
    a.setAttribute("class", obj.linkClass);
    if (obj.namePage.includes("{page}")) {
        a.innerHTML = obj.namePage.replace("{page}", noPage);
    } else {
        a.innerHTML = obj.namePage;
    }
    
}