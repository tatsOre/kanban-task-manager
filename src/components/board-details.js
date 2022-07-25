function BoardTaskItem({ data, onClick }) {
  const handleKeyDown = (event) => {
    if (
      event.key === ' ' ||
      event.key === 'Enter' ||
      event.key === 'Spacebar'
    ) {
      event.preventDefault()
      onClick()
      console.log(data.title)
    }
  }

  return (
    <li // note: read and handle aria properly, read README
      role="button"
      tabIndex="0"
      aria-pressed="false"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className="">
      <h4 className="task-title heading-m">{data.title}</h4>
      <p className="body-m">0 of {data.subtasks.length} subtasks</p>
    </li>
  )
}

export { BoardTaskItem }
