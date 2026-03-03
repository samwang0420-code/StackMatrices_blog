#!/usr/bin/env python3
"""
Generate data visualization images for X content
Using Matplotlib - no external APIs needed
"""

import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, Circle
import numpy as np
import os

OUTPUT_DIR = "/root/.openclaw/workspace/blog/public/generated-images"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Brand colors
COLORS = {
    'primary': '#0EA5E9',      # Sky blue
    'secondary': '#0C4A6E',    # Deep navy
    'accent': '#10B981',       # Emerald
    'danger': '#EF4444',       # Red
    'warning': '#F59E0B',      # Amber
    'dark': '#0B0F19',         # Dark navy
    'white': '#FFFFFF',
    'gray': '#6B7280'
}

def setup_brand_style():
    """Setup brand-consistent style"""
    plt.rcParams['figure.facecolor'] = COLORS['dark']
    plt.rcParams['axes.facecolor'] = COLORS['dark']
    plt.rcParams['text.color'] = COLORS['white']
    plt.rcParams['axes.labelcolor'] = COLORS['white']
    plt.rcParams['xtick.color'] = COLORS['white']
    plt.rcParams['ytick.color'] = COLORS['white']

def create_comparison_chart(title: str, before_val: float, after_val: float, 
                           before_label: str, after_label: str, metric: str) -> str:
    """Create before/after comparison chart"""
    setup_brand_style()
    
    fig, ax = plt.subplots(figsize=(10, 6), dpi=150)
    
    categories = [before_label, after_label]
    values = [before_val, after_val]
    colors = [COLORS['danger'], COLORS['accent']]
    
    bars = ax.bar(categories, values, color=colors, width=0.6, 
                  edgecolor=COLORS['white'], linewidth=2)
    
    # Add value labels on bars
    for bar, val in zip(bars, values):
        height = bar.get_height()
        ax.text(bar.get_x() + bar.get_width()/2., height,
                f'{val}{metric}',
                ha='center', va='bottom', fontsize=24, fontweight='bold',
                color=COLORS['white'])
    
    # Title and styling
    ax.set_title(title, fontsize=20, fontweight='bold', 
                color=COLORS['white'], pad=20)
    ax.set_ylabel(metric, fontsize=14, color=COLORS['gray'])
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['left'].set_color(COLORS['gray'])
    ax.spines['bottom'].set_color(COLORS['gray'])
    
    # Add improvement arrow and text
    improvement = ((after_val - before_val) / before_val) * 100
    ax.annotate('', xy=(1, after_val), xytext=(0, before_val),
                arrowprops=dict(arrowstyle='->', color=COLORS['accent'], lw=3))
    ax.text(0.5, max(values) * 1.15, f'+{improvement:.0f}% Improvement',
            ha='center', fontsize=16, color=COLORS['accent'], fontweight='bold')
    
    plt.tight_layout()
    
    filename = f"{OUTPUT_DIR}/comparison_{int(before_val)}_{int(after_val)}.png"
    plt.savefig(filename, dpi=150, bbox_inches='tight', 
                facecolor=COLORS['dark'], edgecolor='none')
    plt.close()
    
    return filename

def create_metrics_dashboard(metrics: dict, title: str) -> str:
    """Create metrics dashboard"""
    setup_brand_style()
    
    fig = plt.figure(figsize=(12, 8), dpi=150)
    
    # Create grid
    gs = fig.add_gridspec(2, 2, hspace=0.3, wspace=0.3)
    
    for idx, (key, value) in enumerate(metrics.items()):
        row = idx // 2
        col = idx % 2
        ax = fig.add_subplot(gs[row, col])
        
        # Create card background
        rect = FancyBboxPatch((0.1, 0.1), 0.8, 0.8, 
                             boxstyle="round,pad=0.02",
                             facecolor=COLORS['secondary'],
                             edgecolor=COLORS['primary'],
                             linewidth=2,
                             transform=ax.transAxes)
        ax.add_patch(rect)
        
        # Metric value
        ax.text(0.5, 0.6, str(value['value']), 
               ha='center', va='center', fontsize=48,
               fontweight='bold', color=COLORS['accent'],
               transform=ax.transAxes)
        
        # Metric label
        ax.text(0.5, 0.3, value['label'],
               ha='center', va='center', fontsize=14,
               color=COLORS['gray'],
               transform=ax.transAxes)
        
        # Change indicator
        if 'change' in value:
            color = COLORS['accent'] if value['change'] > 0 else COLORS['danger']
            symbol = '↑' if value['change'] > 0 else '↓'
            ax.text(0.5, 0.15, f"{symbol} {abs(value['change'])}%",
                   ha='center', va='center', fontsize=12,
                   color=color, fontweight='bold',
                   transform=ax.transAxes)
        
        ax.set_xlim(0, 1)
        ax.set_ylim(0, 1)
        ax.axis('off')
    
    fig.suptitle(title, fontsize=24, fontweight='bold', 
                color=COLORS['white'], y=0.98)
    
    filename = f"{OUTPUT_DIR}/dashboard_{len(metrics)}.png"
    plt.savefig(filename, dpi=150, bbox_inches='tight',
                facecolor=COLORS['dark'], edgecolor='none')
    plt.close()
    
    return filename

def create_step_diagram(steps: list, title: str) -> str:
    """Create step-by-step process diagram"""
    setup_brand_style()
    
    fig, ax = plt.subplots(figsize=(12, 8), dpi=150)
    
    n_steps = len(steps)
    y_positions = np.linspace(0.8, 0.2, n_steps)
    
    for i, (step_num, step_text) in enumerate(steps):
        y = y_positions[i]
        
        # Step number circle
        circle = Circle((0.1, y), 0.05, facecolor=COLORS['primary'],
                       edgecolor=COLORS['white'], linewidth=2)
        ax.add_patch(circle)
        ax.text(0.1, y, str(step_num), ha='center', va='center',
               fontsize=20, fontweight='bold', color=COLORS['white'])
        
        # Step text box
        rect = FancyBboxPatch((0.2, y-0.05), 0.7, 0.1,
                             boxstyle="round,pad=0.02",
                             facecolor=COLORS['secondary'],
                             edgecolor=COLORS['gray'],
                             linewidth=1)
        ax.add_patch(rect)
        ax.text(0.55, y, step_text, ha='center', va='center',
               fontsize=12, color=COLORS['white'], wrap=True)
        
        # Arrow to next step
        if i < n_steps - 1:
            ax.annotate('', xy=(0.1, y_positions[i+1] + 0.05), 
                       xytext=(0.1, y - 0.05),
                       arrowprops=dict(arrowstyle='->', 
                                     color=COLORS['primary'], lw=2))
    
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis('off')
    
    ax.set_title(title, fontsize=20, fontweight='bold',
                color=COLORS['white'], pad=20)
    
    filename = f"{OUTPUT_DIR}/steps_{n_steps}.png"
    plt.savefig(filename, dpi=150, bbox_inches='tight',
                facecolor=COLORS['dark'], edgecolor='none')
    plt.close()
    
    return filename

def create_roi_chart() -> str:
    """Create ROI comparison chart"""
    setup_brand_style()
    
    fig, ax = plt.subplots(figsize=(10, 6), dpi=150)
    
    methods = ['Traditional\nSEO', 'Google\nAds', 'GEO']
    roi_values = [200, 150, 6700]  # Percentage
    costs = [15, 35, 50]  # Monthly cost in thousands
    
    x = np.arange(len(methods))
    width = 0.35
    
    # Create bars
    bars1 = ax.bar(x - width/2, roi_values, width, label='ROI (%)',
                  color=COLORS['primary'], edgecolor=COLORS['white'])
    
    ax2 = ax.twinx()
    bars2 = ax2.bar(x + width/2, costs, width, label='Monthly Cost ($K)',
                   color=COLORS['warning'], edgecolor=COLORS['white'], alpha=0.7)
    
    # Labels
    ax.set_ylabel('ROI (%)', fontsize=14, color=COLORS['primary'])
    ax2.set_ylabel('Monthly Cost ($K)', fontsize=14, color=COLORS['warning'])
    ax.set_xticks(x)
    ax.set_xticklabels(methods, fontsize=12)
    
    # Title
    ax.set_title('Marketing ROI Comparison for Medical Practices', 
                fontsize=18, fontweight='bold', color=COLORS['white'], pad=20)
    
    # Add value labels
    for bar in bars1:
        height = bar.get_height()
        ax.text(bar.get_x() + bar.get_width()/2., height,
                f'{int(height)}%',
                ha='center', va='bottom', fontsize=14, fontweight='bold',
                color=COLORS['accent'])
    
    # Styling
    ax.set_facecolor(COLORS['dark'])
    ax2.set_facecolor('none')
    ax.tick_params(colors=COLORS['white'])
    ax2.tick_params(colors=COLORS['white'])
    
    plt.tight_layout()
    
    filename = f"{OUTPUT_DIR}/roi_comparison.png"
    plt.savefig(filename, dpi=150, bbox_inches='tight',
                facecolor=COLORS['dark'], edgecolor='none')
    plt.close()
    
    return filename

# Generate all template images
def generate_all_templates():
    """Generate all template images"""
    print("🎨 Generating X content images...")
    print("=" * 60)
    
    images = []
    
    # 1. Before/After comparison
    img = create_comparison_chart(
        "AI Visibility Improvement",
        18, 74,
        "Before GEO", "After 90 Days",
        "/100"
    )
    images.append(("AI Visibility", img))
    print(f"✅ {img}")
    
    # 2. Metrics dashboard
    metrics = {
        'queries': {'value': '84%', 'label': 'AI Health Queries', 'change': 12},
        'citations': {'value': '3.2x', 'label': 'More AI Citations', 'change': 220},
        'revenue': {'value': '$3.4M', 'label': 'Revenue Recovered', 'change': 6700},
        'referrals': {'value': '89', 'label': 'Monthly AI Referrals', 'change': 100}
    }
    img = create_metrics_dashboard(metrics, "GEO Performance Metrics")
    images.append(("Dashboard", img))
    print(f"✅ {img}")
    
    # 3. Steps diagram
    steps = [
        (1, "Technical Schema → MedicalProcedure markup"),
        (2, "Content Authority → AI-readable pages"),
        (3, "Entity Building → Knowledge Graph"),
        (4, "Review Optimization → AI trust"),
        (5, "Monitoring → Track citations")
    ]
    img = create_step_diagram(steps, "5-Step GEO Framework")
    images.append(("Framework", img))
    print(f"✅ {img}")
    
    # 4. ROI chart
    img = create_roi_chart()
    images.append(("ROI", img))
    print(f"✅ {img}")
    
    print("=" * 60)
    print(f"\n📊 Generated {len(images)} images:")
    for name, path in images:
        print(f"  • {name}: {path}")
    
    return images

if __name__ == "__main__":
    generate_all_templates()
