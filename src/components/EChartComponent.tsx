'use client';

import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface EChartComponentProps {
  option: any;
  height?: number;
}

export default function EChartComponent({ option, height = 400 }: EChartComponentProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // 初始化图表
      chartInstance.current = echarts.init(chartRef.current);
      chartInstance.current.setOption(option);

      // 响应式
      const handleResize = () => {
        chartInstance.current?.resize();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chartInstance.current?.dispose();
      };
    }
  }, [option]);

  return (
    <div 
      ref={chartRef} 
      style={{ width: '100%', height: `${height}px` }}
      className="my-8 rounded-lg overflow-hidden bg-white border border-slate-200"
    />
  );
}
