export const getTasks = (tarea) => {
    return `
        <div id="task-cont">
            <h1>${tarea.id}</h1>
            <p>${tarea.title}</p>
            <p>${tarea.description}</p>
        </div>
    `
}