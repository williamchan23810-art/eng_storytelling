import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause,
  Sparkles, 
  Sliders, 
  Layers, 
  RefreshCw, 
  Volume2, 
  Flame, 
  Video, 
  Plus, 
  Trash2,
  Terminal as TerminalIcon,
  Maximize2,
  CheckCircle,
  HelpCircle,
  Eye,
  Upload,
  Music,
  FileImage,
  X,
  FileText
} from 'lucide-react';

const INITIAL_FRAMES = [
  { 
    id: 1, 
    title: "The Mandatory Smile", 
    line: "Is the sun mandating light?", 
    transition: "Camera Pull-Back + Fog Blend",
    landscapeImg: "/assets/frame_1_landscape.jpg",
    portraitImg: "/assets/frame_1_portrait.jpg",
    visualStyle: "Auto",
    cameraMovement: "Auto"
  },
  { 
    id: 2, 
    title: "The Inspection", 
    line: "Peaches make true smiles.", 
    transition: "Action Match Cut",
    landscapeImg: "/assets/frame_2_landscape.jpg",
    portraitImg: "/assets/frame_2_portrait.jpg",
    visualStyle: "Auto",
    cameraMovement: "Auto"
  },
  { 
    id: 3, 
    title: "The Glitch in System", 
    line: "Rules can't order sweetness.", 
    transition: "Tempo Morph & Light Fade",
    landscapeImg: "/assets/frame_3_landscape.jpg",
    portraitImg: "/assets/frame_3_portrait.jpg",
    visualStyle: "Auto",
    cameraMovement: "Auto"
  },
  { 
    id: 4, 
    title: "The Unbound Heart", 
    line: "Truth blooms soft.", 
    transition: "Final Hold & Sound Fade",
    landscapeImg: "/assets/frame_4_landscape.jpg",
    portraitImg: "/assets/frame_4_portrait.jpg",
    visualStyle: "Auto",
    cameraMovement: "Auto"
  }
];

const ADDABLE_FRAME_TEMPLATES = [
  { title: "The Quiet Rebel", line: "Soft whispers break steel walls.", transition: "Cross Dissolve & Low Hum", visualStyle: "Auto", cameraMovement: "Auto" },
  { title: "The Forbidden Fruit", line: "A bite of truth, sour but free.", transition: "Rapid Zoom & Pitch Shift", visualStyle: "Auto", cameraMovement: "Auto" },
  { title: "The System Reset", line: "Even code needs to dream.", transition: "Noise Gate & Screen Glitch", visualStyle: "Auto", cameraMovement: "Auto" },
  { title: "A New Dawn", line: "Light doesn't ask for permission.", transition: "Warm Glow & Outro Fade", visualStyle: "Auto", cameraMovement: "Auto" },
];

export default function StorytellingEngineUI() {
  const [frames, setFrames] = useState(INITIAL_FRAMES);
  const [selectedFrameId, setSelectedFrameId] = useState(1); // can also be 'outro'
  const [mediaType, setMediaType] = useState('Dictatorship Propaganda');
  const [title, setTitle] = useState('State Mandate #402: Smiling is Mandatory');
  const [rawText, setRawText] = useState(
    'By decree of the Ministry of Harmony, all citizens must maintain a visible smile while in public spaces...'
  );
  
  // Aspect Ratio State: '16:9' (landscape) or '9:16' (portrait)
  const [aspectRatio, setAspectRatio] = useState('16:9');
  
  // Playback slideshow state
  const [isPlaying, setIsPlaying] = useState(false);

  // Spice Rack State Sliders (0 - 100)
  const [spices, setSpices] = useState({
    sarcasm: 80,
    resilience: 90,
    warmth: 70,
    disruption: 85
  });

  // AI Processing simulation states
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [consoleLogs, setConsoleLogs] = useState([
    "System idle. Ready to analyze ingredients..."
  ]);
  const logEndRef = useRef(null);

  // New States requested by user
  const [projectAbbr, setProjectAbbr] = useState('DP');
  const [projectDate, setProjectDate] = useState('');
  
  // Draggable Upload States
  const [sourceImageFile, setSourceImageFile] = useState(null);
  const [sourceImagePreviewUrl, setSourceImagePreviewUrl] = useState('');
  const [showSourceModal, setShowSourceModal] = useState(false);
  const [bgMusicFile, setBgMusicFile] = useState(null);
  const [bgMusicFileName, setBgMusicFileName] = useState('');
  const [bgMusicOption, setBgMusicOption] = useState('AI'); // 'Original' or 'AI'

  // Composer and requests
  const [composer, setComposer] = useState('');
  const [customRequest, setCustomRequest] = useState('');
  
  // When options
  const [whenOption, setWhenOption] = useState('Auto'); // 'Auto' or 'Specified'
  const [whenSpecified, setWhenSpecified] = useState('');

  // Where options
  const [whereOption, setWhereOption] = useState('Auto'); // 'Auto' or 'Specified'
  const [whereSpecified, setWhereSpecified] = useState('');

  const [outputLanguage, setOutputLanguage] = useState('English (Default)');

  // Actors consistency references state & handlers
  const [actors, setActors] = useState([
    {
      id: 1,
      name: 'Baby Monk',
      imgUrl: '/assets/baby_monk.png',
      file: null
    }
  ]);

  const addNewActor = () => {
    const nextId = actors.length > 0 ? Math.max(...actors.map(a => a.id)) + 1 : 1;
    setActors([
      ...actors,
      {
        id: nextId,
        name: '',
        imgUrl: '',
        file: null
      }
    ]);
  };

  const handleActorImageSelect = (actorId, e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setActors(prev => prev.map(a => {
        if (a.id === actorId) {
          return { ...a, imgUrl: url, file: file };
        }
        return a;
      }));
    }
  };

  const handleActorNameChange = (actorId, name) => {
    setActors(prev => prev.map(a => {
      if (a.id === actorId) {
        return { ...a, name };
      }
      return a;
    }));
  };

  const removeActor = (actorId) => {
    setActors(prev => prev.filter(a => a.id !== actorId));
  };

  const TRANSLATIONS = {
    'English (Default)': {
      1: "Is the sun mandating light?",
      2: "Peaches make true smiles.",
      3: "Rules can't order sweetness.",
      4: "Truth blooms soft."
    },
    'Mandarin': {
      1: "太阳在强制照射光芒吗？",
      2: "桃子能带来真正的微笑。",
      3: "规则无法命令甜美。",
      4: "真理在温柔地绽放。"
    },
    'Cantonese': {
      1: "太阳喺度强制光芒咩？",
      2: "桃子帶嚟真正嘅微笑。",
      3: "規則無辦法命令甜美。",
      4: "真理溫柔地綻放。"
    },
    'Espanol': {
      1: "¿Está el sol ordenando la luz?",
      2: "Los melocotones traen sonrisas verdaderas.",
      3: "Las reglas no pueden ordenar la dulzura.",
      4: "La verdad florece suavemente."
    }
  };

  const getTranslatedLine = (frame) => {
    if (!frame) return '';
    const defaultLines = {
      "Is the sun mandating light?": 1,
      "Peaches make true smiles.": 2,
      "Rules can't order sweetness.": 3,
      "Truth blooms soft.": 4
    };
    const id = defaultLines[frame.line];
    if (id && TRANSLATIONS[outputLanguage] && TRANSLATIONS[outputLanguage][id]) {
      return TRANSLATIONS[outputLanguage][id];
    }
    if (outputLanguage === 'Mandarin') {
      if (/^[\u4e00-\u9fa5]/.test(frame.line)) return frame.line;
      return `[译] ${frame.line}`;
    }
    if (outputLanguage === 'Cantonese') {
      if (/^[\u4e00-\u9fa5]/.test(frame.line)) return frame.line;
      return `[廣] ${frame.line}`;
    }
    if (outputLanguage === 'Espanol') {
      return `[Esp] ${frame.line}`;
    }
    return frame.line;
  };

  const handleLanguageChange = (lang) => {
    setOutputLanguage(lang);
    setConsoleLogs(prev => [
      ...prev,
      `🌐 Story compilation language toggled to: ${lang}`
    ]);
  };

  const handleSpiceChange = (key, val) => {
    setSpices(prev => ({ ...prev, [key]: Number(val) }));
  };

  const handleMediaTypeChange = (val) => {
    setMediaType(val);
    const mapping = {
      'Dictatorship Propaganda': 'DP',
      'Unfair Incident': 'UI',
      'News / Current Event': 'NE',
      'Poem / Idiom': 'PI',
      'Song Lyrics': 'SL',
      'Book / Story Chapter': 'BC',
      'My Creation': 'MC'
    };
    if (mapping[val]) {
      setProjectAbbr(mapping[val]);
    }
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSourceImageFile(file);
      setSourceImagePreviewUrl(URL.createObjectURL(file));
      setConsoleLogs(prev => [...prev, `📸 Dragged & loaded reference image: "${file.name}"`]);
    } else {
      alert("Please upload a valid JPEG/PNG image.");
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSourceImageFile(file);
      setSourceImagePreviewUrl(URL.createObjectURL(file));
      setConsoleLogs(prev => [...prev, `📸 Selected reference image: "${file.name}"`]);
    }
  };

  const handleAudioDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type.startsWith('audio/') || file.name.endsWith('.mp3'))) {
      setBgMusicFile(file);
      setBgMusicFileName(file.name);
      setBgMusicOption('Original');
      setConsoleLogs(prev => [...prev, `🎵 Dragged & loaded audio track: "${file.name}"`]);
    } else {
      alert("Please upload a valid MP3 audio file.");
    }
  };

  const handleAudioSelect = (e) => {
    const file = e.target.files[0];
    if (file && (file.type.startsWith('audio/') || file.name.endsWith('.mp3'))) {
      setBgMusicFile(file);
      setBgMusicFileName(file.name);
      setBgMusicOption('Original');
      setConsoleLogs(prev => [...prev, `🎵 Selected audio track: "${file.name}"`]);
    }
  };

  // Scroll to bottom of terminal
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [consoleLogs]);

  // Slideshow Player Logic - Holds outro page for exactly 3 seconds (3000ms)
  useEffect(() => {
    let timer;
    if (isPlaying) {
      const playNext = () => {
        if (selectedFrameId === 'outro') {
          setSelectedFrameId(frames[0].id);
        } else {
          const currentIndex = frames.findIndex(f => f.id === selectedFrameId);
          if (currentIndex === frames.length - 1) {
            setSelectedFrameId('outro');
          } else if (currentIndex === -1) {
            setSelectedFrameId(frames[0].id);
          } else {
            setSelectedFrameId(frames[currentIndex + 1].id);
          }
        }
      };
      
      const holdTime = selectedFrameId === 'outro' ? 3000 : 3500;
      timer = setTimeout(playNext, holdTime);
    }
    
    return () => clearTimeout(timer);
  }, [isPlaying, selectedFrameId, frames]);

  // Handle Target Frame Count slider changes (extends or contracts list)
  const handleFrameCountChange = (count) => {
    const targetCount = Number(count);
    if (targetCount === frames.length) return;

    if (targetCount > frames.length) {
      // Add frames
      const diff = targetCount - frames.length;
      let newFrames = [...frames];
      for (let i = 0; i < diff; i++) {
        const nextId = newFrames.length > 0 ? Math.max(...newFrames.map(f => f.id)) + 1 : 1;
        const template = ADDABLE_FRAME_TEMPLATES[(nextId - 5) % ADDABLE_FRAME_TEMPLATES.length] || ADDABLE_FRAME_TEMPLATES[0];
        const imageIndex = ((nextId - 1) % 4) + 1;
        
        newFrames.push({
          id: nextId,
          title: template.title,
          line: template.line,
          transition: template.transition,
          landscapeImg: `/assets/frame_${imageIndex}_landscape.jpg`,
          portraitImg: `/assets/frame_${imageIndex}_portrait.jpg`
        });
      }
      setFrames(newFrames);
    } else {
      // Remove frames from the end
      const newFrames = frames.slice(0, targetCount);
      setFrames(newFrames);
      if (!newFrames.some(f => f.id === selectedFrameId) && selectedFrameId !== 'outro') {
        setSelectedFrameId(newFrames[newFrames.length - 1].id);
      }
    }
  };

  // Add a single frame manually
  const addNewFrame = () => {
    const nextId = frames.length > 0 ? Math.max(...frames.map(f => f.id)) + 1 : 1;
    const template = ADDABLE_FRAME_TEMPLATES[(nextId - 5) % ADDABLE_FRAME_TEMPLATES.length] || ADDABLE_FRAME_TEMPLATES[0];
    const imageIndex = ((nextId - 1) % 4) + 1;

    const newFrame = {
      id: nextId,
      title: template.title,
      line: template.line,
      transition: template.transition,
      landscapeImg: `/assets/frame_${imageIndex}_landscape.jpg`,
      portraitImg: `/assets/frame_${imageIndex}_portrait.jpg`
    };

    setFrames([...frames, newFrame]);
    setSelectedFrameId(nextId);
  };

  // Delete a frame
  const deleteFrame = (id, e) => {
    e.stopPropagation();
    if (frames.length <= 1) {
      alert("Story must have at least 1 frame.");
      return;
    }
    const newFrames = frames.filter(f => f.id !== id);
    setFrames(newFrames);
    if (selectedFrameId === id) {
      setSelectedFrameId(newFrames[0].id);
    }
  };

  // Update active frame fields
  const updateActiveFrame = (field, val) => {
    setFrames(prev => prev.map(f => {
      if (f.id === selectedFrameId) {
        return { ...f, [field]: val };
      }
      return f;
    }));
  };

  // Run AI simulation sequence
  const runAISimulation = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setProcessingProgress(0);
    setConsoleLogs([
      "🚀 Starting AI Story Engine Processing Pipeline...",
      `🔑 Project ID locked: ${projectAbbr}${projectDate || '______'}`,
      `📂 Loaded source media type: "${mediaType}"`,
      `📄 Input text analyzed (${rawText.length} characters)`,
      customRequest ? `💬 Custom creative request parsed: "${customRequest}"` : "💬 No custom overrides parsed",
      bgMusicFile ? `🎵 Background music sync active: "${bgMusicFileName}"` : "🎵 AI Vibe matching audio active",
      sourceImageFile ? `📸 Reference image parsed: "${sourceImageFile.name}"` : "📸 No custom source images loaded",
      "⚙️ Fetching hyperparameters from Spice Rack settings..."
    ]);

    const steps = [
      { progress: 15, msg: `🧠 Context extraction complete. Dissonance target: ${spices.sarcasm > 70 ? 'High Dystopian Satire' : 'Standard Dramatization'}` },
      { progress: 35, msg: `🌶️ Spice metrics locked in: Sarcasm(${spices.sarcasm}%) | Stoicism(${spices.resilience}%) | Empathy(${spices.warmth}%) | Absurdity(${spices.disruption}%)` },
      { progress: 55, msg: customRequest ? `🎨 Injecting custom requests & drafting scene blueprints...` : `🎨 Drafting scene script blueprints for ${frames.length} sequential story nodes...` },
      { progress: 75, msg: `🎬 Matching transition connectors: "${frames.map(f => f.transition.split(' ')[0]).join(' ➔ ')}"` },
      { progress: 90, msg: "🔊 Generating dialog cues and ambient subtext parameters..." },
      { progress: 100, msg: "✨ Video sequence compile complete! Review rendering output below." }
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setProcessingProgress(step.progress);
        setConsoleLogs(prev => [...prev, step.msg]);
        if (step.progress === 100) {
          setIsProcessing(false);
        }
      }, (index + 1) * 1200);
    });
  };

  const selectedFrame = frames.find(f => f.id === selectedFrameId) || frames[0];

  // Dynamic values depending on spices
  const getSpiceImpact = () => {
    let target = "Forced conformity & state overreach";
    let strategy = "Disarming kindness & radical innocence";
    
    if (spices.sarcasm > 80) {
      target = "Bureaucratic hypocrisy & high-level authoritarian theater";
    } else if (spices.sarcasm < 30) {
      target = "Direct systemic constraints & immediate survival";
    }

    if (spices.disruption > 80) {
      strategy = "Existential absurdity, slapstick glitches & cognitive bugs";
    } else if (spices.warmth > 80) {
      strategy = "Vulnerable intimate connections & warm analog gestures";
    } else if (spices.resilience > 80) {
      strategy = "Quiet, unflinching resistance & solid structural patience";
    }

    return { target, strategy };
  };

  const { target, strategy } = getSpiceImpact();

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      
      {/* PANE 1: INPUTS & INGREDIENTS */}
      <div className="w-80 border-r border-slate-800 p-5 flex flex-col justify-between bg-slate-900/40 overflow-y-auto shrink-0">
        <div className="space-y-4">
          
          {/* Top Left Corner Branding */}
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
            <img 
              src="/assets/whc_logo.jpg" 
              alt="WHC Logo" 
              className="w-10 h-10 rounded-full border border-amber-500/30 object-cover shadow-lg"
            />
            <div>
              <div className="text-white font-extrabold text-sm tracking-wide leading-tight">William H. Chan Studio</div>
              <div className="text-[10px] text-slate-400 font-semibold tracking-wider mt-0.5">Story-Telling Engine</div>
            </div>
          </div>

          {/* Project ID (Abbreviation Selector + MMDDYY Input) */}
          <div>
            <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider flex justify-between">
              <span>Project ID</span>
              <span className="text-amber-500 font-mono text-[9px]">(Abbr + MMDDYY)</span>
            </label>
            <div className="flex gap-2 mt-1">
              {/* Abbreviation Selector */}
              <select 
                value={projectAbbr}
                onChange={(e) => setProjectAbbr(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs focus:ring-2 focus:ring-amber-500 outline-none text-amber-300 font-mono font-bold w-20 shrink-0"
              >
                <option value="DP">DP</option>
                <option value="UI">UI</option>
                <option value="NE">NE</option>
                <option value="PI">PI</option>
                <option value="SL">SL</option>
                <option value="BC">BC</option>
                <option value="MC">MC</option>
              </select>

              {/* Date Input */}
              <input 
                type="text" 
                maxLength={6}
                placeholder="Date (MMDDYY)"
                value={projectDate}
                onChange={(e) => setProjectDate(e.target.value.replace(/\D/g, ''))} // digits only
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs focus:ring-2 focus:ring-amber-500 outline-none font-mono text-center"
              />
            </div>
            
            {/* Real-time Combined Output Badge */}
            <div className="mt-2 text-[10px] text-slate-500 font-mono flex items-center justify-between bg-slate-950/40 p-2 rounded-lg border border-slate-900">
              <span>Combined Code:</span>
              <span className="text-amber-400 font-bold text-xs bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {projectAbbr || '??'}{projectDate || '______'}
              </span>
            </div>
          </div>

          {/* Source Media Type */}
          <div>
            <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Source Media Type</label>
            <select 
              value={mediaType}
              onChange={(e) => handleMediaTypeChange(e.target.value)}
              className="w-full mt-1 bg-slate-800/80 border border-slate-700 rounded-lg p-2 text-xs focus:ring-2 focus:ring-amber-500 outline-none text-amber-300 font-medium"
            >
              <option value="Dictatorship Propaganda">Dictatorship Propaganda (DP) (諷刺專制)</option>
              <option value="Unfair Incident">Unfair Incident (UI) (社會/個人不公)</option>
              <option value="News / Current Event">News / Current Event (NE) (新聞事件)</option>
              <option value="Poem / Idiom">Poem / Idiom (PI) (詩詞/成語)</option>
              <option value="Song Lyrics">Song Lyrics (SL) (歌曲)</option>
              <option value="Book / Story Chapter">Book / Story Chapter (BC) (書籍)</option>
              <option value="My Creation">My Creation (MC) (原創作品)</option>
            </select>
          </div>

          {/* Title / Headline */}
          <div>
            <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Title / Headline</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 bg-slate-800/80 border border-slate-700 rounded-lg p-2 text-xs focus:ring-2 focus:ring-amber-500 outline-none text-slate-200"
            />
          </div>

          {/* Composer / Author */}
          <div>
            <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Composer / Author / Lyricist</label>
            <input 
              type="text" 
              placeholder="e.g. Luo Binwang (can leave blank)"
              value={composer}
              onChange={(e) => setComposer(e.target.value)}
              className="w-full mt-1 bg-slate-800/80 border border-slate-700 rounded-lg p-2 text-xs focus:ring-2 focus:ring-amber-500 outline-none text-slate-200"
            />
          </div>

          {/* Raw Content */}
          <div>
            <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Raw Content / Article / Text</label>
            <textarea 
              rows={3}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              className="w-full mt-1 bg-slate-800/80 border border-slate-700 rounded-lg p-2 text-xs focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed text-slate-300"
            />
          </div>

          {/* Draggable Image Upload Zone */}
          <div>
            <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Source Reference Image (JPEG)</label>
            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleImageDrop}
              className="mt-1 border border-dashed border-slate-700 hover:border-amber-500/50 bg-slate-950/40 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-slate-900/20 relative group"
            >
              {!sourceImageFile && (
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              )}
              {sourceImageFile ? (
                <div className="flex items-center gap-2.5 w-full relative z-10">
                  <img 
                    src={sourceImagePreviewUrl} 
                    alt="Preview" 
                    className="w-10 h-10 rounded object-cover border border-slate-750 shrink-0" 
                  />
                  <div className="flex-1 truncate">
                    <p className="text-[10px] text-slate-200 font-medium truncate leading-normal">{sourceImageFile.name}</p>
                    <p className="text-[9px] text-slate-500 font-mono leading-none">{(sourceImageFile.size / 1024).toFixed(1)} KB</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowSourceModal(true);
                      }}
                      className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-amber-400 transition-colors"
                      title="View Reference Image"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSourceImageFile(null);
                        setSourceImagePreviewUrl('');
                      }}
                      className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-rose-500 transition-colors"
                      title="Remove Reference Image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-1">
                  <Upload className="w-5 h-5 text-slate-500 mx-auto group-hover:text-amber-400 transition-colors" />
                  <p className="text-[9px] text-slate-400 font-medium">Drag & Drop Image or Click to Browse</p>
                  <p className="text-[8px] text-slate-650 font-mono">Supports JPEG, PNG</p>
                </div>
              )}
            </div>
          </div>

          {/* Draggable Audio Upload Zone */}
          <div>
            <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Background Music (MP3)</label>
            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleAudioDrop}
              className="mt-1 border border-dashed border-slate-700 hover:border-amber-500/50 bg-slate-950/40 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-slate-900/20 relative group"
            >
              {!bgMusicFile && (
                <input 
                  type="file" 
                  accept="audio/mp3, audio/*"
                  onChange={handleAudioSelect}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              )}
              {bgMusicFile ? (
                <div className="flex items-center gap-2.5 w-full relative z-10">
                  <div className="w-10 h-10 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <Music className="w-5 h-5" />
                  </div>
                  <div className="flex-1 truncate">
                    <p className="text-[10px] text-slate-200 font-medium truncate leading-normal">{bgMusicFileName}</p>
                    <p className="text-[9px] text-slate-500 font-mono leading-none">{(bgMusicFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setBgMusicFile(null);
                      setBgMusicFileName('');
                    }}
                    className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-rose-500 transition-colors"
                    title="Remove Audio Track"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="text-center space-y-1">
                  <Music className="w-5 h-5 text-slate-500 mx-auto group-hover:text-amber-400 transition-colors" />
                  <p className="text-[9px] text-slate-400 font-medium">Drag & Drop MP3 or Click to Browse</p>
                  <p className="text-[8px] text-slate-650 font-mono">Supports MP3, WAV</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <button 
                onClick={() => setBgMusicOption('Original')}
                className={`py-1 px-2 rounded-lg border text-[9px] font-bold transition-all ${
                  bgMusicOption === 'Original' 
                    ? 'bg-amber-500/15 border-amber-500 text-amber-300' 
                    : 'bg-slate-850 border-slate-700 text-slate-400 hover:border-slate-600'
                }`}
              >
                Use Uploaded Original
              </button>
              <button 
                onClick={() => setBgMusicOption('AI')}
                className={`py-1 px-2 rounded-lg border text-[9px] font-bold transition-all ${
                  bgMusicOption === 'AI' 
                    ? 'bg-amber-500/15 border-amber-500 text-amber-300' 
                    : 'bg-slate-855 border-slate-700 text-slate-400 hover:border-slate-600'
                }`}
              >
                Choose by AI Vibe
              </button>
            </div>
          </div>

          {/* When (Era) */}
          <div>
            <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Era / Time (When)</label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <button 
                onClick={() => setWhenOption('Auto')}
                className={`py-1.5 px-2.5 rounded-lg border text-xs font-bold transition-all ${
                  whenOption === 'Auto' 
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' 
                    : 'bg-slate-850 border-slate-700 text-slate-400 hover:border-slate-600'
                }`}
              >
                Auto (AI Choice)
              </button>
              <button 
                onClick={() => setWhenOption('Specified')}
                className={`py-1.5 px-2.5 rounded-lg border text-xs font-bold transition-all ${
                  whenOption === 'Specified' 
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' 
                    : 'bg-slate-850 border-slate-700 text-slate-400 hover:border-slate-600'
                }`}
              >
                Specified Era
              </button>
            </div>
            {whenOption === 'Specified' && (
              <input 
                type="text" 
                placeholder="Enter Era (e.g. Tang Dynasty, 1980s...)"
                value={whenSpecified}
                onChange={(e) => setWhenSpecified(e.target.value)}
                className="w-full mt-1.5 bg-slate-800/80 border border-slate-700 rounded-lg p-2 text-xs focus:ring-2 focus:ring-amber-500 outline-none text-slate-200 animate-fadeIn"
              />
            )}
          </div>

          {/* Where (Location) */}
          <div>
            <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Location / Setting (Where)</label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <button 
                onClick={() => setWhereOption('Auto')}
                className={`py-1.5 px-2.5 rounded-lg border text-xs font-bold transition-all ${
                  whereOption === 'Auto' 
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' 
                    : 'bg-slate-850 border-slate-700 text-slate-400 hover:border-slate-600'
                }`}
              >
                Auto (AI Choice)
              </button>
              <button 
                onClick={() => setWhereOption('Specified')}
                className={`py-1.5 px-2.5 rounded-lg border text-xs font-bold transition-all ${
                  whereOption === 'Specified' 
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' 
                    : 'bg-slate-850 border-slate-700 text-slate-400 hover:border-slate-600'
                }`}
              >
                Specified Location
              </button>
            </div>
            {whereOption === 'Specified' && (
              <input 
                type="text" 
                placeholder="Enter Location (e.g. Imperial Palace, Cyberpunk City...)"
                value={whereSpecified}
                onChange={(e) => setWhereSpecified(e.target.value)}
                className="w-full mt-1.5 bg-slate-800/80 border border-slate-700 rounded-lg p-2 text-xs focus:ring-2 focus:ring-amber-500 outline-none text-slate-200 animate-fadeIn"
              />
            )}
          </div>

          {/* Target Frame Count */}
          <div>
            <div className="flex justify-between text-[10px] text-slate-400 font-bold tracking-wider mb-1">
              <span>TARGET FRAME COUNT</span>
              <span className="text-amber-400 font-bold">{frames.length} Frames</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="12" 
              value={frames.length} 
              onChange={(e) => handleFrameCountChange(e.target.value)}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>

        <button 
          onClick={runAISimulation}
          disabled={isProcessing}
          className={`w-full mt-5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-bold py-2.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${
            isProcessing ? 'opacity-50 cursor-not-allowed' : 'active:scale-[0.98]'
          }`}
        >
          <RefreshCw className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
          {isProcessing ? `Processing (${processingProgress}%)` : 'Run AI Processing Engine'}
        </button>
      </div>

      {/* PANE 2: ENGINE PROCESSING & THE SPICE RACK */}
      <div className="w-[380px] border-r border-slate-800 p-5 overflow-y-auto space-y-5 bg-slate-950 shrink-0 flex flex-col justify-between h-full">
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-lg">
            <Layers className="w-5 h-5" />
            <span>AI processing & Spice Rack</span>
          </div>

          {/* 🌶️ THE SPICE RACK */}
          <div className="bg-slate-900 border border-amber-500/20 rounded-xl p-4 space-y-4 bg-gradient-to-b from-amber-500/5 to-transparent shadow-inner">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>BM Acting "Spice Rack"</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">Emotional Tuning</span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 font-medium mb-1">
                  <span>Naïve Sarcasm / Irony</span>
                  <span className="text-amber-400 font-mono font-bold">{spices.sarcasm}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" 
                  value={spices.sarcasm} 
                  onChange={(e) => handleSpiceChange('sarcasm', e.target.value)}
                  className="w-full accent-orange-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 font-medium mb-1">
                  <span>Zen Resilience / Stoicism</span>
                  <span className="text-amber-400 font-mono font-bold">{spices.resilience}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" 
                  value={spices.resilience} 
                  onChange={(e) => handleSpiceChange('resilience', e.target.value)}
                  className="w-full accent-amber-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 font-medium mb-1">
                  <span>Emotional Warmth / Empathy</span>
                  <span className="text-amber-400 font-mono font-bold">{spices.warmth}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" 
                  value={spices.warmth} 
                  onChange={(e) => handleSpiceChange('warmth', e.target.value)}
                  className="w-full accent-rose-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 font-medium mb-1">
                  <span>Absurdity Disruption</span>
                  <span className="text-amber-400 font-mono font-bold">{spices.disruption}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" 
                  value={spices.disruption} 
                  onChange={(e) => handleSpiceChange('disruption', e.target.value)}
                  className="w-full accent-emerald-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* AI Processing Request Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>Special AI Generation Requests</span>
            </div>
            <textarea 
              rows={2}
              value={customRequest}
              onChange={(e) => setCustomRequest(e.target.value)}
              placeholder="Enter custom requests (e.g. 'Make it look like watercolor painting', 'Add soft rain ambient sound')..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs focus:ring-1 focus:ring-amber-500 outline-none text-slate-300 leading-relaxed placeholder-slate-600"
            />
          </div>

          {/* Macro Context Analysis */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Context & Subtext</h3>
            <div className="text-xs space-y-1.5 text-slate-300">
              <p><span className="text-indigo-400 font-semibold">Satirical Target:</span> {target}</p>
              <p><span className="text-indigo-400 font-semibold">BM Strategy:</span> {strategy}</p>
            </div>
          </div>

          {/* Frame List Blueprint */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Frame Blueprint</h3>
              <button 
                onClick={addNewFrame}
                className="text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold bg-amber-500/10 px-2 py-1 rounded animate-pulse"
              >
                <Plus className="w-3 h-3" /> Add Frame
              </button>
            </div>

            <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
              {frames.map((f) => (
                <div 
                  key={f.id} 
                  onClick={() => setSelectedFrameId(f.id)}
                  className={`p-3 rounded-lg border text-xs cursor-pointer transition-all flex justify-between items-start ${
                    selectedFrameId === f.id 
                      ? 'bg-amber-500/10 border-amber-500 text-amber-300 shadow-md' 
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1 pr-2 truncate">
                    <div className="font-bold flex items-center gap-2">
                      <span className="text-amber-500">#{f.id}</span>
                      <span>{f.title}</span>
                    </div>
                    <div className="italic text-slate-400 truncate">"{f.line}"</div>
                  </div>
                  <button 
                    onClick={(e) => deleteFrame(f.id, e)}
                    className="text-slate-500 hover:text-rose-500 transition-colors p-1"
                    title="Delete Frame"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI PROCESS TERMINAL */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 h-32 flex flex-col font-mono text-[10px] text-emerald-400/90 shadow-inner mt-4 overflow-hidden">
          <div className="flex items-center gap-1.5 text-slate-500 border-b border-slate-900 pb-1.5 mb-1.5">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>Story Engine Output Log</span>
            <span className="ml-auto flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-1 scrollbar-none">
            {consoleLogs.map((log, i) => (
              <div key={i} className="leading-normal">
                {log.startsWith('✨') ? (
                  <span className="text-amber-400">{log}</span>
                ) : log.startsWith('🚀') ? (
                  <span className="text-indigo-400 font-bold">{log}</span>
                ) : (
                  <span>{log}</span>
                )}
              </div>
            ))}
            <div ref={logEndRef}></div>
          </div>
        </div>
      </div>

      {/* PANE 3: CANVAS & SEAMLESS TIMELINE */}
      <div className="flex-1 p-5 flex flex-col justify-between bg-slate-900/20 overflow-y-auto min-w-[500px]">
        <div>
          {/* Header Controls */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg">
              <Sliders className="w-5 h-5" />
              <span>Storyboard Canvas</span>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Aspect Ratio Switcher */}
              <div className="bg-slate-900 p-0.5 rounded-lg border border-slate-800 flex text-xs font-semibold">
                <button 
                  onClick={() => setAspectRatio('16:9')}
                  className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
                    aspectRatio === '16:9' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  Landscape (16:9)
                </button>
                <button 
                  onClick={() => setAspectRatio('9:16')}
                  className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
                    aspectRatio === '9:16' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Video className="w-3.5 h-3.5 rotate-90" />
                  Portrait (9:16)
                </button>
              </div>

              {/* Play / Pause slideshow */}
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-4 py-1.5 rounded-lg text-xs flex items-center gap-2 font-medium transition-all shadow-md ${
                  isPlaying ? 'bg-rose-600 hover:bg-rose-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" /> Pause Preview
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" /> Preview Sequence
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Dynamic Responsive Display Screen */}
          <div className="flex items-center justify-center bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 shadow-2xl relative">
            <div 
              className={`relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl flex items-center justify-center transition-all duration-300 ${
                aspectRatio === '16:9' 
                  ? 'w-full max-w-2xl aspect-video' 
                  : 'h-[440px] aspect-[9/16]'
              }`}
            >
              {selectedFrameId === 'outro' ? (
                /* OUTRO CARD / ENDING PAGE (HOLD FOR 3S) */
                <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
                  <div className="relative p-1 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-indigo-600 shadow-2xl animate-pulse">
                    <div className="rounded-full bg-slate-950 p-1.5">
                      <img 
                        src="/assets/whc_logo.jpg" 
                        alt="WHC Studio Logo" 
                        className="w-24 h-24 rounded-full object-cover border border-amber-500/20"
                      />
                    </div>
                  </div>
                  <h2 className="text-lg font-bold tracking-widest text-amber-300 mt-5 font-sans uppercase">
                    William H. Chan Studio
                  </h2>
                  <p className="text-[10px] text-slate-400 font-mono tracking-wide mt-1.5">
                    Explore • Learn • Discover
                  </p>
                  <div className="mt-6 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-950/40 text-indigo-400 text-[9px] font-mono tracking-widest uppercase">
                    Story Ending slide
                  </div>
                </div>
              ) : (
                /* STANDARD FRAME PREVIEW */
                <>
                  <img 
                    src={aspectRatio === '16:9' ? selectedFrame.landscapeImg : selectedFrame.portraitImg}
                    alt={selectedFrame.title}
                    className="w-full h-full object-cover select-none"
                  />

                  {/* Glassmorphic Frame HUD */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 p-4 flex flex-col justify-between pointer-events-none">
                    <div className="flex justify-between items-start">
                      <div className="bg-slate-950/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider">
                        {mediaType} ({projectAbbr})
                      </div>
                      <div className="bg-indigo-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-indigo-500/20 text-[10px] font-mono text-indigo-300">
                        Ratio: {aspectRatio}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="bg-slate-950/80 backdrop-blur-md p-3 rounded-lg border border-white/15">
                        <p className="text-xs text-slate-100 font-bold uppercase tracking-wide">Frame {selectedFrame.id}: {selectedFrame.title}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          Style: <span className="text-amber-400/90 font-mono font-semibold">{selectedFrame.visualStyle || 'Auto'}</span> | Camera: <span className="text-indigo-400/90 font-mono font-semibold">{selectedFrame.cameraMovement || 'Auto'}</span>
                        </p>
                      </div>
                      <div className="bg-amber-500/90 text-slate-950 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold shadow-lg flex items-center gap-1.5 w-fit">
                        <Volume2 className="w-3.5 h-3.5 fill-current" /> BM Whisper ({outputLanguage.includes('Default') ? 'ENG' : outputLanguage.substring(0, 3).toUpperCase()}): "{getTranslatedLine(selectedFrame)}"
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Story Cast / Actor Consistency Cards */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3.5 shadow-md mt-4">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-amber-400">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Story Cast (Consistent Actors)
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Consistently featured across production frames</span>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto py-1.5 scrollbar-thin">
            {actors.map((actor) => (
              <div 
                key={actor.id} 
                className="relative bg-slate-955 border border-slate-800 rounded-xl p-2.5 w-[140px] flex-shrink-0 space-y-2 group transition-all hover:border-amber-500/30"
              >
                {/* Image uploadable viewport */}
                <div className="relative w-full aspect-square bg-slate-900 border border-slate-800 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer group/img">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleActorImageSelect(actor.id, e)}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  {actor.imgUrl ? (
                    <>
                      <img 
                        src={actor.imgUrl} 
                        alt={actor.name || 'Actor'} 
                        className="w-full h-full object-cover select-none"
                      />
                      {/* Hover overlay indication */}
                      <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center text-white text-[9px] font-bold uppercase transition-all">
                        Replace Pic
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-1.5 space-y-1">
                      <Upload className="w-4 h-4 text-slate-500 mx-auto" />
                      <div className="text-[8px] text-slate-400 font-medium">Upload Actor</div>
                    </div>
                  )}
                </div>

                {/* Actor Name input */}
                <div className="space-y-1">
                  <input 
                    type="text" 
                    placeholder="Actor Name..."
                    value={actor.name}
                    onChange={(e) => handleActorNameChange(actor.id, e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-1.5 py-1 text-[11px] font-bold text-center text-slate-200 outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                {/* Remove Actor Button */}
                {actors.length > 1 && (
                  <button 
                    onClick={() => removeActor(actor.id)}
                    className="absolute -top-1 -right-1 bg-slate-900 hover:bg-rose-950 border border-slate-850 hover:border-rose-500/40 text-slate-400 hover:text-rose-400 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
                    title="Remove Actor"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}

            {/* "+" Card to add new actor */}
            <button 
              onClick={addNewActor}
              className="bg-slate-950/40 hover:bg-slate-900/30 border border-dashed border-slate-800 hover:border-amber-500/40 rounded-xl w-[140px] h-[155px] flex-shrink-0 flex flex-col items-center justify-center gap-1.5 transition-all text-slate-500 hover:text-amber-400 group"
            >
              <div className="p-2 rounded-full bg-slate-900 border border-slate-800 group-hover:border-amber-500/20 group-hover:bg-amber-500/10 transition-all">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider">Add Actor</span>
            </button>
          </div>
        </div>

        {/* Dynamic Frame Content Editor */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-4 shadow-md mt-4">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Edit Selected Frame Details</span>
            <span className="text-amber-550">#Node {selectedFrameId === 'outro' ? 'Ending' : selectedFrame.id}</span>
          </div>
          {selectedFrameId === 'outro' ? (
            <div className="text-xs text-slate-400 leading-relaxed font-mono">
              Ending outro sequence cannot be edited here. It will display the <span className="text-amber-400 font-semibold">WHC branding card</span> for exactly 3 seconds to close the short video.
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-3 animate-fadeIn">
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Frame Title</label>
                <input 
                  type="text" 
                  value={selectedFrame.title}
                  onChange={(e) => updateActiveFrame('title', e.target.value)}
                  className="w-full mt-1.5 bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Dialogue / Line</label>
                <input 
                  type="text" 
                  value={selectedFrame.line}
                  onChange={(e) => updateActiveFrame('line', e.target.value)}
                  className="w-full mt-1.5 bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Transition Effect</label>
                <input 
                  type="text" 
                  value={selectedFrame.transition}
                  onChange={(e) => updateActiveFrame('transition', e.target.value)}
                  className="w-full mt-1.5 bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Visual Style</label>
                <select
                  value={selectedFrame.visualStyle || 'Auto'}
                  onChange={(e) => updateActiveFrame('visualStyle', e.target.value)}
                  className="w-full mt-1.5 bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-amber-300 outline-none focus:ring-1 focus:ring-amber-500 font-medium"
                >
                  <option value="Auto">Auto (AI Vibe)</option>
                  <option value="Pixar">Pixar</option>
                  <option value="Manga">Manga</option>
                  <option value="Anime">Anime</option>
                  <option value="H2O Color">H2O Color</option>
                  <option value="Pencil Sketch">Pencil Sketch</option>
                  <option value="Cinematic">Cinematic</option>
                  <option value="Noir">Noir</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Camera Motion</label>
                <select
                  value={selectedFrame.cameraMovement || 'Auto'}
                  onChange={(e) => updateActiveFrame('cameraMovement', e.target.value)}
                  className="w-full mt-1.5 bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-amber-300 outline-none focus:ring-1 focus:ring-amber-500 font-medium"
                >
                  <option value="Auto">Auto (AI Vibe)</option>
                  <option value="Dolly In">Dolly In</option>
                  <option value="Dolly Out">Dolly Out</option>
                  <option value="Pan">Pan</option>
                  <option value="Truck">Truck</option>
                  <option value="Arc">Arc</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Output Language Options */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3 shadow-md mt-4">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Output Language Options</span>
            <span className="text-amber-500 font-mono text-[9px]">(Translation Pipeline Override)</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['English (Default)', 'Mandarin', 'Cantonese', 'Espanol'].map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  outputLanguage === lang
                    ? 'bg-amber-500 border-amber-500 text-slate-950 font-extrabold shadow-md'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Transition Connector Bar / Timeline */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3 shadow-md mt-4">
          <div className="flex justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
            <span>Seamless Transition Pipeline</span>
            <span className="text-indigo-400 normal-case">{selectedFrameId === 'outro' ? 'End Credit Fade' : selectedFrame.transition}</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {frames.map((f, i) => (
              <React.Fragment key={f.id}>
                <button 
                  onClick={() => setSelectedFrameId(f.id)}
                  className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
                    selectedFrameId === f.id 
                      ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold' 
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  F{f.id}: {f.title.substring(0, 12)}{f.title.length > 12 ? '..' : ''}
                </button>
                {i < frames.length - 1 && (
                  <div className="text-slate-600 font-bold text-xs shrink-0 select-none mx-0.5">➔</div>
                )}
              </React.Fragment>
            ))}
            
            {/* Ending slide button inside timeline */}
            <div className="text-slate-600 font-bold text-xs shrink-0 select-none mx-0.5">➔</div>
            <button 
              onClick={() => setSelectedFrameId('outro')}
              className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
                selectedFrameId === 'outro' 
                  ? 'bg-gradient-to-tr from-amber-500 to-indigo-600 text-slate-950 shadow-md font-extrabold' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Ending Card (3s)
            </button>
            
            {/* Quick Add Node inside timeline */}
            <div className="text-slate-600 font-bold text-xs shrink-0 select-none mx-0.5">➔</div>
            <button 
              onClick={addNewFrame}
              className="px-3.5 py-2.5 rounded-lg text-xs font-bold bg-indigo-950/80 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-900/60 transition-all shrink-0 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Frame
            </button>
          </div>
        </div>

      </div>

      {/* Source Reference Image Modal */}
      {showSourceModal && sourceImagePreviewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-6 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl relative">
            <button 
              onClick={() => setShowSourceModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <FileImage className="w-4 h-4 animate-pulse" />
              <span>Source Reference Ingredient</span>
            </h3>
            <div className="flex-1 overflow-auto rounded-lg bg-slate-950/50 border border-slate-800 flex items-center justify-center p-2">
              <img 
                src={sourceImagePreviewUrl} 
                alt="Source Reference" 
                className="max-w-full max-h-[60vh] object-contain rounded-md"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-[10px] text-slate-200 font-mono truncate">{sourceImageFile?.name}</p>
              <p className="text-[9px] text-slate-500 font-mono mt-0.5">
                {(sourceImageFile?.size / 1024).toFixed(1)} KB • Reference Input (Poem, Book cover, or Draft)
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
