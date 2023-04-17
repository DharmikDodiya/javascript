var selectedRow = null;

function onFormSubmit(e){
    event.preventDefault();
    var formData = readFormData();
    if(selectedRow === null){
        insertNewRecord(formData);
    }
    else{
        updateRecord(formData);
    }
    resetForm();
}

/**
 * Retrive the Data
 */
function readFormData(){
    var formData ={};
    formData["name"] = document.getElementById("name").value;
    formData["email"] = document.getElementById("email").value;
    formData["phoneno"] = document.getElementById("phoneno").value;
    formData["username"] = document.getElementById("username").value;
    formData["city"] = document.getElementById("city").value;
    return formData;
}

/**
 * Insert Record 
 */
function insertNewRecord(data){
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
        cell1.innerHTML = data.name;
    var cell2 = newRow.insertCell(1);
        cell2.innerHTML = data.email;
    var cell3 = newRow.insertCell(2);
        cell3.innerHTML = data.phoneno;
    var cell4 = newRow.insertCell(3);
        cell4.innerHTML = data.username;
    var cell5 = newRow.insertCell(4);
        cell5.innerHTML = data.city;
    // listJsonArray = [];
    // listJsonArray.push([cell1, cell2,cell3,cell4 , cell5,cell6]);
    // localStorage.setItem("storeList", JSON.stringify(listJsonArray));
    var cell6 = newRow.insertCell(5);
        cell6.innerHTML = '<button class = btn btn-danger" onClick = "onEdit(this)">Edit </button> <button onClick = "onDelete(this)">Delete</button>'
}

/**
 * Edit Data
 */
function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById('name').value = selectedRow.cells[0].innerHTML;
    document.getElementById('email').value = selectedRow.cells[1].innerHTML;
    document.getElementById('phoneno').value = selectedRow.cells[2].innerHTML;
    document.getElementById('username').value = selectedRow.cells[3].innerHTML;
    document.getElementById('city').value = selectedRow.cells[4].innerHTML;
}

function updateRecord(formData){
    selectedRow.cells[0].innerHTML = formData.name;
    selectedRow.cells[1].innerHTML = formData.email;
    selectedRow.cells[2].innerHTML = formData.phoneno;
    selectedRow.cells[3].innerHTML = formData.username;
    selectedRow.cells[4].innerHTML = formData.city;
}

/**
 * Delete Record
 */
function onDelete(td){
    if(confirm('Do You Want To Delete This Record')){
        row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
    }
    resetForm();
}

/**
 * Reset Data
 */
function resetForm(){
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phoneno').value = '';
    document.getElementById('username').value = '';
    document.getElementById('city').value = '';
}

/**
 * Validation Data
 */
function setError(id, error) {
    document.getElementById(id).innerHTML = error;
}

function clearError() {
    errors = document.getElementsByTagName('span');
    for (let error of errors)
        error.innerHTML = "";
}
function validation() {
    clearError();
    var result = true;
    var name            = document.getElementById('name').value.trim();
    var email           = document.getElementById('email').value;
    var phoneno         = document.getElementById('phoneno').value;
    var username        = document.getElementById('username').value;
    var city            = document.getElementById('city').value;

    var nameExpression = /^[A-Za-z]+$/;
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(name.length == 0) {
        setError ("nameError", "Name is required!!!");
        result =  false;

    } else if(!name.match(nameExpression)) {

        setError ("nameError","Please enter valid name!!!!");
        result = false;

    } if(email.length == 0) {

        setError ("emailError","Email Is Required And Email data are so long!!!");
        result = false;
    } 
    if(phoneno == 0){
        setError ("phoneError","Phone Number Field Is Required");
        result = false;
    }
    if(result == 1){
        onFormSubmit();
    }
    return result;
}