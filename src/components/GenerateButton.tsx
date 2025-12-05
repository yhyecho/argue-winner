'use client';

import React from 'react';

interface GenerateButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function GenerateButton({
  onClick,
  isLoading = false,
  disabled = false,
}: GenerateButtonProps) {
  return (
    <button
      className="generate-button"
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <>
          <span className="spinner"></span>
          <span>正在生成...</span>
        </>
      ) : (
        <>
          <span className="icon">💬</span>
          <span>开始吵架</span>
        </>
      )}
    </button>
  );
}
