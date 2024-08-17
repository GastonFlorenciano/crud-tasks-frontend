import { deleteTask } from "./services"

// FUNCION QUE CREA LA LOGICA PARA MOSTRAR LAS TAREAS
export const renderTasks = (task) => {
    
    const $taskContainer = document.createElement('div') // CREAMOS EL CONTENEDOR PRINCIPAL PARA LAS TAREAS
    $taskContainer.classList.add('task-container') // AGREGAMOS UNA CLASE AL CONTENEDOR

    // // MOSTRAMOS EL ID DE LA TAREA
    // const $taskId = document.createElement('h2')

    // $taskId.classList.add('task-id'); // AGREGAMOS LA CLASE task-id
    // $taskId.textContent = task.id; // LE ASIGNAMOS EL ID QUE NOS VIENE DEL SERVIDOR

    // $taskContainer.appendChild($taskId); // AGREGAMOS EL ID AL CONTENEDOR

    // MOSTRAMOS EL TITULO
    const $taskTitle = document.createElement('p')

    $taskTitle.classList.add('task-title'); // AGREGAMOS LA CLASE task-title
    $taskTitle.textContent = task.title; // LE ASIGNAMOS EL TITULO QUE NOS VIENE DEL SERVIDOR

    // SI LA TAREA POR DEFECTO YA ESTA COMPLETA TACHAMOS EL TITULO
    if(task.isComplete) {
        $taskTitle.style.textDecoration = 'line-through';
    }

    $taskContainer.appendChild($taskTitle); // AGREGAMOS EL TITULO AL CONTENEDOR

    // MOSTRAMOS LA DESCRIPCION
    const $taskDescription = document.createElement('p')

    $taskDescription.classList.add('task-description'); // AGREGAMOS LA CLASE task-description
    $taskDescription.textContent = task.description; // LE ASIGNAMOS LA DESCRIPCION QUE NOS VIENE DEL SERVIDOR

    // SI LA TAREA POR DEFECTO YA ESTA COMPLETA TACHAMOS LA DESCRIPCION
    if(task.isComplete) {
        $taskDescription.style.textDecoration = 'line-through';
    }
    
    $taskContainer.appendChild($taskDescription); // AGREGAMOS LA DESCRIPCION AL CONTENEDOR

    // CREAMOS UN INPUT PARA EL CHECKBOX
    const $taskIsComplete = document.createElement("input");

    $taskIsComplete.type = "checkbox"; // ESPECIFICAMOS QUE ES UN CHECKBOX
    $taskIsComplete.checked = task.isComplete; // SI EL CHECKBOX ESTA MARCADO ENTONCES LA TAREA ESTA COMPLETA

    $taskIsComplete.addEventListener("change", async (e) => {

        task.isComplete = e.target.checked; 
        $taskTitle.style.textDecoration = task.isComplete ? "line-through" : "none"; // SI LA TAREA ESTA COMPLETA TACHAMOS EL TITULO
        $taskDescription.style.textDecoration = task.isComplete ? "line-through" : "none"; // SI LA TAREA ESTA COMPLETA TACHAMOS LA DESCRIPCION

    })

    $taskContainer.appendChild($taskIsComplete);

    // CREAMOS UN BOTON PARA ELIMINAR LA TAREA
    const $taskDelete = document.createElement("button");

    $taskDelete.classList.add("task-delete");
    $taskDelete.textContent = "❌";

    // CUANDO SE HAGA CLICK EN EL BOTON DE ELIMINAR TAREA
    $taskDelete.addEventListener("click", async () => {

        deleteTask(task.id).then(() => {   

            $taskContainer.remove(); 

        })

    })

    $taskContainer.appendChild($taskDelete);

    return $taskContainer;

}