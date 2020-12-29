var myGradesCalculate = (function () {
  var students;
  var studentsCount = 0;
  var items = ['firstName','surname','age','score', 'actions'];
  var formEl = document.getElementById('students-form');
  var isEditBtn = false;
  var editRowId;

  var loadJSON = function (callback) {
      students = data;
      studentsCount = students.length;
  };

  var onDelete = function(event) {
    var rowId = event.target.getAttribute('data-id');
    var row = document.getElementById(rowId);
    row.parentNode.removeChild(row);

    students.splice(students.findIndex(function(i){
      return i.id === +rowId;
    }), 1);
    countScore();
    return false;
  };

  var onEdit = function(event) {
    isEditBtn = true;
    editRowId = event.target.getAttribute('data-id');
    var rowData = students.find((i) => i.id === +editRowId);
    items.forEach(v => {
      if (v !== items[items.length-1]) {
        document.getElementsByName(v)[0].value = rowData[v];
      }
    });
    countScore();
    return false;
  };

  var appendButton = function(elementId, text, func){
    var buttonEl = document.createElement('button');
    buttonEl.id = elementId;
    buttonEl.className = 'students-table__btn';
    buttonEl.innerText = text;
    buttonEl.type = 'button';
    buttonEl.onclick = func;
    return buttonEl;
  };

  var createTable = function() {
    loadJSON();
    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');
    var tfoot = document.createElement('tfoot');

    table.setAttribute('class', 'students-table');
    // table head
    var headText = ['Name','Surname','Age','Score', 'Actions'];
    var tr = document.createElement('tr');
    for(var h = 0; h < headText.length; h++) {
      var th = document.createElement('th');
      th.innerText = headText[h];
      tr.appendChild(th);
    }
    thead.appendChild(tr);
    table.appendChild(thead);
    // table body
    for(var i = 0; i < studentsCount; i++){
      var tr = document.createElement('tr');
      tr.id = i;
      for (var j = 0; j < items.length; j++) {
        var item = students[i][items[j]];
        var td = document.createElement('td');
        if (j === items.length - 2) {
          td.setAttribute('data-score', item);
        }
        if (j === items.length - 1) {
          var btnDelete = appendButton('btn-delete', 'Delete', onDelete);
          var btnEdit = appendButton('btn-edit', 'Edit', onEdit);
          btnDelete.setAttribute('data-id', i);
          btnEdit.setAttribute('data-id', i);

          td.appendChild(btnDelete);
          td.appendChild(btnEdit);
        } else {
          td.innerHTML =  item;
        }
        tr.appendChild(td);
      }
      tbody.id = 'students-body';
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    // table footer
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.setAttribute('colspan','5');
    tr.appendChild(td);
    tfoot.appendChild(tr);
    table.appendChild(tfoot);
    document.getElementById('data').appendChild(table);
  };

  var countScore = function() {
    var count = 0;
    var scoreElement = document.querySelector('[colspan="5"]');
    var scoreDataElement = Array.from(document.querySelectorAll('[data-score]'));
    for (var c=0; c < scoreDataElement.length; c++) {
      count += +scoreDataElement[c].dataset.score;
    }
    scoreElement.innerHTML = (count/scoreDataElement.length).toFixed(2);
  };

  const formDataToJSON = elements => [].reduce.call(elements, (item, element) => {
    if (element.name) {
      item[element.name] = (element.name === 'age' || element.name === 'score') ? +element.value : element.value;
    }
    return item;
  }, {});

  var updateTable = function(formData) {
    var row = document.getElementById(editRowId);
    for (var r = 0; r < items.length-1; r++) {
      row.cells[r].innerHTML = formData.row;
    }

    students[editRowId].firstName = formData.firstName;
    students[editRowId].surname = formData.surname;
    students[editRowId].age =formData.age;
    students[editRowId].score =formData.score;

    countScore();
    formEl.reset();
  };

  var addRow = function(formData) {
    var tbodyEl = document.getElementById('students-body');
    formData.id = students.length +1;
    students.push(formData);
    var trEl = document.createElement('tr');
    trEl.id = formData.id;
    for (var j = 0; j < items.length; j++) {
      var item = formData[items[j]];
      var tdEl = document.createElement('td');
      if (j === items.length - 2) {
        tdEl.setAttribute('data-score', item);
      }
      if (j === items.length - 1) {
        var btnDelete = appendButton('btn-delete', 'Delete', onDelete);
        var btnEdit = appendButton('btn-edit', 'Edit', onEdit);
        btnDelete.setAttribute('data-id', formData.id);
        btnEdit.setAttribute('data-id', formData.id);
        tdEl.appendChild(btnDelete);
        tdEl.appendChild(btnEdit);
      } else {
        tdEl.innerHTML =  item;
      }
      trEl.appendChild(tdEl);
    }
    tbodyEl.appendChild(trEl);
    countScore();
  };

  var getFormData = function() {
    const handleFormSubmit = event => {
      event.preventDefault();
      const formData = formDataToJSON(formEl.elements);
      if (isEditBtn) {
        updateTable(formData);
      } else {
        addRow(formData);
      }
      isEditBtn = false;
    };
    formEl.addEventListener('submit', handleFormSubmit);
  };

  return {
    createTable: createTable,
    countScore: countScore,
    getFormData: getFormData
  }

})();

myGradesCalculate.createTable();
myGradesCalculate.countScore();
myGradesCalculate.getFormData();
