import plotly.graph_objects as go
import plotly.io as pio

# Data for the flowchart
data = [
    {"step": "User Input", "type": "input", "description": "Education, Skills, Location, Interests"},
    {"step": "Location Match", "type": "filter", "description": "Filter internships by preferred locations"},
    {"step": "Education Match", "type": "filter", "description": "Match minimum education requirements"},
    {"step": "Skill Match", "type": "scoring", "description": "Calculate skill compatibility score"},
    {"step": "Interest Align", "type": "scoring", "description": "Match sector/domain interests"},
    {"step": "Score & Rank", "type": "algorithm", "description": "Combine scores and rank internships"},
    {"step": "Top 3-5 Select", "type": "output", "description": "Select best matching internships"},
    {"step": "UI Display", "type": "presentation", "description": "Show recommendations in cards"}
]

# Define colors for different step types
type_colors = {
    "input": "#1FB8CD",
    "filter": "#DB4545", 
    "scoring": "#2E8B57",
    "algorithm": "#5D878F",
    "output": "#D2BA4C",
    "presentation": "#B4413C"
}

# Define positions for flowchart layout
positions = [
    (0.5, 0.9),   # User Input
    (0.2, 0.7),   # Location Match
    (0.8, 0.7),   # Education Match
    (0.2, 0.5),   # Skill Match
    (0.8, 0.5),   # Interest Align
    (0.5, 0.3),   # Score & Rank
    (0.5, 0.15),  # Top 3-5 Select
    (0.5, 0.0)    # UI Display
]

# Create figure
fig = go.Figure()

# Add boxes and text for each step
for i, (item, pos) in enumerate(zip(data, positions)):
    x, y = pos
    color = type_colors[item["type"]]
    
    # Add rectangle shape
    fig.add_shape(
        type="rect",
        x0=x-0.12, y0=y-0.06, x1=x+0.12, y1=y+0.06,
        line=dict(color=color, width=2),
        fillcolor=color,
        opacity=0.8
    )
    
    # Add text
    fig.add_annotation(
        x=x, y=y,
        text=f"<b>{item['step']}</b>",
        showarrow=False,
        font=dict(color="white", size=12),
        align="center"
    )

# Add arrows to show flow
arrow_connections = [
    (0, 1), (0, 2),  # User Input to Location and Education Match
    (1, 3), (2, 4),  # Location to Skill, Education to Interest
    (3, 5), (4, 5),  # Both to Score & Rank
    (5, 6),          # Score & Rank to Top 3-5
    (6, 7)           # Top 3-5 to UI Display
]

for start_idx, end_idx in arrow_connections:
    start_pos = positions[start_idx]
    end_pos = positions[end_idx]
    
    fig.add_annotation(
        x=end_pos[0], y=end_pos[1] + 0.06,
        ax=start_pos[0], ay=start_pos[1] - 0.06,
        xref="x", yref="y",
        axref="x", ayref="y",
        arrowhead=2, arrowsize=1, arrowwidth=2,
        arrowcolor="#333333",
        showarrow=True
    )

# Update layout
fig.update_layout(
    title="PM Internship Algorithm Flow",
    xaxis=dict(range=[-0.1, 1.1], showgrid=False, showticklabels=False, zeroline=False),
    yaxis=dict(range=[-0.15, 1.0], showgrid=False, showticklabels=False, zeroline=False),
    showlegend=False,
    plot_bgcolor="white"
)

# Remove axes
fig.update_xaxes(visible=False)
fig.update_yaxes(visible=False)

# Save the chart
fig.write_image("pm_internship_flowchart.png")
fig.show()