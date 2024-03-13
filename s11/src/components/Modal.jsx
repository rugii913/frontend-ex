import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal({ open, children, onClose}) {
  const dialog = useRef();

  useEffect(() => {
    if (open) { // 이 코드들도 side effect라 할 수 있다 - UI에 영향을 미치나, JSX 코드를 직접 바꾸지 않는다.
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]) // effect의 dependency는 function component를 결국 다시 실행하도록 만드는 값이다.(prop 혹은 state 등등)
  // 여기서는 useEffect() 내에서 open prop을 사용하고 있다. 그리고 이는 변경될 수 있다.

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}

export default Modal;
