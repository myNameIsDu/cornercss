window.cornerConfirm = ({
  title = "",
  content = "",
  onOk = () => {},
  onCancel = () => {},
  cancelText = "cancel",
  okText = "OK",
} = {}) => {
  const cancelBtn = document.createElement("button");
  cancelBtn.classList.add("corner-modal-cancel-button");
  cancelBtn.innerHTML = cancelText;
  const handleCancel = async () => {
    await onCancel();
    confirmBody.remove();
  };
  cancelBtn.addEventListener("click", handleCancel);

  const okBtn = document.createElement("button");
  okBtn.classList.add("corner-modal-ok-button");
  okBtn.innerHTML = okText;
  const handleOk = async () => {
    await onOk();
    confirmBody.remove();
  };
  okBtn.addEventListener("click", handleOk);

  const modalFooter = document.createElement("div");
  modalFooter.classList.add("corner-modal-footer");
  modalFooter.append(cancelBtn, okBtn);

  const modalHeader = document.createElement("div");
  modalHeader.classList.add("corner-modal-header");
  modalHeader.innerHTML = title;

  const modalBody = document.createElement("div");
  modalBody.classList.add("corner-modal-body");
  modalBody.innerHTML = content;

  const modalWrap = document.createElement("div");
  modalWrap.classList.add("corner-modal-wrap", "corner-modal-position");
  modalWrap.append(modalHeader, modalBody, modalFooter);

  const modalMask = document.createElement("div");
  modalMask.classList.add("corner-modal-mask");
  modalMask.addEventListener("click", handleCancel);

  const confirmBody = document.createElement("div");
  confirmBody.classList.add("corner-modal-root");
  confirmBody.setAttribute("tabindex", "-1");

  confirmBody.append(modalMask, modalWrap);

  const handlePressESC = (e) => {
    if (e.keyCode === 27) {
      handleCancel();
    }
  };
  confirmBody.addEventListener("keydown", handlePressESC);

  document.body.appendChild(confirmBody);
  confirmBody.focus();
};
