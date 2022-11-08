window.cornerConfirm = ({
  title = "",
  content = "",
  onOk = () => {},
  onCancel = () => {},
  cancelText,
  okText,
} = {}) => {
  const cancelBtn = document.createElement("button");
  cancelBtn.classList.add("corner-modal-cancel-button");
  cancelBtn.innerHTML = cancelText;
  const close = () => {
    confirmBody.remove();
  };
  const handleCancel = async () => {
    await onCancel();
    close();
  };
  cancelBtn.addEventListener("click", handleCancel);

  const okBtn = document.createElement("button");
  okBtn.classList.add("corner-modal-ok-button");
  okBtn.innerHTML = okText;
  const handleOk = async () => {
    await onOk();
    close();
  };
  okBtn.addEventListener("click", handleOk);

  const modalFooter = document.createElement("div");
  modalFooter.classList.add("corner-modal-footer");
  cancelText && modalFooter.append(cancelBtn);
  okText && modalFooter.append(okBtn);

  const modalHeaderTitle = document.createElement("div");
  modalHeaderTitle.classList.add("corner-modal-header-title");
  modalHeaderTitle.innerHTML = title;

  const modalHeaderClose = document.createElement("div");
  modalHeaderClose.classList.add("corner-modal-header-close");
  modalHeaderClose.addEventListener("click", close);
  modalHeaderClose.innerHTML = "×";

  const modalHeader = document.createElement("div");
  modalHeader.classList.add("corner-modal-header");
  modalHeader.append(modalHeaderTitle, modalHeaderClose);

  const modalBody = document.createElement("div");
  modalBody.classList.add("corner-modal-body");
  modalBody.innerHTML = content;

  const modalWrap = document.createElement("div");
  modalWrap.classList.add("corner-modal-wrap", "corner-modal-position");
  modalWrap.append(modalHeader, modalBody, modalFooter);

  const modalMask = document.createElement("div");
  modalMask.classList.add("corner-modal-mask");
  modalMask.addEventListener("click", close);

  const confirmBody = document.createElement("div");
  confirmBody.classList.add("corner-modal-root");
  confirmBody.setAttribute("tabindex", "-1");

  confirmBody.append(modalMask, modalWrap);

  const handlePressESC = (e) => {
    if (e.keyCode === 27) {
      close();
    }
  };
  confirmBody.addEventListener("keydown", handlePressESC);

  document.body.appendChild(confirmBody);
  confirmBody.focus();
};
