import PropTypes from 'prop-types';
import { LoadBtn } from './Button.styled';

function Button({ onNextFetch }) {
  return (
    <LoadBtn type="button" onClick={onNextFetch}>
      Load more
    </LoadBtn>
  );
}

Button.prototype = {
  onNextFetch: PropTypes.func.isRequired,
};

export default Button;
