'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// 动态导入 ECharts 组件（避免 SSR 问题）
const EChartComponent = dynamic(() => import('./EChartComponent'), { ssr: false });

interface ArticleContentProps {
  content: string;
}

// 安全地检查字符串
function safeString(value: any): string {
  if (typeof value === 'string') return value;
  if (value === null || value === undefined) return '';
  return String(value);
}

// 解析 Markdown 链接 [text](url)
function parseMarkdownLinks(text: any): JSX.Element {
  const str = safeString(text);
  if (!str.includes('[') || !str.includes('](')) return <>{text}</>;

  const linkRegex = /\[([^\]]+)\]\(([^\)]+)\)/g;
  const parts: (string | { type: 'link'; text: string; url: string })[] = [];

  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(str)) !== null) {
    if (match.index > lastIndex) {
      parts.push(str.slice(lastIndex, match.index));
    }
    parts.push({ type: 'link', text: match[1], url: match[2] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < str.length) {
    parts.push(str.slice(lastIndex));
  }

  return (
    <>
      {parts.map((part, index) => {
        if (typeof part === 'object' && part.type === 'link') {
          return (
            <a
              key={index}
              href={part.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              {part.text}
            </a>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

// 解析 Markdown 图片 ![alt](url)
function parseMarkdownImages(text: any): JSX.Element {
  const str = safeString(text);
  if (!str.includes('![')) return <>{text}</>;

  const imageRegex = /!\[([^\]]*)\]\(([^\)]+)\)/g;
  const parts: (string | { type: 'image'; alt: string; url: string })[] = [];

  let lastIndex = 0;
  let match;

  while ((match = imageRegex.exec(str)) !== null) {
    if (match.index > lastIndex) {
      parts.push(str.slice(lastIndex, match.index));
    }
    parts.push({ type: 'image', alt: match[1], url: match[2] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < str.length) {
    parts.push(str.slice(lastIndex));
  }

  return (
    <>
      {parts.map((part, index) => {
        if (typeof part === 'object' && part.type === 'image') {
          return (
            <img
              key={index}
              src={part.url}
              alt={part.alt}
              className="w-full max-w-3xl mx-auto my-6 rounded-lg shadow-md"
              loading="lazy"
            />
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

// 解析加粗语法 **text**
function parseBoldText(text: any): JSX.Element {
  const str = safeString(text);
  if (!str.includes('**')) {
    return <>{parseMarkdownLinks(parseMarkdownImages(str))}</>;
  }

  const parts = str.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
        }
        return <span key={index}>{parseMarkdownLinks(parseMarkdownImages(part))}</span>;
      })}
    </>
  );
}

// 解析 Markdown 表格为图表数据
function parseTableToChartData(lines: string[]): { headers: string[]; rows: string[][] } | null {
  const tableLines = lines.filter(line => line.startsWith('|') || line.startsWith('|-'));
  if (tableLines.length < 3) return null;
  
  const headers = tableLines[0]
    .split('|')
    .map(h => h.trim())
    .filter(h => h && !h.startsWith('-'));
  
  const rows = tableLines
    .slice(2)
    .map(line => 
      line
        .split('|')
        .map(cell => cell.trim())
        .filter(cell => cell)
    )
    .filter(row => row.length > 0);
  
  return { headers, rows };
}

// 生成雷达图配置（用于多维度评分）
function generateRadarOption(title: string, data: { name: string; value: number }[]) {
  const indicators = data.map(item => ({
    name: item.name,
    max: 10
  }));
  
  return {
    title: {
      text: title,
      left: 'center',
      textStyle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' }
    },
    tooltip: { trigger: 'item' },
    legend: {
      bottom: 10,
      data: ['Score']
    },
    radar: {
      indicator: indicators,
      shape: 'polygon',
      splitNumber: 5,
      axisName: {
        color: '#64748b',
        fontSize: 12
      },
      splitLine: {
        lineStyle: { color: 'rgba(60, 60, 246, 0.2)' }
      },
      splitArea: {
        areaStyle: {
          color: ['rgba(60, 60, 246, 0.05)', 'rgba(60, 60, 246, 0.1)']
        }
      },
      axisLine: {
        lineStyle: { color: 'rgba(60, 60, 246, 0.3)' }
      }
    },
    series: [{
      name: 'Score',
      type: 'radar',
      data: [{
        value: data.map(item => item.value),
        name: 'Score',
        areaStyle: {
          color: 'rgba(60, 60, 246, 0.3)'
        },
        lineStyle: {
          color: '#3c3cf6',
          width: 2
        },
        itemStyle: {
          color: '#3c3cf6'
        }
      }]
    }]
  };
}

// 生成柱状图配置（用于价格对比）
function generateBarOption(title: string, categories: string[], values: number[]) {
  return {
    title: {
      text: title,
      left: 'center',
      textStyle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: categories,
      axisLabel: { color: '#64748b' },
      axisLine: { lineStyle: { color: '#e2e8f0' } }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#64748b' },
      splitLine: { lineStyle: { color: '#e2e8f0' } }
    },
    series: [{
      data: values,
      type: 'bar',
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#3c3cf6' },
            { offset: 1, color: '#6366f1' }
          ]
        },
        borderRadius: [8, 8, 0, 0]
      },
      label: {
        show: true,
        position: 'top',
        color: '#1e293b',
        fontWeight: 'bold'
      }
    }]
  };
}

// 语法高亮 - Monokai 主题
function highlightCode(code: string, language: string = ''): string {
  // 简单的语法高亮
  let highlighted = code
    // 字符串
    .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="text-[#ce9178]">$1</span>')
    // 关键字
    .replace(/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await|try|catch)\b/g, '<span class="text-[#569cd6]">$1</span>')
    // 数字
    .replace(/\b(\d+)\b/g, '<span class="text-[#b5cea8]">$1</span>')
    // 函数调用
    .replace(/(\w+)(?=\()/g, '<span class="text-[#dcdcaa]">$1</span>')
    // 注释
    .replace(/(\/\/.*$|#.*$)/gm, '<span class="text-[#6a9955]">$1</span>');
  
  return highlighted;
}

// 主渲染组件
export default function ArticleContentRenderer({ content }: ArticleContentProps) {
  const [sections, setSections] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const lines = content.split('\n');
    const result: JSX.Element[] = [];
    let i = 0;
    let key = 0;

    while (i < lines.length) {
      const line = lines[i];

      // 处理标题 - 使用 Display 字体
      if (line.startsWith('# ')) {
        result.push(
          <h1 key={key++} className="text-4xl md:text-5xl font-bold mb-6 mt-8 text-slate-900 font-display leading-tight">
            {parseBoldText(line.replace('# ', ''))}
          </h1>
        );
        i++;
        continue;
      }

      if (line.startsWith('## ')) {
        result.push(
          <h2 key={key++} className="text-2xl md:text-3xl font-bold mb-4 mt-8 text-slate-900 font-display leading-tight">
            {parseBoldText(line.replace('## ', ''))}
          </h2>
        );
        i++;
        continue;
      }

      if (line.startsWith('### ')) {
        result.push(
          <h3 key={key++} className="text-xl md:text-2xl font-bold mb-3 mt-6 text-slate-900 font-display leading-tight">
            {parseBoldText(line.replace('### ', ''))}
          </h3>
        );
        i++;
        continue;
      }

      // 检测雷达图表标记
      if (line.includes('[RADAR:') && line.includes(']')) {
        const match = line.match(/\[RADAR:([^\]]+)\]/);
        if (match) {
          const chartTitle = match[1];
          const dataLines: string[] = [];
          i++;
          while (i < lines.length && lines[i].startsWith('- ')) {
            dataLines.push(lines[i]);
            i++;
          }
          
          const data = dataLines.map(l => {
            const parts = l.replace('- ', '').split(':');
            return {
              name: parts[0].trim(),
              value: parseFloat(parts[1]) || 0
            };
          });

          result.push(
            <EChartComponent 
              key={key++} 
              option={generateRadarOption(chartTitle, data)} 
              height={400}
            />
          );
          continue;
        }
      }

      // 检测柱状图标记
      if (line.includes('[BAR:') && line.includes(']')) {
        const match = line.match(/\[BAR:([^\]]+)\]/);
        if (match) {
          const chartTitle = match[1];
          i++;
          const tableLines: string[] = [];
          while (i < lines.length && (lines[i].startsWith('|') || lines[i].startsWith('|-'))) {
            tableLines.push(lines[i]);
            i++;
          }
          
          const parsed = parseTableToChartData(tableLines);
          if (parsed && parsed.rows.length > 0) {
            const categories = parsed.rows.map(r => r[0]);
            const values = parsed.rows.map(r => parseFloat(r[2]) || 0);

            result.push(
              <EChartComponent 
                key={key++} 
                option={generateBarOption(chartTitle, categories, values)} 
                height={350}
              />
            );
          }
          continue;
        }
      }

      // 处理代码块 ```language
      if (line.startsWith('```')) {
        const language = line.replace('```', '').trim();
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        const code = codeLines.join('\n');
        const highlightedCode = highlightCode(code, language);
        
        result.push(
          <div key={key++} className="my-6 rounded-lg overflow-hidden bg-[#1e1e1e] border border-slate-700">
            {language && (
              <div className="px-4 py-2 bg-[#2d2d2d] border-b border-slate-700">
                <span className="text-xs text-slate-400 font-mono uppercase">{language}</span>
              </div>
            )}
            <pre className="p-4 overflow-x-auto">
              <code 
                className="font-mono text-sm text-[#d4d4d4] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            </pre>
          </div>
        );
        i++; // skip the closing ```
        continue;
      }

      // 处理行内代码 `code`
      if (line.includes('`')) {
        const parts = line.split(/(`[^`]+`)/g);
        const processedParts = parts.map((part, idx) => {
          if (part.startsWith('`') && part.endsWith('`')) {
            return (
              <code 
                key={idx} 
                className="px-1.5 py-0.5 bg-slate-100 text-slate-800 rounded font-mono text-sm"
              >
                {part.slice(1, -1)}
              </code>
            );
          }
          return <span key={idx}>{parseBoldText(part)}</span>;
        });
        
        result.push(
          <p key={key++} className="mb-4 leading-relaxed text-slate-700">
            {processedParts}
          </p>
        );
        i++;
        continue;
      }

      // 处理引用块 > text (Notion-style callout)
      if (line.startsWith('> ')) {
        const quoteLines: string[] = [];
        while (i < lines.length && lines[i].startsWith('> ')) {
          quoteLines.push(lines[i].replace('> ', ''));
          i++;
        }
        const quoteContent = quoteLines.join('\n');
        
        result.push(
          <blockquote 
            key={key++} 
            className="my-6 pl-6 py-4 border-l-4 border-primary bg-[#f8f9fa] rounded-r-lg"
          >
            <div className="text-slate-800 leading-relaxed">
              {parseBoldText(quoteContent)}
            </div>
          </blockquote>
        );
        continue;
      }

      // 处理表格
      if (line.startsWith('|') && !line.includes('[BAR:')) {
        const tableLines: string[] = [line];
        i++;
        while (i < lines.length && lines[i].startsWith('|')) {
          tableLines.push(lines[i]);
          i++;
        }
        
        const parsed = parseTableToChartData(tableLines);
        if (parsed) {
          result.push(
            <div key={key++} className="overflow-x-auto my-6">
              <table className="min-w-full border-collapse border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-50">
                  <tr>
                    {parsed.headers.map((h, idx) => (
                      <th key={idx} className="border border-slate-200 px-4 py-3 text-left font-semibold text-slate-700">
                        {parseBoldText(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {parsed.rows.map((row, ridx) => (
                    <tr key={ridx} className={ridx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      {row.map((cell, cidx) => (
                        <td key={cidx} className="border border-slate-200 px-4 py-3 text-slate-600">
                          {parseBoldText(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        continue;
      }

      // 处理图片行（独立成行）
      if (line.trim().startsWith('![')) {
        const imageMatch = line.match(/!\[([^\]]*)\]\(([^\)]+)\)/);
        if (imageMatch) {
          result.push(
            <img
              key={key++}
              src={imageMatch[2]}
              alt={imageMatch[1]}
              className="w-full max-w-3xl mx-auto my-8 rounded-lg shadow-lg"
              loading="lazy"
            />
          );
          i++;
          continue;
        }
      }

      // 处理列表
      if (line.startsWith('- ')) {
        const items: string[] = [];
        while (i < lines.length && lines[i].startsWith('- ')) {
          items.push(lines[i].replace('- ', ''));
          i++;
        }
        result.push(
          <ul key={key++} className="list-disc ml-6 mb-4 space-y-2">
            {items.map((item, idx) => (
              <li key={idx} className="text-slate-700 leading-relaxed">{parseBoldText(item)}</li>
            ))}
          </ul>
        );
        continue;
      }

      // 处理数字列表
      if (line.match(/^\d+\./)) {
        const items: string[] = [];
        while (i < lines.length && lines[i].match(/^\d+\./)) {
          items.push(lines[i].replace(/^\d+\.\s*/, ''));
          i++;
        }
        result.push(
          <ol key={key++} className="list-decimal ml-6 mb-4 space-y-2">
            {items.map((item, idx) => (
              <li key={idx} className="text-slate-700 leading-relaxed">{parseBoldText(item)}</li>
            ))}
          </ol>
        );
        continue;
      }

      // 处理分隔线
      if (line.startsWith('---')) {
        result.push(<hr key={key++} className="my-8 border-slate-200" />);
        i++;
        continue;
      }

      // 处理空行
      if (line.trim() === '') {
        result.push(<br key={key++} />);
        i++;
        continue;
      }

      // 处理段落 - 使用 Merriweather 字体
      result.push(
        <p key={key++} className="mb-4 leading-relaxed text-slate-700 text-base">
          {parseBoldText(line)}
        </p>
      );
      i++;
    }

    setSections(result);
  }, [content]);

  return <article className="blog-content max-w-none">{sections}</article>;
}
