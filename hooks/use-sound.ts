import { useRef, useCallback } from 'react';
import { Platform } from 'react-native';

export type SoundType = 'typing' | 'success' | 'error' | 'click';

/**
 * Hook para gerenciar efeitos de som
 * Usa Web Audio API no web e simula em mobile
 */
export function useSound() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const initAudioContext = useCallback(() => {
    if (Platform.OS === 'web' && !audioContextRef.current) {
      try {
        const audioContext = new (window as any).AudioContext();
        audioContextRef.current = audioContext;
      } catch (error) {
        console.warn('AudioContext not available:', error);
      }
    }
  }, []);

  const playSound = useCallback((type: SoundType) => {
    if (Platform.OS !== 'web') {
      // Em mobile, apenas simular com vibração
      return;
    }

    initAudioContext();

    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const now = ctx.currentTime;

    try {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      switch (type) {
        case 'typing':
          // Som de digitação - frequência baixa, muito curto
          oscillator.frequency.value = 150;
          gainNode.gain.setValueAtTime(0.05, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
          oscillator.start(now);
          oscillator.stop(now + 0.05);
          break;

        case 'success':
          // Som de sucesso - frequência alta, ascendente
          oscillator.frequency.setValueAtTime(400, now);
          oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.3);
          gainNode.gain.setValueAtTime(0.1, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
          oscillator.start(now);
          oscillator.stop(now + 0.3);
          break;

        case 'error':
          // Som de erro - frequência baixa, descendente
          oscillator.frequency.setValueAtTime(600, now);
          oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.2);
          gainNode.gain.setValueAtTime(0.1, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
          oscillator.start(now);
          oscillator.stop(now + 0.2);
          break;

        case 'click':
          // Som de clique - frequência média, muito curto
          oscillator.frequency.value = 300;
          gainNode.gain.setValueAtTime(0.08, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
          oscillator.start(now);
          oscillator.stop(now + 0.1);
          break;
      }
    } catch (error) {
      console.warn('Error playing sound:', error);
    }
  }, [initAudioContext]);

  return { playSound };
}
