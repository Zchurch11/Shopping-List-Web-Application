const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearButton = document.getElementById('clear')
const filter = document.getElementById('filter')
let isEditMode = false
const formBtn = itemForm.querySelector('button')


function dislayItems(){
    const itemsFromStorage = getItemsFromStorage()
    itemsFromStorage.forEach(item => addItemToDom(item))
    checkUI()
}

function addItem(e){
e.preventDefault()
const newItem = itemInput.value
if (newItem.value === '') {
 alert('Please enter an item.')
 return
}
if (isEditMode) {
 const itemToEdit = itemList.querySelector('.edit-mode')
 removeItemFromStorage(itemToEdit.textContent)
 itemToEdit.classList.remove('.edit-mode')
 itemToEdit.remove()
 isEditMode = false
} else {
    if (checkIfItemExists(newItem)){
        alert('Item already added!')
        return
    }
}
addItemToDom(newItem)

addItemToStorage(newItem)
checkUI()
}
function addItemToDom (item){
    const li = document.createElement('li')
li.appendChild(document.createTextNode(item))

const button = createButton('remove-item btn-link text-red')
li.appendChild(button)
itemList.appendChild(li)
}

function createButton(classes){
    const button = document.createElement('button')
    button.className = classes
    const icon = createIcon('fa-solid fa-xmark')
    button.appendChild(icon)
    return button
}

function createIcon(classes){
    const icon = document.createElement('i')
    icon.className = classes
    return icon
}

function addItemToStorage(item){
    let itemsFromStorage = getItemsFromStorage();
    if (localStorage.getItem('items') === null){
    itemsFromStorage = []
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'))
    }
    itemsFromStorage.push(item)
    
    localStorage.setItem('items',JSON.stringify(itemsFromStorage) )
    }

    function getItemsFromStorage () {
        let itemsFromStorage;
        if (localStorage.getItem('items') === null){
        itemsFromStorage = []
        } else {
            itemsFromStorage = JSON.parse(localStorage.getItem('items'))
        }
        checkUI()
        return itemsFromStorage
        
    }
    function setItemToEdit(item){
        itemList.querySelectorAll('li')
        .forEach((i) => i.classList.remove('edit-mode') )
        isEditMode = true 
        item.classList.add('edit-mode') 
        formBtn.innerHTML = '<i class = "fa-solid fa-pen"></i>  Update Item'
        formBtn.style.backgroundColor = '#228b22'
        itemInput.value = item.textContent
    }

    function onClickItem(e){
        if (e.target.parentElement.classList.contains('remove-item')){
            removeItem(e.target.parentElement.parentElement)
        }else {
            setItemToEdit(e.target)
        }
    
    }

    function checkIfItemExists(item){
        const itemsFromStorage = getItemsFromStorage()

        return itemsFromStorage.includes(item)

    }

    function removeItem (item){
        if (confirm('Are you sure?')){
            item.remove()

        removeItemFromStorage(item.textContent)
            checkUI()
        } 

           
    }

    function removeItemFromStorage(item){
        let itemsFromStorage = getItemsFromStorage()  
        itemsFromStorage = itemsFromStorage.filter((i) => i !== item )

        localStorage.setItem('items', JSON.stringify(itemsFromStorage))
    }

    function clearItems() {
    while (itemList.firstChild){
    itemList.removeChild(itemList.firstChild)
    checkUI()
    }
    localStorage.removeItem('items')

    }

function filterItems(e){
    const items = itemList.querySelectorAll('li')
    const typedText = e.target.value.toLowerCase()
    items.forEach(item => {
        const text = item.firstChild.textContent.toLowerCase()
        if (text.indexOf(typedText) != -1){
            item.style.display = 'flex'
        } else{
            item.style.display = 'none'
        }
        console.log(text)
    })
    console.log(typedText)
}

function checkUI(){
    itemInput.value = ''
    const items = itemList.querySelectorAll('li')
if (items.length === 0){
filter.style.display = 'none'
clearButton.style.display = 'none'

} else {
    filter.style.display = 'block'
    clearButton.style.display = 'block'
}
formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item'
formBtn.style.backgroundColor = '#333'
isEditMode = false
}



//event listeners
itemForm.addEventListener('submit', addItem)
itemList.addEventListener('click', onClickItem)
clearButton.addEventListener('click', clearItems)
filter.addEventListener('input', filterItems)
document.addEventListener('DOMContentLoaded', dislayItems)
checkUI()
