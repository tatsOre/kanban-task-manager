import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { cx } from '../utils'
import useClickOutside from '../../hooks/use-click-outside'
import './styles.scss'
import renderLabel from '../utils/label'

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
    (el) => el.value === initialSelected
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

function SelectInput(props) {
  const {
    id,
    className,
    inputLabel,
    disabled,
    onChange,
    options,
    required,
    selected,
    showInputLabel
  } = props

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

  const buttonTextContent =
    (options[selectedIndex] && options[selectedIndex].label) || 'Select...'

  const containerClassName = cx([className, 'select-input'])

  const labelClassName = cx([
    'select-label',
    !showInputLabel && 'visually-hidden',
    disabled && 'select-label--disabled'
  ])

  return (
    <div {...getContainerProps()} className={containerClassName}>
      <label {...getLabelProps()} className={labelClassName}>
        {inputLabel}
        {required ? <span>*</span> : null}
      </label>

      <button {...getButtonProps({ disabled })} className="select-button">
        {buttonTextContent}
      </button>

      <ul {...getMenuProps()} className="select-list">
        {isOpen &&
          options.map((opt, index) => (
            <li
              key={`list-item-${opt.value}`}
              className={cx([
                'list-item',
                selectedIndex === index && 'list-item--selected'
              ])}
              {...getItemProps({ value: opt.value, index })}>
              {opt.value}
            </li>
          ))}
      </ul>
    </div>
  )
}

// TODO: - pass prop in case of errors (apperance), hint content, - use Button Component

SelectInput.propTypes = {
  /**
   * Unique identifier used for the form input component and its children
   */
  id: PropTypes.string,
  /**
   * Sets the contents of the label related to the input
   */
  inputLabel: PropTypes.string,
  /**
   * Defaults to true, but set to `false` to visibly hide the content passed to `inputLabel`.
   */
  showInputLabel: PropTypes.bool,
  /**
   * Whether or not the input is enabled
   */
  disabled: PropTypes.bool,
  /**
   * Optional change handler
   */
  onChange: PropTypes.func,
  /**
   * Array of objects that represents the Select Input options
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ),
  /**
   * Sets the initial value
   */
  selected: PropTypes.string,
  /**
   * Whether or not the input is required
   */
  required: PropTypes.bool
}

SelectInput.defaultProps = {
  inputLabel: '',
  showInputLabel: true,
  onChange: () => {},
  options: []
}

export default SelectInput
