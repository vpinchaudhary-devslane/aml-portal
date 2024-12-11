import { SupportedLanguages } from 'types/enum';

class TextToSpeechService {
  private static instance: TextToSpeechService;

  private speechSynthesis: SpeechSynthesis;

  private constructor() {
    this.speechSynthesis = window.speechSynthesis;
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new TextToSpeechService();
    }
    return this.instance;
  }

  public async speak(
    text: string,
    lang: keyof typeof SupportedLanguages,
    handleStart: () => void,
    handleEnd: () => void,
    handleLoading: () => void
  ): Promise<void> {
    await this.speakWithWebSpeechAPI(
      text,
      lang,
      handleStart,
      handleEnd,
      handleLoading
    );
  }

  private async speakWithWebSpeechAPI(
    text: string,
    lang: string,
    handleStart: () => void,
    handleEnd: () => void,
    handleLoading: () => void
  ): Promise<void> {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = `${lang}-IN`;

    const isLangAvailable = this.speechSynthesis
      .getVoices()
      .some((voice) => voice.lang === msg.lang);

    if (!isLangAvailable) {
      msg.lang = 'en-US';
    }

    this.speechSynthesis.speak(msg);

    msg.addEventListener('start', () => {
      handleLoading();
      handleStart();
    });

    msg.addEventListener('end', () => {
      handleEnd();
    });
  }

  public stop() {
    this.speechSynthesis.cancel();
  }
}

export const ttsInstance = TextToSpeechService.getInstance();
