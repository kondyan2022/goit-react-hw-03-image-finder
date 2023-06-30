import PropTypes from 'prop-types';
import ButtonMore from './Button.styled';

const Button = ({ onClick }) => (
  <ButtonMore type="button" onClick={onClick}>
    Load more
  </ButtonMore>
);

export default Button;

Button.propTypes = { onClick: PropTypes.func };
