import { cx } from '../utils'
import './styles.scss'

function HeadingBase(props) {
  const { align, className, children, tag, ...other } = props
  const tagElements = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6'
  }
  const HeadingComponent = tagElements[tag]
  return (
    <HeadingComponent className={className} children={children} {...other} />
  )
}

HeadingBase.defaultProps = {
  tag: 'h1'
}

export function HeadingStandard(props) {
  const { className, ...other } = props
  return <HeadingBase className={cx([className])} {...other} />
}

export function HeadingXL(props) {
  const { className, ...other } = props
  return <HeadingBase className={cx(['heading-xl', className])} {...other} />
}

export function HeadingL(props) {
  const { className, ...other } = props
  return <HeadingBase className={cx(['heading-l', className])} {...other} />
}

export function HeadingM(props) {
  const { className, ...other } = props
  return <HeadingBase className={cx(['heading-m', className])} {...other} />
}

export function HeadingS(props) {
  const { className, ...other } = props
  return <HeadingBase className={cx(['heading-s', className])} {...other} />
}
