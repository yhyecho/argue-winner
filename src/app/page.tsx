'use client';

import React, { useState } from 'react';
import ArgumentInput from '@/components/ArgumentInput';
import IntensitySlider from '@/components/IntensitySlider';
import GenerateButton from '@/components/GenerateButton';
import ResponseList from '@/components/ResponseList';
import { useGenerate } from '@/hooks/useGenerate';

export default function Home() {
  const [opponentMessage, setOpponentMessage] = useState('');
  const [intensity, setIntensity] = useState(5);
  const { responses, isLoading, error, generate, reset } = useGenerate();

  const handleGenerate = async () => {
    if (!opponentMessage.trim()) {
      return;
    }

    await generate({
      opponentMessage: opponentMessage.trim(),
      intensity,
    });
  };

  const handleReset = () => {
    setOpponentMessage('');
    setIntensity(5);
    reset();
  };

  const canGenerate = opponentMessage.trim().length > 0 && !isLoading;

  return (
    <div className="page">
      <main className="main">
        {/* Header */}
        <header className="header">
          <h1 className="title">
            <span className="title-emoji">🔥</span>
            <span>吵架包赢</span>
          </h1>
          <p className="subtitle">输入对方说的话，AI 帮你怼回去</p>
        </header>

        {/* Input Section */}
        <section className="card input-section">
          <ArgumentInput
            value={opponentMessage}
            onChange={setOpponentMessage}
            disabled={isLoading}
          />

          <div className="slider-wrapper">
            <IntensitySlider
              value={intensity}
              onChange={setIntensity}
              disabled={isLoading}
            />
          </div>

          <GenerateButton
            onClick={handleGenerate}
            isLoading={isLoading}
            disabled={!canGenerate}
          />
        </section>

        {/* Response Section */}
        <ResponseList
          responses={responses}
          isLoading={isLoading}
          error={error}
        />

        {/* Reset Button */}
        {responses.length > 0 && !isLoading && (
          <button className="reset-button" onClick={handleReset}>
            <span>🔄</span>
            <span>再来一次</span>
          </button>
        )}

        {/* Footer */}
        <footer className="footer">
          <p className="footer-text">
            仅供娱乐，理性沟通 😊
          </p>
        </footer>
      </main>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: var(--bg-primary);
          padding: var(--spacing-md);
        }
        
        .main {
          max-width: 480px;
          margin: 0 auto;
          padding-bottom: var(--spacing-xl);
        }
        
        .header {
          text-align: center;
          padding: var(--spacing-xl) 0;
        }
        
        .title {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-sm);
          font-size: var(--font-size-2xl);
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 var(--spacing-sm) 0;
        }
        
        .title-emoji {
          font-size: 36px;
        }
        
        .subtitle {
          font-size: var(--font-size-base);
          color: var(--text-secondary);
          margin: 0;
        }
        
        .card {
          background: var(--bg-secondary);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          padding: var(--spacing-lg);
        }
        
        .input-section {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }
        
        .slider-wrapper {
          padding-top: var(--spacing-sm);
        }
        
        .reset-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-sm);
          width: 100%;
          margin-top: var(--spacing-lg);
          padding: var(--spacing-md);
          font-size: var(--font-size-base);
          font-weight: 500;
          color: var(--text-secondary);
          background: transparent;
          border: 1px dashed var(--border-color);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .reset-button:hover {
          background: var(--bg-secondary);
          border-color: var(--wechat-green);
          color: var(--wechat-green);
        }
        
        .footer {
          text-align: center;
          margin-top: var(--spacing-xl);
        }
        
        .footer-text {
          font-size: var(--font-size-sm);
          color: var(--text-tertiary);
          margin: 0;
        }
        
        @media (min-width: 640px) {
          .page {
            padding: var(--spacing-xl);
          }
          
          .header {
            padding: var(--spacing-xl) 0 var(--spacing-lg) 0;
          }
          
          .title {
            font-size: 40px;
          }
          
          .title-emoji {
            font-size: 44px;
          }
        }
      `}</style>
    </div>
  );
}
