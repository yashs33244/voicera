import { useState, useCallback } from "react"

export default function Speech() {
    const [isToggled, setToggled] = useState(false)
    const [text, setText] = useState("")
    const [language, setLanguage] = useState("en-US")
    const [voice, setVoice] = useState("en-US-Standard-A")
    const [isLoading, setIsLoading] = useState(false)
    const [audioUrl, setAudioUrl] = useState("")
    const [error, setError] = useState("")
    const [audioFile, setAudioFile] = useState(null)
    const [transcriptionName, setTranscriptionName] = useState("")
    const [transcriptionLanguage, setTranscriptionLanguage] = useState("en-US")
    const [punctuation, setPunctuation] = useState("auto")
    const [profanityFilter, setProfanityFilter] = useState(true)
    const [transcriptionResult, setTranscriptionResult] = useState("")
    const [transcriptionLoading, setTranscriptionLoading] = useState(false)
    const [audioDuration, setAudioDuration] = useState(0)
    const [transcriptionError, setTranscriptionError] = useState("")
    
    // Comprehensive language options
    const languageOptions = [
        { value: "en-US", label: "English (American)", flag: "flag01.png" },
        { value: "en-GB", label: "English (British)", flag: "flag02.png" },
        { value: "en-AU", label: "English (Australian)", flag: "flag03.png" },
        { value: "es-ES", label: "Spanish (Spain)", flag: "flag04.png" },
        { value: "es-US", label: "Spanish (US)", flag: "flag05.png" },
        { value: "fr-FR", label: "French", flag: "flag06.png" },
        { value: "fr-CA", label: "French (Canadian)", flag: "flag07.png" },
        { value: "de-DE", label: "German", flag: "flag08.png" },
        { value: "it-IT", label: "Italian", flag: "flag09.png" },
        { value: "pt-BR", label: "Portuguese (Brazilian)", flag: "flag10.png" },
        { value: "ru-RU", label: "Russian", flag: "flag11.png" },
        { value: "ar-XA", label: "Arabic", flag: "flag12.png" },
        { value: "cmn-CN", label: "Chinese (Mandarin)", flag: "flag13.png" },
        { value: "ja-JP", label: "Japanese", flag: "flag14.png" },
        { value: "ko-KR", label: "Korean", flag: "flag15.png" },
        { value: "hi-IN", label: "Hindi", flag: "flag16.png" },
        { value: "bn-IN", label: "Bengali", flag: "flag17.png" },
        { value: "zu-ZA", label: "Zulu (South Africa)", flag: "flag18.png" }
    ]

    // Function to get available voices based on selected language
    const getVoicesForLanguage = (languageCode) => {
        const voiceTypes = {
            "Standard": { variants: ["A", "B", "C", "D", "E", "F"], genders: ["Female", "Male", "Female", "Male", "Female", "Female"] },
            "Neural2": { variants: ["A", "B"], genders: ["Female", "Male"] },
            "Wavenet": { variants: ["A", "B", "C", "D"], genders: ["Female", "Male", "Female", "Male"] }
        }

        const voices = []
        Object.entries(voiceTypes).forEach(([type, { variants, genders }]) => {
            variants.forEach((variant, index) => {
                voices.push({
                    value: `${languageCode}-${type}-${variant}`,
                    label: `${type} ${variant} (${genders[index]})`,
                    imgSrc: `/assets/img/images/s_voice_img0${index + 1}.png`
                })
            })
        })
        return voices
    }
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file type
            const validTypes = [
                'audio/wav',
                'audio/wave',
                'audio/x-wav',
                'audio/mp3',
                'audio/mpeg',
                'audio/ogg',
                'audio/flac'
            ];
            
            if (!validTypes.includes(file.type)) {
                setTranscriptionError('Please upload a valid audio file (WAV, MP3, OGG, or FLAC)');
                return;
            }
    
            // Check file size (10MB limit)
            if (file.size > 10 * 1024 * 1024) {
                setTranscriptionError('File size should be less than 10MB');
                return;
            }
    
            setAudioFile(file);
            // Get audio duration
            const audio = new Audio();
            audio.src = URL.createObjectURL(file);
            audio.onloadedmetadata = () => {
                setAudioDuration(Math.round(audio.duration / 60));
                URL.revokeObjectURL(audio.src);
            };
        }
    };
    
    // Function to handle transcription
    const handleTranscription = async (e) => {
        e.preventDefault()
        if (!audioFile) {
            setTranscriptionError('Please select an audio file')
            return
        }

        setTranscriptionLoading(true)
        setTranscriptionError("")

        try {
            const formData = new FormData()
            formData.append('audio', audioFile)
            formData.append('languageCode', transcriptionLanguage)
            formData.append('punctuation', punctuation === 'on')
            formData.append('profanityFilter', profanityFilter)
            formData.append('name', transcriptionName)

            const response = await fetch('/api/speech-to-text', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.error || 'Failed to transcribe audio')
            }

            const data = await response.json()
            setTranscriptionResult(data.transcription)
        } catch (err) {
            console.error('Transcription Error:', err)
            setTranscriptionError(err.message)
        } finally {
            setTranscriptionLoading(false)
        }
    }

    const handleTextToSpeech = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")
        
        try {
            const response = await fetch('/api/text-to-speech', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text,
                    voice,
                    languageCode: language
                }),
            })
    
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.error || `Server error: ${response.status}`)
            }
    
            const audioBlob = await response.blob()
            const url = URL.createObjectURL(audioBlob)
            setAudioUrl(url)
            setToggled(true)
        } catch (err) {
            console.error('API Error:', err)
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    const handleListen = () => {
        const audio = new Audio(audioUrl)
        audio.play()
    }

    const handleDownload = () => {
        const a = document.createElement('a')
        a.href = audioUrl
        a.download = 'speech.mp3'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    return (
        <>
            <section className="speech-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-10">
                            <div className="speech-item">
                                <form className="engine-form" onSubmit={handleTextToSpeech}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="lang-ordering">
                                                <select 
                                                    id="id_select2_example" 
                                                    style={{ width: '100%' }}
                                                    value={language}
                                                    onChange={(e) => {
                                                        setLanguage(e.target.value)
                                                        setVoice(`${e.target.value}-Standard-A`)
                                                    }}
                                                >
                                                    {languageOptions.map((option) => (
                                                        <option 
                                                            key={option.value} 
                                                            value={option.value}
                                                            data-img_src={`/assets/img/images/${option.flag}`}
                                                        >
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="voice-ordering">
                                                <select 
                                                    id="id_select2_example_two" 
                                                    style={{ width: '100%' }}
                                                    value={voice}
                                                    onChange={(e) => setVoice(e.target.value)}
                                                >
                                                    {getVoicesForLanguage(language).map((voiceOption) => (
                                                        <option 
                                                            key={voiceOption.value} 
                                                            value={voiceOption.value}
                                                            data-img_src={voiceOption.imgSrc}
                                                        >
                                                            {voiceOption.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-grp">
                                        <textarea   
                                            placeholder="Enter Text here.." 
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                        />
                                        <div className="form-content">
                                            <span>Free use of Voicer Studio is limited to 50 characters. For more <br /> usage and premium voices, you can purchase packages.</span>
                                            <span id="maxLenghtCounter" className="badge-default">{text.length} characters</span>
                                        </div>
                                    </div>
                                    <button 
                                        className="speech-btn" 
                                        onClick={handleTextToSpeech}
                                        disabled={isLoading || !text}
                                    >
                                        <span />
                                        <span />
                                        <span />
                                        {isLoading ? 'Converting...' : 'text to speech'}
                                    </button>
                                    {error && (
                                        <div className="alert alert-danger mt-3">
                                            {error}
                                        </div>
                                    )}
                                    <div className="hidden-btn-wrap" style={{ display: `${isToggled ? "block" : "none"}` }}>
                                        <div className="hidden-btn-inner">
                                            <button onClick={handleListen}><i className="fas fa-play" />listen</button>
                                            <button className="download" onClick={handleDownload}>
                                                <i className="fas fa-download" />Download
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-10">
                            <div className="speech-item">
                                <div className="browser-upload">
                                    <input 
                                        type="file" 
                                        accept=".mp3,.wav"
                                        onChange={handleFileChange}
                                    />
                                    <h6 className="title">
                                        <i className="fas fa-file-import"/>
                                        Browse
                                    </h6>
                                    <span>.mp3</span>
                                    <span>.wav</span>
                                </div>
                                <form onSubmit={handleTranscription} className="engine-form-two">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-grp">
                                                <input 
                                                    type="text" 
                                                    placeholder="Give a name to your work"
                                                    value={transcriptionName}
                                                    onChange={(e) => setTranscriptionName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-grp">
                                                <select 
                                                    id="punctuation-select2" 
                                                    style={{ width: '100%' }}
                                                    value={punctuation}
                                                    onChange={(e) => setPunctuation(e.target.value)}
                                                >
                                                    <option value="auto">Punctuation: Auto</option>
                                                    <option value="off">Punctuation: Off</option>
                                                    <option value="on">Punctuation: On</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-grp">
                                                <select 
                                                    id="profanity-select2" 
                                                    style={{ width: '100%' }}
                                                    value={profanityFilter}
                                                    onChange={(e) => setProfanityFilter(e.target.value === 'true')}
                                                >
                                                    <option value="true">Profanity Filter: On</option>
                                                    <option value="false">Profanity Filter: Off</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-grp">
                                                <select 
                                                    id="id_select2_example_three" 
                                                    style={{ width: '100%' }}
                                                    value={transcriptionLanguage}
                                                    onChange={(e) => setTranscriptionLanguage(e.target.value)}
                                                >
                                                    {languageOptions.map((option) => (
                                                        <option 
                                                            key={option.value}
                                                            value={option.value}
                                                            data-img_src={`/assets/img/images/${option.flag}`}
                                                        >
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-content">
                                        <span>
                                            Voicer Transcribe free use is limited to 5 minutes. You can <br /> 
                                            purchase packages for more use and to transcribe longer files.
                                        </span>
                                        <span className="badge-default" id="infos">
                                            {audioDuration || 0} Minutes
                                        </span>
                                    </div>
                                    <button 
                                        type="submit"
                                        disabled={transcriptionLoading || !audioFile}
                                    >
                                        <span />
                                        <span />
                                        <span />
                                        {transcriptionLoading ? 'Converting...' : 'Convert audio to text'}
                                    </button>

                                    {transcriptionError && (
                                        <div className="alert alert-danger mt-3">
                                            {transcriptionError}
                                        </div>
                                    )}

                                    {transcriptionResult && (
                                        <div className="mt-4">
                                            <h5>Transcription Result:</h5>
                                            <div className="p-3 bg-light rounded">
                                                {transcriptionResult}
                                            </div>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="speech-shape-wrap">
                    <div className="shape-one" data-background="assets/img/images/speech_shape01.png" />
                    <div className="shape-two" data-background="assets/img/images/speech_shape02.png" />
                </div>
            </section>
        </>
    )
}



{/*
    
    issue 
      code: 3,
  details: "Voice 'es-US-Standard-D' does not exist. Is it misspelled?",
  metadata: Metadata { internalRepr: Map(0) {}, options: {} },
  note: 'Exception occurred in retry method that was not classified as transient'
    
    */}