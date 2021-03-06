import React, { useContext, useEffect, useState } from "react";
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from "../context/AuthContext";
//сторінка авторизаціі базова складова реакт сторінки

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })
      
    
    useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])
 
   const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
   }
    
  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
    message(data.message)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
    auth.login(data.token, data.userId)
    } catch (e) {}
  }  

    
 return (
     <div className="container">
         <div className="col s6 offset-s3">
           <h2></h2>  
                <div className="card darken-1">
                    <div className="card-content white-text">
                       <span className="card-title">Authorization</span>
                     <div>

                         <div class="input-field">
                             
                            <input 
                             placeholder="Write your email"
                             id="email" 
                                 type="text"
                                 name="email"
                                 className="yellow-input"
                                 value={ form.email}
                                 onChange={ changeHandler }
                             />
                             
                             <label htmlFor="email">Email</label>
                            </div>
                         <div class="input-field">
                            <input 
                             placeholder="Write your password"
                             id="password" 
                                 type="password"
                                 name="password"
                                 className="yellow-input"
                                 value={ form.password}
                                 onChange={ changeHandler }
                             />
                             
                             <label htmlFor="password">Password</label>
                        </div>

                     </div>
                        </div>
                    <div className="card-action">
                     <button
                         className="btn cyan darken-4 white-text"
                           style={{ marginRight: 10 }}
                           disabled={loading}
                           onClick={loginHandler}
                         
                     >
                         Sign in
                     </button>
                     <button
                         className="btn cyan accent-3 black-text"
                         onClick={registerHandler}
                         disabled={loading}
                     >
                         Sign up
                     </button>
                    </div>
                </div>
             </div>
       </div>
   ) 
  }
