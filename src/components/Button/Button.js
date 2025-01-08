"use client";

import React from "react";
import PropTypes from "prop-types";

const Button = ({
  text,
  icon,
  variant = "primary",
  onClick,
  disabled = false,
  ariaLabel,
  testId,
  isLoading = false,
}) => {
  const buttonClass = `flex justify-center items-center h-[3rem] rounded-[0.3rem] ${
    variant === "primary"
      ? "bg-primary-normal hover:bg-primary-hover_normal text-primary-light bodyLarge w-[10.8rem] h-[3rem]"
      : variant === "secondary"
        ? "bg-transparent border-2 hover:bg-primary-hover border-primary-active_normal text-primary-active_normal bodyLarge w-[10.8rem] h-[3rem]"
        : variant === "secondary-darker"
          ? "bg-secondary-darker hover:bg-secondary-hover_dark text-white bodyLarge w-[10.8rem] h-[3rem]"
          : variant === "secondary-light"
            ? "bg-secondary-light hover:bg-secondary-hover text-secondary-darker bodyLarge w-[10.8rem] h-[3rem]"
            : variant === "primary-submit"
              ? "bg-primary-normal hover:bg-primary-hover_normal text-white rounded-lg bodyLarge w-[10.8rem] h-[3rem]"
              : ""
  } ${disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""}`;

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label={ariaLabel}
      data-testid={testId}
      type={variant === "submit" ? "submit" : "button"}
    >
      {isLoading ? (
        "Submitting..."
      ) : (
        <>
          {icon && <img src={icon} alt="Icon" className="mr-2" />}
          {text}
        </>
      )}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "secondary-darker",
    "secondary-light",
    "primary-submit",
  ]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  ariaLabel: PropTypes.string,
  testId: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default Button;
