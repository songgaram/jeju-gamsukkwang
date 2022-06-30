import ReactDom from "react-dom";

const ResultModalPortal = ({ children }) => {
  const el = document.getElementById("result-modal-root");
  return ReactDom.createPortal(children, el);
};

export default ResultModalPortal;
