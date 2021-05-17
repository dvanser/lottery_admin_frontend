import React, { useEffect, useRef } from 'react';
import modalStyle from './ModalStyles.module.scss';
import { Button } from './../Button';


export const Modal = ({ children, className, modalIsOpen, buttons, toggleModal, buttonsInColumn, ...classes }) => {

    const modalClass = Object.entries(classes).map(([key, value]) =>
        modalStyle[key] !== undefined ? modalStyle[key] : '').join(' ') + ' ' + (className ? className : '');

    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                toggleModal();
            };
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [ toggleModal ]);

    return (
        <>
            {modalIsOpen ?
                <div className={modalStyle.modalContainer}>
                    <div ref={ref} className={modalClass + ' ' + modalStyle.modalBox}>
                        <div className={modalStyle.modalContent}>
                        { children }
                        </div>
                        { buttons ?
                            <div className={buttonsInColumn ? modalStyle.buttonColumn : modalStyle.buttonRow}>
                                {Object.entries(buttons).map(([key, value], idx) =>
                                    <Button onClick={value} className={(idx % 2 === 0 ? modalStyle.blueButton : modalStyle.grayButton) + ' ' + modalStyle.buttonStyle}><div>{key}</div></Button>
                                )}
                            </div> : null
                        }
                    </div>
                </div> : null}
        </>
    );
};