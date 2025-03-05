import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Subscribe from "@/components/Subscribe/Subscribe";
import { LanguageProvider } from "@/app/context/LanguageContext";
import enTranslations from "../../translations/en.json";
import dkTranslations from "../../translations/dk.json";
import PropTypes from "prop-types";
import useFetch from "@/hooks/api/useFetch";

// Mock the useFetch hook
jest.mock("@/hooks/api/useFetch", () => jest.fn());

// Mock the LanguageProvider
const MockLanguageProvider = ({ children, language = "en" }) => {
  const translations = language === "en" ? enTranslations : dkTranslations;

  return (
    <LanguageProvider value={{ translations }}>{children}</LanguageProvider>
  );
};

MockLanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
  language: PropTypes.oneOf(["en", "dk"]),
};

// Helper function to render the component with the LanguageProvider
const renderWithProvider = (language = "en") => {
  return render(
    <MockLanguageProvider language={language}>
      <Subscribe />
    </MockLanguageProvider>,
  );
};

describe("Subscribe Component", () => {
  let performFetchMock;

  beforeEach(() => {
    performFetchMock = jest.fn();
    useFetch.mockReturnValue({
      isLoading: false,
      error: null,
      data: null,
      performFetch: performFetchMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the Subscribe component correctly", () => {
    renderWithProvider();

    expect(
      screen.getByText(enTranslations["subscribe.heading"]),
    ).toBeInTheDocument();
    expect(
      screen.getByText(enTranslations["subscribe.paragraph"]),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(enTranslations["subscribe.placeholder"]),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(enTranslations["subscribe.terms"]),
    ).toBeInTheDocument();
    expect(
      screen.getByText(enTranslations["subscribe.button"]),
    ).toBeInTheDocument();
  });

  test("disables the submit button when loading", () => {
    useFetch.mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
      performFetch: performFetchMock,
    });

    renderWithProvider();

    const submitButton = screen.getByText(
      enTranslations["subscribe.button-loading"],
    );
    expect(submitButton).toBeDisabled();
  });

  test("calls performFetch with correct parameters on form submit", () => {
    renderWithProvider();

    const emailInput = screen.getByPlaceholderText(
      enTranslations["subscribe.placeholder"],
    );
    const termsCheckbox = screen.getByLabelText(
      enTranslations["subscribe.terms"],
    );
    const submitButton = screen.getByText(enTranslations["subscribe.button"]);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(termsCheckbox);
    fireEvent.click(submitButton);

    expect(performFetchMock).toHaveBeenCalledWith(
      {
        to: "test@example.com",
        subject: "Subscription",
        templateName: "confirmSubscriptionTemplate",
      },
      {},
    );
  });

  test("resets the form after successful submission", async () => {
    const performFetchMock = jest.fn().mockResolvedValue(true);
    useFetch.mockReturnValue({
      isLoading: false,
      error: null,
      performFetch: performFetchMock,
    });

    renderWithProvider();

    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    const termsCheckbox = screen.getByLabelText(
      /I agree with the terms and conditions/i,
    );
    const submitButton = screen.getByText(/Submit/i);
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(termsCheckbox);
    fireEvent.click(submitButton);

    expect(performFetchMock).toHaveBeenCalledWith(
      {
        subject: "Subscription",
        templateName: "confirmSubscriptionTemplate",
        to: "test@example.com",
      },
      {},
    );

    await waitFor(() => {
      expect(emailInput.value).toBe("");
      expect(termsCheckbox.checked).toBe(false);
    });
  });

  test("displays an error message when an error occurs", () => {
    useFetch.mockReturnValue({
      isLoading: false,
      error: { message: "Network error" },
      data: null,
      performFetch: performFetchMock,
    });

    renderWithProvider();

    expect(screen.getByTestId("error-message")).toBeInTheDocument();
    expect(screen.getByTestId("error-message")).toHaveTextContent(
      "Network error",
    );
  });

  test("unchecks the terms checkbox when clicked again", () => {
    renderWithProvider();

    const termsCheckbox = screen.getByLabelText(
      enTranslations["subscribe.terms"],
    );

    fireEvent.click(termsCheckbox);
    expect(termsCheckbox.checked).toBe(true);

    fireEvent.click(termsCheckbox);
    expect(termsCheckbox.checked).toBe(false);
  });
});
