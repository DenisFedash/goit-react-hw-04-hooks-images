import PropTypes from 'prop-types';
import { LoadBtn, BtnContainer } from './Button.styled';

export const Button = ({ onClick }) => (
  <BtnContainer>
    <LoadBtn type="button" onClick={onClick}>
      Load more
    </LoadBtn>
  </BtnContainer>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
