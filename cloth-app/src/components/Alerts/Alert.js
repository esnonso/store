import { Fragment } from "react";
import ReactDOM from "react-dom";
import "./Alert.css";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClick}></div>;
};

export const SucessAlert = (props) => {
  return <div className="success-alert">{props.children}</div>;
};

export const FailAlert = (props) => {
  return <div className="fail-alert">{props.children}</div>;
};

const SucessModalAlert = (props) => {
  return <div className="success-modal-alert">{props.children}</div>;
};

const FailModalAlert = (props) => {
  return <div className="fail-modal-alert">{props.children}</div>;
};

export const SucessModal = (props) => {
  const portalDivNode = document.getElementById("overlays");
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClose} />,
        portalDivNode
      )}
      {ReactDOM.createPortal(
        <SucessModalAlert>{props.children}</SucessModalAlert>,
        portalDivNode
      )}
    </Fragment>
  );
};

export const FailModal = (props) => {
  const portalDivNode = document.getElementById("overlays");
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClose} />,
        portalDivNode
      )}
      {ReactDOM.createPortal(
        <FailModalAlert>{props.children}</FailModalAlert>,
        portalDivNode
      )}
    </Fragment>
  );
};
