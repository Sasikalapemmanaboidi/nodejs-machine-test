var selectedRow=null;

function onFormSubmit(){
    var formData = readFormData();
    if (validate()) {
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}
function readFormData() {
    var formData = {}; 
    formData["productName"] = document.getElementById("productName").value;
    formData["productId"] = document.getElementById("productId").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("ProductList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.productName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.productId;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}


function resetForm() {
    document.getElementById("productName").value = "";
    document.getElementById("productId").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("productName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("productId").value = selectedRow.cells[1].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.productName;
    selectedRow.cells[1].innerHTML = formData.productId;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("ProductList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("productName").value == "") {
        isValid = false;
        document.getElementById("productNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("productNameValidationError").classList.contains("hide"))
            document.getElementById("productNameValidationError").classList.add("hide");
    }
    return isValid;
}
