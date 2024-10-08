import '../styles/style.css'
import { getAllTasks, postTask } from "./services";
import { renderTasks } from "./tasks";

const $main = document.querySelector('#main-cont'); // SELECCIONAMOS EL CONTENEDOR PRINCIPAL
const $app = document.querySelector('#app'); // SELECCIONAMOS EL CONTENEDOR PRINCIPAL PARA MOSTRAR LAS TAREAS
const $taskForm = document.querySelector('#form-create'); // SELECCIONAMOS EL FORMULARIO PARA CREAR TAREAS

$main.classList.add('flex', 'flex-col','items-center', 'justify-center', 'min-w-full'); // AGREGAMOS UNAS CLASES AL CONTENEDOR PRINCIPAL
$app.classList.add('flex', 'justify-center', 'gap-5', 'm-5','flex-wrap', 'w-full') // AGREGAMOS UNAS CLASES AL CONTENEDOR PRINCIPAL

// CARGAMOS LAS TAREAS AL INICIAR LA APLICACION
document.addEventListener('DOMContentLoaded', async () => { 

  const $noTasks = document.createElement('p'); // CREAMOS UN PARRAFO
  $noTasks.textContent = 'No hay tareas';
  
  try {

    const tasks = await getAllTasks(); // OBTENEMOS LAS TAREAS DEL SERVIDOR

    if (!Array.isArray(tasks) || tasks.length < 1) { // SI NO HAY TAREAS

      const $noTasks = document.createElement('p'); // CREAMOS UN PARRAFO
      $noTasks.textContent = 'Todavía no hay tareas'; // LE ASIGNAMOS UN TEXTO
      $app.appendChild($noTasks); // ANEXAMOS EL PARRAFO AL CONTENEDOR

    } else {

      tasks.forEach(task => { // RECORREMOS LAS TAREAS
        $app.appendChild(renderTasks(task)); // ANEXAMOS LAS TAREAS AL CONTENEDOR PRINCIPAL

      });
    }
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
  }
});

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
    window.location.reload(); // RECARGAMOS LA PAGINA

  })
})

const $toggleBtn = document.getElementById("toggle-btn");
const $darkIcon = document.getElementById("theme-toggle-dark-icon");
const $lightIcon = document.getElementById("theme-toggle-light-icon");

// Obtener el tema almacenado en localStorage
const theme = window.localStorage.getItem("theme");

// Aplicar el tema almacenado al cargar la página
if (theme === "dark") {
  document.documentElement.classList.add("dark");
  $darkIcon.classList.add("hidden");
  $lightIcon.classList.remove("hidden");
} else {
  document.documentElement.classList.remove("dark");
  $darkIcon.classList.remove("hidden");
  $lightIcon.classList.add("hidden");
}

// Alternar el tema al hacer clic en el botón
$toggleBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");

  // Obtener el tema actual
  const isDarkMode = document.documentElement.classList.contains("dark");

  // Establecer el nuevo tema en localStorage
  window.localStorage.setItem("theme", isDarkMode ? "dark" : "light");

  // Cambiar los íconos según el tema
  if (isDarkMode) {
    $darkIcon.classList.add("hidden");
    $lightIcon.classList.remove("hidden");
  } else {
    $darkIcon.classList.remove("hidden");
    $lightIcon.classList.add("hidden");
  }
});