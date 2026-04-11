import React from 'react';
import { IconRobot } from '@arco-design/web-react/icon';
import * as ModelIcons from './svgs/models';

type SvgIconComponent = React.FC<{
  size?: number | string;
  style?: React.CSSProperties;
  className?: string;
}>;

interface ModelMatch {
  keywords: string[];
  icon: keyof typeof ModelIcons;
}

const modelMatches: ModelMatch[] = [
  { keywords: ['gpt', 'openai', 'dall-e', 'whisper', 'tts'], icon: 'Openai' },
  { keywords: ['claude', 'anthropic'], icon: 'Claude' },
  { keywords: ['gemini'], icon: 'Gemini' },
  { keywords: ['ollama'], icon: 'Ollama' },
  { keywords: ['llama', 'meta', 'codellama'], icon: 'Meta' },
  { keywords: ['mistral', 'mixtral', 'pixtral'], icon: 'Mistral' },
  { keywords: ['huggingface', 'hf ', 'hugging face'], icon: 'Huggingface' },
  { keywords: ['openrouter'], icon: 'Openrouter' },
  { keywords: ['zhipu', 'glm', 'chatglm'], icon: 'Zhipu' },
  { keywords: ['gemma'], icon: 'Gemma' },
  { keywords: ['grok'], icon: 'Grok' },
  { keywords: ['qwen', 'tongyi', 'qwen2'], icon: 'Qwen' },
  { keywords: ['doubao'], icon: 'Doubao' },
  { keywords: ['deepseek'], icon: 'Deepseek' },
  { keywords: ['yuanbao'], icon: 'Yuanbao' },
  { keywords: ['minimax'], icon: 'Minimax' },
  { keywords: ['moonshot', 'kimi'], icon: 'Moonshot' },
  { keywords: ['nanobanana'], icon: 'Nanobanana' },
  { keywords: ['tavily'], icon: 'Tavily' },
  { keywords: ['wenxin', 'ernie'], icon: 'Wenxin' },
  { keywords: ['xiaomimimo'], icon: 'Xiaomimimo' },
];

function resolveModelIcon(model: string): keyof typeof ModelIcons | null {
  const lower = model.toLowerCase();
  for (const match of modelMatches) {
    for (const kw of match.keywords) {
      if (lower.includes(kw.toLowerCase())) {
        return match.icon;
      }
    }
  }
  return null;
}

interface ModelLogoProps {
  model: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const ModelLogo = ({ model, size = 20, className, style }: ModelLogoProps) => {
  const iconName = resolveModelIcon(model);
  const IconComponent = iconName ? (ModelIcons as Record<string, SvgIconComponent>)[iconName] : null;

  if (IconComponent) {
    return <IconComponent size={size} className={className} style={{ flex: 'none', lineHeight: 1, ...style }} />;
  }

  return <IconRobot style={{ fontSize: size, flex: 'none', lineHeight: 1, ...style }} className={className} />;
};

export default ModelLogo;
