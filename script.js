const localStorageKey = "Todo List"

const kegiatan = document.querySelector("#inputTodoKegiatan")
const sectionkegiatan = document.querySelector("#sectionkegiatan")

const deskripsi = document.querySelector("#inputTodoDeskripsi")
const sectiondeskripsi = document.querySelector("#sectiondeskripsi")

const done = document.querySelector("#inputTodoIsComplete")

const btnSubmit = document.querySelector("#todoSubmit")


window.addEventListener("load", function(){
    if (localStorage.getItem(localStorageKey) !== null) {    
        const todosData = getData()
        showData(todosData)
    }
})

//checkbox
function checkbox() {
    var checkBox = document.getElementById("inputTodoIsComplete");
    var undone = document.getElementById("undone");
    var done = document.getElementById("done");
    if (checkBox.checked == true){
        undone.style.display = "none";
        done.style.display = "block";
    } else {
        undone.style.display = "block";
        done.style.display = "none";
    }
  }


//submit
btnSubmit.addEventListener("click", function() {
        const newTodo = {
            id: +new Date(),
            kegiatan: kegiatan.value.trim(),
            deskripsi: deskripsi.value.trim(),
            isCompleted: done.checked
        }
        insertData(newTodo)

        kegiatan.value = ''
        deskripsi.value = ''
        done.checked = false
    } 
)

//insert data to localstorage
function insertData(todo) {
  let TodoData = []


  if (localStorage.getItem(localStorageKey) === null) {
      localStorage.setItem(localStorageKey, 0);
  }else{
      TodoData = JSON.parse(localStorage.getItem(localStorageKey))
  }

  TodoData.unshift(todo)   
  localStorage.setItem(localStorageKey,JSON.stringify(TodoData))

  showData(getData())
}


//get data from localstorage
function getData() {
  return JSON.parse(localStorage.getItem(localStorageKey)) || []
}

//show data
function showData(todos = []) {
  const inCompleted = document.querySelector("#incompleteTodoshelfList")
  const completed = document.querySelector("#completeTodoshelfList")

  inCompleted.innerHTML = ''
  completed.innerHTML = ''

  todos.forEach(todo => {
      if (todo.isCompleted == false) {
          let el = `
          <article class="todo_item">
              <h3>${todo.kegiatan}</h3>
              <p>Deskripsi: ${todo.deskripsi}</p>
              <div class="action">
                  <button class="green" onclick="doneTodo('${todo.id}')">Done</button>
                  <button class="red" onclick="deleteTodo('${todo.id}')">Delete</button>
              </div>
          </article>
          `

          inCompleted.innerHTML += el
      }else{
          let el = `
          <article class="todo_item">
              <h3>${todo.kegiatan}</h3>
              <p>Deskripsi: ${todo.deskripsi}</p>
              <div class="action">
                  <button class="green" onclick="undoneTodo('${todo.id}')">Todo</button>
                  <button class="red" onclick="deleteTodo('${todo.id}')">Delete</button>
              </div>
          </article>
          `
          completed.innerHTML += el
      }
  });
}


//done Todo
function doneTodo(id) {
  let confirmation = confirm("Pindahkan ke Done?")

  if (confirmation == true) {
      const TodoDataDetail = getData().filter(a => a.id == id);
      const newTodo = {
          id: TodoDataDetail[0].id,
          kegiatan: TodoDataDetail[0].kegiatan,
          deskripsi: TodoDataDetail[0].deskripsi,
          isCompleted: true
      }

      const TodoData = getData().filter(a => a.id != id);
      localStorage.setItem(localStorageKey,JSON.stringify(TodoData))

      insertData(newTodo)
  }else{
      return 0
  }
}

//undone Todo
function undoneTodo(id) {
  let confirmation = confirm("Pindahkan ke Todo?")

  if (confirmation == true) {
      const TodoDataDetail = getData().filter(a => a.id == id);
      const newTodo = {
          id: TodoDataDetail[0].id,
          kegiatan: TodoDataDetail[0].kegiatan,
          deskripsi: TodoDataDetail[0].deskripsi,
          isCompleted: false
      }

      const TodoData = getData().filter(a => a.id != id);
      localStorage.setItem(localStorageKey,JSON.stringify(TodoData))

      insertData(newTodo)
  }else{
      return 0
  }
}

//delete Todo
function deleteTodo(id) {
  let confirmation = confirm("Yakin akan menghapusnya?")

  if (confirmation == true) {
      const TodoDataDetail = getData().filter(a => a.id == id);
      const TodoData = getData().filter(a => a.id != id);
      localStorage.setItem(localStorageKey,JSON.stringify(TodoData))
      showData(getData())
      alert(`Buku ${TodoDataDetail[0].kegiatan} telah terhapus`)
  }else{
      return 0
  }
}