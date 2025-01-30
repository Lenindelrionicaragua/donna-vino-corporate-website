"use client";
import React, { useState, useEffect } from "react";
import Button from "../Button/Button";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (consent) => {
    localStorage.setItem("cookieConsent", consent);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-8 md:right-8 p-4 md:p-6 bg-white opacity-98 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 z-[9999]">
      <p className="text-bodyMedium font-medium">
        We use cookies to improve your experience. Read our
        <a
          href="/privacy-policy"
          className="text-primary-normal hover:text-primary-hover ml-1 underline"
        >
          Privacy Policy
        </a>
        .
      </p>
      <div className="flex gap-2">
        <Button
          text="Accept"
          variant="redSubmit"
          onClick={() => handleConsent("accepted")}
          ariaLabel="Accept Cookies"
          testId="accept-button"
        />
        <Button
          text="Reject"
          variant="redLine"
          onClick={() => handleConsent("rejected")}
          ariaLabel="Reject Cookies"
          testId="reject-button"
        />
      </div>
    </div>
  );
};

export default CookieBanner;
