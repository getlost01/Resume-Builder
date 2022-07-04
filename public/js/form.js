var domDelData = document.querySelector("#deleteBtnData");

for(let i=1 ;i<=domDelData.value ;i++){
    document.querySelector(`#deleteBtn${i}`).addEventListener('click',()=>{
        document.querySelector(`#deleteRow${i}`).innerHTML = "";
     })
}

var genId = 0;
var genArray = [];


document.querySelector("#addExp").addEventListener('click',()=>{
    var arr = document.querySelectorAll('[name$="Exp"]');
    var data=[];
    arr.forEach(val => {
        data.push(val.value);
    });
    document.querySelector("#expSec").innerHTML +=`
            <div class="row" id="expSec${genId}">
                <div class="titleBox"><h6>Experience Detail<i class="fa-solid fa-trash-can" id="delExp${genId}"></i></h6></div>
                <div class="col-12 inputStyle col-md-6">
                    <label for="titleExp"> Firm Name </label>
                    <input   type="text" required placeholder="xyz firm" name="titleExp" id="titleExp${genId}">
                </div>
                <div class="col-12 inputStyle col-md-6">
                    <label for="designationExp"> Designation </label>
                    <input   type="text" required placeholder="SDE intern" name="designationExp" id="designationExp${genId}">
                </div>
                <div class="col-12 inputStyle col-md-6">
                    <label for="timeExp"> Time Span </label>
                    <input   type="text" required placeholder="22 june 2022 - present" name="timeExp" id="timeExp${genId}" >
                </div>
                <div class="col-12 inputStyle col-md-6">
                    <label for="techExp"> Technology experience </label>
                    <input   type="text" required placeholder="nodeJS , reactjs , mongoose , JavaScript" name="techExp" id="techExp${genId}">
                </div>
                <div class="col-12 inputStyle col-md-6">
                    <label for="descrpExp"> Description </label>
                    <input   type="text" required placeholder="My work is to improve efficiency of backend server and implement new features." name="descrpExp" id="descrpExp${genId}">
                </div>
                <div class="col-12 inputStyle col-md-6">
                    <label for="linkExp"> Any link to share </label>
                    <input   type="url" placeholder="eg: https://My-Work-Is-This.com" name="linkExp" id="linkExp${genId}">
                </div>
             </div>

    `;
    arr = document.querySelectorAll('[name$="Exp"]');
    data.forEach((val,i) => {
        arr[i].value = val;
    });
    genArray.push({"ff":"delExp","ss":"expSec"});
    ++genId;
    render();
})

document.querySelector("#addPro").addEventListener('click',()=>{
    var arr = document.querySelectorAll('[name$="Pro"]');
    var data=[];
    arr.forEach(val => {
        data.push(val.value);
    });
    document.querySelector("#projectSec").innerHTML +=`
        <div class="row" id="projectSec${genId}">
                <div class="titleBox"><h6>Project <i class="fa-solid fa-trash-can" id="delPro${genId}"></i></h6></div>
                <div class="col-12 inputStyle col-md-6">
                    <label for="titlePro"> Project Name </label>
                    <input   type="text" required placeholder="CP Calender" name="titlePro" >
                </div>
                <div class="col-12 inputStyle col-md-6">
                    <label for="timePro"> Time Span </label>
                    <input   type="text" required placeholder="30 jan 2022 - 24 feb 2022" name="timePro" >
                </div>
                <div class="col-12 inputStyle col-md-6">
                    <label for="techPro"> Technology Used </label>
                    <input   type="text" required placeholder="nodeJS , reactjs , mongoose , JavaScript" name="techPro" >
                </div>
                <div class="col-12 inputStyle col-md-6">
                    <label for="descrpPro"> Description </label>
                    <input   type="text" required placeholder="show details related upcoming CP Contests" name="descrpPro" >
                </div>
                <div class="col-12 inputStyle col-md-6">
                    <label for="linkPro"> Any link to share </label>
                    <input   type="url" placeholder="eg: https://My-Is-My-Project.com" name="linkPro" >
                </div>
                <div class="col-12 inputStyle col-md-6">
                    <label for="gitPro"> Github Repo </label>
                    <input   type="url" placeholder="eg: https://github.com/getlost01/cp-contest-calender" name="gitPro" >
                </div>
        </div>
    `;
    arr = document.querySelectorAll('[name$="Pro"]');
    data.forEach((val,i) => {
        arr[i].value = val;
    });
    genArray.push({"ff":"delPro","ss":"projectSec"});
    ++genId;
    render();
})

document.querySelector("#addCer").addEventListener('click',()=>{
    var arr = document.querySelectorAll('[name$="Cer"]');
    var data=[];
    arr.forEach(val => {
        data.push(val.value);
    });
    document.querySelector("#certifySec").innerHTML +=`
    <div class="row" id="certifySec${genId}">
        <div class="titleBox"><h6>Certificate <i class="fa-solid fa-trash-can" id="delCer${genId}"></i></h6></div>
        <div class="col-12 inputStyle col-md-6">
            <label for="titleCer"> Certificate Name </label>
            <input   type="text" required placeholder="Front-End Web UI Frameworks and Tools" name="titleCer" >
        </div>
        <div class="col-12 inputStyle col-md-6">
            <label for="issCer"> Issued By </label>
            <input   type="text" required placeholder="Coursera" name="issCer">
        </div>
        <div class="col-12 inputStyle col-md-6">
            <label for="descrpCer"> Description </label>
            <input   type="text" placeholder="For learning front end development." name="descrpCer" >
        </div>
        <div class="col-12 inputStyle col-md-6">
            <label for="linkCer"> Certificate Link </label>
            <input   type="url" required placeholder="eg: https://My-Is-My-Certificate.com" name="linkCer" >
        </div>
    </div>
    `;
    arr = document.querySelectorAll('[name$="Cer"]');
    data.forEach((val,i) => {
        arr[i].value = val;
    });
    genArray.push({"ff":"delCer","ss":"certifySec"});
    ++genId;
    render();
})

document.querySelector("#addHon").addEventListener('click',()=>{
    var arr = document.querySelectorAll('[name$="Hon"]');
    var data=[];
    arr.forEach(val => {
        data.push(val.value);
    });
    document.querySelector("#honorSec").innerHTML +=`
        <div class="row" id="honorSec${genId}" >

            <div class="titleBox"><h6>Achievement <i class="fa-solid fa-trash-can" id="delHon${genId}"></i></h6></div>
            <div class="col-12 inputStyle col-md-6">
                <label for="descrpHon"> Description </label>
                <input   type="text" required placeholder="In xyz contest I got 28 rank out of 1600+ students." name="descrpHon" >
            </div>
            <div class="col-12 inputStyle col-md-6">
                <label for="linkHon"> Any link to share </label>
                <input   type="url" placeholder="eg: https://My-Is-My-Honor.com" name="linkHon" >
            </div>

        </div>
    `;
    arr = document.querySelectorAll('[name$="Hon"]');
    data.forEach((val,i) => {
        arr[i].value = val;
    });
    genArray.push({"ff":"delHon","ss":"honorSec"});
    ++genId;
    render();
})

document.querySelector("#addInfo").addEventListener('click',()=>{
    var arr = document.querySelectorAll('[name$="Info"]');
    var data=[];
    arr.forEach(val => {
        data.push(val.value);
    });
    document.querySelector("#infoSec").innerHTML +=`
    <div class="row" id="infoRow${genId}">
        <div class="titleBox"><h6>Info<i class="fa-solid fa-trash-can" id="delInfo${genId}"></i></h6></div>
        
        <div class="col-12 inputStyle col-md-6">
            <label for="descrpInfo"> Description </label>
            <input   type="text" required placeholder="I have create 50+ digital art / posters for social media." name="descrpInfo" >
        </div>
        <div class="col-12 inputStyle col-md-6">
            <label for="linkInfo"> Any link to share </label>
            <input   type="url" placeholder="eg: https://My-Is-My-Art.com" name="linkInfo" >
        </div>
    </div>
    `;
    arr = document.querySelectorAll('[name$="Info"]');
    data.forEach((val,i) => {
        arr[i].value = val;
    });
    genArray.push({"ff":"delInfo","ss":"infoRow"});
    ++genId;
    render();
})


function render(){
    genArray.forEach((ele,i) => {

     if(ele.ff != "empty") 
     document.querySelector(`#${ele.ff}${i}`).addEventListener('click',()=>{
        document.querySelector(`#${ele.ss}${i}`).innerHTML = "";
        ele.ff="empty";
     })
    });
}

document.querySelector("#okcheck").addEventListener('change',()=>{
    if(document.querySelector("#okcheck").checked)
    document.querySelector("#submitBTN").disabled = false;
    else
    document.querySelector("#submitBTN").disabled = true;
})
