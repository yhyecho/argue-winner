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
    </div>
  );
}
