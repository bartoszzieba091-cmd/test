const input = document.querySelector('input');
const myList = document.querySelector('ul');
let completedCounter = 0;

function addToStorage(v){
    localStorage.setItem(v, '1');
}
function addElementToList(v, operation){
    const newObject = document.createElement('li');
    newObject.textContent = v;
    newObject.value = v;

    myList.appendChild(newObject);

    const newButton = document.createElement('button');

    if (operation == 1){
    newButton.textContent = 'Done';
    newButton.classList.add('done'); 
    }else{
    newButton.textContent = 'not!';
    newButton.classList.add('notd');
    newObject.style.textDecoration = 'line-through'
    }
    const newButtonDel = document.createElement('button');
    newButtonDel.textContent = 'Delete';
    newButtonDel.classList.add('delete');

    newObject.appendChild(newButton);
    newObject.appendChild(newButtonDel);
    
    console.log(localStorage.length);
}

input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        addElementToList(input.value, 1);
        addToStorage(input.value);
        input.value = '';
    }
});

document.body.addEventListener('click', function(b){
    if (b.target.id === 'add') {
        addElementToList(input.value, 1);
        addToStorage(input.value);
        input.value = '';
    } 
    else if (b.target.id === 'allDone') {
        completedCounter += +myList.children.length
        document.querySelector("#numberOfdone").innerHTML = completedCounter;
        myList.innerHTML = '';
        localStorage.clear();
    } 
    else if(b.target.classList.contains('delete')){ 
        b.target.parentElement.remove();
        document.querySelector("#numberOfdone").innerHTML = ++completedCounter;

        console.log(b.target.parentElement.textContent.slice(0, -10))
        localStorage.removeItem(b.target.parentElement.textContent.slice(0, -10));
    }
    else if(b.target.classList.contains('done')){

        console.log(b.target.parentElement.textContent.slice(0, -10));

        b.target.parentElement.style.textDecoration = 'line-through';
        b.target.textContent = 'not!'
        b.target.classList.remove('done');
        b.target.classList.add('notd');
        localStorage.setItem(b.target.parentElement.textContent.slice(0, -10), '0');
    }
    else if(b.target.classList.contains('notd')){

        console.log(b.target.parentElement.textContent.slice(0, -10));

        b.target.parentElement.style.textDecoration = 'none';
        b.target.textContent = 'Done'
        b.target.classList.add('done');
        b.target.classList.remove('notd');
        localStorage.setItem(b.target.parentElement.textContent.slice(0, -10), '1');
    }
});//Un

Object.keys(localStorage).forEach((key) => {
    const value = localStorage.getItem(key);
    addElementToList(key, value);
})