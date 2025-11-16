import { useCallback, useState } from 'react';

export const useAlert = (initialState = {}) => {
  const [alert, setAlert] = useState({
    visible: false,
    type: 'info',
    title: '',
    message: '',
    buttons: [],
    ...initialState,
  });

  const showAlert = useCallback(({ type = 'info', title = '', message = '', buttons } = {}) => {
    const safeButtons = Array.isArray(buttons) && buttons.length ? buttons : [{ text: 'Aceptar' }];

    setAlert({
      visible: true,
      type,
      title,
      message,
      buttons: safeButtons,
    });
  }, []);

  const hideAlert = useCallback(() => {
    setAlert((prev) => ({ ...prev, visible: false }));
  }, []);

  const showError = useCallback((title, message, buttons) => showAlert({ type: 'error', title, message, buttons }), [showAlert]);

  const showSuccess = useCallback((title, message, buttons) => showAlert({ type: 'success', title, message, buttons }), [showAlert]);

  const showInfo = useCallback((title, message, buttons) => showAlert({ type: 'info', title, message, buttons }), [showAlert]);

  return {
    alert,
    showAlert,
    hideAlert,
    showError,
    showSuccess,
    showInfo,
  };
};

export default useAlert;
