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
    </div>
  );
}
