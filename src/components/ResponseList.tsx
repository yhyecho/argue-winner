'use client';

import React from 'react';
import ResponseCard from './ResponseCard';

interface ResponseListProps {
    responses: string[];
    isLoading?: boolean;
    error?: string | null;
}

export default function ResponseList({
    responses,
    isLoading = false,
    error = null,
}: ResponseListProps) {
    if (isLoading) {
        return (
            <div className="response-list">
                <div className="loading-state">
                    <div className="loading-animation">
                        <div className="dots-loading">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <p className="loading-text">正在思考怎么怼回去...</p>
                </div>

                <style jsx>{`
          .response-list {
            margin-top: var(--spacing-lg);
          }
          
          .loading-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: var(--spacing-xl);
            background: var(--bg-secondary);
            border-radius: var(--radius-lg);
          }
          
          .loading-animation {
            margin-bottom: var(--spacing-md);
          }
          
          .dots-loading {
            display: flex;
            gap: 6px;
          }
          
          .dots-loading span {
            width: 12px;
            height: 12px;
            background: var(--wechat-green);
            border-radius: 50%;
            animation: bounce 1.4s infinite ease-in-out;
          }
          
          .dots-loading span:nth-child(1) { animation-delay: -0.32s; }
          .dots-loading span:nth-child(2) { animation-delay: -0.16s; }
          .dots-loading span:nth-child(3) { animation-delay: 0s; }
          
          @keyframes bounce {
            0%, 80%, 100% {
              transform: scale(0);
            }
            40% {
              transform: scale(1);
            }
          }
          
          .loading-text {
            font-size: var(--font-size-base);
            color: var(--text-secondary);
            margin: 0;
          }
        `}</style>
            </div>
        );
    }

    if (error) {
        return (
            <div className="response-list">
                <div className="error-state">
                    <span className="error-icon">😅</span>
                    <p className="error-text">{error}</p>
                </div>

                <style jsx>{`
          .response-list {
            margin-top: var(--spacing-lg);
          }
          
          .error-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: var(--spacing-xl);
            background: #FEF0F0;
            border-radius: var(--radius-lg);
            border: 1px solid #F56C6C;
          }
          
          .error-icon {
            font-size: 32px;
            margin-bottom: var(--spacing-sm);
          }
          
          .error-text {
            font-size: var(--font-size-base);
            color: #F56C6C;
            margin: 0;
            text-align: center;
          }
        `}</style>
            </div>
        );
    }

    if (responses.length === 0) {
        return null;
    }

    return (
        <div className="response-list">
            <h3 className="list-title">
                <span className="title-icon">🎯</span>
                <span>就这么怼回去</span>
            </h3>
            <div className="responses">
                {responses.map((response, index) => (
                    <ResponseCard key={index} index={index} content={response} />
                ))}
            </div>

            <style jsx>{`
        .response-list {
          margin-top: var(--spacing-lg);
        }
        
        .list-title {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-size: var(--font-size-lg);
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 var(--spacing-md) 0;
        }
        
        .title-icon {
          font-size: 20px;
        }
        
        .responses {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }
      `}</style>
        </div>
    );
}
