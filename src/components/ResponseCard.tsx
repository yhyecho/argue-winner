'use client';

import React, { useState } from 'react';

interface ResponseCardProps {
  index: number;
  content: string;
}

export default function ResponseCard({ index, content }: ResponseCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div
      className="response-card"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="card-header">
        <span className="card-index">回复 {index + 1}</span>
        <button className="copy-button" onClick={handleCopy}>
          {copied ? (
            <>
              <span className="copy-icon">✓</span>
              <span>已复制</span>
            </>
          ) : (
            <>
              <span className="copy-icon">📋</span>
              <span>复制</span>
            </>
          )}
        </button>
      </div>
      <div className="card-content bubble-self">
        {content}
      </div>
    </div>
  );
}
