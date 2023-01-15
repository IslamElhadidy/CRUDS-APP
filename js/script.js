// get inputs .. 
let title  = document.getElementById('title')
let price  = document.getElementById('price')
let taxes  = document.getElementById('taxes')
let ads    = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count  = document.getElementById('count')
let category  = document.getElementById('category')
let sumbit = document.getElementById('sumbit')
let mood = 'create';
let tmp; // Global ..

// Get Total Price ..
function getTotalPrice() {
    if(price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result;
        total.style.backgroundColor = '#040'
    } else {
        total.innerHTML = '';
        total.style.backgroundColor = 'rgb(80, 49, 49)';
    }
}




// Create Options ..
// If we realod page see localstorage have data or no if he have data put it into array
let dataProducts;
if(localStorage.product != null) {
    dataProducts = JSON.parse(localStorage.product)
} else {
    dataProducts = [];
}

sumbit.onclick = function() {
    let productObject = {
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        ads   : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value.toLowerCase(),
    }

    if(title.value != '' && category.value != '' && price.value != '' && category.value != '' && productObject.count < 100 ) {
        if(mood === 'create') {
                // Create Object by Number Of Count
                if(productObject.count > 1) {
                    for(let i =0;  i < productObject.count; i++) {
                        dataProducts.push(productObject)
                    }
                } else {
                    dataProducts.push(productObject)
                    
                }
        } else {
            dataProducts[tmp] = productObject;
            mood = 'create';
            count.style.display = 'block';
            sumbit.innerHTML = 'Create';
        }
    } else {
            let alert = document.getElementById('alert')
            alert.style.display = 'block'
            setTimeout(() => {
                window.location.reload()
            },2500)
        }




    // Save Data After Realod Page ..
    localStorage.setItem('product',JSON.stringify(dataProducts))

    // Function Clear Inputs after Sumbit (Create)
    clearInputData()

    // (Display Data In Table ..)
    showData()
}




// Clear Inputs after Sumbit (Create)
function clearInputData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}



// Read Option (Display Data In Table ..)
function showData() {
    let table = '';
    for (let i = 0; i < dataProducts.length; i++ ) {
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataProducts[i].title}</td>
            <td>${dataProducts[i].price}</td>
            <td>${dataProducts[i].taxes}</td>
            <td>${dataProducts[i].ads}</td>
            <td>${dataProducts[i].discount}</td>
            <td>${dataProducts[i].total}</td>
            <td>${dataProducts[i].category}</td>
            <td><button class="update" onclick="updateProductData(${i})" id="update">Update</button></td>
            <td><button class="delete" onclick="deleteProductData(${i})" id="delete">Delete</button></td>
        </tr>   
        `;
    }
    document.getElementById('tbody').innerHTML = table;

    let deleteAll = document.getElementById('deleteAll')
    if(dataProducts.length > 0) {
        deleteAll.innerHTML = `
        <button onclick='deleteAll()'>Delete All (${dataProducts.length})</button>
        `
    } else {
        deleteAll.innerHTML = '';
    }
    getTotalPrice()

}
showData();



// Delete Function For One Product Only By Index(i) ..
function deleteProductData(i) {
    dataProducts.splice(i,1) // Delte From Array
    localStorage.product = JSON.stringify(dataProducts) // Add New Array In Local Storage ..
    window.location.reload();
}


// Delete All Data Product  ..
function deleteAll(){
    localStorage.clear();
    window.location.reload(); //or dataProducts.splice(0)
}



// update data 
function updateProductData(i) {
    scroll({
        top:0,
        behavior: "smooth",
    })
    title.value = dataProducts[i].title;
    price.value = dataProducts[i].price;
    taxes.value = dataProducts[i].taxes;
    ads.value = dataProducts[i].ads;
    discount.value = dataProducts[i].discount;
    category.value = dataProducts[i].category;
    count.style.display = 'none'
    sumbit.innerHTML = 'Update'
    getTotalPrice()
    mood = 'update'
    tmp = i;
}


// Search by (.. ، ..)..
let searchMode = 'title';
function getSearchMood(id) {
    let searchInput = document.getElementById('search')
    if(id === 'searchTitle') {
        searchMode = 'title'
        searchInput.placeholder = 'Search By Title'
    } else {
        searchMode = 'category'
        searchInput.placeholder = 'Search By Category'
    }
    searchInput.focus()
    searchInput.value = '';
    showData();
}

// Search by Name of Title Or Category
function searchData(value) {
    let table = '';
    if(searchMode == 'title') {

        for(let i = 0; i < dataProducts.length; i++) {
            if(dataProducts[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataProducts[i].title}</td>
                    <td>${dataProducts[i].price}</td>
                    <td>${dataProducts[i].taxes}</td>
                    <td>${dataProducts[i].ads}</td>
                    <td>${dataProducts[i].discount}</td>
                    <td>${dataProducts[i].total}</td>
                    <td>${dataProducts[i].category}</td>
                    <td><button class="update" onclick="updateProductData(${i})" id="update">Update</button></td>
                    <td><button class="delete" onclick="deleteProductData(${i})" id="delete">Delete</button></td>
                </tr>   
                `;
            }
        }
    } else {

        for(let i = 0; i < dataProducts.length; i++) {
            if(dataProducts[i].category.toLowerCase().includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataProducts[i].title}</td>
                    <td>${dataProducts[i].price}</td>
                    <td>${dataProducts[i].taxes}</td>
                    <td>${dataProducts[i].ads}</td>
                    <td>${dataProducts[i].discount}</td>
                    <td>${dataProducts[i].total}</td>
                    <td>${dataProducts[i].category}</td>
                    <td><button class="update" onclick="updateProductData(${i})" id="update">Update</button></td>
                    <td><button class="delete" onclick="deleteProductData(${i})" id="delete">Delete</button></td>
                </tr>   
                `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

