import { useRef, useState } from 'react'
import useClickOutside from '../hooks/use-click-outside'

const useElementIds = ({ id = `dropdown-0` }) => {
  return {
    id,
    labelId: `${id}-label`,
    menuId: `${id}-menu`,
    toggleButtonId: `${id}-toggle-button`
  }
}

const useElementsProps = ({ id, items, initialSelected, onSelect }) => {
  const initialSelectedItemIndex = items.indexOf(initialSelected)

  const [selectedIndex, setSelectedIndex] = useState(
    initialSelectedItemIndex === -1 ? 0 : initialSelectedItemIndex
  )

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const me = useRef()

  const elementIds = useElementIds({ id })

  const onToggleButton = () => setIsMenuOpen((state) => !state)

  const closeDropdown = () => setIsMenuOpen(false)

  const onKeyDown = (event) => {
    let newIndex
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        newIndex =
          selectedIndex === items.length - 1 ? selectedIndex : selectedIndex + 1
        setSelectedIndex(newIndex)
        break
      case 'ArrowUp':
        event.preventDefault()
        newIndex = selectedIndex - 1 <= 0 ? 0 : selectedIndex - 1
        setSelectedIndex(newIndex)
        break

      case 'Enter':
        isMenuOpen && onSelect(items[selectedIndex])
        break
      default:
        return
    }
  }

  const onItemClick = (event, value, index) => {
    setSelectedIndex(index)
    onSelect(value)
    setIsMenuOpen(false)
    event.stopPropagation()
  }

  const getButtonProps = ({ ...props } = {}) => ({
    id: elementIds.toggleButtonId,
    'aria-labelledby': `${elementIds.labelId} ${elementIds.toggleButtonId}`,
    'aria-haspopup': 'listbox',
    'aria-expanded': isMenuOpen,
    type: 'button',
    onClick: onToggleButton,
    onKeyDown: onKeyDown,
    ...props
  })

  const getContainerProps = ({ ...props } = {}) => ({
    ref: me,
    id: 'dropdown-container',
    ...props
  })

  const getLabelProps = ({ ...props } = {}) => ({
    id: elementIds.labelId,
    htmlFor: elementIds.toggleButtonId,
    ...props
  })

  const getMenuProps = ({ ...props } = {}) => ({
    id: elementIds.menuId,
    role: 'listbox',
    'aria-labelledby': elementIds.labelId,
    tabIndex: '-1',
    ...props
  })

  const getItemProps = ({ value, index, ...props } = {}) => ({
    role: 'option',
    'aria-selected': selectedIndex === index,
    onClick: (e) => onItemClick(e, value, index),
    ...props
  })

  useClickOutside(me, closeDropdown)

  return {
    getButtonProps,
    getContainerProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    isOpen: isMenuOpen,
    setIsOpen: setIsMenuOpen,
    selectedIndex,
    setSelectedIndex
  }
}

const DropdownSelect = (props) => {
  const { id, options, selected, onChange, label, disabled } = props

  const {
    getButtonProps,
    getContainerProps,
    getLabelProps,
    getItemProps,
    getMenuProps,
    isOpen,
    selectedIndex
  } = useElementsProps({
    id,
    initialSelected: selected,
    items: options,
    onSelect: onChange
  })

  return (
    <div {...getContainerProps()} className={isOpen ? 'open' : undefined}>
      <label {...getLabelProps()} className={disabled ? 'disabled' : undefined}>
        {label}
      </label>
      <button
        {...getButtonProps({
          disabled: disabled || options.length === 0
        })}>
        {options[selectedIndex] || 'None'}
      </button>

      <ul {...getMenuProps()}>
        {isOpen &&
          options.map((value, index) => (
            <li
              key={`dropdown-option-${value}`}
              className={selectedIndex === index ? 'selected' : undefined}
              {...getItemProps({ value, index })}>
              {value}
            </li>
          ))}
      </ul>
    </div>
  )
}

DropdownSelect.defaultProps = {
  options: [],
  selected: '',
  onChange: () => {},
  label: '',
  disabled: false
}

export default DropdownSelect
