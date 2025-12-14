import { useState } from "react";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { Heart, Play, Check, X, Sparkles, Calendar, Users, Award, ChevronRight, BookOpen, Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CultureVideo {
  id: number;
  title: string;
  duration: string;
  description: string;
  completed: boolean;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

interface CultureProgress {
  videosCompleted: number[];
  quizPassed: boolean;
  quizScore: number;
  valuesAcknowledged: boolean;
  ritualsJoined: string[];
}

const initialVideos: CultureVideo[] = [
  { id: 1, title: "Communication Styles", duration: "4:30", description: "Learn how we communicate openly and transparently across all levels.", completed: false },
  { id: 2, title: "Meeting Etiquette", duration: "3:15", description: "Best practices for productive and inclusive meetings.", completed: false },
  { id: 3, title: "Collaboration Tools", duration: "5:00", description: "Overview of tools we use to work together effectively.", completed: false },
  { id: 4, title: "Feedback Culture", duration: "4:45", description: "How to give and receive constructive feedback.", completed: false },
];

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What should you do if you disagree with something in a meeting?",
    options: ["Stay silent to avoid conflict", "Speak up respectfully and share your perspective", "Complain to colleagues after", "Send an anonymous email"],
    correctIndex: 1,
  },
  {
    id: 2,
    question: "Which of these is encouraged in our culture?",
    options: ["Working in silos", "Skipping documentation", "Celebrating wins, big and small", "Avoiding feedback"],
    correctIndex: 2,
  },
  {
    id: 3,
    question: "What is the purpose of 'Coffee Roulette'?",
    options: ["Free coffee", "Random 1:1 connections across teams", "Coffee brewing competition", "Morning announcements"],
    correctIndex: 1,
  },
  {
    id: 4,
    question: "What is our approach to asking for help?",
    options: ["Figure it out yourself first", "Ask for help when needed - it's encouraged", "Only ask your manager", "Submit a formal request"],
    correctIndex: 1,
  },
];

const coreValues = [
  { name: "Innovation", description: "We embrace new ideas and creative solutions", icon: "💡" },
  { name: "Integrity", description: "We act with honesty and transparency", icon: "🎯" },
  { name: "Collaboration", description: "We achieve more together", icon: "🤝" },
  { name: "Excellence", description: "We strive for the highest standards", icon: "⭐" },
];

const dosAndDonts = {
  dos: [
    "Speak up in meetings - your voice matters",
    "Give and receive feedback gracefully",
    "Take ownership of your work",
    "Collaborate across teams",
    "Celebrate wins, big and small",
  ],
  donts: [
    "Stay silent if you disagree",
    "Work in silos",
    "Skip documentation",
    "Ignore team rituals",
    "Hesitate to ask for help",
  ],
};

const rituals = [
  { id: "monday-kickoff", name: "Monday Kickoff", time: "10:00 AM", description: "Weekly team alignment and goal setting", icon: <Calendar className="w-5 h-5" /> },
  { id: "demo-friday", name: "Demo Friday", time: "4:00 PM", description: "Share what you've built this week", icon: <Sparkles className="w-5 h-5" /> },
  { id: "coffee-roulette", name: "Coffee Roulette", time: "Bi-weekly", description: "Random 1:1 connections across teams", icon: <Users className="w-5 h-5" /> },
];

const initialProgress: CultureProgress = {
  videosCompleted: [],
  quizPassed: false,
  quizScore: 0,
  valuesAcknowledged: false,
  ritualsJoined: [],
};

export const Culture = () => {
  const { toast } = useToast();
  const [progress, setProgress] = useLocalStorage<CultureProgress>("culture-progress", initialProgress);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<CultureVideo | null>(null);
  const [quizDialogOpen, setQuizDialogOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);

  const videos = initialVideos.map(v => ({
    ...v,
    completed: progress.videosCompleted.includes(v.id),
  }));

  const completedVideosCount = progress.videosCompleted.length;
  const totalItems = videos.length + 2; // videos + quiz + values acknowledgment
  const completedItems = completedVideosCount + (progress.quizPassed ? 1 : 0) + (progress.valuesAcknowledged ? 1 : 0);
  const overallProgress = Math.round((completedItems / totalItems) * 100);

  const handleWatchVideo = (video: CultureVideo) => {
    setSelectedVideo(video);
    setVideoDialogOpen(true);
  };

  const handleCompleteVideo = () => {
    if (selectedVideo && !progress.videosCompleted.includes(selectedVideo.id)) {
      setProgress(prev => ({
        ...prev,
        videosCompleted: [...prev.videosCompleted, selectedVideo.id],
      }));
      toast({
        title: "Video completed!",
        description: `You've completed "${selectedVideo.title}"`,
      });
    }
    setVideoDialogOpen(false);
    setSelectedVideo(null);
  };

  const handleStartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizAnswers([]);
    setQuizDialogOpen(true);
  };

  const handleSelectAnswer = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      toast({
        title: "Please select an answer",
        variant: "destructive",
      });
      return;
    }

    const newAnswers = [...quizAnswers, selectedAnswer];
    setQuizAnswers(newAnswers);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      // Calculate score
      const correctCount = newAnswers.reduce((acc, answer, idx) => {
        return acc + (answer === quizQuestions[idx].correctIndex ? 1 : 0);
      }, 0);
      const score = Math.round((correctCount / quizQuestions.length) * 100);
      const passed = score >= 75;

      setProgress(prev => ({
        ...prev,
        quizPassed: passed,
        quizScore: score,
      }));

      setShowResult(true);
    }
  };

  const handleAcknowledgeValues = () => {
    setProgress(prev => ({
      ...prev,
      valuesAcknowledged: true,
    }));
    toast({
      title: "Values acknowledged!",
      description: "Thank you for committing to our core values",
    });
  };

  const handleJoinRitual = (ritualId: string) => {
    if (progress.ritualsJoined.includes(ritualId)) {
      setProgress(prev => ({
        ...prev,
        ritualsJoined: prev.ritualsJoined.filter(id => id !== ritualId),
      }));
      toast({ title: "Removed from ritual" });
    } else {
      setProgress(prev => ({
        ...prev,
        ritualsJoined: [...prev.ritualsJoined, ritualId],
      }));
      toast({
        title: "Joined ritual!",
        description: "You'll receive reminders for this event",
      });
    }
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="animate-fade-in">
      <PageBreadcrumb items={[{ label: "Onboarding", to: "/" }, { label: "Culture & Values" }]} />

      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Culture & Values</h1>
            <p className="text-muted-foreground">Understand how we work together and what we stand for</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Module Progress</p>
              <p className="text-lg font-bold text-primary">{overallProgress}%</p>
            </div>
            <div className="w-24">
              <Progress value={overallProgress} className="h-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className={`card-interactive p-4 ${completedVideosCount === videos.length ? "border-success" : ""}`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              completedVideosCount === videos.length ? "bg-success/10 text-success" : "bg-primary/10 text-primary"
            }`}>
              <Play className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-foreground">Videos</p>
              <p className="text-sm text-muted-foreground">{completedVideosCount}/{videos.length} completed</p>
            </div>
            {completedVideosCount === videos.length && <Check className="w-5 h-5 text-success ml-auto" />}
          </div>
        </div>

        <div className={`card-interactive p-4 ${progress.quizPassed ? "border-success" : ""}`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              progress.quizPassed ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
            }`}>
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-foreground">Culture Quiz</p>
              <p className="text-sm text-muted-foreground">
                {progress.quizPassed ? `Passed with ${progress.quizScore}%` : "Not completed"}
              </p>
            </div>
            {progress.quizPassed && <Check className="w-5 h-5 text-success ml-auto" />}
          </div>
        </div>

        <div className={`card-interactive p-4 ${progress.valuesAcknowledged ? "border-success" : ""}`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              progress.valuesAcknowledged ? "bg-success/10 text-success" : "bg-info/10 text-info"
            }`}>
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-foreground">Values</p>
              <p className="text-sm text-muted-foreground">
                {progress.valuesAcknowledged ? "Acknowledged" : "Pending acknowledgment"}
              </p>
            </div>
            {progress.valuesAcknowledged && <Check className="w-5 h-5 text-success ml-auto" />}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Micro-learning Videos */}
          <div className="card-interactive p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="icon-circle-primary">
                <Play className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Cultural Micro-learning</h2>
                <p className="text-sm text-muted-foreground">Watch all videos to understand our culture</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {videos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => handleWatchVideo(video)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer hover:shadow-md
                    ${video.completed ? "border-success bg-success-light/30" : "border-border hover:border-primary/30"}
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                      ${video.completed ? "bg-success/20 text-success" : "bg-primary/10 text-primary"}
                    `}>
                      {video.completed ? <Check className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{video.title}</p>
                      <p className="text-xs text-muted-foreground mb-1">{video.duration}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{video.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {completedVideosCount === videos.length && !progress.quizPassed && (
              <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">All videos completed!</p>
                    <p className="text-sm text-muted-foreground">Take the culture quiz to test your knowledge</p>
                  </div>
                  <Button onClick={handleStartQuiz}>
                    <BookOpen className="w-4 h-4 mr-2" />
                    Take Quiz
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Do's and Don'ts */}
          <div className="card-interactive p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="icon-circle-warning">
                <Heart className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Cross-functional Etiquette</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-success/5 border border-success/20">
                <h3 className="font-semibold text-success mb-3 flex items-center gap-2">
                  <Check className="w-5 h-5" /> Do's
                </h3>
                <ul className="space-y-2">
                  {dosAndDonts.dos.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
                <h3 className="font-semibold text-destructive mb-3 flex items-center gap-2">
                  <X className="w-5 h-5" /> Don'ts
                </h3>
                <ul className="space-y-2">
                  {dosAndDonts.donts.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <X className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="card-interactive p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="icon-circle-success">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Our Core Values</h2>
                <p className="text-sm text-muted-foreground">The principles that guide everything we do</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {coreValues.map((value, index) => (
                <div key={index} className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/10">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{value.icon}</span>
                    <div>
                      <h4 className="font-semibold text-foreground">{value.name}</h4>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {!progress.valuesAcknowledged ? (
              <Button className="w-full" onClick={handleAcknowledgeValues}>
                <Award className="w-4 h-4 mr-2" />
                I Commit to These Values
              </Button>
            ) : (
              <div className="p-4 bg-success-light rounded-xl text-center">
                <Check className="w-8 h-8 mx-auto mb-2 text-success" />
                <p className="font-medium text-success">You've committed to our core values!</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quiz Card */}
          <div className="card-interactive p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`icon-circle-${progress.quizPassed ? "success" : "warning"}`}>
                <Trophy className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Culture Quiz</h2>
            </div>

            {progress.quizPassed ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-success/10 flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-success" />
                </div>
                <p className="font-semibold text-foreground">Quiz Passed!</p>
                <p className="text-2xl font-bold text-success mt-1">{progress.quizScore}%</p>
                <p className="text-sm text-muted-foreground mt-2">Great job understanding our culture</p>
                <Button variant="outline" className="mt-4" onClick={handleStartQuiz}>
                  Retake Quiz
                </Button>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Complete all videos to unlock the culture quiz and test your knowledge.
                </p>
                <Button 
                  className="w-full" 
                  onClick={handleStartQuiz}
                  disabled={completedVideosCount < videos.length}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  {completedVideosCount < videos.length 
                    ? `Watch ${videos.length - completedVideosCount} more video${videos.length - completedVideosCount > 1 ? "s" : ""}`
                    : "Start Quiz"
                  }
                </Button>
              </div>
            )}
          </div>

          {/* Rituals & Traditions */}
          <div className="card-interactive p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="icon-circle-primary">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Team Rituals</h2>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Join our recurring team events
            </p>

            <div className="space-y-3">
              {rituals.map((ritual) => {
                const isJoined = progress.ritualsJoined.includes(ritual.id);
                return (
                  <div key={ritual.id} className={`p-3 rounded-xl transition-colors ${
                    isJoined ? "bg-success/5 border border-success/20" : "bg-secondary/50"
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className="icon-circle-primary flex-shrink-0">
                        {ritual.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{ritual.name}</p>
                        <p className="text-sm text-primary">{ritual.time}</p>
                        <p className="text-xs text-muted-foreground">{ritual.description}</p>
                      </div>
                      <Button
                        variant={isJoined ? "outline" : "default"}
                        size="sm"
                        onClick={() => handleJoinRitual(ritual.id)}
                      >
                        {isJoined ? "Joined" : "Join"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Completion Badge */}
          {overallProgress === 100 && (
            <div className="card-interactive p-6 bg-gradient-to-br from-success/10 to-primary/10 border-success">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-success/20 flex items-center justify-center">
                  <Award className="w-8 h-8 text-success" />
                </div>
                <h3 className="font-bold text-foreground">Module Complete!</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  You've completed the Culture & Values module
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video Dialog */}
      <Dialog open={videoDialogOpen} onOpenChange={setVideoDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Video Placeholder */}
            <div className="aspect-video bg-secondary rounded-xl flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Video Player</p>
                <p className="text-xs text-muted-foreground">{selectedVideo?.duration}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{selectedVideo?.description}</p>
            <Button className="w-full" onClick={handleCompleteVideo}>
              <Check className="w-4 h-4 mr-2" />
              Mark as Complete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quiz Dialog */}
      <Dialog open={quizDialogOpen} onOpenChange={setQuizDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {showResult ? "Quiz Results" : `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`}
            </DialogTitle>
          </DialogHeader>

          {showResult ? (
            <div className="text-center py-6">
              <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
                progress.quizPassed ? "bg-success/10" : "bg-warning/10"
              }`}>
                {progress.quizPassed ? (
                  <Trophy className="w-10 h-10 text-success" />
                ) : (
                  <BookOpen className="w-10 h-10 text-warning" />
                )}
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {progress.quizPassed ? "Congratulations!" : "Keep Learning!"}
              </h3>
              <p className="text-3xl font-bold mt-2" style={{ color: progress.quizPassed ? "hsl(var(--success))" : "hsl(var(--warning))" }}>
                {progress.quizScore}%
              </p>
              <p className="text-muted-foreground mt-2">
                {progress.quizPassed 
                  ? "You've passed the culture quiz!"
                  : "You need 75% to pass. Watch the videos again and try again."
                }
              </p>
              <Button className="mt-6" onClick={() => setQuizDialogOpen(false)}>
                {progress.quizPassed ? "Continue" : "Review Videos"}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="mb-4">
                <Progress value={((currentQuestionIndex + 1) / quizQuestions.length) * 100} className="h-2" />
              </div>

              <p className="font-medium text-foreground text-lg">{currentQuestion.question}</p>

              <div className="space-y-2">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    className={`w-full p-4 text-left rounded-xl border transition-all ${
                      selectedAnswer === index
                        ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === index ? "border-primary bg-primary" : "border-muted-foreground"
                      }`}>
                        {selectedAnswer === index && <Check className="w-4 h-4 text-primary-foreground" />}
                      </div>
                      <span className="text-foreground">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              <Button className="w-full" onClick={handleNextQuestion}>
                {currentQuestionIndex < quizQuestions.length - 1 ? "Next Question" : "Submit Quiz"}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
