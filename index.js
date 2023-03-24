let arrayList = []
let oldList =[]
const saveButton = document.getElementById("input-button")
const saveIdButton = document.getElementById("save-url-button")
const deleteButton = document.getElementById("delete-button")
const inputElement = document.getElementById("input-element")
const ulElement = document.getElementById("ul-element")

let localStorgeUrl = JSON.parse(localStorage.getItem("arrayList"))

if(localStorgeUrl){
    arrayList = localStorgeUrl
    renderWebsites(arrayList)
}

saveButton.addEventListener("click", function saveData(){
    arrayList.push(inputElement.value)
    inputElement.value = ""
    localStorage.setItem("arrayList", JSON.stringify(arrayList))
    renderWebsites(arrayList)
})

saveIdButton.addEventListener("click",function(){
    chrome.tabs.query({active:true,currentWindow:true}, function(sekmeler){
        arrayList.push(sekmeler[0].url)
        localStorage.setItem("arrayList", JSON.stringify(arrayList))
        renderWebsites(arrayList)
    })
})

deleteButton.addEventListener("dblclick",function(){
    localStorage.clear()
    arrayList = []
    renderWebsites(arrayList)
})


function renderWebsites(list){
    let listeItemleri = ""
    for (let i = 0; i < list.length; i++){
        listeItemleri += 
        `<li>
            <a href="${list[i]}">
            ${list[i]}
            </a>
        </li>`
    }
    ulElement.innerHTML = listeItemleri
}
