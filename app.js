function createRow(name) {
  var row = document.createElement('tr');
  row.innerHTML = `<td class="panel">
<form id="update-ticket" action="#">
<div class="panel-heading">Ticket
<button type="button" class="btn btn-default" aria-label="Delete" id="row-delete">X
</button>
</div>
<div class="panel-body">${name}</div>
</form>
</td>
<td class="panel">
<div class="panel-body"><h2><span class="label label-primary">00:00</span></h2></div>
</td>`;
  return row;
}

function addRow(name) {
    var table = document.getElementById('ticket-table');
    var row = createRow(name)
    table.insertBefore(row, table.firstChild);

    row.querySelector('#row-delete').addEventListener('click', function() {
      table.removeChild(row);
    });

    // var editButton = row.querySelector('#row-edit');

    // editButton.addEventListener('click', function() {
    //   var label = row.querySelector('#ticket-name');
    //   label.removeAttribute('disabled');
    //   label.focus();
    // });
 
 }

function overlay() {
  el = document.getElementById("overlay");
  el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}


window.onload = function() {
  document.getElementById('newTicketName').addEventListener('submit', function() {
    var el = document.getElementById('addTicketName');
    var value = el.value;
    //$('tr td:last').after("<tr><td>" + value + "</td></tr>");
    // el.setAttribute('value', '');
    addRow(value);
    overlay();
    return false;
  });
};

