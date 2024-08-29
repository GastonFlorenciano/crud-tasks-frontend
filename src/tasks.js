import { deleteTask } from "./services";

// FUNCION QUE CREA LA LOGICA PARA MOSTRAR LAS TAREAS
export const renderTasks = (task) => {
  const $taskContainer = document.createElement("div"); // CREAMOS EL CONTENEDOR PRINCIPAL PARA LAS TAREAS
  $taskContainer.classList.add(
    "p-6",
    "bg-white",
    "border",
    "border-gray-400",
    "rounded-lg",
    'shadow-gray-400',
    "shadow-lg",
    'dark:shadow-black',
    "dark:bg-gray-800",
    "dark:border-gray-700",
    'min-w-full',
    'md:min-w-48'
  ); // AGREGAMOS UNA CLASE AL CONTENEDOR

  // MOSTRAMOS EL TITULO
  const $taskTitle = document.createElement("p");

  $taskTitle.classList.add(
    "mb-2",
    "text-2xl",
    "font-bold",
    "tracking-tight",
    "text-gray-900",
    "dark:text-white"
  ); // AGREGAMOS LA CLASE task-title
  $taskTitle.textContent = task.title; // LE ASIGNAMOS EL TITULO QUE NOS VIENE DEL SERVIDOR

  // SI LA TAREA POR DEFECTO YA ESTA COMPLETA TACHAMOS EL TITULO
  if (task.isComplete) {
    $taskTitle.style.textDecoration = "line-through";
  }

  $taskContainer.appendChild($taskTitle); // AGREGAMOS EL TITULO AL CONTENEDOR

  // MOSTRAMOS LA DESCRIPCION
  const $taskDescription = document.createElement("p");

  $taskDescription.classList.add(
    "mb-3",
    "font-normal",
    "text-gray-700",
    "dark:text-gray-400"
  ); // AGREGAMOS LA CLASE task-description
  $taskDescription.textContent = task.description; // LE ASIGNAMOS LA DESCRIPCION QUE NOS VIENE DEL SERVIDOR

  // SI LA TAREA POR DEFECTO YA ESTA COMPLETA TACHAMOS LA DESCRIPCION
  if (task.isComplete) {
    $taskDescription.style.textDecoration = "line-through";
  }

  $taskContainer.appendChild($taskDescription); // AGREGAMOS LA DESCRIPCION AL CONTENEDOR

  //creamos un div para el checkbox y el boton delete
  const $taskActions = document.createElement("div");
  $taskActions.classList.add("flex", 'gap-5', 'md:flex-col', "justify-between");
  $taskContainer.appendChild($taskActions);

  // CREAMOS UN DIV PARA EL LABEL Y EL CHECKBOX
  const $taskComplete = document.createElement("div");
  $taskComplete.classList.add("flex", "items-center");
  $taskActions.appendChild($taskComplete);

  // CREAMOS UN INPUT PARA EL CHECKBOX
  const $taskIsComplete = document.createElement("input");

  $taskIsComplete.type = "checkbox"; // ESPECIFICAMOS QUE ES UN CHECKBOX
  $taskIsComplete.checked = task.isComplete; // SI EL CHECKBOX ESTA MARCADO ENTONCES LA TAREA ESTA COMPLETA

  //insertar label al checkbox
  const $label = document.createElement("label");
  $label.textContent = "Hecho?";
  $label.classList.add("text-gray-700", "dark:text-gray-400", "mr-2");
  $taskComplete.appendChild($label);

  $taskIsComplete.addEventListener("change", async (e) => {
    task.isComplete = e.target.checked;
    $taskTitle.style.textDecoration = task.isComplete ? "line-through" : "none"; // SI LA TAREA ESTA COMPLETA TACHAMOS EL TITULO
    $taskDescription.style.textDecoration = task.isComplete
      ? "line-through"
      : "none"; // SI LA TAREA ESTA COMPLETA TACHAMOS LA DESCRIPCION
  });

  $taskComplete.appendChild($taskIsComplete);

  // CREAMOS UN BOTON PARA ELIMINAR LA TAREA
  const $taskDelete = document.createElement("button");

  $taskDelete.classList.add("task-delete");
  $taskDelete.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6 dark:text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
  </svg>
`;

  // CUANDO SE HAGA CLICK EN EL BOTON DE ELIMINAR TAREA
  $taskDelete.addEventListener("click", async () => {
    deleteTask(task.id).then(() => {
      $taskContainer.remove();
    });
  });

  $taskActions.appendChild($taskDelete);

  return $taskContainer;
};
