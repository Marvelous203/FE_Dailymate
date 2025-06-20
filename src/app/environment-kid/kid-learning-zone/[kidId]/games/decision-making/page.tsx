'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge as UIBadge } from '@/components/ui/badge'
import { Volume2, VolumeX, Trophy, Star, Brain, Target, Sparkles, Zap, Shuffle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Define proper interfaces
// Cách 1: Cập nhật interface PlayerChoice
interface PlayerChoice {
  theme?: string;
  difficulty?: string;
  score?: number; // Thay đổi từ required thành optional
  timestamp: number;
  choice?: string;
  points?: number;
  consequence?: string;
  isAIGenerated?: boolean;
}

interface Character {
  name: string;
  personality: string;
  interests: string[];
  avatar?: string;
  mood?: string;
}

interface Scenario {
  id: string | number;
  theme: string;
  setting: string;
  character: Character;
  situation: string;
  choices: Choice[];
  difficulty: string;
  isAIGenerated?: boolean;
  timestamp?: Date;
}

interface Choice {
  text: string;
  consequence: string;
  points: number;
  feedback: string;
}

interface GameBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
}

interface GameRecord {
  scenario?: string;
  choice: string;
  points: number;
  consequence: string;
  theme?: string;
  difficulty?: string;
  isAIGenerated?: boolean;
  timestamp: Date;
}

// Advanced AI Scenario Generator với khả năng tạo nội dung động
class AdvancedAIGenerator {
  private themes = ['friendship', 'honesty', 'kindness', 'responsibility', 'courage', 'teamwork', 'empathy', 'fairness', 'perseverance', 'respect']
  private settings = ['school', 'home', 'playground', 'library', 'park', 'store', 'restaurant', 'bus', 'classroom', 'cafeteria']
  private characters: Character[] = [
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

  // Generate choices method
  generateChoices(theme: string, difficulty: string, ): Choice[] {
    const baseChoices = [
      { text: 'Help directly', consequence: 'You helped solve the problem', points: 8, feedback: 'Great choice!' },
      { text: 'Ask for advice', consequence: 'You got good guidance', points: 6, feedback: 'Smart thinking!' },
      { text: 'Wait and see', consequence: 'The situation resolved itself', points: 4, feedback: 'Sometimes patience works' },
      { text: 'Ignore it', consequence: 'The problem got worse', points: 2, feedback: 'Maybe try a different approach next time' }
    ];
    
    // Adjust points based on difficulty
    const difficultyMultiplier = difficulty === 'hard' ? 1.2 : difficulty === 'easy' ? 0.8 : 1;
    
    return baseChoices.map(choice => ({
      ...choice,
      points: Math.round(choice.points * difficultyMultiplier)
    }));
  }

  // Generate scenario chain method
  generateScenarioChain(playerHistory: PlayerChoice[] = [], difficulty: string = 'medium'): Scenario[] {
    // Generate a chain of 3 related scenarios
    const scenarios: Scenario[] = [];
    
    for (let i = 0; i < 3; i++) {
      scenarios.push(this.generateDynamicScenario(playerHistory, difficulty));
    }
    
    return scenarios;
  }

  // Tạo tình huống hoàn toàn mới bằng AI
  generateDynamicScenario(playerHistory: PlayerChoice[] = [], difficulty: string = 'medium'): Scenario {
    // Phân tích lịch sử người chơi để tạo nội dung phù hợp
    const preferredThemes = this.analyzePlayerPreferences(playerHistory)
    const theme = preferredThemes.length > 0 ? 
      preferredThemes[Math.floor(Math.random() * preferredThemes.length)] : 
      this.themes[Math.floor(Math.random() * this.themes.length)]
    
    const setting = this.settings[Math.floor(Math.random() * this.settings.length)]
    const character = this.characters[Math.floor(Math.random() * this.characters.length)]
    const conflict = this.conflicts[Math.floor(Math.random() * this.conflicts.length)]
    const emotion = this.emotions[Math.floor(Math.random() * this.emotions.length)]
    
    // Tạo tình huống dựa trên các yếu tống ngẫu nhiên
    const scenario = this.constructScenario(theme, setting, character, conflict, emotion, difficulty)
    
    return {
      id: Date.now() + Math.random(),
      theme,
      setting,
      character: {
        name: character.name,
        avatar: this.generateCharacterAvatar(character),
        mood: emotion,
        personality: character.personality,
        interests: character.interests
      },
      situation: scenario.situation,
      choices: scenario.choices,
      isAIGenerated: true,
      difficulty,
      timestamp: new Date()
    }
  }

  // Phân tích sở thích của người chơi
  private analyzePlayerPreferences(history: PlayerChoice[]): string[] {
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
  private generateCharacterAvatar(character: Character): string {
    const avatars: { [key: string]: string } = {
      shy: '😊', outgoing: '😄', helpful: '🤝', creative: '🎨',
      curious: '🤔', kind: '💝', brave: '💪', smart: '🧠'
    }
    return avatars[character.personality] || '👤'
  }

  // Xây dựng tình huống cụ thể
  private constructScenario(theme: string, setting: string, character: Character, conflict: string, emotion: string, difficulty: string): { situation: string; choices: Choice[] } {
    const situations: { [key: string]: string[] } = {
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
    const choices = this.generateChoices(theme, difficulty)
    
    return { situation, choices }
  }
}

export default function DecisionMakingGame() {
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [badges, setBadges] = useState<GameBadge[]>([
    { id: 'first-choice', name: 'First Decision', description: 'Made your first choice', icon: '🎯', earned: false },
    { id: 'ai-master', name: 'AI Master', description: 'Completed 5 AI-generated scenarios', icon: '🤖', earned: false },
    { id: 'creative-thinker', name: 'Creative Thinker', description: 'Found unique solutions', icon: '💡', earned: false },
    { id: 'empathy-expert', name: 'Empathy Expert', description: 'Showed great understanding', icon: '❤️', earned: false },
    { id: 'problem-solver', name: 'Problem Solver', description: 'Solved complex situations', icon: '🧩', earned: false },
    { id: 'dynamic-learner', name: 'Dynamic Learner', description: 'Adapted to new challenges', icon: '⚡', earned: false }
  ])
  const [gameHistory, setGameHistory] = useState<GameRecord[]>([])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [aiGenerator] = useState(new AdvancedAIGenerator())
  const [aiScenarioCount, setAiScenarioCount] = useState(0)
  const [currentDifficulty, setCurrentDifficulty] = useState('medium')

  // Text-to-Speech
  // Wrap speakText and playSound in useCallback
  const speakText = useCallback((text: string) => {
    if (!soundEnabled) return
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'vi-VN'
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }, [soundEnabled])
  
  const playSound = useCallback((type: 'correct' | 'wrong' | 'badge' | 'ai') => {
    if (!soundEnabled) return
    console.log(`Playing ${type} sound`)
  }, [soundEnabled])
  


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
  const generateNewAIScenario = useCallback(() => {
    setIsLoading(true)
    
    // Simulate AI processing time
    setTimeout(() => {
      const difficulty = adjustDifficulty()
      setCurrentDifficulty(difficulty)
      
      // Convert GameRecord[] to PlayerChoice[] format
      const playerChoices: PlayerChoice[] = gameHistory.map(record => ({
        theme: record.theme,
        difficulty: record.difficulty,
        score: record.points,
        timestamp: record.timestamp.getTime(), // Convert Date to number
        choice: record.choice,
        points: record.points,
        consequence: record.consequence,
        isAIGenerated: record.isAIGenerated
      }))
      
      const newScenario = aiGenerator.generateDynamicScenario(playerChoices, difficulty)
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
  }, [aiGenerator, adjustDifficulty, gameHistory, aiScenarioCount, speakText, playSound])

  // Tạo chuỗi tình huống liên kết
  const generateScenarioChain = useCallback(() => {
    setIsLoading(true)
    
    setTimeout(() => {
      const difficulty = adjustDifficulty()
      // Convert GameRecord[] to PlayerChoice[] format
      const playerChoices: PlayerChoice[] = gameHistory.map(record => ({
        theme: record.theme,
        difficulty: record.difficulty,
        score: record.points,
        timestamp: record.timestamp.getTime(), // Convert Date to number
        choice: record.choice,
        points: record.points,
        consequence: record.consequence,
        isAIGenerated: record.isAIGenerated
      }))
      
      const scenarioChain = aiGenerator.generateScenarioChain(playerChoices, difficulty)
      
      // Start with first scenario in chain
      setCurrentScenario(scenarioChain[0])
      setIsLoading(false)
      
      speakText(scenarioChain[0].situation)
      playSound('ai')
    }, 1500)
  }, [aiGenerator, adjustDifficulty, gameHistory, speakText, playSound])

  // Handle choice selection
  const handleChoice = useCallback((choice: Choice) => {
    const newScore = Math.max(0, score + choice.points)
    setScore(newScore)
    
    // Add to game history with more details
    const choiceRecord: GameRecord = {
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
  }, [score, currentScenario, playSound, speakText, level, generateNewAIScenario])

  // Enhanced badge checking
  const checkBadgeAwards = useCallback((choice: Choice, newScore: number, record: GameRecord) => {
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
  }, [gameHistory, playSound])

  // Initialize game
  useEffect(() => {
    generateNewAIScenario()
  }, [generateNewAIScenario])

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
                          className="text-6xl"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ repeat: Infinity, duration: 3 }}
                        >
                          {currentScenario.character.avatar}
                        </motion.div>
                        <div className="text-left">
                          <h3 className="text-xl font-bold text-gray-800">{currentScenario.character.name}</h3>
                          <p className="text-gray-600 capitalize">{currentScenario.character.personality}</p>
                          <p className="text-sm text-gray-500">Mood: {currentScenario.character.mood}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-center gap-2 mb-4">
                        <UIBadge variant="secondary" className="bg-blue-100 text-blue-800">
                          {currentScenario.theme}
                        </UIBadge>
                        <UIBadge variant="secondary" className="bg-green-100 text-green-800">
                          {currentScenario.setting}
                        </UIBadge>
                        <UIBadge variant="secondary" className="bg-purple-100 text-purple-800">
                          {currentScenario.difficulty}
                        </UIBadge>
                        {currentScenario.isAIGenerated && (
                          <UIBadge variant="secondary" className="bg-orange-100 text-orange-800">
                            🤖 AI Generated
                          </UIBadge>
                        )}
                      </div>
                      
                      <CardTitle className="text-lg text-gray-800 leading-relaxed">
                        {currentScenario.situation}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-3">
                      <h4 className="font-semibold text-gray-700 mb-3">What would you do?</h4>
                      {currentScenario.choices.map((choice, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            onClick={() => handleChoice(choice)}
                            variant="outline"
                            className="w-full p-4 h-auto text-left justify-start bg-white hover:bg-blue-50 border-2 hover:border-blue-300 transition-all duration-200"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                                {String.fromCharCode(65 + index)}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-800">{choice.text}</p>
                                <p className="text-sm text-gray-500 mt-1">Points: +{choice.points}</p>
                              </div>
                            </div>
                          </Button>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Action Buttons */}
            <div className="mt-6 flex gap-4 justify-center">
              <Button
                onClick={generateNewAIScenario}
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                New AI Scenario
              </Button>
              
              <Button
                onClick={generateScenarioChain}
                disabled={isLoading}
                variant="outline"
                className="border-purple-300 text-purple-600 hover:bg-purple-50"
              >
                <Shuffle className="w-4 h-4 mr-2" />
                Scenario Chain
              </Button>
              
              <Button
                onClick={() => setSoundEnabled(!soundEnabled)}
                variant="outline"
                className="border-gray-300"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Badges */}
            <Card className="bg-white/90 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Trophy className="w-5 h-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {badges.map(badge => (
                  <motion.div
                    key={badge.id}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      badge.earned 
                        ? 'bg-yellow-50 border-yellow-300 shadow-md' 
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                    animate={badge.earned ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{badge.icon}</span>
                      <div>
                        <h4 className="font-semibold text-sm">{badge.name}</h4>
                        <p className="text-xs opacity-80">{badge.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
            
            {/* Recent History */}
            <Card className="bg-white/90 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Brain className="w-5 h-5" />
                  Recent Choices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-64 overflow-y-auto">
                {gameHistory.slice(-5).reverse().map((record, index) => (
                  <div key={index} className="p-2 bg-gray-50 rounded border">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-medium text-gray-700">{record.choice}</p>
                      <span className={`text-xs px-2 py-1 rounded ${
                        record.points > 5 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                        +{record.points}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{record.consequence}</p>
                    {record.isAIGenerated && (
                      <span className="text-xs bg-orange-100 text-orange-600 px-1 rounded mt-1 inline-block">
                        🤖 AI
                      </span>
                    )}
                  </div>
                ))}
                {gameHistory.length === 0 && (
                  <p className="text-gray-500 text-sm text-center py-4">
                    No choices made yet. Start playing!
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
