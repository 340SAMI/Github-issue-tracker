const allButton = document.getElementById("allButton");
const openButton = document.getElementById("openButton");
const closeButton = document.getElementById("closeButton");
const cardContainer = document.getElementById("cardContainer");

const handleButtonClick = (id) => {
    allButton.classList.remove("bg-[#4A00FF]", "text-white");
    openButton.classList.remove("bg-[#4A00FF]", "text-white");
    closeButton.classList.remove("bg-[#4A00FF]", "text-white");

    allButton.classList.add("bg-transparent", "text-black");
    openButton.classList.add("bg-transparent", "text-black");
    closeButton.classList.add("bg-transparent", "text-black");

    const buttonElement = document.getElementById(id);

    buttonElement.classList.remove("bg-transparent", "text-black");
    buttonElement.classList.add("bg-[#4A00FF]", "text-white");
};

async function loadCards(){
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const info = await res.json();

    console.log(info.data);

    displaycards(info.data)

}



function displaycards(datas){

    datas.forEach(data => {

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

            const labelstext = data.labels.map(label=>{
               
                const style = labelStyles[label] || "border-gray-500 bg-gray-700"
                
                return  `<span class="px-3 py-1 text-sm font-semibold border rounded-full ${style}">${label.toUpperCase()}</span>`
            })

            console.log(labelstext);
        
        const card = document.createElement("div");
        card.className = ` w-96 bg-white rounded-xl shadow-md border-t-4 border-green-500 `

        card.innerHTML = ` 

                    <div class="p-5">

                        <!-- Top Row -->
                        <div class="flex justify-between items-center mb-3">
                            <div class="">
                                <img src="assets/Open-Status.png" alt="">
                            </div>

                            <span class="px-4 py-1 text-sm font-semibold ${color} rounded-full">
                                ${data.priority}
                            </span>
                        </div>

                        <!-- Title -->
                        <h2 class="text-lg font-bold text-gray-800 leading-snug">
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

loadCards()