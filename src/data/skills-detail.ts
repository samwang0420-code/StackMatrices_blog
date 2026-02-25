import reviewAnalyzer from './skills/review-analyzer.json';
import priceMonitor from './skills/price-monitor.json';

// 所有 Local Skills 列表
export const localSkills = [
  reviewAnalyzer,
  priceMonitor
];

// 根据 slug 获取 skill
export function getSkillBySlug(slug: string) {
  return localSkills.find(skill => skill.slug === slug);
}

// 获取所有 skills 用于静态生成
export function getAllSkillSlugs() {
  return localSkills.map(skill => skill.slug);
}

// 重新导出 reviewAnalyzer 作为默认（兼容旧代码）
export const sampleSkill = reviewAnalyzer;
export default localSkills;
