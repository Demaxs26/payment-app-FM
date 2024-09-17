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
const AllIput = document.querySelectorAll("input");  
const btnClear = document.querySelector(".title-clear-ligne p");

btnClear.addEventListener("click",function(){
    f_clearAll()
})

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
    let repaymentsPerMonth =f_Calculate_Repayments(Amount,Term,Rate);
    if (mortageTypeList[0].checked){  // check the type of Mortage 
        repayment = repaymentsPerMonth*12*Term; // Total repayment
        
    }else{
        repayment = repaymentsPerMonth*12*Term-Amount; // only added bby rate repayment
        repaymentsPerMonth = repaymentsPerMonth-(Amount/(12*Term));
    }
    return [repayment ,repaymentsPerMonth]
}

function f_Add_Result_Page(repayment){
    console.log(f_displayCorectPrice(repayment[0]));
    BigPrice.textContent = "£"+f_displayCorectPrice(repayment[1]);  // add the price to the place for them
    littlePrice.textContent ="£"+ f_displayCorectPrice(repayment[0]);
}


function f_displayCorectPrice(price){
    if (!Number.isInteger(price)){  // if the rpice is a float
        return Math.round(price*100)/100 //round to two number behind the dot
    }
    return price
}

function f_dislay_error(field,champ,fieldName){
    errMessageList[field].textContent = champ; // show the error message
    errMessageList[field].style.display = "flex";
    errMessageList[field].classList.add("error");
    fieldName.classList.add("inputErr");
    fieldName.classList.remove("input-ok");
}



function f_undislay_error(field,fieldName){
    errMessageList[field].style.display = "none"; // unshow the error message
    errMessageList[field].classList.remove("error");
    fieldName.classList.remove("inputErr");
    fieldName.classList.add("input-ok");
}



function f_clearAll(){
    for (let i =0;i<AllIput.length-1;i++){
        AllIput[i].value = "";
        f_undislay_error(i,AllIput[i])
    }
    AllIput[3].checked = false;
    AllIput[4].checked = false;

    f_Switch_EmptyCalculed_RightSide("flex","none");
    
}

function f_Verif_Empty(){
    let switch_ = true;
    if (mortageAmount.value <= 0){  // verify for each input if he is empty
        f_dislay_error(0,"This field is required", mortageAmount); // if yes, put an error message and cancel the calcul
        switch_ = false
    }
    if (mortageterm.value <= 0){
        f_dislay_error(1,"This field is required",mortageterm);
        switch_ = false
    }
    if (mortageRate.value <= 0){
        f_dislay_error(2,"This field is required",mortageRate);
        switch_ = false
    }
    console.log(mortageTypeList[0].checked);
    if(mortageTypeList[0].checked === false && mortageTypeList[1].checked === false){
        f_dislay_error(3,"This field is required",mortageTypeList[1]);
        switch_ = false
    }
    console.log(switch_);
    return switch_
}

btncalcul.addEventListener("click", function(){  // when user click on the btn
    if (f_Verif_Empty()){
        const repayment = f_Repayments();                    // first calculate the reayment 
        f_Add_Result_Page(repayment);                       // second add the result to the page
        f_Switch_EmptyCalculed_RightSide("none","flex"); // finaly display the rigth side
    }else{
        f_Switch_EmptyCalculed_RightSide("flex","none")
    }

})



for(let i =0; i<AllIput.length;i++){
    AllIput[i].addEventListener("input",function(){
        f_undislay_error(i,AllIput[i]);
    })
}

for(let i =0; i<AllIput.length-2;i++){
    AllIput[i].addEventListener("change",function(){
        if (AllIput[i].value <= 0){
            f_dislay_error(i,"This number must be above 0 !",AllIput[i])
        }
    })
}