import { useRef, useState } from 'react'
import { cx } from '../utils'
import useClickOutside from '../../hooks/use-click-outside'
import './styles.scss'

const useElementIds = ({ id = 'select' }) => {
  return {
    id,
    labelId: `${id}-label`,
    menuId: `${id}-menu`,
    toggleButtonId: `${id}-toggle-button`
  }
}

/**
 *
 * React Custom Hook that retrieves the methods and variables needed to initialize the Select Component
 * @returns
 *     getButtonProps       Methods and attributes for Select toggle button element
 *     getContainerProps    Attributes for Select wrapper element
 *     getItemProps
 *     getLabelProps
 *     getMenuProps
 *     isOpen               true | false - Current state of the Listbox element
 *     selectedIndex        Index of the selected item
 */

const useElementsProps = ({ id, items, initialSelected, onSelect }) => {
  const initialSelectedItemIndex = items.findIndex(
    (el) => el.value == initialSelected
  )

  const [selectedIndex, setSelectedIndex] = useState(initialSelectedItemIndex)

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
        isMenuOpen && onSelect(items[selectedIndex].value)
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

  const getButtonProps = ({ disabled, ...props } = {}) => ({
    id: elementIds.toggleButtonId,
    'aria-labelledby': `${elementIds.labelId} ${elementIds.toggleButtonId}`,
    'aria-haspopup': 'listbox',
    'aria-expanded': isMenuOpen,
    type: 'button',
    onClick: onToggleButton,
    onKeyDown: onKeyDown,
    disabled: disabled || items.length === 0,
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
    selectedIndex
  }
}

/**
 *
 * @param id           String     Unique identifier used for the form input component and its children
 * @param inputLabel   String     Sets the contents of the input label.
 * @param disabled     Boolean    If the button is enabled
 * @param onChange     Function   Method triggered when an item is selected
 * @param options      Array      Array of objects that represents the Select Input options.
 *                                Schema: [{ label: String, value: String }]
 * @param selected     String     Selected initial value
 * @returns            React Component
 */

// TODO: - pass prop in case of errors, - use Button Component

function SelectInput(props) {
  const { id, inputLabel, disabled, onChange, options, selected } = props

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
    <div
      {...getContainerProps()}
      className={cx([isOpen && 'open', 'select-input'])}>
      <label {...getLabelProps()} className={cx([disabled && 'disabled'])}>
        {inputLabel}
      </label>
      <button {...getButtonProps({ disabled })}>
        {(options[selectedIndex] && options[selectedIndex].label) ||
          'Select...'}
      </button>

      <ul {...getMenuProps()}>
        {isOpen &&
          options.map((opt, index) => (
            <li
              key={`dropdown-option-${opt.value}`}
              className={cx([selectedIndex === index && 'selected'])}
              {...getItemProps({ value: opt.value, index })}>
              {opt.value}
            </li>
          ))}
      </ul>
    </div>
  )
}

SelectInput.defaultProps = {
  inputLabel: '',
  disabled: false,
  onChange: () => {},
  options: [],
  selected: ''
}

export default SelectInput
