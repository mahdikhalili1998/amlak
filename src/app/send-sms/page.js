"use client";
import React, { useState } from "react";
import axios from "axios";

const SendSMS = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const num = `{"to":"${phoneNumber}"}`;

  //   console.log(typeof num);
  const [otpCode, setOtpCode] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");

  const sendOtp = async () => {
    const url =
      "https://console.melipayamak.com/api/send/otp/b56cb348f246442598aef8e5a96a18e9";
    const headers = {
      "Content-Type": "application/json",
    };

    await axios
      .post(url, num, { headers })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  const verifyOtp = async () => {
    const url =
      "https://console.melipayamak.com/api/verify/otp/b56cb348f246442598aef8e5a96a18e9";

    await axios
      .post(url, { num, otpCode })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h2>Enter Phone Number</h2>
      <input
        type="text"
        value={phoneNumber.to}
        className="rounded-lg border-2 border-solid border-blue-600 px-2 py-1"
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={sendOtp}>Send OTP</button>

      <h2>Enter OTP Code</h2>
      <input
        className="rounded-lg border-2 border-solid border-blue-600 px-2 py-1"
        type="text"
        value={otpCode}
        onChange={(e) => setOtpCode(e.target.value)}
      />
      <button onClick={verifyOtp}>Verify OTP</button>

      <p>{verificationStatus}</p>
    </div>
  );
};

export default SendSMS;
