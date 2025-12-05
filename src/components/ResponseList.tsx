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
    </div>
  );
}
