'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import css from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void; 
}

export const Modal = ({ children, onClose }: ModalProps) => {
  const router = useRouter();

  const handleClose = () => {
    if (onClose) {
      onClose(); 
    } else {
      router.back(); 
    }
  };

  return (
    <div className={css.backdrop} onClick={handleClose}>
      <div className={css.content} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={handleClose}>×</button>
        {children}
      </div>
    </div>
  );
};