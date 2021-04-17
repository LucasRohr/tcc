import React, { useState, useEffect, useRef } from 'react'
import { useModal, useTimeout } from 'app-hooks'

import './modal.style.scss'

const CONTAINER_CLASS = 'modal-container'

const Modal = () => {
  const [toggleClassAnimation, setToggleClassAnimation] = useState(CONTAINER_CLASS)
  const { isActive, content, onClose, hideModal, blockClose } = useModal()
  const { addTimeout } = useTimeout()

  const modalRef = useRef(null)

  const handleClickOutside = event => {
    if (modalRef.current && modalRef.current.contains(event.target)) {
      return
    }

    closeModal()
  }

  useEffect(() => {
    if (isActive && !blockClose) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isActive, blockClose])

  useEffect(() => {
    if (isActive) {
      addTimeout(() => setToggleClassAnimation(`${CONTAINER_CLASS} modal-open`), 100)
    }
  }, [isActive])

  const closeModal = () => {
    setToggleClassAnimation(`${CONTAINER_CLASS} modal-close`)

    addTimeout(() => {
      hideModal()
      onClose()
    }, 200)
  }

  if (!content || !isActive) return null

  return (
    <div className="modal-full-content">
      <div className={toggleClassAnimation} ref={modalRef}>
        {!blockClose && (
          <button onClick={closeModal} className="modal-close-button" />
        )}
        <div className="modal-content">{content}</div>
      </div>
    </div>
  )
}

export { Modal }
