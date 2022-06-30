import { useTheme } from './context/theme';
import './styles/global.css';

function Button({ children, style, variant = 'primary', ...props }) {
  const [theme] = useTheme();

  return (
    <button className={`button ${variant}`} style={{ ...style }} {...props}>
      {children}
    </button>
  );
}

export { Button };
