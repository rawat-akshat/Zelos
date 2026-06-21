"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SpeechRecognitionAlternative = {
  transcript: string;
  confidence: number;
};

type SpeechRecognitionResult = {
  isFinal: boolean;
  length: number;
  [index: number]: SpeechRecognitionAlternative;
};

type SpeechRecognitionResultList = {
  length: number;
  [index: number]: SpeechRecognitionResult;
};

type SpeechRecognitionResultEvent = {
  resultIndex: number;
  results: SpeechRecognitionResultList;
};

type SpeechRecognitionErrorEvent = {
  error: string;
};

type SpeechRecognitionInstance = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionCtor = new () => SpeechRecognitionInstance;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  }
}

function getSpeechRecognitionCtor(): SpeechRecognitionCtor | null {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
}

export interface UseSpeechRecognitionOptions {
  lang?: string;
  onError?: (message: string) => void;
}

export function useSpeechRecognition({
  lang = "en-US",
  onError,
}: UseSpeechRecognitionOptions = {}) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const baseTextRef = useRef("");
  const sessionFinalRef = useRef("");
  const onTranscriptRef = useRef<(text: string) => void>(() => {});

  useEffect(() => {
    setSupported(getSpeechRecognitionCtor() !== null);
  }, []);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  const start = useCallback(
    (baseText: string, onTranscript: (text: string) => void) => {
      const Ctor = getSpeechRecognitionCtor();
      if (!Ctor) {
        onError?.("Voice input isn't supported in this browser. Try Chrome or Edge.");
        return;
      }

      baseTextRef.current = baseText;
      sessionFinalRef.current = "";
      onTranscriptRef.current = onTranscript;

      const recognition = new Ctor();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = lang;

      recognition.onresult = (event) => {
        let interim = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const chunk = result[0]?.transcript ?? "";
          if (result.isFinal) sessionFinalRef.current += chunk;
          else interim += chunk;
        }

        const spoken = `${sessionFinalRef.current}${interim}`;
        const prefix = baseTextRef.current;
        const needsSpace =
          prefix.length > 0 && spoken.length > 0 && !prefix.endsWith(" ") && !spoken.startsWith(" ");
        onTranscriptRef.current(`${prefix}${needsSpace ? " " : ""}${spoken}`);
      };

      recognition.onerror = (event) => {
        if (event.error === "aborted" || event.error === "no-speech") return;
        const message =
          event.error === "not-allowed"
            ? "Microphone access was denied."
            : "Voice input failed. Please try again.";
        onError?.(message);
        setListening(false);
      };

      recognition.onend = () => {
        setListening(false);
        recognitionRef.current = null;
      };

      recognitionRef.current = recognition;

      try {
        recognition.start();
        setListening(true);
      } catch {
        onError?.("Voice input is already active.");
        setListening(false);
      }
    },
    [lang, onError]
  );

  const toggle = useCallback(
    (baseText: string, onTranscript: (text: string) => void) => {
      if (listening) {
        stop();
        return;
      }
      start(baseText, onTranscript);
    },
    [listening, start, stop]
  );

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
    };
  }, []);

  return { supported, listening, start, stop, toggle };
}
