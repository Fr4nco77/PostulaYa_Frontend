import React from "react";

interface ErrorMessageProps {
  errors: string[];
  errorKey: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errors, errorKey }) => {
  return (
    <div id={`${errorKey}-error`} aria-live="polite" aria-atomic="true">
      {errors?.map((error: string) => (
        <p className="text-sm text-red-500" key={error}>
          {error}
        </p>
      ))}
    </div>
  );
};

export default ErrorMessage;
