const mortageAmount = document.getElementById("mortageAmount");
const mortageterm = document.getElementById("mortageTerm");
const mortageRate = document.getElementById("mortageRate");
const mortageTypeList = document.getElementsByClassName("radio-button");
const btncalcul = document.querySelector(".calculate-button");
const emptyRightSide = document.querySelector(".Empty-resultat-card");
const calculatedRigthSide = document.querySelector(".Complete-result-card");
const errMessageList = document.querySelectorAll(".err-message");
const BigPrice = document.querySelector(".yellow-text");
const littlePrice = document.querySelector(".little-result-box h1");

function f_Switch_EmptyCalculed_RightSide(displayEmpty,displayCalculated){ // param : none if we want to remove / flex if we want to add
    emptyRightSide.style.display = displayEmpty;
    calculatedRigthSide.style.display = displayCalculated;
}

function f_Calculate_Repayments(Amount,Term,Rate){
    let repaymentsPerMonth =(Amount*(Rate/12))/(1-(1/(1+(Rate/12))**(12*Term))); // mortage calcul explained here :
                                               //https://www.youtube.com/watch?v=_WWVxFSHCKs
    return repaymentsPerMonth
}

function f_Repayments(){
    let Amount = parseInt(mortageAmount.value,10);  // convert in integer
    const Term = mortageterm.value;
    let Rate = mortageRate.value*(10**-2);  // convert in percentage with can be multiply
    let repayment = 0;
    const repaymentsPerMonth =f_Calculate_Repayments(Amount,Term,Rate);
    if (mortageTypeList[0].checked){  // check the type of Mortage 
        repayment = repaymentsPerMonth*12*Term; // Total repayment
        
    }else{
        repayment = repaymentsPerMonth*12*Term-Amount; // only added bby rate repayment
    }
    return [repayment ,repaymentsPerMonth]
}

function f_Add_Result_Page(repayment){
    BigPrice.textContent = "£"+repayment[0];
    littlePrice.textContent = "£"+repayment[1];
}


function f_displayCorectPrice(price){
    if (price.includes(".")){
        const index = price.find((element)=> element == ".");
        
    }
}

btncalcul.addEventListener("click", function(){  // when user click on the btn
    const repayment = f_Repayments();                    // first calculate the reayment 
    f_Add_Result_Page(repayment);                       // second add the result to the page
    f_Switch_EmptyCalculed_RightSide("none","flex"); // finaly display the rigth side
})

