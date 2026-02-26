// Skill Share Link Generator
// 生成可直接分享的网址

const BASE_URL = 'https://stackmatrices.com';

export function generateSkillShareLink(skillId: string, options?: {
  name?: string;
  customMessage?: string;
}) {
  const params = new URLSearchParams();
  params.set('skill', skillId);
  
  if (options?.name) {
    params.set('ref', options.name);
  }
  
  return `${BASE_URL}/run?${params.toString()}`;
}

// 示例分享文案
export const SHARE_TEMPLATES = {
  twitter: (skillName: string, link: string) => 
    `Check out this ${skillName} - just paste a URL and get instant insights!\n\n${link}`,
  
  linkedin: (skillName: string, link: string) =>
    `I found this amazing tool: ${skillName}\n\nNo installation needed, just paste a product URL and get competitor insights in seconds.\n\nTry it: ${link}`,
  
  email: (skillName: string, link: string) =>
    `Hey,\n\nI wanted to share this tool with you:\n\n${skillName}\n${link}\n\nIt's super easy - just paste any product URL and it analyzes reviews automatically. No signup required!`,
  
  wechat: (skillName: string) =>
    `发现了一个超实用的工具：${skillName}\n\n不用下载，打开网页直接就能用！\n\n复制链接到浏览器打开即可 👆`
};

// OpenClaw 快捷指令
export function generateOpenClawCommand(skillId: string) {
  return `Install skill ${skillId} from StackMatrices`;
}
