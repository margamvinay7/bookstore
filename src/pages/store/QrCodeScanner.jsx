import React, { useEffect, useState, useRef } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import Image from "../../assets/book.jpg";
import QRScanner from "../../assets/qrScanner.png";
import { MdCancel } from "react-icons/md";
import { MdCameraswitch } from "react-icons/md";
import { MdOutlineQrCodeScanner } from "react-icons/md";

const QrCodeScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const html5QrCodeRef = useRef(null);
  const [facingMode, setFacingMode] = useState("environment"); // Set default to back camera

  useEffect(() => {
    const qrCodeScanner = new Html5Qrcode("reader", {
      formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
    });
    html5QrCodeRef.current = qrCodeScanner;

    // startScanning();
    // Cleanup on component unmount
    return () => {
      if (qrCodeScanner) {
        // qrCodeScanner
        //   .stop()
        //   .catch((err) => console.error("Error stopping QR code scanner", err));
      }
    };
  }, []);

  const startScanning = () => {
    if (html5QrCodeRef.current && !isScanning) {
      const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        console.log(`Decoded text: ${decodedText}`, decodedResult);
        // Check if the decoded text is a URL
        if (isValidUrl(decodedText)) {
          window.location.href = decodedText;
        } else {
          alert("Scanned text is not a valid URL");
        }
      };

      const config = { fps: 10, qrbox: { width: 350, height: 350 } };

      html5QrCodeRef.current
        .start({ facingMode: facingMode }, config, qrCodeSuccessCallback)
        .then(() => {
          setIsScanning(true);
        })
        .catch((err) => {
          console.error(`Unable to start scanning: ${err}`);
        });
    }
  };

  const toggleFacingMode = () => {
    const newFacingMode = facingMode === "user" ? "environment" : "user";
    setFacingMode(newFacingMode);

    // Restart scanning with the new facing mode if already scanning
    if (isScanning) {
      stopScanning();
      setTimeout(() => {
        startScanning();
      }, 500); // Add a small delay to ensure the scanner stops before starting again
    }
  };

  const stopScanning = () => {
    if (html5QrCodeRef.current && isScanning) {
      html5QrCodeRef.current
        .stop()
        .then(() => {
          setIsScanning(false);
        })
        .catch((err) => console.error("Error stopping QR code scanner", err));
    }
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="h-[100%] w-[100%]   ">
      <div className="flex justify-between gap-x-5 my-1">
        <button
          className="border border-red-500 rounded-md p-2  mt-2 ms-3 z-10"
          onClick={() => stopScanning()}
          hidden={!isScanning}
          disabled={!isScanning}
        >
          <MdCancel />
        </button>

        <button
          className="border border-red-500 rounded-md p-2  mt-2 me-20  z-10"
          onClick={toggleFacingMode}
          disabled={!isScanning}
          hidden={!isScanning}
        >
          <MdCameraswitch />
        </button>
      </div>
      <div id="reader"></div>

      <button
        disabled={isScanning}
        className="flex justify-center w-full"
        // hidden={isScanning}
      >
        <MdOutlineQrCodeScanner
          onClick={() => startScanning()}
          className="w-60 h-60 m-0"
          hidden={isScanning}
        />
        {/* <img src={QRScanner} className=" w-80 m-2 h-52" hidden={isScanning} /> */}
      </button>
    </div>
  );
};

export default QrCodeScanner;
