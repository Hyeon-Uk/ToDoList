const searchBar = document.querySelector("#google-searchbar");

function domain(str) {
    let regEx = /^(?:www\.)?(.*?):\/\//gim;
    let url = str;
    let path = url.replace(regEx, "");
    console.log("path = " + path);
    //removes domain extracts route
    let regEx2 = /^(.*?\/)/;
    if (path.match(regEx2)) {
        let route = "/" + path.replace(regEx2, "");
        console.log("route", route);
        //extracts domain
        url = path.match(regEx2);
        let domainUrl = url[0].replace("/", "");
        console.log("domainUrl = ", domainUrl);
    }
}

//searchForm==greeting.js에 선언
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    domain(searchBar.value);
    // location.href = `https://www.google.co.kr/search?q=${searchBar.value}`;
    searchBar.value = "";
});