import { Menu, MenuButton, MenuItem, MenuList } from '@reach/menu-button'

function DropdownMenu({ board, task, onClick }) {
  return (
    <Menu>
      <MenuButton>...</MenuButton>
      <MenuList>
        <Link
          to={`/boards/${board}/${task.id}/edit`}
          state={{ backgroundLocation: `/boards/${board}` }}>
          <MenuItem>Edit</MenuItem>
        </Link>

        <MenuItem onSelect={onClick}>Delete</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default DropdownMenu
