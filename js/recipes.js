const API_URL = "https://dummyjson.com"
const limit =3

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
    fetchData(`/recipes?limit=${limit}&skip=0`,createCard);
}

const elWrapper = document.querySelector(".wrapper")
const elBtn = document.querySelector(".see-btn")


function createCard(data){
    const fr = document.createDocumentFragment()
    data.recipes.forEach((recipes) => {
        const div = document.createElement("div")
        div.classList.add("card")
        div.innerHTML = `
        <div>
            <img src=${recipes.image} alt="product img">
        </div>
            <div>
            <h2 class="text-black font-bold">${recipes.name}</h2>
            <p>${recipes.ingredients}</p>
        </div>
        `
        fr.appendChild(div)    
    })
    elWrapper.appendChild(fr)
}


let offset = 0

elBtn.onclick = () =>{
    offset++
    elWrapper.innerHTML= ""
    fetchData(`/recipes?limit=${limit}&skip=${limit * offset}`,createCard)
}
