window.onload=loadData;

function loadData() {
  const url = 
  'https://httpcode-91526.firebaseio.com/HttpCode.json';
  getData(url);
}


function getData(url) {
  const tbody = getElementById('precios');
  tbody.innerHTML = '';
  fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      let precios = data;
      return precios.map(function (precio, index) {
        let tr = createNode('tr'),
        tdStatus= createNode('td'),
        tdMessage= createNode('td'),
        tdLink = createNode('td'),
        tdAction = createNode('td');
        aAction = createNode('button');
        tdStatus.innerHTML = `${precio.Status}`;
        tdMessage.innerHTML = `${precio.Message}`;
      
        aAction.innerText = "Show";
        aAction.addEventListener('click', function()  {
			window.open(`http://localhost:3030/?status=${precio.Status}&message=${precio.Message}`,'_blank');
		}
		
	);
        append(tr, tdStatus);
        append(tr, tdMessage);
      
        append(tdAction, aAction);
        append(tr, tdAction);
        append(tbody, tr);
      })
    })
    .catch(function (error) {
      console.log(JSON.stringify(error));
    });
}




function editData() {
  const url = 
  `https://httpcode-91526.firebaseio.com/httpcode/${indexId}.json`;

  setData(url);
}

function setData(url) {
  let data = {
    Status: getElementById('Status').value,
    Message: getElementById('Message').value,

   

  }
  let fetchData = {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: new Headers()
  }
  fetch(url, fetchData).then(function (response) {
    console.log(response);
    none('formprecios');
    block('table');
    loadData();
  })
}

function getElementById(id) {
  return document.getElementById(id);
}
function setElementById(id, value) {
  return document.getElementById(id).value = value;
}
function createNode(element) {
  return document.createElement(element);
}
function append(parent, el) {
  return parent.appendChild(el);
}
function block(id) {
  document.getElementById(id).style.display = 'block';
}
function none(id) {
  document.getElementById(id).style.display = 'none';
}