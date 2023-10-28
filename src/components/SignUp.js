import React, { useRef, useEffect } from 'react'
import '../App.css'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function SignUpModal({ handleClose, open }) {
  const modalRef = useRef(null)
  const modalContentRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalContentRef.current.contains(e.target)) {
        console.log('Click was outside the modal content, closing modal.')
        handleClose()
      }
    }

    if (open && modalRef.current) {
      modalRef.current.addEventListener('click', handleClickOutside)
    }

    return () => {
      if (modalRef.current) {
        modalRef.current.removeEventListener('click', handleClickOutside)
      }
    }
  }, [open, handleClose])

  const modalClass = open ? 'signup-modal-overlay' : 'signup-modal-overlay hidden'

  //signing users up
  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      const email = e.target.elements.email.value
      const password = e.target.elements.password.value
      console.log(email, password)
      const auth = getAuth()

      const userCred = createUserWithEmailAndPassword(auth, email, password)
      console.log(userCred)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={modalClass} ref={modalRef}>
      <div className='signup-modal' ref={modalContentRef} onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} className='close-btn'>
          X
        </button>
        <h2>Sign Up</h2>
        {/* <form className='sign-up' onSubmit={handleSignUp}> */}
        {/* <input name='firstName' type='text' placeholder='First Name' />
          <input name='lastName' type='text' placeholder='Last Name' /> */}
        {/* <input name='email' type='email' placeholder='Email' />
          <input name='password' type='password' placeholder='Password' />
          <input name='confirmPassword' type='password' placeholder='Confirm Password' /> */}
        {/* <input name='podName' type='text' placeholder='Podcast Name' /> */}
        {/* <select name='genre'>
            <option value=''>Select Genre</option>
            <option value='tech'>Tech</option>
            <option value='music'>Music</option>
            <option value='sports'>Sports</option>
            <option value='politics'>Politics</option>
            <option value='other'>Other</option> */}
        {/* Add other genres as needed */}
        {/* </select> */}
        {/* <button type='submit'>Register</button>
        </form> */}
      </div>
    </div>
  )
}

export default SignUpModal
