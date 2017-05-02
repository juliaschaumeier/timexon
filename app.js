
function createRow(name) {
  var row = document.createElement('tr');
  row.innerHTML = `<tr>
    <td class="ticket">
      <div class="wrapper">
        <div class="actions">
          <div id="row-delete" title="delete" class="iconset_16px"> x</div>
        </div>
      </div>Ticket<br><br>${name}
    </td>
    <td id="timer">* 00:00 *</td>`;
  return row;
}

var activeRow;

function addRow(name) {
    var table = document.getElementById('ticket-table');
    var row = createRow(name)
    table.insertBefore(row, table.firstChild);

    function setActiveRow() {
      if (activeRow) {
        activeRow.classList.remove('active');
      }
      row.classList.add('active');
      activeRow = row;
    }

    row.querySelector('#row-delete').addEventListener('click', function() {
      table.removeChild(row);
      activeRow = null;
    });

    row.querySelector('.ticket').addEventListener('click', function() {
      setActiveRow();
    });

    setActiveRow();
 }

function calculateTime(row) {
  var elapsedTime = 0;
  var cells = row.querySelectorAll('td');
  for (var i = 0; i < cells.length; i += 1) {
    let cell = cells[i];
    let time = cell.getAttribute('time');
    if (time) {
      elapsedTime += parseInt(time);
    }
  };
  var totalMinutes = elapsedTime / 60000;
  var elapsedHours = Math.floor(totalMinutes / 60).toFixed();
  if (elapsedHours.length === 1) {
    elapsedHours = '0' + elapsedHours
  }
  var elapsedMinutes = (totalMinutes  % 60).toFixed();
  if (elapsedMinutes.length === 1) {
    elapsedMinutes = '0' + elapsedMinutes
  }
  row.querySelector('#timer').innerText = `* ${elapsedHours}:${elapsedMinutes} *`
}

function overlay(name) {
  el = document.getElementById(name || "overlay");
  el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}

function fillStartStop(start, end) {
  const day = start.toLocaleDateString();
  const from = start.toLocaleTimeString().substring(0, 5);
  const to = end ? end.toLocaleTimeString().substring(0, 5) : '??';
  return `<ul>
    <li>${day}</li>
    <li>from: ${from}</li>
    <li>till: ${to}</li>
  </ul>`;
}

window.onload = function() {
  document.getElementById('newTicketName').addEventListener('submit', function() {
    var el = document.getElementById('addTicketName');
    var value = el.value;
    addRow(value);
    overlay();
    return false;
  });
  document.getElementById('startstop').addEventListener('click', function() {
    if (activeRow) {
      var targetRow = activeRow;
      var startTime = new Date();
      var cell = document.createElement('td');
      cell.innerHTML = fillStartStop(startTime);
      if (targetRow.children.length === 2) {
        targetRow.appendChild(cell);
      } else {
        targetRow.insertBefore(cell, targetRow.children[2]);
      }

      var setEndTime = function() {
        var endTime = new Date();
        var diff = endTime - startTime;
        cell.innerHTML = fillStartStop(startTime, endTime);
        cell.setAttribute('time', diff);
        calculateTime(targetRow);
        cell.removeEventListener('click', setEndTime);
        cell.addEventListener('click', function() {
          overlay('startstopoverlay');
          document.getElementById('alterStart').value = startTime.toLocaleTimeString().substring(0, 5);
          document.getElementById('alterStop').value = endTime.toLocaleTimeString().substring(0, 5);
          document.getElementById('alterStartStop').addEventListener('submit', function() {
            var ss = document.getElementById('changeStartStop');
            var startTime = ss.startTime;
            var endTime = ss.endTime;
            cell.innerHTML = fillStartStop(startTime, endTime);
            cell.setAttribute('time', diff);
            calculateTime(targetRow);
            overlay('startstopoverlay');
            return false;
          });
        });
      }
      cell.addEventListener('click', setEndTime);
    }
  });
};

