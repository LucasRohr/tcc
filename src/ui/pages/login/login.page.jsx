import React, { useState, useEffect } from 'react'
import './login.style.scss'
import { useRequest } from 'app-hooks'

const Login = () => {
  const { get } = useRequest('/video-service')
  const [image, setImage] = useState(null)

  useEffect(() => {
    getImage()
  }, [])

  const getImage = async () => {
    const result = await get('videos/get/1')

    if (result) {
      setImage(result)
    }
  }

  return (
    <div className="login-container">
      <span>LOGIN AAAAA</span>
      <img src={image} alt="test" />
    </div>
  )
}

export { Login }
