const image = document.querySelector('#image');
const description = document.querySelector('#des');
let d = null;
const introduction = document.querySelector('#intro');
const cardIcon = document.getElementsByClassName('icon');

// const Data = loadData();
let Data = loadData();
setInterval(function(){
    location.reload();
}, 13000);
Data.then(response => displayFirstTime(response));
for(let i=0;i<cardIcon.length;i++){
    // console.log(cardIcon[i].id);
    cardIcon[i].addEventListener('mouseover', function(){
        // console.log(this.id);
        document.getElementById(this.id).style.backgroundPosition = `${this.id} 1px`;
        displayInitialBackgroundPosition(this.id);
        displayDescription(this.id);
    })
}

function displayInitialBackgroundPosition(id){
    for(let j=0;j<cardIcon.length;j++){
        // console.log(cardIcon[j].id)
        if(cardIcon[j].id == id){
            continue;
        }
        document.getElementById(cardIcon[j].id).style.backgroundPosition = `${cardIcon[j].id} -48px`;
    }
}

let curId = null;

function displayDescription(id){
    curId = id;
    if(curId === "0px"){
        curId = "name";
    }else if(curId === '-68px'){
        curId = "email";
    }else if(curId==='-135px'){
        curId = 'birthday';
    }else if(curId === "-203px"){
        curId = 'location';
    }else{
        curId = 'phone'
    }
    // displayData(data, id);
    // const Data = loadData();
    Data.then(response => displayData(response, curId));
    // console.log(Data);
}
function displayData(data, id){
    // console.log(data,'\n',id);
    if(id==='phone'){
        introduction.innerHTML = `<small>My phone number is</small>`;
        description.innerHTML = `<h5>${data.results[0].phone}</h5>`
    }else if(id==='email'){
        introduction.innerHTML = `<small>My email is</small>`;
        description.innerHTML = `<small>${data.results[0].email}</small>`
    }else if(id==='birthday'){
        introduction.innerHTML = `<small>My birthday is</small>`;
        description.innerHTML = `<h5>${data.results[0].dob.date}</h5>`
    }else if(id==='location'){
        introduction.innerHTML = `<small>My location is</small>`;
        description.innerHTML = `<h5>${data.results[0].location.state}, ${data.results[0].location.city}, ${data.results[0].location.country}</h5>`
    }else{
        introduction.innerHTML = `<small>Hi, My name is</small>`;
        description.innerHTML = nameFind(data);
    }
}

// loadData();

async function loadData(){
    const res = await fetch(`https://randomuser.me/api/`);
    const data = await res.json();
    // if(ck==0){
    //     d = data;
    //     displayFirstTime(data);
    //     return;
    // }
    return data;
}
function displayFirstTime(data){
    // console.log(data);
    image.innerHTML=`<img src=${data.results[0].picture.medium}>`;
    introduction.innerHTML = `<small>Hi, My name is</small>`;

    description.innerHTML = nameFind(data);

}
function nameFind(data){
    // console.log(data);
    const title = data.results[0].name.title;
    const fistName = data.results[0].name.first;
    const lastName = data.results[0].name.last;
    return `<h5>${title} ${fistName} ${lastName}</h5>`;
}