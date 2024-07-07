

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerHTML = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currCode === "INR"){
                newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}
window.addEventListener("load", () =>{
    getExchangeRate();
});

btn.addEventListener("click", (evt) =>{
    evt.preventDefault();
    getExchangeRate();
});

function getExchangeRate() {
    let amount = document.querySelector(".amount input");
    const exchangeRateTxt = document.querySelector(".msg");
    let amtVal = amount.value;
    if(amtVal==="" || amtVal < 1){
        amtVal = 1; 
        amount.value = "1";
    }
    exchangeRateTxt.innerText = "Exchanging Your Currency.....";
    let url = `https://v6.exchangerate-api.com/v6/f009b2bb6c29312c9cd7143f/latest/${fromCurr.value}`;
    // fetching aqpi response and returning it with parsing into js obj and in another then method receiving that obj
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurr.value];
        let totalExchangeRate = (amtVal*exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amtVal} ${fromCurr.value} = ${totalExchangeRate} ${toCurr.value}`
    })
}

