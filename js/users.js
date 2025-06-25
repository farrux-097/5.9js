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
    fetchData(`/users?limit=${limit}&skip=0`,createCard);
}

const elWrapper = document.querySelector(".wrapper")
const elBtn = document.querySelector(".see-btn")



function createCard(data){
    const fr = document.createDocumentFragment()
    data.users.forEach((users) => {
        const div = document.createElement("div")
        div.classList.add("card")
        div.innerHTML = `
        <div>
            <img src=${users.image} alt="product img">
        </div>
            <div>
            <h2 class = "text-black font-bold">@${users.username}</h2>
            <p class = "text-black font-bold">${users.email}</p>
            <p class = "text-black font-bold">First name: ${users.firstName}</p>
            <p class = "text-black font-bold">Last name: ${users.lastName}</p>
            <p class = "text-black font-bold">${users.gender}</p>
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
    fetchData(`/users?limit=${limit}&skip=${limit * offset}`,createCard)
}
