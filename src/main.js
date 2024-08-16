import './style.css'
import { getTasks } from './tasks'

const API_URL = 'http://localhost:3000/tasks'

const $app = document.querySelector('#app')

const renderTasks = async () => {
 fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    data.forEach(task => {
      $app.innerHTML  += getTasks(task)
    })
  })
}

  const $createTask = document.querySelector('#form-create')

  $createTask.addEventListener('submit', (e) => {

    e.preventDefault();

    const $title = document.querySelector('#inp-title')
    const $description = document.querySelector('#inp-description')
    const $complete = document.querySelector('#inp-complete')

    

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: $title.value,
        description: $description.value,
        complete: $complete.value
      })
    })

  })

  renderTasks()

  
