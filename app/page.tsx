"use client"
import React,{ useState } from 'react';
import Image from 'next/image'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword ,sendPasswordResetEmail  } from "firebase/auth";
import Spinner from "./Component/spinner";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
const firebaseConfig = {
  apiKey: "AIzaSyC4EvVt4gtb4vLHsj-Uv441m7uL1ILDWTo",
  authDomain: "goal-manager-51c00.firebaseapp.com",
  projectId: "goal-manager-51c00",
  storageBucket: "goal-manager-51c00.appspot.com",
  messagingSenderId: "417114345285",
  appId: "1:417114345285:web:638f8651459dca74dc382c",
  measurementId: "G-R1J9W7T2JK"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Home() {
  const [inputs, setInputs] = useState({});
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event:any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccess(false);
    setError(false);
  };
const handleSubmit = (event: any) => {//Giriş yap butonuna tıklandığında 
    setIsLoading(true);//spinner döndür
    
    event.preventDefault();

    signInWithEmailAndPassword(auth, inputs.email, inputs.password)//firebase giriş işlemi
    .then((userCredential) => {
      console.log("Giriş Başarılı");
    const user = userCredential.user;
    setSuccess(true);//giriş başaarılı
    setIsLoading(false)
  })
  .catch((error) => {//giriş başarısız
    const errorCode = error.code;
    const errorMessage = error.message;

    setError(true);
    setIsLoading(false)
    });
  }
  return (
    <>
      <html className="h-full bg-white">
      <body className="h-full">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image className="mx-auto h-20 w-auto"
              src="https://www.svgrepo.com/show/66257/goal.svg"
              alt="Your Company"
              width={500}
              height={500}
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Giriş Yap
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Kullanıcı Adı
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={inputs.email || ""} 
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Şifre
                  </label>
                  <div className="text-sm">
                    <a href="./resetpass" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Şifreni mi unuttun?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={inputs.pass}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Giriş Yap 
                </button>
                {isLoading ? <Spinner />:true }
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Hesabın yok mu?{' '}
              <a href="./register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Hemen kayıt ol
              </a>
            </p>
            <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Giriş başarılı!
        </Alert>
      </Snackbar>

      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Lütfen Bilgilerinizi kontrol ediniz!
        </Alert>
      </Snackbar>
          </div>
          
        </div>
    
    </body>
    </html>
  </>
  )
}
