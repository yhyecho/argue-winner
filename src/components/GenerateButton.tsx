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

            <style jsx>{`
        .generate-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-sm);
          width: 100%;
          padding: var(--spacing-md) var(--spacing-lg);
          font-size: var(--font-size-lg);
          font-weight: 600;
          color: white;
          background: var(--wechat-green);
          border: none;
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all 0.2s ease;
          outline: none;
        }
        
        .generate-button:hover:not(:disabled) {
          background: var(--wechat-green-hover);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(7, 193, 96, 0.4);
        }
        
        .generate-button:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: none;
        }
        
        .generate-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .icon {
          font-size: 20px;
        }
        
        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
        </button>
    );
}
