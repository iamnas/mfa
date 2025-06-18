import React, { useState } from 'react'
import { reset2FA, verify2FA } from '../service/authApi';

function TwoFAVerification({ onVerifyComplete, onResetComplete }: { onVerifyComplete: (data: unknown) => void, onResetComplete: (data: unknown) => void }) {

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleTokenVerification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await verify2FA(otp);

      onVerifyComplete(data);

    } catch (error) {
      console.log(error);
      setError("Something went wrong during verification 😔");

    }

  }

  const handleReset2FA = async () => {

    try {
      const data = await reset2FA();

      onResetComplete(data);


    } catch (error) {
      console.log(error);
      setError("Something went wrong during reset 😔");

    }



  }


  return (

    <form onSubmit={handleTokenVerification} action="" className="bg-gray-100 rounded-lg shadow-2xl w-full max-w-sm max-auto">
      <div className='pt-6'>
        <h2 className='text-3xl text-center font-extralight'>
          Validate Time based OTP
        </h2>
      </div>
      {/* Divider */}
      <hr className='text-gray-200 mt-6 mb-6' />
      <p className='text-center text-lg text-gray-600 font-light'>
        Please enter 6-digit Time based OTP to verify 2FA autnetication
      </p>
      <div className="p-6">

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            TOTP
          </label>
          <input
            type="text"
            name="totp"
            id="totp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
            placeholder="Enter your OTP"
          />
        </div>


        {
          error &&
          <p className="text-red-600 text-sm font-light mt-3">
            {error}
          </p>
        }

        <button type="submit" className="w-full py-2 text-white bg-blue-600 rounded-md mt-4 mb-3">
          Verify TOTP
        </button>

        <button onClick={handleReset2FA} className="w-full py-2 text-white bg-red-600 rounded-md mt-4">
          Reset 2FA
        </button>

      </div>
    </form>

  )
}

export default TwoFAVerification