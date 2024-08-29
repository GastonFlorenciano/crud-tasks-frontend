import { API_URL } from './constants.js';

// FUNCION QUE NOS PERMITE OBTENER TODAS LAS TAREAS
export const getAllTasks = async () => {

    const res = await fetch(API_URL);
    const data = await res.json();
    return data;

}

// FUNCION QUE NOS PERMITE CREAR UNA TAREA
export const postTask = async ({title, description, isComplete}) => {

    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            description,
            isComplete
        })
    }).then(response => response.json())

}

// FUNCION QUE NOS PERMITE BORRAR UNA TAREA 
export const deleteTask = async (id) => {

    return fetch(API_URL + `/${id}`, {
        method: 'DELETE'
    })
}