import '../styles/style.css'
import { getAllTasks, postTask } from "./services";
import { renderTasks } from "./tasks";

const $app = document.querySelector('#app'); // SELECCIONAMOS EL CONTENEDOR PRINCIPAL PARA MOSTRAR LAS TAREAS
const $taskForm = document.querySelector('#form-create'); // SELECCIONAMOS EL FORMULARIO PARA CREAR TAREAS

// CARGAMOS LAS TAREAS AL INICIAR LA APLICACION
document.addEventListener('DOMContentLoaded', async () => { 

  // OBTENEMOS TODAS LAS TAREAS
  getAllTasks().then(tasks => {

    // RECORREMOS CADA TAREA
    tasks.forEach(task => {
      
      // ANEXAMOS LA TAREA AL CONTENEDOR PRINCIPAL Y LA FUNCION renderTasks NOS DEVUELVE EL CONTENEDOR CON LA TAREA
      $app.appendChild(renderTasks(task)); //

    });

  });

})

$taskForm.addEventListener('submit', async (event) => {

  event.preventDefault(); // EVITAMOS QUE EL FORMULARIO SE RECARGUE

  const $title = document.querySelector('#inp-title'); // SELECCIONAMOS EL INPUT DEL TITULO
  const $description = document.querySelector('#inp-description'); // SELECCIONAMOS EL INPUT DE LA DESCRIPCION
  const $isComplete = document.querySelector('#inp-isComplete'); // SELECCIONAMOS EL INPUT DE isComplete

  const newTask = { // CREAMOS UN OBJETO CON LOS DATOS DE LA TAREA
    title: $title.value,
    description: $description.value,
    isComplete: $isComplete.checked
  }

  // CREAMOS LA TAREA
  postTask(newTask).then(task => {

    $app.appendChild(renderTasks(task)); // ANEXAMOS LA TAREA AL CONTENEDOR PRINCIPAL
    event.target.reset(); // RESETEAMOS EL FORMULARIO

  })
})
