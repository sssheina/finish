const ul = document.querySelector(".inbox__listItems")

function insertTasks(tasks) {

  tasks.forEach(el => {

    const li = document.createElement('li');
    li.className = "inbox__listItem";
    li.setAttribute("id", `${el.id}`);

    const item = document.createElement('p');
    item.className = "projects__item-name";

    const check = document.createElement('div');
    check.className = "projects__inputfield";

    const labelCheck = document.createElement('label');
    labelCheck.className = "projects__check check";

    const inputCheck = document.createElement('input');
    inputCheck.className = "projects__input-check";
    inputCheck.setAttribute("type", "checkbox");
    inputCheck.setAttribute("onClick", "checkBox(this)");

    const checkmark = document.createElement('span');
    checkmark.className = "projects__checkmark checkmark";

    ul.append(li);

    if (el.category) {
      li.className = "projects__listItem listItem";
      const category = document.createElement('div');
      category.className = "projects__category";
      if (el.category === 'Дом') {
        category.className = 'projects__category category-home';
      } else if (el.category === 'Учеба') {
        category.className = 'projects__category category-learning';
      } else if (el.category === 'Работа') {
        category.className = 'projects__category category-job';
      } else if (el.category === 'Саморазвитие') {
        category.className = 'projects__category category-self-development';
      } else if (el.category === 'Здоровье') {
        category.className = 'projects__category category-health';
      } else if (el.category === 'Отдых') {
        category.className = 'projects__category category-recreation';
      } else if (el.category === 'Хобби') {
        category.className = 'projects__category category-hobby';
      } else if (el.category === 'Идеи') {
        category.className = 'projects__category category-ideas';
      } else if (el.category === 'Хозяйство') {
        category.className = 'projects__category category-household';
      } else if (el.category === 'Спорт') {
        category.className = 'projects__category category-sport';
      } else if (el.category === 'Уход за собой') {
        category.className = 'projects__category category-self-care';
      }
      li.append(category);
    }

    labelCheck.append(inputCheck);
    labelCheck.append(checkmark);
    li.append(check);
    li.append(item);
    item.textContent = el.name;
    check.append(labelCheck);

    if (el.context) {
      li.className = "quick__listItem listItem";
      const contextItem = document.createElement('div');
      // contextItem.className = "quick__item";
      const context = document.createElement('span');
      if (el.context === 'Дом') {
        context.className = 'quick__context home-tag';
      } else if (el.context === 'Телефон') {
        context.className = 'quick__context phone-tag';
      } else if (el.context === 'Вне дома') {
        context.className = 'quick__context outdoors-tag';
      } else if (el.context === 'Компьютер') {
        context.className = 'quick__context computer-tag';
      } else if (el.context === 'Делегировано') {
        context.className = 'quick__context delegating-tag';
      } else if (el.context === 'Город') {
        context.className = 'quick__context city-tag';
      } else if (el.context === 'Школа') {
        context.className = 'quick__context school-tag';
      } else if (el.context === 'Детсад') {
        context.className = 'quick__context kindergarten-tag';
      } else if (el.context === 'Минск') {
        context.className = 'quick__context minsk-tag';
      } else if (el.context === 'Работа') {
        context.className = 'quick__context job-tag'
      }
      context.textContent = el.context;
      li.append(contextItem);
      contextItem.append(context);
    }

    const buttonEdit = document.createElement('button');
    buttonEdit.className = "inbox__btn-edit";
    buttonEdit.setAttribute("onClick", "findTask(this)");

    const buttonDelite = document.createElement('button');
    buttonDelite.className = "inbox__btn-delite";

    const imgButtonEdit = new Image(20, 20);
    imgButtonEdit.src = "./assets/images/pencil_white.png"
    imgButtonEdit.className = "header__buttonpic-edit";

    const imgButtonDelite = new Image(20, 20);
    imgButtonDelite.src = "./assets/images/delite_white.png"
    imgButtonDelite.className = "header__buttonpic-delite";

    li.append(buttonEdit);
    buttonEdit.append(imgButtonEdit);
    li.append(buttonDelite);
    buttonDelite.append(imgButtonDelite);
  });
}

