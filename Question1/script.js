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
    formData["categoryName"] = document.getElementById("categoryName").value;
    formData["categoryId"] = document.getElementById("categoryId").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("categoryList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.categoryName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.categoryId;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}


function resetForm() {
    document.getElementById("categoryName").value = "";
    document.getElementById("categoryId").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("categoryName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("categoryId").value = selectedRow.cells[1].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.categoryName;
    selectedRow.cells[1].innerHTML = formData.categoryId;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("categoryList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("categoryName").value == "") {
        isValid = false;
        document.getElementById("categoryNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("categoryNameValidationError").classList.contains("hide"))
            document.getElementById("categoryNameValidationError").classList.add("hide");
    }
    return isValid;
}
