'use client'

import { useState, useRef } from 'react'
import { Mic, Upload, Play, Pause, User, Bot, MessageCircle, Loader2 } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1'

export default function Demo() {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [voiceId, setVoiceId] = useState<string | null>(null)
  const [conversation, setConversation] = useState<Array<{ speaker: 'fan' | 'creator'; text: string; audio?: string }>>([])
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        await processVoiceClone(audioBlob)
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (err) {
      console.error('Error accessing microphone:', err)
      alert('Could not access microphone. Please check permissions.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
    }
  }

  const processVoiceClone = async (audioBlob: Blob) => {
    setIsProcessing(true)
    
    try {
      // For demo without auth, we'll use a mock response
      // In production, this would call the actual API
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock voice ID (in production, this comes from the backend)
      const mockVoiceId = `voice-${Date.now()}`
      setVoiceId(mockVoiceId)
      
      // Simulate conversation
      setConversation([
        { speaker: 'fan', text: 'Hey! I love your content so much! Can you give me some advice on starting out?' },
        { speaker: 'creator', text: 'Hey! Thanks for reaching out! That means a lot to me. I\'d say just start creating and don\'t worry about being perfect.', audio: 'mock-audio-1' },
        { speaker: 'fan', text: 'That\'s really inspiring! What gear do you use?' },
        { speaker: 'creator', text: 'I keep it simple - just my phone and good lighting. It\'s all about the content, not the equipment!', audio: 'mock-audio-2' },
      ])
      
      // In production, you would call:
      /*
      const formData = new FormData()
      formData.append('audio', audioBlob, 'recording.webm')
      
      const response = await fetch(`${API_URL}/voices/demo/clone`, {
        method: 'POST',
        body: formData,
      })
      
      const data = await response.json()
      if (data.voiceId) {
        setVoiceId(data.voiceId)
        // Play the sample audio
        if (data.audio) {
          playAudio(data.audio)
        }
      }
      */
    } catch (error) {
      console.error('Error processing voice:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const playAudio = (audioBase64: string, index: number) => {
    // In production, this would play real audio from ElevenLabs
    // For demo, we use text-to-speech browser API
    
    if (playingIndex === index) {
      // Stop playing
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      setPlayingIndex(null)
      return
    }

    // Use browser's text-to-speech as fallback
    const text = conversation[index].text
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1
    utterance.pitch = 1
    
    utterance.onend = () => {
      setPlayingIndex(null)
    }
    
    speechSynthesis.speak(utterance)
    setPlayingIndex(index)
  }

  const resetDemo = () => {
    setVoiceId(null)
    setConversation([])
    setPlayingIndex(null)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Try It Yourself
          </h2>
          <p className="text-xl text-gray-400">
            Record your voice and see how AI creates a conversation with your fans
          </p>
        </div>

        <div className="glass rounded-2xl p-8">
          {!voiceId && !isProcessing && (
            <div className="text-center">
              <div className="mb-8">
                <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center transition-all ${
                  isRecording ? 'bg-red-500 animate-pulse' : 'bg-primary'
                }`}>
                  <Mic className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">
                  {isRecording ? 'Recording...' : 'Record Your Voice'}
                </h3>
                <p className="text-gray-400">
                  {isRecording 
                    ? 'Speak for 10-30 seconds so we can clone your voice' 
                    : 'Click the button below and read the sample text'}
                </p>
              </div>

              <div className="bg-surface rounded-xl p-6 mb-8 max-w-lg mx-auto">
                <p className="text-lg text-gray-300 italic">
                  "Hey everyone! Thanks for all your messages. I try to read everything but it's getting hard to keep up. I appreciate every single one of you!"
                </p>
              </div>

              <div className="flex gap-4 justify-center">
                {!isRecording ? (
                  <button
                    onClick={startRecording}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all"
                  >
                    <Mic className="w-5 h-5" />
                    Start Recording
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full transition-all"
                  >
                    <Pause className="w-5 h-5" />
                    Stop Recording
                  </button>
                )}
              </div>

              <p className="text-gray-500 text-sm mt-6">
                Demo uses browser text-to-speech. Real voice cloning requires ElevenLabs API integration.
              </p>
            </div>
          )}

          {isProcessing && (
            <div className="text-center py-12">
              <Loader2 className="w-16 h-16 animate-spin mx-auto mb-6 text-primary" />
              <h3 className="text-2xl font-semibold mb-2">Cloning Your Voice...</h3>
              <p className="text-gray-400">This takes about 10-20 seconds</p>
            </div>
          )}

          {voiceId && conversation.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">AI Conversation Demo</p>
                    <p className="text-sm text-green-400">● Voice cloned successfully</p>
                  </div>
                </div>
                <button
                  onClick={resetDemo}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Try Again
                </button>
              </div>

              <div className="bg-surface rounded-xl p-6 mb-6 max-h-96 overflow-y-auto">
                {conversation.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 mb-4 ${msg.speaker === 'creator' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.speaker === 'fan' ? 'bg-gray-600' : 'bg-gradient-to-br from-primary to-accent'
                    }`}>
                      {msg.speaker === 'fan' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <MessageCircle className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className={`max-w-[80%] p-4 rounded-2xl ${
                      msg.speaker === 'fan' 
                        ? 'bg-gray-700 text-white' 
                        : 'bg-primary/20 text-white border border-primary/30'
                    }`}>
                      <p>{msg.text}</p>
                      {msg.speaker === 'creator' && (
                        <button 
                          onClick={() => playAudio(msg.audio || '', index)}
                          className="mt-2 flex items-center gap-2 text-sm text-primary hover:text-primary-light transition-colors"
                        >
                          {playingIndex === index ? (
                            <><Pause className="w-4 h-4" /> Stop</>
                          ) : (
                            <><Play className="w-4 h-4" /> Play Voice</>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-gray-500 text-sm text-center">
                This demo uses browser text-to-speech. Real voice cloning with ElevenLabs would sound exactly like you!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
