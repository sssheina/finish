// let openRequest = indexedDB.open(planer, 1);
const inbox = document.querySelector(".inbox__input");
const inboxButton = document.querySelector(".inbox__button");
const placeInboxList = document.querySelector(".inbox__listItems");
// const buttonInboxEdit = document.querySelector(".inbox__btn-edit");
const buttonInboxDelite = document.querySelector(".inbox__btn-delite");
let inboxItem = document.querySelector(".inbox__item");
let modalWindow = document.getElementById("overlay");
let btnClosePopup = document.getElementById("close");
let nameModal = document.querySelector(".window_name");
const headerButton = document.querySelector(".header__button")
const modalButton = document.querySelector(".modal__button");
const modalInput = document.getElementById("modalInput");
const modalCategory = document.querySelector(".modal__category");
const modalType = document.querySelector(".modal__type");
const modalDate = document.getElementById("date_type");
const modalContext = document.getElementById("context_type");
const typeMenuProject = document.querySelector(".menu__item_submenu-projects");
const typeMenuQuick = document.querySelector(".menu__item_submenu-quick");
const typeMenuReference = document.querySelector(".menu__item_submenu-reference");
const typeMenuWaiting = document.querySelector(".menu__item_submenu-waiting");

let arrayInbox = [];
let arrayEditedTask = [];
let currObjId = giveId();

// проверяет, записан ли последний выданный id в локальное хранилище, если нет - дает 0, если да - забирает значение
function giveId() {
  let id = "";
  if (localStorage.getItem("lastTaskId") === null) {
    id = 0;
  } else {
    id = Number(localStorage.getItem("lastTaskId")) + 1;
  }
  return id;
}

// глобальная переменная для сохранения обрабатываемого таска из функции findTask
let currentObject = "";
// переменная для карточки таска, записывается по нажатию на кнопку редактирования
let taskCard = "";


// создает объект из таска и записывает его в массив
function createTaskObject() {
  const objInbox = {
    id: currObjId++,
    name: inbox.value,
  }
  arrayInbox.push(objInbox);

  // сохраняем массив входящих
  localStorage.setItem('arrayInbox', JSON.stringify(arrayInbox));

  // сохраняем в локальное хранилище последний использованный Id
  localStorage.setItem('lastTaskId', JSON.stringify(objInbox.id));
}


// _________________________________________________________________


// по нажатию на кнопку редактирования у определенного таска вызывается эта функция
function findTask(el) {
  // забирает id из родительского элемента, который мы дали при создании карточки таска в createCard 
  const id = el.parentNode.id;
  console.log(id);
  let task = "";
  // находит в массиве тасков соответсвующий таск по id
  if (window.location.href.split('/').at(-1) == "index.html") {
    task = arrayInbox.find(el => el.id == id);
  } else if (window.location.href.split('/').at(-1) != "index.html") {
    task = arrayEditedTask.find(el => el.id == id);
  }
  // передает имя таска в showTitle
  showTitle(task.name);
  // записывает в глобальную переменную найденный объект, чтобы передавать его в другие функции
  currentObject = task;
  taskCard = el.parentNode;
  // validateModalWindow(arrayReference);
}

// засовывает имя таска в модальное окно
function showTitle(title) {
  nameModal.innerHTML = `${title}`;
  modalInput.innerHTML = `${title}`;
}

const createСard = (obj) => {
  const block = document.createElement('li');
  block.className = "inbox__listItem";

  const check = document.createElement('div');
  check.className = "inbox__inputfield";

  const labelCheck = document.createElement('label');
  labelCheck.className = "inbox__check check";

  const inputCheck = document.createElement('input');
  inputCheck.className = "inbox__input-check";
  inputCheck.setAttribute("type", "checkbox");

  const checkmark = document.createElement('span');
  checkmark.className = "inbox__checkmark checkmark";

  const item = document.createElement('p');
  item.className = "inbox__item";
  item.textContent = `${inbox.value}`;

  const buttonEdit = document.createElement('button');
  buttonEdit.className = "inbox__btn-edit";

  const buttonDelite = document.createElement('button');
  buttonDelite.className = "inbox__btn-delite";

  const imgButtonEdit = new Image(20, 20);
  imgButtonEdit.src = "./assets/images/pencil_white.png"
  imgButtonEdit.className = "header__buttonpic-edit";

  const imgButtonDelite = new Image(20, 20);
  imgButtonDelite.src = "./assets/images/delite_white.png"
  imgButtonDelite.className = "header__buttonpic-delite";

  block.append(check);
  block.append(item);
  block.append(buttonEdit);
  buttonEdit.append(imgButtonEdit);
  block.append(buttonDelite);
  buttonDelite.append(imgButtonDelite);
  check.append(labelCheck);
  labelCheck.append(inputCheck);
  labelCheck.append(checkmark);

  // проходится по записанным в массив таскам
  arrayInbox.forEach(el => {
    // дает создаваемому элементу block (li) id, доставая его из объекта
    block.setAttribute("id", `${el.id}`);
    // дает создаваемой кнопке редкатирования onClick, который по нажатию отправляет элемент в функцию findTask
    buttonEdit.setAttribute("onClick", "findTask(this)");
    // дает создаваемому чекбокчу onClick, который по нажатию отправляет элемент в функцию checkBox
    inputCheck.setAttribute("onClick", "checkBox(this)");
  })

  return block;
}

const addCard = (objItem,) => {
  const item = createСard(objItem);
  placeInboxList.appendChild(item);
}

// проверка нахождения пользователя на главной странице
if (window.location.href.split('/').at(-1) == "index.html") {

  // слушатель для инпута по кнопке "Enter" на главной
  inbox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      validateInboxTask();
    }
  });


  function validateInboxTask() {
    const inboxErr = document.querySelector('.inboxErr');

    if (inbox.value == "") {
      inboxErr.textContent = "Пожалуйста, запишите входящее дело!";
      inbox.style.border = "2px solid red";
    } else {
      inbox.style.border = '2px solid #d5dbd9';
      inboxErr.textContent = "";

      createTaskObject();
      createСard();
      addCard();

      inbox.value = "";
    }
  }
  // слушатель кнопки "Сохранить" на главной
  inboxButton.addEventListener("click", () => {
    validateInboxTask();
  });
};

// КНОПКИ УДАЛИТЬ И РЕДАКТИРОВАТЬ_______________________________

placeInboxList.addEventListener('click', (event) => {
  if (event.target.classList.contains('inbox__btn-delite')) {
    let id = event.target.parentNode.id;
    event.target.parentNode.remove();
    deleteFromArray(id);

  } else if (event.target.parentNode.classList.contains('inbox__btn-delite')) {
    let id = event.target.parentNode.parentNode.id;
    event.target.parentNode.parentNode.remove();
    deleteFromArray(id);

  } else if (event.target.classList.contains('inbox__btn-edit') || (event.target.classList.contains('header__buttonpic-edit'))) {
    modalWindow.style.display = "block";
  }
  // else if (event.target.classList.contains('overlay')) {
  //   modalWindow.style.display = "none";
  // }
})

function deleteFromArray(id) {

  if (window.location.href.split('/').at(-1) == "index.html") {
    const task = arrayInbox.find(el => el.id == id);
    let index = arrayInbox.indexOf(task);
    arrayInbox.splice(index, 1);
    UpdatedArray();
  }

  if (window.location.toString().indexOf('/3_quick.html') > 0) {

    let task = arrayQuick.find(el => el.id == id);
    let index = arrayQuick.indexOf(task);
    arrayQuick.splice(index, 1);
    UpdatedArray();

    let task1 = arrayEditedTask.find(el => el.id == id);
    index1 = arrayEditedTask.indexOf(task1);
    arrayEditedTask.splice(index1, 1);
    UpdEditedArray();
  }

  if (window.location.toString().indexOf('/4_projects.html') > 0) {
    let task = arrayProject.find(el => el.id == id);
    let index = arrayProject.indexOf(task);
    arrayProject.splice(index, 1);
    UpdatedArray();


    let task1 = arrayEditedTask.find(el => el.id == id);
    let index1 = arrayEditedTask.indexOf(task1);
    arrayEditedTask.splice(index1, 1);
    UpdEditedArray();
  }

  if (window.location.toString().indexOf('/7_reference.html') > 0) {
    let task = arrayReference.find(el => el.id == id);
    let index = arrayReference.indexOf(task);
    arrayReference.splice(index, 1);
    UpdatedArray();

    let task1 = arrayEditedTask.find(el => el.id == id);
    let index1 = arrayEditedTask.indexOf(task1);
    arrayEditedTask.splice(index1, 1);
    UpdEditedArray();
  }

  if (window.location.toString().indexOf('/8_waiting-list.html') > 0) {
    let task = arrayWaitingList.find(el => el.id == id);
    let index = arrayWaitingList.indexOf(task);
    arrayWaitingList.splice(index, 1);
    UpdatedArray();

    let task1 = arrayEditedTask.find(el => el.id == id);
    let index1 = arrayEditedTask.indexOf(task1);
    arrayEditedTask.splice(index1, 1);
    UpdEditedArray();
  }
}

// ЧЕКБОКС И СЧЕТЧИК______________________________________________________

let arrayProgressCounter = [];
let timeoutID;
let progressCounter = document.querySelector(".header__counter");
let timer;
let timer1;
let updArray;
let updArray1;

function checkBox(checkbox) {
  if ((window.location.href.indexOf("category_sorting") > 0) || (((window.location.href.indexOf("context_sorting") > 0)))) {
    const id = checkbox.parentNode.parentNode.parentNode.id;
    if (checkbox.checked) {
      deleteFromAllArrays(checkbox, id);

      timeoutID = setTimeout(() =>
        checkbox.parentNode.parentNode.parentNode.style.display = 'none', 5000
      );

      arrayProgressCounter.push(1);

    } else {
      clearEverithing();
    }
  }

  if (window.location.href.split('/').at(-1) == "index.html") {
    if (checkbox.checked) {
      const id = checkbox.parentNode.parentNode.parentNode.id;
      const task = arrayInbox.find(el => el.id == id);
      let index = arrayInbox.indexOf(task);


      timeoutID = setTimeout(() =>
        checkbox.parentNode.parentNode.parentNode.style.display = 'none', 5000
      );

      timer = setTimeout(() =>
        arrayInbox.splice(index, 1), 5000
      );

      updArray = setTimeout(() =>
        UpdatedArray(), 5000
      );

      arrayProgressCounter.push(1);

    } else {
      clearEverithing();
    }
  }

  if (window.location.toString().indexOf('/3_quick.html') > 0) {
    if (checkbox.checked) {
      const id = checkbox.parentNode.parentNode.parentNode.id;
      const task = arrayQuick.find(el => el.id == id);
      const task1 = arrayEditedTask.find(el => el.id == id);
      let index = arrayQuick.indexOf(task);
      let index1 = arrayEditedTask.indexOf(task1);

      timeoutID = setTimeout(() =>
        checkbox.parentNode.parentNode.parentNode.style.display = 'none', 5000
      );

      timer = setTimeout(() =>
        arrayQuick.splice(index, 1), 5000,
        arrayEditedTask.splice(index1, 1), 5000
      );

      updArray = setTimeout(() =>
        UpdatedArray(), 5000
      );

      updArray1 = setTimeout(() =>
        UpdEditedArray(), 5000
      );

      arrayProgressCounter.push(1);

    } else {
      clearEverithing();
    }
  }


  if (window.location.toString().indexOf('/4_projects.html') > 0) {
    if (checkbox.checked) {
      const id = checkbox.parentNode.parentNode.parentNode.id;
      const task = arrayProject.find(el => el.id == id);
      const task1 = arrayEditedTask.find(el => el.id == id);
      let index = arrayProject.indexOf(task);
      let index1 = arrayEditedTask.indexOf(task1);

      timeoutID = setTimeout(() =>
        checkbox.parentNode.parentNode.parentNode.style.display = 'none', 5000
      );

      timer = setTimeout(() =>
        arrayProject.splice(index, 1), 5000,
        arrayEditedTask.splice(index1, 1), 5000
      );

      updArray = setTimeout(() =>
        UpdatedArray(), 5000
      );

      updArray1 = setTimeout(() =>
        UpdEditedArray(), 5000
      );

      arrayProgressCounter.push(1);

    } else {
      clearEverithing();
    }
  }


  if (window.location.toString().indexOf('/7_reference.html') > 0) {
    if (checkbox.checked) {
      const id = checkbox.parentNode.parentNode.parentNode.id;
      const task = arrayReference.find(el => el.id == id);
      const task1 = arrayEditedTask.find(el => el.id == id);
      let index = arrayReference.indexOf(task);
      let index1 = arrayEditedTask.indexOf(task1);

      timeoutID = setTimeout(() =>
        checkbox.parentNode.parentNode.parentNode.style.display = 'none', 5000
      );

      timer = setTimeout(() =>
        arrayReference.splice(index, 1), 5000,
        arrayEditedTask.splice(index1, 1), 5000
      );

      updArray = setTimeout(() =>
        UpdatedArray(), 5000
      );

      updArray1 = setTimeout(() =>
        UpdEditedArray(), 5000
      );

      arrayProgressCounter.push(1);

    } else {
      clearEverithing();
    }
  }


  if (window.location.toString().indexOf('/8_waiting-list.html') > 0) {
    if (checkbox.checked) {
      const id = checkbox.parentNode.parentNode.parentNode.id;
      const task = arrayWaitingList.find(el => el.id == id);
      const task1 = arrayEditedTask.find(el => el.id == id);
      let index = arrayWaitingList.indexOf(task);
      let index1 = arrayEditedTask.indexOf(task1);

      timeoutID = setTimeout(() =>
        checkbox.parentNode.parentNode.parentNode.style.display = 'none', 5000
      );

      timer = setTimeout(() =>
        arrayWaitingList.splice(index, 1), 5000,
        arrayEditedTask.splice(index1, 1), 5000
      );

      updArray = setTimeout(() =>
        UpdatedArray(), 5000
      );

      updArray1 = setTimeout(() =>
        UpdEditedArray(), 5000
      );

      arrayProgressCounter.push(1);

    } else {
      clearEverithing();
    }
  }

  progressCounter.textContent = arrayProgressCounter.length;
  localStorage.setItem("progressCounter", JSON.stringify(arrayProgressCounter.length));
}

function clearEverithing() {
  clearTimeout(timeoutID);
  clearTimeout(timer);
  clearTimeout(updArray);
  clearTimeout(updArray1);
  arrayProgressCounter.pop();
}

function deleteFromAllArrays(check, id) {
  console.log(arrayQuick);
  let task;
  let index;
  // console.log(id);
  if (check.checked) {

    task = arrayProject.find(el => el.id == id);
    index = arrayProject.indexOf(task);

    timer = setTimeout(() =>
      arrayProject.splice(index, 1), 5000,
    );

    updArray = setTimeout(() =>
      updArrayTemplate('arrayProject', arrayProject), 5000 // тут должен передаваться нужный массив в зависимости от типа/ фунеция работает по местонахождению юзера
    );

  } else {
    clearEverithing();
  }
  if (check.checked) {

    task = arrayQuick.find(el => el.id == id);
    index = arrayQuick.indexOf(task);

    timer = setTimeout(() =>
      arrayQuick.splice(index, 1), 5000,
    );

    updArray = setTimeout(() =>
      updArrayTemplate('arrayQuick', arrayQuick), 5000
    );

  } else {
    clearEverithing();
  }
  if (check.checked) {
    task = arrayReference.find(el => el.id == id);
    index = arrayReference.indexOf(task);

    timer = setTimeout(() =>
      arrayReference.splice(index, 1), 5000,
    );

    updArray = setTimeout(() =>
      updArrayTemplate('arrayReference', arrayReference), 5000
    );

  } else {
    clearEverithing();
  }
  if (check.checked) {
    task = arrayWaitingList.find(el => el.id == id);
    index = arrayWaitingList.indexOf(task);

    timer = setTimeout(() =>
      arrayWaitingList.splice(index, 1), 5000,
    );

    updArray = setTimeout(() =>
      updArrayTemplate('arrayWaitingList', arrayWaitingList), 5000
    );

  } else {
    clearEverithing();
  }
  if (check.checked) {

    task = arrayEditedTask.find(el => el.id == id);
    index = arrayEditedTask.indexOf(task);

    timer = setTimeout(() =>
      arrayEditedTask.splice(index, 1), 5000,
    );

    updArray = setTimeout(() =>
      updArrayTemplate('editedTasks', arrayEditedTask), 5000
    );

  } else {
    clearEverithing();
  }
}

// ЗАГРУЗКА СТРАНИЦЫ________________________________________________ + добавила парсинг всех массивов!

addEventListener('DOMContentLoaded', () => {

  let lastLenghtCounter = Number(localStorage.getItem("progressCounter"));
  arrayProgressCounter.length = lastLenghtCounter;
  progressCounter.textContent = arrayProgressCounter.length;

  if (localStorage.getItem("arrayInbox") === null) {
    arrayInbox = [];
  } else {
    arrayInbox = JSON.parse(localStorage.getItem("arrayInbox"));
  }

  if (localStorage.getItem("editedTasks") === null) {
    arrayEditedTask = [];
  } else {
    arrayEditedTask = JSON.parse(localStorage.getItem("editedTasks"));
  }

  if (localStorage.getItem("arrayQuick") === null) {
    arrayQuick = [];
  } else {
    arrayQuick = JSON.parse(localStorage.getItem("arrayQuick"));
  }

  if (localStorage.getItem("arrayProject") === null) {
    arrayProject = [];
  } else {
    arrayProject = JSON.parse(localStorage.getItem("arrayProject"));
  }
  if (localStorage.getItem("arrayReference") === null) {
    arrayReference = [];
  } else {
    arrayReference = JSON.parse(localStorage.getItem("arrayReference"));
  }

  if (localStorage.getItem("arrayWaitingList") === null) {
    arrayWaitingList = [];
  } else {
    arrayWaitingList = JSON.parse(localStorage.getItem("arrayWaitingList"));
  }

  if (window.location.toString().indexOf('/index.html') > 0) {
    insertTasks(arrayInbox);
  }

});
// МЕНЮ________________________________________________________  _

// показывает выбранный пункт меню, выдавая класс с цветом
const menuItems = document.querySelectorAll('.menu__item');

menuItems.forEach(el => {
  el.addEventListener('click', function () {
    removeClassSelected();
    el.classList.add('menu__item_selected');
  });
});

function removeClassSelected() {
  menuItems.forEach(el => {
    el.classList.remove('menu__item_selected');
  })
};

// открывает и закрывает под-меню по клику + закрывает соседние
const submenu = document.querySelectorAll('.menu__item_withSubmenu');

submenu.forEach(el => {
  el.addEventListener('click', function () {

    if (el.classList.contains("menu__item_submenu_selected")) {
      el.classList.remove("menu__item_submenu_selected")
    } else {
      hideOtherSubmenu();
      el.classList.add('menu__item_submenu_selected');
    }

  });
});

function hideOtherSubmenu() {
  submenu.forEach(el => {
    el.classList.remove('menu__item_submenu_selected');
  })
};

// --------------- МОДАЛЬНОЕ ОКНО 1 -------------
let arrayProject = [];
let arrayReference = [];
let arrayQuick = [];
let arrayWaitingList = [];


function closePopup() {
  modalWindow.style.display = "none";
};


// висит на онклике кнопки "Сохранить" в модальном окне
function addValues() {
  // нужный объект найден в функции findTask и записан в глобальную переменную currentObject
  // забирает все значения из полей, записывает их в объект и выводит объект в консоль

  let name = document.getElementById("modalInput").value;
  let type = document.getElementById("case_type");
  let category = document.getElementById("project_category");
  let context = document.getElementById("context_type");
  let data = document.getElementById("date_type");

  const modalTypeErr = document.querySelector('.type_error_message');
  const modalCategoryErr = document.querySelector('.category_error_message')
  if (type.value == "") {
    modalTypeErr.textContent = "Пожалуйста, укажите тип";
    type.style.border = "1px solid red";
  }
  if (category.value == "") {
    modalCategoryErr.textContent = "Пожалуйста, укажите категорию";
    category.style.border = "1px solid red";
  }
  if ((type.value != "") && (category.value != "")) {
    type.style.border = '1px solid #d5dbd9';
    category.style.border = '1px solid #d5dbd9';

    modalTypeErr.textContent = "";
    modalCategoryErr.textContent = "";


    currentObject.name = `${name}`;
    currentObject.type = `${type.value}`;
    currentObject.category = `${category.value}`;
    currentObject.context = `${context.value}`;
    currentObject.data = `${data.value}`;
    arrayEditedTask.push(currentObject);


    let index = arrayInbox.indexOf(currentObject);
    arrayInbox.splice(index, 1);
    localStorage.setItem("editedTasks", JSON.stringify(arrayEditedTask));
    UpdatedArray();
    // удаление карточки таска
    taskCard.remove();
    sortByType();

    localStorage.setItem("arrayProject", JSON.stringify(arrayProject));
    localStorage.setItem("arrayReference", JSON.stringify(arrayReference));
    localStorage.setItem("arrayQuick", JSON.stringify(arrayQuick));
    localStorage.setItem("arrayWaitingList", JSON.stringify(arrayWaitingList));
    // закрытие модального окна
    closePopup();
    // очищение полей модального окна
    type.value = "";
    category.value = "";
    context.value = "";
    data.value = "";
  }
}





// let type = document.getElementById("case_type");
// let context = document.getElementById("context_type");
// let data = document.getElementById("date_type");
// type.addEventListener('change', (event) => {
//   if (type.value === 'Справочные материалы') {
//     context.disabled = true;
//     data.disabled = true;
//   }
//   if (type.value === 'Лист ожидания') {
//     context.disabled = true;
//     data.disabled = true;
//   }
// });
// function isEmpty() {

// }


function UpdatedArray() {
  if (window.location.href.split('/').at(-1) == "index.html") {
    updArrayTemplate('arrayInbox', arrayInbox);
  }

  if (window.location.toString().indexOf('/3_quick.html') > 0) {
    updArrayTemplate('arrayQuick', arrayQuick);
  }
  if (window.location.toString().indexOf('/4_projects.html') > 0) {
    updArrayTemplate('arrayProject', arrayProject);
  }

  if (window.location.toString().indexOf('/7_reference.html') > 0) {
    updArrayTemplate('arrayReference', arrayReference);
  }

  if (window.location.toString().indexOf('/8_waiting-list.html') > 0) {
    updArrayTemplate('arrayReference', arrayWaitingList);
  }
};

function updArrayTemplate(name, arr) {
  localStorage.setItem(name, JSON.stringify(arr));
}

function UpdEditedArray() {
  localStorage.removeItem("editedTasks");
  localStorage.setItem("editedTasks", JSON.stringify(arrayEditedTask));
}

function sortByType() {

  if (currentObject.type === 'Проекты') {
    arrayProject.push(currentObject);
  } else if (currentObject.type === 'Быстрые дела') {
    arrayQuick.push(currentObject);
  } else if (currentObject.type === 'Справочные материалы') {
    arrayReference.push(currentObject);
  } else if (currentObject.type === 'Лист ожидания') {
    arrayWaitingList.push(currentObject);
  }

};

// загрузка массива проекты на страницу проекты с отрисовкой + arrayEditedTask

if (window.location.toString().indexOf('/4_projects.html') > 0) {
  document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("arrayProject") === null) {
      arrayProject = [];
    } else {
      arrayProject = JSON.parse(localStorage.getItem("arrayProject"));
    }
    if (localStorage.getItem("editedTasks") === null) {
      arrayEditedTask = [];
    } else {
      arrayEditedTask = JSON.parse(localStorage.getItem("editedTasks"));
    }
    insertTasks(arrayProject);
  });
};
// загрузка массива быстрые дела & editedtasks на страницу быстрые дела с отрисовкой
if (window.location.toString().indexOf('/3_quick.html') > 0) {
  document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("arrayQuick") === null) {
      arrayQuick = [];
    } else {
      arrayQuick = JSON.parse(localStorage.getItem("arrayQuick"));
    }
    if (localStorage.getItem("editedTasks") === null) {
      arrayEditedTask = [];
    } else {
      arrayEditedTask = JSON.parse(localStorage.getItem("editedTasks"));
    }
    insertTasks(arrayQuick);
  });
};

// загрузка массива справочные материалы на страницу справочные материалы с отрисовкой + arrayEditedTask
if (window.location.toString().indexOf('/7_reference.html') > 0) {
  document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("arrayReference") === null) {
      arrayReference = [];
    } else {
      arrayReference = JSON.parse(localStorage.getItem("arrayReference"));
    }
    if (localStorage.getItem("editedTasks") === null) {
      arrayEditedTask = [];
    } else {
      arrayEditedTask = JSON.parse(localStorage.getItem("editedTasks"));
    }
    insertTasks(arrayReference);
  });
};

// загрузка массива лист ожилания на страницу лист ожидания с отрисовкой + arrayEditedTask
if (window.location.toString().indexOf('/8_waiting-list.html') > 0) {
  document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("arrayWaitingList") === null) {
      arrayWaitingList = [];
    } else {
      arrayWaitingList = JSON.parse(localStorage.getItem("arrayWaitingList"));
    }
    if (localStorage.getItem("editedTasks") === null) {
      arrayEditedTask = [];
    } else {
      arrayEditedTask = JSON.parse(localStorage.getItem("editedTasks"));
    }
    insertTasks(arrayWaitingList);
  });
};
