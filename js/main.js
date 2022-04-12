const elForm = document.querySelector(".form")
const elInput = document.querySelector(".form__input")
const elList = document.querySelector(".todo-list")

const elBtnWrapper = document.querySelector(".btns")
const elAllBtn = document.querySelector(".all-btn")
const elComplateBtn = document.querySelector(".complate-btn")
const elUnComplateBtn = document.querySelector(".uncomplate-btn")

const elAllCount = document.querySelector(".all-count")
const elComplateCount = document.querySelector(".complate-count")
const elUnComplateCount = document.querySelector(".uncomplate-count")

// const elTodoTemplate = document.querySelector(".todo-template").content

const localTodos = JSON.parse(window.localStorage.getItem("list"))

const todos = localTodos || []

renderTodos(todos, elList)

elList.addEventListener("click", evt => {
  const beClick = evt.target.matches(".delete-item")

  if (beClick) {
    const deleteBtnId = evt.target.dataset.todoId

    const findItemIndex = todos.findIndex(todo => todo.id == deleteBtnId)

    todos.splice(findItemIndex, 1)

    renderTodos(todos, elList)

    window.localStorage.setItem("list", JSON.stringify(todos))

  }
  else if (evt.target.matches(".check-item")) {
    const todoId = Number(evt.target.dataset.todoId)

    const findItem = todos.find(todo => todo.id === todoId)

    findItem.isComplate = !findItem.isComplate

    renderTodos(todos, elList)

    window.localStorage.setItem("list", JSON.stringify(todos))

  }
})

function renderTodos(arr, arrForDOM) {
  arrForDOM.innerHTML = "";

  elAllCount.textContent = todos.length

  elComplateCount.textContent = todos.filter(e => e.isComplate === true).length

  elUnComplateCount.textContent = elAllCount.textContent - elComplateCount.textContent

  const todoFragment = document.createDocumentFragment()

  arr.forEach(todo => {

    // const clonedTemplate = elTodoTemplate.cloneNode(true)

    // clonedTemplate.extContent = todo.title


    // clonedTemplate.querySelector(".todo-list-check").type = "checkbox"
    // clonedTemplate.querySelector(".todo-list-check").dataset = todo.id
    // clonedTemplate.querySelector(".todo-list-check").classList.add("check-item")

    // clonedTemplate.querySelector("todo-list-btn").classList.add("delete-item")
    // clonedTemplate.querySelector("todo-list-btn").dataset.todoId = todo.id
    // clonedTemplate.querySelector("todo-list-btn").textContent = "Delete"

    const newItem = document.createElement("li")
    const newInputCheckbox = document.createElement("input")
    const newBtn = document.createElement("button")

    newItem.textContent = todo.title

    newBtn.classList.add("delete-item")
    newBtn.textContent = "Delete"
    newBtn.dataset.todoId = todo.id

    newInputCheckbox.type = "checkbox"
    newInputCheckbox.dataset.todoId = todo.id
    newInputCheckbox.classList.add("check-item")

    if (todo.isComplate) {
      // clonedTemplate.querySelector(".todo-list-check").checked = true
      newInputCheckbox.checked = true
      // clonedTemplate.style.textDecoration = 'line-through'
      newItem.style.textDecoration = "line-through"
    }

    newItem.appendChild(newInputCheckbox)
    newItem.appendChild(newBtn)

    arrForDOM.appendChild(newItem)
  });
}

elForm.addEventListener("submit", evt => {
  evt.preventDefault();

  const elInputValue = elInput.value.trim();

  const todo = {
    id: todos.length,
    title: elInputValue,
    isComplate: false,
  }

  todos.push(todo);

  renderTodos(todos, elList);
  window.localStorage.setItem("list", JSON.stringify(todos))

  elInput.value = "";
})

elBtnWrapper.addEventListener("click", evt => {
  if (evt.target.matches(".all-btn")) {
    renderTodos(todos, elList)
  }

  if (evt.target.matches(".complate-btn")) {
    const findComplateElements = todos.filter(e => e.isComplate === true)

    renderTodos(findComplateElements, elList)
  }

  if (evt.target.matches(".uncomplate-btn")) {
    const findUnComplateElements = todos.filter(e => e.isComplate === false)

    renderTodos(findUnComplateElements, elList)
  }
})

