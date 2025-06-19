'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Volume2, VolumeX, Trophy, Star, Brain, Target, Lightbulb, Sparkles, Zap, Shuffle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Advanced AI Scenario Generator với khả năng tạo nội dung động
class AdvancedAIGenerator {
  private themes = ['friendship', 'honesty', 'kindness', 'responsibility', 'courage', 'teamwork', 'empathy', 'fairness', 'perseverance', 'respect']
  private settings = ['school', 'home', 'playground', 'library', 'park', 'store', 'restaurant', 'bus', 'classroom', 'cafeteria']
  private characters = [
    { name: 'Alex', personality: 'shy', interests: ['reading', 'art'] },
    { name: 'Sam', personality: 'outgoing', interests: ['sports', 'music'] },
    { name: 'Jordan', personality: 'helpful', interests: ['science', 'animals'] },
    { name: 'Casey', personality: 'creative', interests: ['drawing', 'writing'] },
    { name: 'Riley', personality: 'curious', interests: ['exploring', 'asking questions'] },
    { name: 'Morgan', personality: 'kind', interests: ['helping others', 'gardening'] },
    { name: 'Avery', personality: 'brave', interests: ['adventure', 'protecting others'] },
    { name: 'Quinn', personality: 'smart', interests: ['puzzles', 'learning'] }
  ]
  
  private conflicts = [
    'someone is being left out',
    'there\'s a disagreement about rules',
    'someone made a mistake',
    'resources need to be shared',
    'someone needs help but hasn\'t asked',
    'there\'s a misunderstanding',
    'someone is feeling sad or upset',
    'a decision needs to be made as a group',
    'someone is being treated unfairly',
    'there\'s pressure to do something wrong'
  ]

  private emotions = ['worried', 'excited', 'confused', 'determined', 'nervous', 'hopeful', 'frustrated', 'curious', 'proud', 'concerned']
  
  private choiceTemplates = {
    direct: ['Take action immediately', 'Address the situation directly', 'Speak up right away'],
    thoughtful: ['Think about it first', 'Consider all options', 'Take time to understand'],
    collaborative: ['Ask others for help', 'Work together to solve it', 'Get input from friends'],
    avoidant: ['Ignore the situation', 'Walk away', 'Pretend nothing happened'],
    creative: ['Find a creative solution', 'Try a different approach', 'Think outside the box']
  }

  // Tạo tình huống hoàn toàn mới bằng AI
  generateDynamicScenario(playerHistory: any[] = [], difficulty: string = 'medium'): any {
    // Phân tích lịch sử người chơi để tạo nội dung phù hợp
    const preferredThemes = this.analyzePlayerPreferences(playerHistory)
    const theme = preferredThemes.length > 0 ? 
      preferredThemes[Math.floor(Math.random() * preferredThemes.length)] : 
      this.themes[Math.floor(Math.random() * this.themes.length)]
    
    const setting = this.settings[Math.floor(Math.random() * this.settings.length)]
    const character = this.characters[Math.floor(Math.random() * this.characters.length)]
    const conflict = this.conflicts[Math.floor(Math.random() * this.conflicts.length)]
    const emotion = this.emotions[Math.floor(Math.random() * this.emotions.length)]
    
    // Tạo tình huống dựa trên các yếu tố ngẫu nhiên
    const scenario = this.constructScenario(theme, setting, character, conflict, emotion, difficulty)
    
    return {
      id: Date.now() + Math.random(),
      theme,
      setting,
      character: {
        name: character.name,
        avatar: this.generateCharacterAvatar(character),
        mood: emotion,
        personality: character.personality
      },
      situation: scenario.situation,
      choices: scenario.choices,
      isAIGenerated: true,
      difficulty,
      timestamp: new Date()
    }
  }

  // Phân tích sở thích của người chơi
  private analyzePlayerPreferences(history: any[]): string[] {
    if (history.length < 3) return []
    
    const themeCount: { [key: string]: number } = {}
    const recentChoices = history.slice(-10)
    
    recentChoices.forEach(choice => {
      if (choice.theme) {
        themeCount[choice.theme] = (themeCount[choice.theme] || 0) + 1
      }
    })
    
    return Object.entries(themeCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([theme]) => theme)
  }

  // Tạo avatar cho nhân vật
  private generateCharacterAvatar(character: any): string {
    const avatars = {
      shy: '😊', outgoing: '😄', helpful: '🤝', creative: '🎨',
      curious: '🤔', kind: '💝', brave: '💪', smart: '🧠'
    }
    return avatars[character.personality] || '👤'
  }

  // Xây dựng tình huống cụ thể
  private constructScenario(theme: string, setting: string, character: any, conflict: string, emotion: string, difficulty: string): any {
    const situations = {
      friendship: [
        `At the ${setting}, you notice ${character.name} looks ${emotion} because ${conflict}.`,
        `During ${setting} time, ${character.name} seems ${emotion} when ${conflict}.`,
        `You're at the ${setting} and see that ${character.name} is ${emotion} since ${conflict}.`
      ],
      honesty: [
        `In the ${setting}, you witness something where ${conflict} and ${character.name} looks ${emotion}.`,
        `At the ${setting}, ${character.name} appears ${emotion} because ${conflict}.`,
        `While at the ${setting}, you see ${character.name} feeling ${emotion} as ${conflict}.`
      ],
      kindness: [
        `You're at the ${setting} and notice ${character.name} is ${emotion} because ${conflict}.`,
        `In the ${setting}, ${character.name} seems ${emotion} when ${conflict}.`,
        `At the ${setting}, you observe ${character.name} looking ${emotion} since ${conflict}.`
      ]
    }
    
    const situationTemplates = situations[theme] || situations.friendship
    const situation = situationTemplates[Math.floor(Math.random() * situationTemplates.length)]
    
    // Tạo lựa chọn dựa trên độ khó
    const choices = this.generateChoices(theme, difficulty, character)
    
    return { situation, choices }
  }

  // Tạo lựa chọn động
  private generateChoices(theme: string, difficulty: string, character: any): any[] {
    const baseChoices = [
      {
        type: 'direct',
        points: difficulty === 'easy' ? 8 : difficulty === 'medium' ? 6 : 4,
        consequences: [
          'You handle the situation quickly and effectively',
          'Your direct approach resolves the issue',
          'Taking immediate action helps everyone involved'
        ]
      },
      {
        type: 'thoughtful',
        points: difficulty === 'easy' ? 10 : difficulty === 'medium' ? 8 : 6,
        consequences: [
          'Your careful thinking leads to the best solution',
          'Taking time to consider helps you make a wise choice',
          'Your thoughtful approach impresses everyone'
        ]
      },
      {
        type: 'collaborative',
        points: difficulty === 'easy' ? 9 : difficulty === 'medium' ? 7 : 5,
        consequences: [
          'Working together creates an even better solution',
          'Getting help from others makes everything easier',
          'Teamwork leads to success for everyone'
        ]
      },
      {
        type: 'avoidant',
        points: difficulty === 'easy' ? -3 : difficulty === 'medium' ? -5 : -7,
        consequences: [
          'Avoiding the problem makes it worse',
          'The situation doesn\'t improve without action',
          'Others are disappointed by your lack of involvement'
        ]
      }
    ]
    
    // Chọn 3 lựa chọn ngẫu nhiên và tùy chỉnh theo theme
    const selectedChoices = this.shuffleArray(baseChoices).slice(0, 3)
    
    return selectedChoices.map(choice => ({
      text: this.customizeChoiceText(choice.type, theme, character),
      points: choice.points + this.getRandomVariation(),
      consequence: choice.consequences[Math.floor(Math.random() * choice.consequences.length)]
    }))
  }

  // Tùy chỉnh text lựa chọn theo theme
  private customizeChoiceText(type: string, theme: string, character: any): string {
    const customizations = {
      friendship: {
        direct: `Go talk to ${character.name} right away`,
        thoughtful: `Think about how ${character.name} might be feeling`,
        collaborative: `Ask other friends to help ${character.name}`,
        avoidant: `It's not your problem to solve`
      },
      honesty: {
        direct: 'Tell the truth immediately',
        thoughtful: 'Consider the best way to be honest',
        collaborative: 'Ask a trusted adult for guidance',
        avoidant: 'Keep quiet and hope no one finds out'
      },
      kindness: {
        direct: `Immediately help ${character.name}`,
        thoughtful: `Think of the kindest way to help`,
        collaborative: `Get others to join in helping ${character.name}`,
        avoidant: `Someone else will probably help`
      }
    }
    
    const themeChoices = customizations[theme] || customizations.friendship
    return themeChoices[type] || this.choiceTemplates[type][0]
  }

  // Thêm biến thể ngẫu nhiên cho điểm
  private getRandomVariation(): number {
    return Math.floor(Math.random() * 3) - 1 // -1, 0, hoặc 1
  }

  // Trộn mảng
  private shuffleArray(array: any[]): any[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Tạo chuỗi tình huống liên kết
  generateScenarioChain(playerHistory: any[], difficulty: string): any[] {
    const mainScenario = this.generateDynamicScenario(playerHistory, difficulty)
    const followUpScenarios = []
    
    // Tạo 2-3 tình huống tiếp theo dựa trên tình huống chính
    for (let i = 0; i < Math.floor(Math.random() * 2) + 2; i++) {
      const followUp = this.generateFollowUpScenario(mainScenario, i + 1)
      followUpScenarios.push(followUp)
    }
    
    return [mainScenario, ...followUpScenarios]
  }

  // Tạo tình huống tiếp theo
  private generateFollowUpScenario(baseScenario: any, step: number): any {
    const followUpSituations = [
      `After your previous choice, ${baseScenario.character.name} reacts. What happens next?`,
      `The situation develops further. How do you continue?`,
      `Others notice what's happening. What's your next move?`,
      `The consequences of your choice become clear. What do you do now?`
    ]
    
    return {
      ...baseScenario,
      id: baseScenario.id + step,
      situation: followUpSituations[Math.min(step - 1, followUpSituations.length - 1)],
      choices: this.generateChoices(baseScenario.theme, baseScenario.difficulty, baseScenario.character),
      step: step + 1
    }
  }
}

interface Character {
  name: string
  avatar: string
  mood: string
  personality?: string
}

interface Choice {
  text: string
  points: number
  consequence: string
}

interface Scenario {
  id: number
  situation: string
  character: Character
  choices: Choice[]
  theme?: string
  isAIGenerated?: boolean
  difficulty?: string
  step?: number
}

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earned: boolean
}

export default function DecisionMakingGame() {
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [badges, setBadges] = useState<Badge[]>([
    { id: 'first-choice', name: 'First Decision', description: 'Made your first choice', icon: '🎯', earned: false },
    { id: 'ai-master', name: 'AI Master', description: 'Completed 5 AI-generated scenarios', icon: '🤖', earned: false },
    { id: 'creative-thinker', name: 'Creative Thinker', description: 'Found unique solutions', icon: '💡', earned: false },
    { id: 'empathy-expert', name: 'Empathy Expert', description: 'Showed great understanding', icon: '❤️', earned: false },
    { id: 'problem-solver', name: 'Problem Solver', description: 'Solved complex situations', icon: '🧩', earned: false },
    { id: 'dynamic-learner', name: 'Dynamic Learner', description: 'Adapted to new challenges', icon: '⚡', earned: false }
  ])
  const [gameHistory, setGameHistory] = useState<any[]>([])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [aiGenerator] = useState(new AdvancedAIGenerator())
  const [aiScenarioCount, setAiScenarioCount] = useState(0)
  const [currentDifficulty, setCurrentDifficulty] = useState('medium')

  // Text-to-Speech
  const speakText = (text: string) => {
    if (!soundEnabled) return
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'vi-VN'
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  // Sound effects
  const playSound = (type: 'correct' | 'wrong' | 'badge' | 'ai') => {
    if (!soundEnabled) return
    console.log(`Playing ${type} sound`)
  }

  // AI Difficulty Adjustment
  const adjustDifficulty = useCallback(() => {
    const recentChoices = gameHistory.slice(-5)
    if (recentChoices.length < 3) return 'medium'
    
    const averageScore = recentChoices.reduce((sum, choice) => sum + choice.points, 0) / recentChoices.length
    
    if (averageScore > 8) {
      return 'hard'
    } else if (averageScore > 5) {
      return 'medium'
    } else {
      return 'easy'
    }
  }, [gameHistory])

  // Tạo tình huống AI hoàn toàn mới
  const generateNewAIScenario = () => {
    setIsLoading(true)
    
    // Simulate AI processing time
    setTimeout(() => {
      const difficulty = adjustDifficulty()
      setCurrentDifficulty(difficulty)
      
      const newScenario = aiGenerator.generateDynamicScenario(gameHistory, difficulty)
      setCurrentScenario(newScenario)
      setAiScenarioCount(prev => prev + 1)
      setIsLoading(false)
      
      speakText(newScenario.situation)
      playSound('ai')
      
      // Award badges for AI usage
      if (aiScenarioCount + 1 >= 5) {
        setBadges(prev => prev.map(badge => 
          badge.id === 'ai-master' ? { ...badge, earned: true } : badge
        ))
      }
    }, 2000) // Longer delay to simulate real AI processing
  }

  // Tạo chuỗi tình huống liên kết
  const generateScenarioChain = () => {
    setIsLoading(true)
    
    setTimeout(() => {
      const difficulty = adjustDifficulty()
      const scenarioChain = aiGenerator.generateScenarioChain(gameHistory, difficulty)
      
      // Start with first scenario in chain
      setCurrentScenario(scenarioChain[0])
      setIsLoading(false)
      
      speakText(scenarioChain[0].situation)
      playSound('ai')
    }, 1500)
  }

  // Handle choice selection
  const handleChoice = (choice: Choice) => {
    const newScore = Math.max(0, score + choice.points)
    setScore(newScore)
    
    // Add to game history with more details
    const choiceRecord = {
      scenario: currentScenario?.situation,
      choice: choice.text,
      points: choice.points,
      consequence: choice.consequence,
      theme: currentScenario?.theme,
      difficulty: currentScenario?.difficulty,
      isAIGenerated: currentScenario?.isAIGenerated,
      timestamp: new Date()
    }
    setGameHistory(prev => [...prev, choiceRecord])
    
    // Play sound effect
    playSound(choice.points > 5 ? 'correct' : 'wrong')
    
    // Speak consequence
    speakText(choice.consequence)
    
    // Check for badge awards
    checkBadgeAwards(choice, newScore, choiceRecord)
    
    // Level progression
    if (newScore >= level * 50) {
      setLevel(prev => prev + 1)
      playSound('badge')
    }
    
    // Auto-generate new scenario after delay
    setTimeout(() => {
      generateNewAIScenario()
    }, 3000)
  }

  // Enhanced badge checking
  const checkBadgeAwards = (choice: Choice, newScore: number, record: any) => {
    setBadges(prev => prev.map(badge => {
      if (badge.earned) return badge
      
      switch (badge.id) {
        case 'first-choice':
          if (gameHistory.length === 0) {
            playSound('badge')
            return { ...badge, earned: true }
          }
          break
        case 'creative-thinker':
          if (choice.points >= 9 && record.isAIGenerated) {
            playSound('badge')
            return { ...badge, earned: true }
          }
          break
        case 'empathy-expert':
          if (record.theme === 'kindness' && choice.points >= 8) {
            playSound('badge')
            return { ...badge, earned: true }
          }
          break
        case 'problem-solver':
          if (record.difficulty === 'hard' && choice.points >= 7) {
            playSound('badge')
            return { ...badge, earned: true }
          }
          break
        case 'dynamic-learner':
          const recentAI = gameHistory.slice(-3).filter(h => h.isAIGenerated).length
          if (recentAI >= 2) {
            playSound('badge')
            return { ...badge, earned: true }
          }
          break
      }
      return badge
    }))
  }

  // Initialize game
  useEffect(() => {
    generateNewAIScenario()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
        <motion.div 
          className="text-center text-white"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="relative">
            <Brain className="w-20 h-20 mx-auto mb-4" />
            <Sparkles className="w-8 h-8 absolute -top-2 -right-2 animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold mb-2">🤖 AI đang sáng tạo...</h2>
          <p className="text-lg opacity-90">Tạo tình huống hoàn toàn mới cho bạn!</p>
          <div className="mt-4 flex justify-center space-x-1">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-white rounded-full"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <Brain className="w-10 h-10" />
            🤖 AI Decision Maker
          </h1>
          <p className="text-white/90 text-lg">Tình huống được tạo bởi AI - Luôn mới, luôn thú vị!</p>
          <div className="mt-2 flex justify-center items-center gap-4 text-white/80">
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4" />
              Độ khó: {currentDifficulty}
            </span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              AI Scenarios: {aiScenarioCount}
            </span>
          </div>
        </motion.div>

        {/* Game Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-white font-semibold">Điểm số</p>
              <p className="text-2xl font-bold text-yellow-400">{score}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-white font-semibold">Cấp độ</p>
              <p className="text-2xl font-bold text-green-400">{level}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4 text-center">
              <Trophy className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-white font-semibold">Huy hiệu</p>
              <p className="text-2xl font-bold text-purple-400">{badges.filter(b => b.earned).length}/{badges.length}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4 text-center">
              <Brain className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <p className="text-white font-semibold">AI Count</p>
              <p className="text-2xl font-bold text-orange-400">{aiScenarioCount}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Game Area */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentScenario && (
                <motion.div
                  key={currentScenario.id}
                  initial={{ opacity: 0, x: 50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.9 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-2 border-white/30">
                    <CardHeader className="text-center pb-4">
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <motion.div
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 3 }}
                        >
                          <Avatar className="w-16 h-16 ring-4 ring-purple-400">
                            <AvatarFallback className="text-2xl bg-gradient-to-br from-purple-400 to-pink-500">
                              {currentScenario.character.avatar}
                            </AvatarFallback>
                          </Avatar>
                        </motion.div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{currentScenario.character.name}</h3>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline" className="bg-blue-100">
                              {currentScenario.character.mood}
                            </Badge>
                            {currentScenario.isAIGenerated && (
                              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                                🤖 AI Generated
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-xl text-gray-800 leading-relaxed bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                        {currentScenario.situation}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-3">
                      {currentScenario.choices.map((choice, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Button
                            onClick={() => handleChoice(choice)}
                            className="w-full p-4 h-auto text-left justify-start bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg border-2 border-white/20 hover:border-white/40"
                            variant="default"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">💭</span>
                              <span className="text-lg font-medium">{choice.text}</span>
                            </div>
                          </Button>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Enhanced AI Controls */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={generateNewAIScenario}
                className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold py-4 shadow-lg"
                disabled={isLoading}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                🎲 Tạo tình huống AI mới
              </Button>
              
              <Button
                onClick={generateScenarioChain}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-4 shadow-lg"
                disabled={isLoading}
              >
                <Shuffle className="w-5 h-5 mr-2" />
                🔗 Chuỗi tình huống liên kết
              </Button>
            </div>

            {/* AI Info */}
            <Card className="mt-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-md border-purple-300/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-purple-700 mb-2">
                  <Brain className="w-5 h-5" />
                  <span className="font-semibold">🤖 AI Dynamic Generation</span>
                </div>
                <p className="text-sm text-purple-600">
                  Mỗi tình huống được AI tạo ra hoàn toàn mới dựa trên lịch sử chơi của bạn. 
                  Không có câu hỏi nào lặp lại - luôn là trải nghiệm độc đáo!
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Sound Control */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-4">
                <Button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  variant="ghost"
                  className="w-full text-white hover:bg-white/20"
                >
                  {soundEnabled ? <Volume2 className="w-5 h-5 mr-2" /> : <VolumeX className="w-5 h-5 mr-2" />}
                  {soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
                </Button>
              </CardContent>
            </Card>

            {/* Enhanced Badges */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Huy hiệu AI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-80 overflow-y-auto">
                {badges.map((badge) => (
                  <motion.div
                    key={badge.id}
                    className={`p-3 rounded-lg border transition-all ${
                      badge.earned 
                        ? 'bg-yellow-400/20 border-yellow-400 text-yellow-100' 
                        : 'bg-gray-600/20 border-gray-500 text-gray-400'
                    }`}
                    whileHover={{ scale: badge.earned ? 1.05 : 1 }}
                    animate={badge.earned ? { 
                      boxShadow: ['0 0 0 rgba(255,255,0,0)', '0 0 20px rgba(255,255,0,0.3)', '0 0 0 rgba(255,255,0,0)'] 
                    } : {}}
                    transition={{ duration: 2, repeat: badge.earned ? Infinity : 0 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{badge.icon}</span>
                      <div>
                        <p className="font-semibold text-sm">{badge.name}</p>
                        <p className="text-xs opacity-80">{badge.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* AI Analytics */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Phân tích AI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-white/80 text-sm">
                  <div className="flex justify-between">
                    <span>Tình huống AI:</span>
                    <span className="font-bold">{aiScenarioCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Độ khó hiện tại:</span>
                    <span className="font-bold capitalize">{currentDifficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tổng quyết định:</span>
                    <span className="font-bold">{gameHistory.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Điểm trung bình:</span>
                    <span className="font-bold">
                      {gameHistory.length > 0 
                        ? (gameHistory.reduce((sum, h) => sum + h.points, 0) / gameHistory.length).toFixed(1)
                        : '0'
                      }
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent AI History */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Lịch sử AI gần đây
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-64 overflow-y-auto">
                {gameHistory.filter(h => h.isAIGenerated).slice(-5).reverse().map((record, index) => (
                  <div key={index} className="p-2 bg-white/5 rounded text-white/80 text-sm border border-purple-400/20">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs">🤖</span>
                      <span className="font-medium text-xs">{record.theme}</span>
                      <Badge variant="outline" className="text-xs px-1 py-0">
                        {record.difficulty}
                      </Badge>
                    </div>
                    <p className="font-medium">{record.choice}</p>
                    <p className="text-xs opacity-70">+{record.points} điểm</p>
                  </div>
                ))}
                {gameHistory.filter(h => h.isAIGenerated).length === 0 && (
                  <p className="text-white/60 text-sm text-center py-4">
                    Chưa có tình huống AI nào
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}