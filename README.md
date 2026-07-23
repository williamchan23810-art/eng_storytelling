# 🎬 Storytelling Engine (v1.0)

> An AI-powered storytelling and analysis framework that decomposes complex narrative media into multi-frame visual storyboards anchored by **Baby Monk (BM)**.

---

## 🌟 Overview

The **Storytelling Engine** transforms raw narrative inputs—ranging from classical Chinese poetry and modern music to news events and political propaganda—into a structured, multi-frame visual narrative. 

By grounding complex themes in the innocent, resilient, and gently satirical persona of **Baby Monk**, the engine illuminates core truths, macro-historical context, and deep emotional resonance through minimalist dialogue and seamless transition planning.

---

## ✨ Key Features

- **📥 Multi-Source Inputs:** Accepts Books, Songs, Idioms/Poems, Original Works, News Events, Unfair Incidents, and Satirical Propaganda.
- **🌐 Bilingual Engine:** Full native support for English and Chinese (Traditional / Simplified) inputs and outputs.
- **🌶️ The Acting "Spice Rack":** Fine-tune Baby Monk’s performance across 4 emotional dials:
  - *Naïve Sarcasm / Irony*
  - *Zen Resilience / Stoicism*
  - *Emotional Warmth / Empathy*
  - *Absurdity Disruption*
- **🎙️ Micro-Wisdom Persona:** Restricts BM’s dialogue to < 5 words per frame—delivering maximum emotional weight through zen-like proverbs.
- **🔄 Seamless Transition Mapping:** Generates continuity logic (camera moves, lighting shifts, action match-cuts, and audio bridges) between adjacent frames.
- **🎭 Story Cast & Era Adaptation:** Automatically adapts BM's attire and environment to match historical or thematic settings.

---

## 🏗️ Architecture

The engine operates across a modular 3-part pipeline:

1. **Part 1: Imports & Inputs**
   - Media Type, Title/Metadata, Raw Text, Language Selection, and Target Frame Count ($4 \rightarrow 50$).
2. **Part 2: Processing & Spice Rack**
   - Extracts Macro Environment (History, Politics, Economy, Personal Context).
   - Distills Primary & Secondary Messages.
   - Applies the **Spice Rack** dials to govern BM’s visual posture and micro-dialogue.
3. **Part 3: Output & Storyboard**
   - Frame Blueprint with image prompt specs, audio/soundscape cues, and transition logic.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+)
- **React** (v18+)
- **Tailwind CSS**
- **Lucide React** (`npm install lucide-react`)

### Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/storytelling-engine.git](https://github.com/your-username/storytelling-engine.git)
   cd storytelling-engine
