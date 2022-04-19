import PropTypes from 'prop-types';
import { LoadBtn, BtnContainer } from './Button.styled';

function Button({ onNextFetch }) {
  return (
    <BtnContainer>
      <LoadBtn type="button" onClick={onNextFetch}>
        Load more
      </LoadBtn>
    </BtnContainer>
  );
}

Button.prototype = {
  onNextFetch: PropTypes.func.isRequired,
};

export default Button;
