import { useEffect, useState } from "react";
import { setup2FA } from "../service/authApi";



function TwoFASetup({ onSetupComplete }: { onSetupComplete: () => void }) {

  const [message, setMessage] = useState("");
  const [response, setResponse] = useState({ secret: "", qrCode: "" });
  

  const fetchQrCode = async () => {
    try {
      const data: { secret: string, qrCode: string } = await setup2FA();


      setResponse(data);

    } catch (error) {
      console.log(error);

    }

  }

  useEffect(() => {

    fetchQrCode();

  }, [])

  const copyClipboard = async () => {
    await navigator.clipboard.writeText(response?.secret ?? "");

    setMessage("Copied to clipboard 👍");
    setTimeout(() => {
      setMessage("");
    }, 2000);

  }

  return (

    <div className="bg-gray-100 rounded-lg shadow-2xl w-full max-w-sm max-auto">
      <div className='pt-6'>
        <h2 className='text-3xl text-center font-extralight'>
          Turn on Two-Factor verification
        </h2>
      </div>
      {/* Divider */}
      <hr className='text-gray-200 mt-6 mb-6' />
      <p className='text-center text-lg text-gray-600 font-light pr-6 pl-6'>
        Scan the QR code with your authenticator app
      </p>
      <div className="p-6">
        <div className="flex justify-center">
          <img src={response.qrCode || undefined} alt="2FA QR Code" className="w-1/2 max-w-sm mb-4 rounded-md" />
        </div>

        <div className="flex items-center justify-center mt-3 mb-3">
          <div className="border-t border-2 border-gray-300 flex-grow"></div>
          <div className="text-gray-600 text-sm font-light pr-2 pl-2">
            QR Enter the code manually !
          </div>
          <div className="border-t border-2 border-gray-300 flex-grow"></div>
        </div>

        <div className="mb-6">
          {message &&
            <p className="text-green-600 text-sm font-light mt-3  ">
              {message}
            </p>
          }
          <input type="text"
            readOnly
            value={response.secret}
            className="w-full border text-gray-600 text-xs border-gray-300 rounded-md mt-2 p-4"
            onClick={copyClipboard}
          />

        </div>
        <button onClick={onSetupComplete} className="w-full bg-blue-500 text-white py-2 rounded-md">
          Continue to Verification
        </button>
      </div>
    </div>
  )
}

export default TwoFASetup