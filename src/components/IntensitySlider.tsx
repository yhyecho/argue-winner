'use client';

import React from 'react';

interface IntensitySliderProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const intensityLabels: Record<number, { label: string; emoji: string }> = {
  1: { label: '温和', emoji: '😊' },
  2: { label: '淡定', emoji: '😌' },
  3: { label: '认真', emoji: '🤔' },
  4: { label: '较真', emoji: '😤' },
  5: { label: '强硬', emoji: '😠' },
  6: { label: '犀利', emoji: '😡' },
  7: { label: '尖锐', emoji: '🔥' },
  8: { label: '凌厉', emoji: '💢' },
  9: { label: '暴躁', emoji: '🤬' },
  10: { label: '核弹', emoji: '💥' },
};

function getIntensityColor(value: number): string {
  if (value <= 3) return '#07C160';
  if (value <= 5) return '#E6A23C';
  if (value <= 7) return '#F56C6C';
  return '#B91C1C';
}

export default function IntensitySlider({
  value,
  onChange,
  disabled = false,
}: IntensitySliderProps) {
  const { label, emoji } = intensityLabels[value] || intensityLabels[5];
  const color = getIntensityColor(value);

  return (
    <div className="intensity-slider">
      <div className="slider-header">
        <label className="slider-label">语气强度</label>
        <div className="intensity-badge" style={{ backgroundColor: color }}>
          <span className="intensity-emoji">{emoji}</span>
          <span className="intensity-text">{label}</span>
        </div>
      </div>

      <div className="slider-container">
        <input
          type="range"
          min={1}
          max={10}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          className="slider"
          style={{
            background: `linear-gradient(to right, ${color} 0%, ${color} ${(value - 1) * 11.11}%, var(--border-color) ${(value - 1) * 11.11}%, var(--border-color) 100%)`,
          }}
        />
        <div className="slider-marks">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((mark) => (
            <span
              key={mark}
              className={`mark ${mark === value ? 'active' : ''}`}
              style={mark === value ? { color } : undefined}
            >
              {mark}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
