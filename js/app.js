const API_URL = "https://dummyjson.com"
const limit =6

async function fetchData(endpoint, callback){
    try{
        const response = await fetch(`${API_URL}${endpoint}`)
        const data = await response.json()
        // loading.style.display = "none"
        callback(data)
    }catch(err){
        console.log(err);
        
    }
}



window.onload = () => {
    fetchData(`/products?limit=${limit}&skip=0`,createCard);
    fetchData("/products/category-list",createCategory)
}

const elWrapper = document.querySelector(".wrapper")
const elBtn = document.querySelector(".see-btn")
const elUl = document.querySelector(".collection")


function createCard(data){
    const fr = document.createDocumentFragment()
    data.products.forEach((product) => {
        const div = document.createElement("div")
        div.classList.add("card")
        div.innerHTML = `
        <div>
            <img src=${product.thumbnail} alt="product img">
        </div>
            <div>
            <h2>${product.title}</h2>
            <p>${product.category}</p>
            <strong class = "text-pink-500">${product.price} USD</strong>
        </div>
        `
        fr.appendChild(div)    
    })
    elWrapper.appendChild(fr)
}
function createCategory(data){
    const fr = document.createDocumentFragment()
    data.forEach((category) =>{
        const li = document.createElement("li")
        li.dataset.endpoint = `/products/category/${category}`
        li.innerHTML = category
        fr.appendChild(li)
    })
    elUl.appendChild(fr)
}

let offset = 0

elBtn.onclick = () =>{
    offset++
    elWrapper.innerHTML= ""
    fetchData(`/products?limit=${limit}&skip=${limit * offset}`,createCard)
}

elUl.addEventListener("click",(event) =>{
    if(event.target.tagName === "LI"){
        const endpoint = event.target.dataset.endpoint
        elWrapper.innerHTML = null
        fetchData(`${endpoint}?limit=${limit}&skip=0`,createCard);
        
    }
})

// const elTitle = document.querySelector(".title")
// elTitle.dataset.text = "lorem"
// elTitle.dataset.camelCase = "loremmm"
// console.log(elTitle.dataset.fadeIn);
