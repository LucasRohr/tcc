import React, { useState, useEffect, useRef } from 'react'
import { useModal, useTimeout } from 'app-hooks'

import './modal.style.scss'

const CONTAINER_CLASS = 'modal-container'

const Modal = () => {
  const [toggleClassAnimation, setToggleClassAnimation] = useState(CONTAINER_CLASS)
  const { isActive, content, onClose, hideModal } = useModal()
  const { addTimeout } = useTimeout()

  const modalRef = useRef(null)

  const handleClickOutside = event => {
    if (modalRef.current && modalRef.current.contains(event.target)) {
      return
    }

    hideModal()
  }

  useEffect(() => {
    if (isActive) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isActive])

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
        <button onClick={closeModal} className="modal-close-button" />
        <div className="modal-content">{content}</div>
      </div>
    </div>
  )
}

export { Modal }
