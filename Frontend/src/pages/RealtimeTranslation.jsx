import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function RealtimeTranslation() {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [prediction, setPrediction] = useState('Waiting for prediction...')
  const wsRef = useRef(null)
  const handsRef = useRef(null)
  const cameraRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Load MediaPipe scripts dynamically
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve()
          return
        }
        const script = document.createElement('script')
        script.src = src
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
      })
    }

    const initializeMediaPipe = async () => {
      try {
        // Load required MediaPipe scripts
        await Promise.all([
          loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js'),
          loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js')
        ])

        // Wait a bit for scripts to be ready
        await new Promise(resolve => setTimeout(resolve, 500))

        // Initialize WebSocket
        wsRef.current = new WebSocket('wss://mediapipe-client.onrender.com/ws/predict')
        
        wsRef.current.onopen = () => console.log('✅ WebSocket connected')
        wsRef.current.onerror = e => console.error('❌ WebSocket error:', e)
        
        wsRef.current.onmessage = e => {
          const data = JSON.parse(e.data)
          console.log("📥 Received:", data)

          if (data.confidence !== undefined) {
            console.log("🧠 Confidence:", data.confidence)
          }

          if (data.confidence && data.confidence < 0.8) {
            console.log("⚠️ Confidence too low, skipping...")
            return
          }

          if (data.readable_sentence) {
            console.log("📝 Readable sentence:", data.readable_sentence)
            setPrediction("Sentence: " + data.readable_sentence)
          } else if (data.sentence) {
            console.log("🧠 Sentence:", data.sentence)
            setPrediction("Sentence: " + data.sentence.join(' '))
          }
        }

        // Initialize MediaPipe Hands
        const onResults = (results) => {
          const canvas = canvasRef.current
          const ctx = canvas.getContext('2d')
          
          canvas.width = results.image.width
          canvas.height = results.image.height
          ctx.save()
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height)

          if (results.multiHandLandmarks) {
            for (const landmarks of results.multiHandLandmarks) {
              window.drawConnectors(ctx, landmarks, window.HAND_CONNECTIONS, {color: '#58CC02', lineWidth: 2})
              window.drawLandmarks(ctx, landmarks, {color: '#156DE6', radius: 3})
            }
          }

          const keypoints = []
          const numHands = results.multiHandLandmarks ? results.multiHandLandmarks.length : 0
          console.log("🖐️ Detected hands:", numHands)

          for (let i = 0; i < 2; i++) {
            if (i < numHands) {
              results.multiHandLandmarks[i].forEach(landmark => {
                keypoints.push(landmark.x)
                keypoints.push(landmark.y)
                keypoints.push(landmark.z)
              })
            } else {
              keypoints.push(...new Array(21 * 3).fill(0))
            }
          }

          console.log("📦 Keypoints length:", keypoints.length)
          if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ keypoints }))
            console.log("📤 Sent keypoints to server")
          }

          ctx.restore()
        }

        handsRef.current = new window.Hands({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
        })

        handsRef.current.setOptions({
          maxNumHands: 2,
          modelComplexity: 1,
          minDetectionConfidence: 0.7,
          minTrackingConfidence: 0.5
        })

        handsRef.current.onResults(onResults)

        // Initialize Camera manually with getUserMedia
        const startCamera = async () => {
          try {
            // Check if we're in a secure context
            if (!window.isSecureContext) {
              throw new Error('HTTPS_REQUIRED')
            }

            // Check if mediaDevices is available
            if (!navigator.mediaDevices) {
              throw new Error('MEDIA_DEVICES_NOT_SUPPORTED')
            }

            // Check if getUserMedia is available
            if (!navigator.mediaDevices.getUserMedia) {
              throw new Error('GET_USER_MEDIA_NOT_SUPPORTED')
            }

            const stream = await navigator.mediaDevices.getUserMedia({
              video: {
                width: { ideal: 1280 },
                height: { ideal: 720 },
                facingMode: 'user'
              }
            })
            
            videoRef.current.srcObject = stream
            videoRef.current.addEventListener('loadeddata', () => {
              // Start processing frames
              const sendFrame = async () => {
                if (videoRef.current && handsRef.current) {
                  await handsRef.current.send({image: videoRef.current})
                }
                requestAnimationFrame(sendFrame)
              }
              sendFrame()
            })
          } catch (error) {
            console.error('Error accessing camera:', error)
            
            let errorMessage = 'Camera access error. '
            
            if (error.message === 'HTTPS_REQUIRED') {
              errorMessage = '🔒 HTTPS Required: Camera access needs a secure connection. Please use HTTPS or enable SSL on your server.'
            } else if (error.message === 'MEDIA_DEVICES_NOT_SUPPORTED') {
              errorMessage = '📱 Media devices not supported in this browser or context.'
            } else if (error.message === 'GET_USER_MEDIA_NOT_SUPPORTED') {
              errorMessage = '📷 Camera access not supported in this browser.'
            } else if (error.name === 'NotAllowedError') {
              errorMessage = '❌ Camera permission denied. Please allow camera access and refresh.'
            } else if (error.name === 'NotFoundError') {
              errorMessage = '📷 No camera found. Please connect a camera and refresh.'
            } else if (error.name === 'NotSupportedError') {
              errorMessage = '🔒 Camera access requires HTTPS. Please use a secure connection.'
            } else {
              errorMessage = `Camera error: ${error.message}`
            }
            
            setPrediction(errorMessage)
          }
        }

        startCamera()

      } catch (error) {
        console.error('Error initializing MediaPipe:', error)
      }
    }

    initializeMediaPipe()

    // Cleanup function
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks()
        tracks.forEach(track => track.stop())
      }
    }
  }, [])

  const handleClear = () => {
    setPrediction('Waiting for prediction...')
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ action: 'clear' }))
      console.log("📤 Sent clear action to server")
    }
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div style={{ 
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: '#202F36',
      margin: 0,
      fontFamily: "'Segoe UI', sans-serif"
    }}>
      <video 
        ref={videoRef}
        autoPlay 
        muted 
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: 'scaleX(-1)',
          objectFit: 'cover'
        }}
      />
      <canvas 
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: 'scaleX(-1)',
          objectFit: 'cover'
        }}
      />
      
      <div style={{
        position: 'absolute',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 15,
        backgroundColor: '#2c3e50',
        borderRadius: '30px',
        padding: '8px',
        display: 'flex',
        gap: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
      }}>
        <button 
          onClick={handleBack}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: '#E7EFFD',
            padding: '12px 16px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            borderRadius: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '48px',
            height: '48px'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
            e.target.style.transform = 'scale(1.05)'
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'transparent'
            e.target.style.transform = 'scale(1)'
          }}
          title="Go Back"
        >
          <svg 
            style={{
              width: '20px',
              height: '20px',
              stroke: 'currentColor',
              strokeWidth: '2',
              fill: 'none',
              strokeLinecap: 'round',
              strokeLinejoin: 'round'
            }}
            viewBox="0 0 24 24"
          >
            <path d="m12 19-7-7 7-7"/>
            <path d="M19 12H5"/>
          </svg>
        </button>
        
        <button 
          onClick={handleClear}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: '#E7EFFD',
            padding: '12px 16px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            borderRadius: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '48px',
            height: '48px'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
            e.target.style.transform = 'scale(1.05)'
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'transparent'
            e.target.style.transform = 'scale(1)'
          }}
          title="Clear Prediction"
        >
          <svg 
            style={{
              width: '20px',
              height: '20px',
              stroke: 'currentColor',
              strokeWidth: '2',
              fill: 'none',
              strokeLinecap: 'round',
              strokeLinejoin: 'round'
            }}
            viewBox="0 0 24 24"
          >
            <path d="M3 6h18"/>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
            <line x1="10" x2="10" y1="11" y2="17"/>
            <line x1="14" x2="14" y1="11" y2="17"/>
          </svg>
        </button>
      </div>
      
      <div style={{
        position: 'absolute',
        bottom: '110px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        padding: '16px 28px',
        fontSize: '24px',
        fontWeight: '600',
        color: '#156DE6',
        backgroundColor: '#E7EFFD',
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(21, 109, 230, 0.2)',
        maxWidth: '90%',
        textAlign: 'center',
        border: '2px solid rgba(21, 109, 230, 0.1)'
      }}>
        {prediction}
      </div>
    </div>
  )
}

export default RealtimeTranslation 