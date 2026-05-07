---
name: process-screenshots
description: Process Wordscapes team tournament screenshots to extract player scores and rank using OCR. Use this skill when asked to process, parse, or scan leaderboard screenshots from folders into JSON data.
---

# Process Screenshots Skill

This skill automates the extraction of team placement and individual player scores from Werdscapes weekly leaderboard screenshots using Gemini's built-in OCR capabilities.

## Workflow

When the user asks to process screenshots for specific weeks or directories, follow these steps:

### 1. Identify Target Directories
Identify the folders containing the screenshots to process. They are typically located in the `temp_screenshots/` directory, named by week (e.g., `temp_screenshots/20250714`).

### 2. Process Screenshots with Gemini
For each directory:
1. List all image files (PNG, JPG, JPEG) in the directory.
2. Read the images using the `read_file` tool.
3. Use Gemini's vision capabilities to extract the data. You should look for:
    - The team's final tournament rank/placement.
    - Player names and their corresponding tournament scores.
4. Since a leaderboard spans multiple screenshots, carefully consolidate all unique players and their highest scores.

### 3. Save Results
Create or update `processed_results.json` in the folder with the following format:
```json
{
  "week": "YYYYMMDD",
  "place": 2,
  "scores": [
    { "name": "PlayerName", "score": 4105 },
    ...
  ]
}
```
Sort the scores in descending order.

### 4. Verify Output
Confirm the file was saved correctly and summarizes the extracted data for the user.
