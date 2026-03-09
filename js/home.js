const allButton = document.getElementById("allButton");
const openButton = document.getElementById("openButton");
const closeButton = document.getElementById("closeButton");
const cardContainer = document.getElementById("cardContainer");

const issueModal = document.getElementById("issueModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalStatus = document.getElementById("modalStatus");
const modalMeta = document.getElementById("modalMeta");
const modalLabels = document.getElementById("modalLabels");
const modalAssignee = document.getElementById("modalAssignee");
const modalPriority = document.getElementById("modalPriority");
let buttonStatus = "allButton"
let allCards = [];


const handleButtonClick = (id) => {
    allButton.classList.remove("bg-[#4A00FF]", "text-white");
    openButton.classList.remove("bg-[#4A00FF]", "text-white");
    closeButton.classList.remove("bg-[#4A00FF]", "text-white");

    allButton.classList.add("bg-transparent", "text-black");
    openButton.classList.add("bg-transparent", "text-black");
    closeButton.classList.add("bg-transparent", "text-black");

    const buttonElement = document.getElementById(id);

    buttonStatus = id;

    buttonElement.classList.remove("bg-transparent", "text-black");
    buttonElement.classList.add("bg-[#4A00FF]", "text-white");
    
     displaycards(allCards)
};

async function loadCards(){
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const info = await res.json();

    // console.log(info.data);
    
    allCards = info.data;

    displaycards(allCards)
   console.log(allCards);
}



function displaycards(datas){

    let filterCards = datas
    
    cardContainer.innerHTML = "";

    if (buttonStatus==="openButton") {
        filterCards = datas.filter(data=> data.status==="open")
        console.log(filterCards)
        
    } else if(buttonStatus ==="closeButton") {
        filterCards = datas.filter(data=> data.status!=="open")
        console.log(filterCards)
    }

    filterCards.forEach(data => {

        // dynamic data.priority part
        const priorityColors = {

                high: "text-red-500 bg-red-100",
                medium: "text-orange-500 bg-orange-100",
                low: "text-green-500 bg-green-100"
            };

        const color = priorityColors[data.priority];


        // dynamic data.label part

        const labelStyles = {

            bug: "text-red-600 border-red-300 bg-red-50",

            "help wanted": "text-orange-600 border-orange-300 bg-orange-50",

            enhancement: "text-blue-600 border-blue-300 bg-blue-50",

            documentation: "text-purple-600 border-purple-300 bg-purple-50",

            "good first issue": "text-green-600 border-green-300 bg-green-50"
  
        };

            let labelstext = data.labels.map(label=>{
               
                const style = labelStyles[label] || "border-gray-500 bg-gray-700"
                
                return  `<span class="px-3 py-1 text-sm font-semibold border rounded-full ${style}">${label.toUpperCase()}</span>`
            })

            labelstext = labelstext.join("");
  
        
        const card = document.createElement("div");
        card.className = `bg-white rounded-xl shadow-md border-t-4 flex flex-col justify-between cursor-pointer ${data.status === "open"? "border-green-500" : "border-violet-700" } `
        card.onclick = () => cardModal(data.id);
        card.innerHTML = ` 

                    <div class="p-5">

                        <!-- Top Row -->
                        <div class="flex justify-between items-center mb-3">
                            <div class="">
                                
                                ${data.status === "open"? `<img src="assets/Open-Status.png" alt="">` : `<img src="assets/Closed- Status .png" alt="">`}
                            </div>

                            <span class="px-4 py-1 text-sm font-semibold ${color} rounded-full">
                                ${data.priority}
                            </span>
                        </div>

                        <!-- Title -->
                        <h2 class="text-lg font-bold text-gray-800 leading-snug min-h-11">
                        ${data.title}
                        </h2>

                        <!-- Description -->
                        <p class="text-gray-500 text- line-clamp-1 mt-2">
                        ${data.description}
                        </p>

                        <!-- Labels -->
                        <div class="flex gap-3 mt-4">
                        ${labelstext}
                        </div>
                    </div>

                        <!-- Footer -->
                    <div class="border-t px-5 py-3 text-sm text-gray-500">
                        <p>#1 by ${data.author}</p>
                        <p>1/15/2024</p>
                    </div>

               
        
        
        `

        cardContainer.appendChild(card);
    });

}

async function cardModal(cardId) {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${cardId}`);
    const info = await res.json();
    console.log(cardId)
    const  data = info.data;

    modalTitle.innerText = data.title;
    modalDescription.innerText=data.description
        //modalStatus
    modalStatus.innerText= data.status;
    modalStatus.classList.remove(
  "bg-green-100", "text-green-700",
  "bg-violet-100", "text-violet-700"
    );     
    data.status === "open"? modalStatus.classList.add("bg-green-100", "text-green-700"): modalStatus.classList.add("bg-violet-100", "text-violet-700")


    // modalMeta
    
    const date = new Date(data.updatedAt).toLocaleDateString();

    modalMeta.innerText = `Opened by ${data.assignee} • ${date}`

    // ModalLabels
    if (modalLabels) {
        const labelStyles = {
            bug: "text-red-600 border-red-300 bg-red-50",
            "help wanted": "text-orange-600 border-orange-300 bg-orange-50",
            enhancement: "text-blue-600 border-blue-300 bg-blue-50",
            documentation: "text-purple-600 border-purple-300 bg-purple-50",
            "good first issue": "text-green-600 border-green-300 bg-green-50"
        };
        const design = data.labels.map(label => {
            const style = labelStyles[label] || "border-gray-300 bg-gray-50 text-gray-700";
            return `<span class="px-3 py-1 text-sm font-semibold border rounded-full ${style}">${(label || "").toUpperCase()}</span>`;
        }).join(" ");
        modalLabels.innerHTML = design;
    }

    // modalassignee

    modalAssignee.innerText = data.assignee;

    // modalPriority
    if (modalPriority) {
        const p = (data.priority || '').toLowerCase();
        modalPriority.innerText = p ;
        modalPriority.classList.remove(
            "text-red-500","bg-red-100",
            "text-orange-500","bg-orange-100",
            "text-green-500","bg-green-100",
            "text-gray-500","bg-gray-100",
            "px-3","py-1","text-sm","font-semibold","rounded-full"
        );
        modalPriority.classList.add("px-3","py-1","text-sm","font-semibold","rounded-full");
        if (p === 'high') modalPriority.classList.add("text-red-500","bg-red-100");
        else if (p === 'medium') modalPriority.classList.add("text-orange-500","bg-orange-100");
        else if (p === 'low') modalPriority.classList.add("text-green-500","bg-green-100");
        else modalPriority.classList.add("text-gray-500","bg-gray-100");
    }


    issueModal.showModal();

}

loadCards()