import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseApiUrl } from "@/config/environment";
import { logInfo } from "@/utils/logging";

const useFetch = (
  initialRoute,
  method = "GET",
  body = null,
  customHeaders = {},
  onReceived = () => {},
) => {
  // Validate initial inputs to avoid confusion with server routing
  if (!initialRoute || initialRoute.includes("api/")) {
    throw new Error(
      "Invalid route provided. Routes cannot include 'api/' as part of the endpoint, to avoid conflicts and confusion in server routing.",
    );
  }

  if (typeof initialRoute !== "string") {
    throw new Error("useFetch: route must be a string");
  }

  if (typeof onReceived !== "function") {
    throw new Error("useFetch: onReceived must be a function");
  }

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [route, setRoute] = useState(initialRoute);
  const [data, setData] = useState(null);

  // Store multiple cancel tokens
  const cancelTokens = useRef({});

  const performFetch = async (body, options = {}, newUrl) => {
    if (newUrl) {
      cancelFetch(newUrl); // Cancel the previous request if URL changes
      setRoute(newUrl);
    }

    setError(null);
    setData(null);
    setIsLoading(true);

    // Validate the route format
    if (!route || !/^\/[a-zA-Z0-9/_-]*(\?[a-zA-Z0-9=&]*)?$/.test(route)) {
      setError(new Error("Invalid URL"));
      setIsLoading(false);
      return;
    }

    const requestBody = body || options.body || null;

    const baseOptions = {
      method,
      headers: { "Content-Type": "application/json", ...customHeaders },
      withCredentials: true,
      cancelToken: new axios.CancelToken((cancel) => {
        // Use the route as a unique identifier
        cancelTokens.current[route] = cancel;
      }),
      ...(requestBody ? { data: requestBody } : {}),
      ...options, // Spread other options last
    };

    try {
      const url = `${baseApiUrl}/api${route}`;
      const response = await axios(url, baseOptions);

      if (!response || !response.data) {
        setError(new Error("Unexpected server error"));
        return;
      }

      logInfo(`Response Data: ${JSON.stringify(response.data)}`);

      if (response.data.success) {
        setData(response.data);
        onReceived(response.data);
      } else {
        const errorMsg =
          response.data.error ||
          response.data.message ||
          "Unexpected server error";
        setError(new Error(errorMsg));
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        setError(new Error("Fetch was canceled"));
      } else {
        const errorMsg =
          error.response?.data?.msg ||
          error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Unexpected error";
        setError(new Error(errorMsg));
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel a specific request based on its URL
  const cancelFetch = (url) => {
    if (cancelTokens.current[url]) {
      cancelTokens.current[url]("Fetch was canceled");
      delete cancelTokens.current[url]; // Clean up after canceling
    }
  };

  useEffect(() => {
    return () => {
      // Clean up any remaining cancel tokens when the component unmounts
      Object.values(cancelTokens.current).forEach((cancel) =>
        cancel("Fetch was canceled"),
      );
      cancelTokens.current = {}; // Clear the tokens
    };
  }, []);

  return {
    isLoading,
    error,
    data,
    performFetch,
    cancelFetch,
  };
};

export default useFetch;
