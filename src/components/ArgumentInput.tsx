'use client';

import React from 'react';

interface ArgumentInputProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    maxLength?: number;
}

export default function ArgumentInput({
    value,
    onChange,
    disabled = false,
    maxLength = 1000,
}: ArgumentInputProps) {
    const charCount = value.length;
    const isNearLimit = charCount > maxLength * 0.8;

    return (
        <div className="argument-input">
            <label className="input-label">
                对方说了什么？
            </label>
            <div className="input-wrapper">
                <textarea
                    className="textarea"
                    placeholder="把对方说的话输入在这里，我来帮你怼回去..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled}
                    maxLength={maxLength}
                    rows={4}
                />
                <div className={`char-count ${isNearLimit ? 'near-limit' : ''}`}>
                    {charCount} / {maxLength}
                </div>
            </div>

            <style jsx>{`
        .argument-input {
          width: 100%;
        }
        
        .input-label {
          display: block;
          font-size: var(--font-size-base);
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: var(--spacing-sm);
        }
        
        .input-wrapper {
          position: relative;
        }
        
        .textarea {
          width: 100%;
          min-height: 120px;
          padding: var(--spacing-md);
          padding-bottom: calc(var(--spacing-md) + 24px);
          font-size: var(--font-size-base);
          line-height: 1.6;
          color: var(--text-primary);
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          resize: none;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        
        .textarea:focus {
          border-color: var(--wechat-green);
          box-shadow: 0 0 0 3px var(--wechat-green-light);
        }
        
        .textarea:disabled {
          background: var(--bg-primary);
          cursor: not-allowed;
        }
        
        .textarea::placeholder {
          color: var(--text-tertiary);
        }
        
        .char-count {
          position: absolute;
          right: var(--spacing-md);
          bottom: var(--spacing-sm);
          font-size: var(--font-size-xs);
          color: var(--text-tertiary);
        }
        
        .char-count.near-limit {
          color: #F56C6C;
        }
      `}</style>
        </div>
    );
}
