const mortageAmount = document.getElementById("mortageAmount");
const mortageterm = document.getElementById("mortageTerm");
const mortageRate = document.getElementById("mortageRate");
const mortageTypeList = document.getElementsByClassName("radio-button");
const btncalcul = document.querySelector(".calculate-button");
const emptyRightSide = document.querySelector(".Empty-resultat-card");
const calculatedRigthSide = document.querySelector(".Complete-result-card");
const errMessageList = document.querySelectorAll(".err-message");

function f_Switch_EmptyCalculed_RightSide(displayEmpty,displayCalculated){ // param : none if we want to remove / flex if we want to add
    emptyRightSide.style.display = displayEmpty;
    calculatedRigthSide.style.display = displayCalculated;
}

function f_Calculate_Repayments(Amount,Term,Rate){
    let repayments = 0;
    for(let i = 0; i<Term;i++){  // for each years calculate the profit in function of the basic amount
        repayments += Amount*Rate;  // more the sum of the last interest
        Amount+= Amount*Rate;
    }
    return repayments
}

function f_Repayments(){
    let Amount = parseInt(mortageAmount.value,10);  // convert in integer
    const Term = mortageterm.value;
    let Rate = mortageRate.value*(10**-2);  // convert in percentage with can be multiply
    let repayment = 0;
    if (mortageTypeList[0].checked){  // check the type of Mortage 
        repayment = Amount+f_Calculate_Repayments(Amount,Term,Rate);
    }else{
        repayment = f_Calculate_Repayments(Amount,Term,Rate);
    }
    return repayment
}

function f_Add_Result_Page(repayment){
    
}


btncalcul.addEventListener("click", function(){  // when user click on the btn
    const repayment = f_Repayments();                    // first calculate the reayment 
    f_Add_Result_Page(repayment);                       // second add the result to the page
    f_Switch_EmptyCalculed_RightSide("none","flex"); // finaly display the rigth side
})

