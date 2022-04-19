import PropTypes from 'prop-types';
import { Warning } from './Message.styled';

export const Message = ({ children }) => <Warning>{children}</Warning>;

Message.defaultProps = {
  children: [],
};

Message.propTypes = {
  children: PropTypes.node,
};
