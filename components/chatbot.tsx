"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { MessageSquare, Send, X, Trash2 } from "lucide-react"

// API key hardcoded for security - users don't need access to it
const GEMINI_API_KEY = "AIzaSyAtTLGiY8Z4UlfpXYqv2G-0QsY7K7JoMBc"

type Message = {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hi there! I'm your BOERFORCE assistant. I can answer any questions about arm wrestling equipment, training programs, or other topics you're interested in. How can I help you today?",
    isUser: false,
    timestamp: new Date(),
  },
]

// Response categories with keywords for matching (only used as fallback when API fails)
const responseDatabase = [
  {
    keywords: ["grip", "hand", "finger", "wrist", "forearm", "strength", "hold", "grasp", "grabbing", "squeezing", "strong", "power", "muscles", "flex", "flexing", "gripping"],
    responses: [
      "The BOERFORCE Grip Master is our most popular training tool, designed to improve finger and wrist strength with 5 levels of adjustable resistance.",
      "Our specialized forearm training equipment includes the Wrist Hammer and Rotating Forearm Developer to target key muscles for arm wrestling.",
      "For grip training, we recommend starting with our beginner resistance bands and progressing to the adjustable gripper as strength improves.",
    ]
  },
  {
    keywords: ["table", "portable", "competition", "setup", "practice", "surface", "pad", "elbow", "arena", "tournament", "official", "regulation", "cushion", "height", "adjust", "platform"],
    responses: [
      "The BOERFORCE Table should be used with proper form to prevent injury. We include detailed setup and usage instructions with every purchase.",
      "Our competition tables are built to official tournament specifications and feature durable steel frames with adjustable elbow pads.",
    ]
  },
  {
    keywords: ["program", "training", "routine", "workout", "exercise", "plan", "technique", "video", "learn", "tutorial", "guide", "coach", "instruction", "course", "lesson", "schedule", "regimen", "train", "practice", "drills", "method"],
    responses: [
      "The BOERFORCE Beginner Program includes a 12-week progressive training schedule and access to video tutorials covering fundamental techniques.",
      "Our Advanced Training Program is designed for competitive arm wrestlers and includes periodized strength cycles and technique refinement.",
      "We offer specialized training programs for both hook and toproll techniques, with equipment recommendations for each style.",
      "Our training programs include specific exercises for developing side pressure, back pressure, and posting techniques.",
    ]
  },
  {
    keywords: ["price", "cost", "money", "buy", "purchase", "payment", "discount", "sale", "offer", "deal", "afford", "expensive", "cheap", "budget", "pay", "pricing", "dollars", "spend", "worth", "value", "order", "checkout"],
    responses: [
      "Our equipment prices range from $49 for beginner tools to $599 for our complete professional training systems.",
      "We offer package discounts when you purchase complete training systems. The Pro Bundle saves you 15% compared to buying items individually.",
      "All purchases can be made using major credit cards or PayPal. We also offer financing options for orders over $200.",
    ]
  },
  {
    keywords: ["beginner", "start", "new", "novice", "first time", "starting", "basic", "fundamental", "initial", "introduction", "begin", "starter", "newbie", "entry", "level", "learning", "amateur", "casual", "recreational", "hobby", "started", "getting"],
    responses: [
      "For beginners, we recommend our BOERFORCE Starter Kit that includes a practice pad, basic resistance bands, and finger strengtheners.",
      "Our Beginner's Guide to Arm Wrestling eBook is included free with any equipment purchase and covers essential techniques and training principles.",
      "New arm wrestlers should focus on proper form first. Our beginners training program includes detailed technique videos to help you start correctly.",
    ]
  },
  {
    keywords: ["delivery", "shipping", "return", "warranty", "guarantee", "ship", "arrive", "arrival", "send", "mail", "package", "carrier", "international", "domestic", "worldwide", "global", "refund", "broken", "damaged", "defective", "replace", "replacement"],
    responses: [
      "Yes, we offer worldwide shipping on all our equipment, with delivery times of 3-5 business days.",
      "All our equipment comes with a 2-year warranty and a 30-day money-back guarantee if you're not satisfied.",
      "Shipping is free on orders over $100 within the continental US. International shipping costs are calculated at checkout.",
    ]
  },
  {
    keywords: ["app", "mobile", "track", "progress", "phone", "software", "application", "download", "iOS", "Android", "smartphone", "tablet", "device", "digital", "online", "account", "login", "profile", "sync", "data", "tracking"],
    responses: [
      "The BOERFORCE Mobile App includes training tracking, technique videos, and customized workout plans based on your current level.",
      "Our mobile app is available for both iOS and Android and syncs with your online account to track your progress across devices.",
      "Premium app features include slow-motion video analysis of your technique and personalized training recommendations.",
    ]
  },
  {
    keywords: ["products", "equipment", "item", "gear", "accessories", "merchandise", "inventory", "selection", "catalog", "offering", "collection", "list", "available", "stock", "sell", "set", "kit", "bundle", "package", "recommended", "popular", "best"],
    responses: [
      "Our most popular products include the BOERFORCE Competition Table, the Advanced Grip Package, and our 12-Week Training Program.",
      "We offer a complete range of arm wrestling equipment from training tools for beginners to competition-grade tables for professionals.",
      "Our product catalog includes specialized tools for every aspect of arm wrestling training: grip development, angle training, endurance building, and competition practice.",
    ]
  },
  {
    keywords: ["help", "question", "support", "contact", "customer service", "information", "chat", "assist", "guidance", "advice", "recommendation", "suggest", "suggest", "ask", "inquire", "need", "want", "looking for", "find", "search", "interested", "tell me", "explain", "details", "more"],
    responses: [
      "I'd be happy to help! We offer a complete range of arm wrestling equipment and training programs for all skill levels. What specific aspect are you interested in?",
      "I can provide information about our training equipment, programs, or competition tables. What would you like to know more about?",
      "Our customer support team includes experienced arm wrestlers who can provide detailed guidance. What specific information are you looking for today?",
    ]
  },
]

// Fallback responses when no keywords match (only used when API fails)
const fallbackResponses = [
  "Thanks for your question! Could you please provide more details about which specific equipment or training aspect you're interested in?",
  "I'd be happy to help with that. Could you clarify which type of training equipment you're asking about?",
  "That's a great question about arm wrestling. Could you be a bit more specific so I can provide the most accurate information?",
  "I can certainly help with information about our training programs and equipment. Which aspect are you most interested in learning about?",
]

// Tracking for last fallback response to avoid repetition
let lastFallbackIndex = -1;

// Context information about BOERFORCE to help the AI generate relevant responses
const SYSTEM_PROMPT = `You are a friendly and helpful AI assistant for BOERFORCE, a company specializing in arm wrestling equipment and training programs. Your goal is to provide helpful, accurate information and have natural conversations with users.

KEY INFORMATION ABOUT BOERFORCE:
- We sell professional arm wrestling tables, training equipment, and accessories
- We offer beginner, intermediate, and advanced training programs
- Our product lineup includes grip trainers, specialized forearm equipment, and competition tables
- Prices range from $49 for beginner tools to $599 for complete systems
- We ship worldwide with free shipping on orders over $100 in the US
- All products have a 2-year warranty and 30-day money-back guarantee
- We have a mobile app available for iOS and Android with training tracking features

While you should focus on arm wrestling related topics when relevant, you are also capable of answering general questions and having conversational exchanges on various topics. Be helpful, friendly, and engage in natural conversation.

When a user asks about arm wrestling equipment or training, provide specific and detailed information. For other topics, be helpful but indicate when a question is outside your area of specialization if appropriate.`;

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [apiErrorCount, setApiErrorCount] = useState(0)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  
  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('boerforce-chat-messages')
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages)
        const formattedMessages = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
        setMessages(formattedMessages)
      } catch (e) {
        console.error('Failed to parse saved messages', e)
      }
    }
  }, [])
  
  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('boerforce-chat-messages', JSON.stringify(messages))
    }
  }, [messages])

  // Auto-scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  // Find the best response based on user input (fallback when API fails)
  const findFallbackResponse = (userInput: string) => {
    const inputLower = userInput.toLowerCase();
    let bestCategory = null;
    let bestScore = 0;
    
    // First check for exact keyword matches
    const exactMatches = responseDatabase.filter(category => 
      category.keywords.some(keyword => inputLower.includes(keyword))
    );
    
    if (exactMatches.length > 0) {
      // If multiple categories match, pick one randomly
      const category = exactMatches[Math.floor(Math.random() * exactMatches.length)];
      // Return a random response from the matched category
      return category.responses[Math.floor(Math.random() * category.responses.length)];
    }
    
    // If no exact matches, try partial matches
    for (const category of responseDatabase) {
      for (const keyword of category.keywords) {
        // Check for partial matches (at least 4 characters)
        if (keyword.length >= 4) {
          for (let i = 0; i <= keyword.length - 4; i++) {
            const substring = keyword.substring(i, i + 4);
            if (inputLower.includes(substring)) {
              const score = substring.length;
              if (score > bestScore) {
                bestScore = score;
                bestCategory = category;
              }
            }
          }
        }
      }
    }
    
    // If we found a partial match
    if (bestCategory) {
      return bestCategory.responses[Math.floor(Math.random() * bestCategory.responses.length)];
    }
    
    // Avoid repeating the same fallback response
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * fallbackResponses.length);
    } while (randomIndex === lastFallbackIndex && fallbackResponses.length > 1);
    
    lastFallbackIndex = randomIndex;
    return fallbackResponses[randomIndex];
  }

  // Call Gemini API to get AI-generated response
  const getAIResponse = async (userMessage: string, conversationHistory: Message[]) => {
    try {
      // If we've had 3 or more consecutive API errors, just use the fallback system directly
      if (apiErrorCount >= 3) {
        console.log("Using fallback system due to consecutive API failures")
        return `[Fallback Mode] ${findFallbackResponse(userMessage)}`
      }

      console.log("Preparing to call Gemini API")

      // Create the context by combining system prompt with the most recent user message
      const geminiPrompt = `${SYSTEM_PROMPT}\n\nUser: ${userMessage}`

      // Use a valid model name and endpoint
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1:generateText?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: geminiPrompt,
          temperature: 0.7,
          maxTokens: 800
        })
      })
      
      console.log("API Response Status:", response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error("Gemini API error:", errorText)
        setApiErrorCount(prev => prev + 1)
        return `[Fallback Mode] ${findFallbackResponse(userMessage)}`
      }
      
      const responseData = await response.json()
      console.log("API Response:", JSON.stringify(responseData).substring(0, 200) + "...")
      
      if (!responseData.choices || responseData.choices.length === 0) {
        console.error("No choices in Gemini response")
        setApiErrorCount(prev => prev + 1)
        return `[Fallback Mode] ${findFallbackResponse(userMessage)}`
      }
      
      // Reset error count on successful API call
      setApiErrorCount(0)
      
      try {
        // Extract response text from Gemini's format
        const choice = responseData.choices[0]
        if (choice.text) {
          return choice.text.trim()
        } else {
          throw new Error("No valid text in response")
        }
      } catch (parseError) {
        console.error("Error parsing Gemini response:", parseError)
        setApiErrorCount(prev => prev + 1)
        return `[Fallback Mode] ${findFallbackResponse(userMessage)}`
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error)
      setApiErrorCount(prev => prev + 1)
      return `[Fallback Mode] ${findFallbackResponse(userMessage)}`
    }
  }

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault()
    
    if (!input.trim()) return
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date(),
    }
    
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput("")
    setIsLoading(true)
    
    try {
      // Get response from AI or fallback system
      const botResponse = await getAIResponse(userMessage.content, updatedMessages)
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        isUser: false,
        timestamp: new Date(),
      }
      
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error generating response:", error)
      // Use fallback response if API call fails
      const fallbackResponse = findFallbackResponse(userMessage.content)
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `[Fallback Mode] ${fallbackResponse}`,
        isUser: false,
        timestamp: new Date(),
      }
      
      setMessages((prev) => [...prev, botMessage])
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleClearChat = () => {
    setMessages(initialMessages)
    localStorage.removeItem('boerforce-chat-messages')
  }

  return (
    <>
      {/* Chat toggle button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50 hover:bg-primary/90 transition-colors"
        size="icon"
        aria-label="Open chat assistant"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
      
      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] shadow-xl flex flex-col z-50 animate-in slide-in-from-bottom-10 duration-300">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <div className="bg-primary text-primary-foreground flex items-center justify-center h-full text-sm font-semibold">
                  AP
                </div>
              </Avatar>
              <div className="font-semibold">BOERFORCE Assistant</div>
            </div>
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleClearChat} 
                className="h-8 w-8 mr-1"
                title="Clear chat history"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
            <div className="flex flex-col gap-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-lg px-4 py-2 bg-muted">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "100ms" }}></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "200ms" }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <form onSubmit={handleSendMessage} className="border-t p-4 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1"
              disabled={isLoading}
              autoFocus
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Card>
      )}
    </>
  )
}