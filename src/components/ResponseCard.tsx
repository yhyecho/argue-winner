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
        <div className="response-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
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

            <style jsx>{`
        .response-card {
          opacity: 0;
          animation: fadeIn 0.3s ease forwards;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-sm);
        }
        
        .card-index {
          font-size: var(--font-size-sm);
          font-weight: 500;
          color: var(--text-secondary);
        }
        
        .copy-button {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: var(--spacing-xs) var(--spacing-sm);
          font-size: var(--font-size-xs);
          color: var(--text-secondary);
          background: transparent;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .copy-button:hover {
          background: var(--bg-primary);
          border-color: var(--wechat-green);
          color: var(--wechat-green);
        }
        
        .copy-icon {
          font-size: 12px;
        }
        
        .card-content {
          padding: var(--spacing-md);
          font-size: var(--font-size-base);
          line-height: 1.6;
          border-radius: var(--radius-lg);
          word-break: break-word;
        }
        
        .bubble-self {
          background: var(--bubble-self);
          color: var(--text-primary);
        }
      `}</style>
        </div>
    );
}
