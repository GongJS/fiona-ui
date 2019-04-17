import React, { Fragment, ReactElement } from 'react';
import PropTypes from 'prop-types';
import PRC from '../../helpers/prefixClass';
import combineClass from '../../helpers/combineClass';
import './dialog.scss';
import Icon from '../icon/icon';
import ReactDOM from 'react-dom';

interface IProps {
  visible?: boolean;
  position?: string;
  title?: string;
  buttons?: ReactElement[];
  onClose: React.MouseEventHandler;
  closeOnMask?: boolean;
}

const prefix = PRC('f-dialog');

const Dialog: React.FunctionComponent<IProps> = (props) => {
  const maskCloseDialog: React.MouseEventHandler = (e: React.MouseEvent) => {
    if (props.closeOnMask) {
      props.onClose(e);
    }
  }
  const dialogComp = props.visible ? <Fragment>
    <div className={`${prefix('mask')}`} onClick={maskCloseDialog}></div>
    <div className={combineClass(prefix(), prefix(props.position))}>
      <header className={prefix('header')}>
        <div className={prefix('title')}>{props.title}</div>
        <div className={`${prefix('close')}`} onClick={props.onClose}>
          <Icon name="close" />
        </div>
      </header>
      <main className={prefix('main')}>
        {props.children}
      </main>
      <footer className={prefix('footer')}>
        {
          props.buttons && props.buttons.map((btn, index) => {
            return React.cloneElement(btn, {
              key: index,
              className: prefix('footer-button')
            })
          })
        }
      </footer>
    </div>
  </Fragment> : null
  return ReactDOM.createPortal(
    dialogComp,
    document.body
  )
}

const alert = (content: string) => {
  const alertComp = <Dialog visible={true} onClose={() => {
    ReactDOM.render(React.cloneElement(
      alertComp,
      {
        visible: false
      }
    ), div);
    ReactDOM.unmountComponentAtNode(div);
    div.remove();
  }}>
    {content}
  </Dialog>;
  const div = document.createElement('div');
  document.body.append(div);
  ReactDOM.render(alertComp, div);
}

export {
  alert
}

Dialog.propTypes = {
  visible: PropTypes.bool,
  position: PropTypes.string,
  title: PropTypes.string,
  closeOnMask: PropTypes.bool
}

Dialog.defaultProps = {
  visible: false,
  position: 'center',
  title: '默认标题',
  closeOnMask: true
}

export default Dialog;
