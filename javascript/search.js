const searchBar=document.querySelector("#google-searchbar");

//searchForm==greeting.js에 선언
searchForm.addEventListener("submit",function(event){
    event.preventDefault();
    location.href=`https://www.google.co.kr/search?q=${searchBar.value}`;
    searchBar.value="";
});