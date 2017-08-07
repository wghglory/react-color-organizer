/**
 * Use hoc, clicking p/button will toggle message. 
 */
import React from 'React';
import PropTypes from 'prop-types';
import ExpandableComponent from './hocs/ExpandableComponent';

// part1
const ShowHideMessage = ({ children, collapsed, expandCollapse }) =>
  (
    <p onClick={expandCollapse}>
      {(collapsed) ?
        children.replace(/[a-zA-Z0-9]/g, "x") :
        children}
    </p>
  );

ShowHideMessage.propTypes = {
  children: PropTypes.string.isRequired,
  collapsed: PropTypes.bool,
  expandCollapse: PropTypes.func.isRequired
};

const HiddenMessage = ExpandableComponent(ShowHideMessage);

// part2
const MenuButton = ({ children, collapsed, txt, expandCollapse }) =>
  (
    <div className="pop-button">
      <button onClick={expandCollapse}>{txt}</button>
      {(!collapsed) ?
        <div className="pop-up">
          {children}
        </div> :
        ""
      }
    </div>
  );

MenuButton.propTypes = {
  children: PropTypes.array.isRequired,
  collapsed: PropTypes.bool.isRequired,
  txt: PropTypes.string.isRequired,
  expandCollapse: PropTypes.func.isRequired
};

const PopUpButton = ExpandableComponent(MenuButton);

// part3 export composed
const Message = () => (
  <div>
    <HiddenMessage hidden={false}>Click here to toogle message.</HiddenMessage>
    <PopUpButton hidden={true} txt="toggle popup">
      <h1>Hidden Content</h1>
      <p>This content will start off hidden</p>
    </PopUpButton>
  </div>
);

export default Message;