const containers = document.querySelectorAll('.dropzone')

document.addEventListener('dragstart', (e) => {
  if (e.target.classList.contains('draggable')) {
    e.target.classList.add('dragging')
  }
})

document.addEventListener('dragend', (e) => {
  if (e.target.classList.contains('draggable')) {
    e.target.classList.remove('dragging')
  }
})

containers.forEach((container) => {
  container.addEventListener('dragover', (e) => {
    e.preventDefault()
    const draggable = document.querySelector('.dragging')
    const afterElement = getDragAfterElement(container, e.clientY)
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}
