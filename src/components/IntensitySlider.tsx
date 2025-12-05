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
    if (value <= 3) return '#07C160'; // 绿色 - 温和
    if (value <= 5) return '#E6A23C'; // 橙色 - 中等
    if (value <= 7) return '#F56C6C'; // 红色 - 激烈
    return '#B91C1C'; // 深红 - 爆炸
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
                        >
                            {mark}
                        </span>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .intensity-slider {
          width: 100%;
        }
        
        .slider-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-md);
        }
        
        .slider-label {
          font-size: var(--font-size-base);
          font-weight: 500;
          color: var(--text-primary);
        }
        
        .intensity-badge {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          padding: var(--spacing-xs) var(--spacing-sm);
          border-radius: var(--radius-full);
          color: white;
          font-size: var(--font-size-sm);
          font-weight: 500;
          transition: background-color 0.3s ease;
        }
        
        .intensity-emoji {
          font-size: 16px;
        }
        
        .intensity-text {
          min-width: 32px;
          text-align: center;
        }
        
        .slider-container {
          position: relative;
        }
        
        .slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 8px;
          border-radius: var(--radius-full);
          outline: none;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        
        .slider:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 28px;
          height: 28px;
          background: white;
          border: 3px solid ${color};
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          transition: transform 0.2s ease, border-color 0.3s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
        
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: white;
          border: 3px solid ${color};
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
        
        .slider-marks {
          display: flex;
          justify-content: space-between;
          margin-top: var(--spacing-sm);
          padding: 0 4px;
        }
        
        .mark {
          font-size: var(--font-size-xs);
          color: var(--text-tertiary);
          transition: color 0.2s ease;
        }
        
        .mark.active {
          color: ${color};
          font-weight: 600;
        }
      `}</style>
        </div>
    );
}
