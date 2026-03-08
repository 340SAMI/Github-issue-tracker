const allButton = document.getElementById("allButton");
const openButton = document.getElementById("openButton");
const closeButton = document.getElementById("closeButton");

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

