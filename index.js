const BASE_URL = "https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn= document.querySelector("form button");
const fromCurr =document.querySelector(".from select");
const toCurr= document.querySelector(".to select");
const msg= document.querySelector(".msg");

// for(code in countryList) {
//     console.log(code ,countryList[code]);
    
// }

for (let select of dropdowns) {
    for(currCode in countryList) {
        let newoption = document.createElement("option");
        newoption.value= currCode;
        newoption.innerText= currCode;

        // logic for the selected option
        if(select.name== "from" && newoption.value=="INR") {
            newoption.selected= "selected";
        }
        if(select.name== "to" && newoption.value=="USD") {
            newoption.selected= "selected";
        }
        select.append(newoption);
    }

    // this will update the flag
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

// TO UPDATE FLAG WITH CURRENCY NAME

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];

    let newSrc= `https://flagsapi.com/${countryCode}/flat/64.png`;

    let img= element.parentElement.querySelector("img");
    img.src= newSrc;
}


// TO GET THE CALCULATIONS

btn.addEventListener("click",  async (evt)=> {
    evt.preventDefault();   //THIS WILL REMOVE THE EXISTING DEFAULT BEHAVIOUR LIKE SUBMIT AND RELOAD

    let amt = document.querySelector(".amount input");
    let amount= amt.value;
    
    // CHECK FOR NEGATIVE OR EMPTY VALUES
    if(amount== "" || amount < 0) {
        amount = 1;
        amt.value= "1";
    }

    const URL = `${BASE_URL}/${toCurr.value}_${fromCurr.value}.json`
    let response = await fetch(URL);
    let data= await response.json();
    let exchangeRate= data.rate;
    
    let finalAmount = amount * exchangeRate;

    msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}` 
    
    
})







