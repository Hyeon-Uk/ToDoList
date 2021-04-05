const searchBar = document.querySelector("#google-searchbar");
function checkUrl(str) {
    //url 유효성 검사
    let regex =  /^(http\:\/\/)?((\w+)[.])+(asia|biz|cc|cn|com|de|eu|in|info|jobs|jp|kr|mobi|mx|name|net|nz|org|travel|tv|tw|uk|us)(\/(\w*))*$/i;
    //올바른 url이 맞다면 해당 url로 이동
    if (regex.test(str)) {
        //location.href =str;
        if(str.indexOf("http://")==-1&&str.indexOf("https://")==-1){
            str=`http://${str}`;
        }
        location.href=str;
    }
    else{
        location.href = `https://www.google.co.kr/search?q=${str}`;
    }
}

//searchForm==greeting.js에 선언
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    checkUrl(searchBar.value);
    searchBar.value = "";
});