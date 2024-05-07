import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator = () => {
  const [qrData, setQrData] = useState("hi iamvinay");

  const handleChange = (event) => {
    setQrData(event.target.value);
  };

  return (
    <div className="flex justify-center items-center min-h-[100vh]">
      <input
        type="text"
        value={qrData}
        onChange={handleChange}
        className="text-black "
        placeholder="Enter data to encode"
      />
      <QRCodeCanvas size={300} value={qrData} />
    </div>
  );
};

export default QRCodeGenerator;
