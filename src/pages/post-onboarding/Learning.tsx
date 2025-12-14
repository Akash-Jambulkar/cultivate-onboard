import { useState } from "react";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { GraduationCap, BookOpen, Award, Star, Play, Clock, Users, CheckCircle, ArrowRight, Trophy, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

const initialCourses = [
  { 
    id: 1, 
    title: "Advanced Excel for Data Analysis", 
    category: "Technical", 
    progress: 75, 
    duration: "4h 30m",
    instructor: "Jennifer Wu",
    rating: 4.8,
    enrolled: 1234,
    modules: [
      { name: "Introduction to Advanced Functions", completed: true, duration: "30 min" },
      { name: "VLOOKUP and HLOOKUP Mastery", completed: true, duration: "45 min" },
      { name: "Pivot Tables Deep Dive", completed: true, duration: "1h" },
      { name: "Data Visualization Techniques", completed: false, duration: "1h 15min" },
      { name: "Macros and Automation", completed: false, duration: "1h" },
    ]
  },
  { 
    id: 2, 
    title: "Project Management Fundamentals", 
    category: "Leadership", 
    progress: 30, 
    duration: "6h",
    instructor: "Robert Chen",
    rating: 4.9,
    enrolled: 892,
    modules: [
      { name: "Introduction to PM Methodologies", completed: true, duration: "45 min" },
      { name: "Agile vs Waterfall", completed: true, duration: "1h" },
      { name: "Stakeholder Management", completed: false, duration: "1h 15min" },
      { name: "Risk Assessment", completed: false, duration: "1h 30min" },
      { name: "Project Delivery & Closure", completed: false, duration: "1h 30min" },
    ]
  },
  { 
    id: 3, 
    title: "Effective Communication Skills", 
    category: "Soft Skills", 
    progress: 0, 
    duration: "3h",
    instructor: "Sarah Mitchell",
    rating: 4.7,
    enrolled: 2156,
    modules: [
      { name: "Active Listening", completed: false, duration: "30 min" },
      { name: "Clear Written Communication", completed: false, duration: "45 min" },
      { name: "Presenting with Confidence", completed: false, duration: "1h" },
      { name: "Giving and Receiving Feedback", completed: false, duration: "45 min" },
    ]
  },
  { 
    id: 4, 
    title: "Data Analysis with Python", 
    category: "Technical", 
    progress: 100, 
    duration: "5h",
    instructor: "David Lee",
    rating: 4.9,
    enrolled: 1567,
    modules: [
      { name: "Python Basics for Data Science", completed: true, duration: "1h" },
      { name: "Pandas and NumPy", completed: true, duration: "1h 30min" },
      { name: "Data Cleaning Techniques", completed: true, duration: "1h" },
      { name: "Statistical Analysis", completed: true, duration: "1h 30min" },
    ]
  },
  { 
    id: 5, 
    title: "Leadership Essentials", 
    category: "Leadership", 
    progress: 0, 
    duration: "4h",
    instructor: "Michael Chen",
    rating: 5.0,
    enrolled: 756,
    modules: [
      { name: "Leadership Mindset", completed: false, duration: "45 min" },
      { name: "Building High-Performing Teams", completed: false, duration: "1h" },
      { name: "Decision Making Under Pressure", completed: false, duration: "1h" },
      { name: "Inspiring and Motivating Others", completed: false, duration: "1h 15min" },
    ]
  },
  { 
    id: 6, 
    title: "Cloud Architecture Basics", 
    category: "Technical", 
    progress: 45, 
    duration: "5h 30m",
    instructor: "Alex Thompson",
    rating: 4.6,
    enrolled: 1089,
    modules: [
      { name: "Introduction to Cloud Computing", completed: true, duration: "45 min" },
      { name: "AWS Fundamentals", completed: true, duration: "1h 15min" },
      { name: "GCP Overview", completed: false, duration: "1h 15min" },
      { name: "Azure Essentials", completed: false, duration: "1h 15min" },
      { name: "Multi-Cloud Strategies", completed: false, duration: "1h" },
    ]
  },
];

const achievements = [
  { id: 1, name: "First Course", description: "Complete your first course", earned: true, icon: "🎯" },
  { id: 2, name: "Fast Learner", description: "Complete 3 courses in a month", earned: true, icon: "⚡" },
  { id: 3, name: "Technical Expert", description: "Complete 5 technical courses", earned: false, icon: "💻" },
  { id: 4, name: "Leader in Training", description: "Complete all leadership courses", earned: false, icon: "👑" },
];

const learningPaths = [
  { name: "Full-Stack Developer", courses: 8, progress: 25, color: "bg-primary" },
  { name: "Data Scientist", courses: 6, progress: 17, color: "bg-info" },
  { name: "Engineering Manager", courses: 5, progress: 0, color: "bg-warning" },
];

export const Learning = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [selectedCourse, setSelectedCourse] = useState<typeof initialCourses[0] | null>(null);
  const [showCourseDialog, setShowCourseDialog] = useState(false);
  const [currentModule, setCurrentModule] = useState<number | null>(null);

  const totalCompleted = courses.filter(c => c.progress === 100).length;
  const totalInProgress = courses.filter(c => c.progress > 0 && c.progress < 100).length;

  const handleCourseAction = (course: typeof initialCourses[0]) => {
    setSelectedCourse(course);
    setShowCourseDialog(true);
    setCurrentModule(null);
  };

  const startModule = (moduleIndex: number) => {
    setCurrentModule(moduleIndex);
    toast.success(`Starting: ${selectedCourse?.modules[moduleIndex].name}`);
  };

  const completeModule = (moduleIndex: number) => {
    if (!selectedCourse) return;

    setCourses(prev => prev.map(course => {
      if (course.id === selectedCourse.id) {
        const updatedModules = [...course.modules];
        updatedModules[moduleIndex] = { ...updatedModules[moduleIndex], completed: true };
        const completedCount = updatedModules.filter(m => m.completed).length;
        const newProgress = Math.round((completedCount / updatedModules.length) * 100);
        
        return { ...course, modules: updatedModules, progress: newProgress };
      }
      return course;
    }));

    setSelectedCourse(prev => {
      if (!prev) return null;
      const updatedModules = [...prev.modules];
      updatedModules[moduleIndex] = { ...updatedModules[moduleIndex], completed: true };
      const completedCount = updatedModules.filter(m => m.completed).length;
      const newProgress = Math.round((completedCount / updatedModules.length) * 100);
      return { ...prev, modules: updatedModules, progress: newProgress };
    });

    toast.success("Module completed!", {
      description: selectedCourse.modules[moduleIndex].name,
    });
    setCurrentModule(null);

    // Check if course is now complete
    const completedAfter = selectedCourse.modules.filter(m => m.completed).length + 1;
    if (completedAfter === selectedCourse.modules.length) {
      toast.success("🎉 Course Completed!", {
        description: `You've finished ${selectedCourse.title}`,
      });
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Technical": return "text-primary bg-primary-light";
      case "Leadership": return "text-warning bg-warning-light";
      case "Soft Skills": return "text-success bg-success-light";
      default: return "text-muted-foreground bg-secondary";
    }
  };

  return (
    <div className="animate-fade-in">
      <PageBreadcrumb items={[{ label: "Post-Onboarding", to: "/" }, { label: "Continuous Learning" }]} />
      
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Continuous Learning</h1>
        <p className="text-muted-foreground">Expand your skills and knowledge</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="card-interactive p-4 text-center">
          <div className="icon-circle-primary mx-auto mb-2">
            <BookOpen className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-foreground">{courses.length}</p>
          <p className="text-sm text-muted-foreground">Available Courses</p>
        </div>
        <div className="card-interactive p-4 text-center">
          <div className="icon-circle-success mx-auto mb-2">
            <CheckCircle className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-foreground">{totalCompleted}</p>
          <p className="text-sm text-muted-foreground">Completed</p>
        </div>
        <div className="card-interactive p-4 text-center">
          <div className="icon-circle-warning mx-auto mb-2">
            <Play className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-foreground">{totalInProgress}</p>
          <p className="text-sm text-muted-foreground">In Progress</p>
        </div>
        <div className="card-interactive p-4 text-center">
          <div className="icon-circle-info mx-auto mb-2">
            <Trophy className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-foreground">{achievements.filter(a => a.earned).length}</p>
          <p className="text-sm text-muted-foreground">Achievements</p>
        </div>
      </div>

      {/* Learning Paths */}
      <div className="card-interactive p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="icon-circle-primary">
            <Target className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Learning Paths</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {learningPaths.map((path, i) => (
            <div key={i} className="p-4 rounded-xl border border-border hover:border-primary/30 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-foreground text-sm">{path.name}</h3>
                <span className="text-xs text-muted-foreground">{path.courses} courses</span>
              </div>
              <Progress value={path.progress} className="mb-2" />
              <span className="text-xs text-muted-foreground">{path.progress}% complete</span>
            </div>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {courses.map((course) => (
          <div key={course.id} className="card-interactive p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(course.category)}`}>
                  {course.category}
                </span>
                <h3 className="font-semibold text-foreground mt-2">{course.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">by {course.instructor}</p>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 text-warning fill-warning" />
                <span className="font-medium">{course.rating}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {course.duration}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {course.enrolled.toLocaleString()} enrolled
              </span>
            </div>
            
            <Progress value={course.progress} className="mb-3" />
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{course.progress}% complete</span>
              <Button 
                size="sm" 
                variant={course.progress === 100 ? "outline" : "default"}
                onClick={() => handleCourseAction(course)}
              >
                {course.progress === 100 ? "Review" : course.progress > 0 ? "Continue" : "Start"}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="card-interactive p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="icon-circle-warning">
            <Award className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Achievements</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`p-4 rounded-xl text-center transition-all ${
                achievement.earned 
                  ? 'bg-primary/10 border-2 border-primary/30' 
                  : 'bg-secondary/50 opacity-60'
              }`}
            >
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <h3 className="font-medium text-foreground text-sm">{achievement.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
              {achievement.earned && (
                <span className="inline-block mt-2 text-xs text-primary font-medium">✓ Earned</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Course Detail Dialog */}
      <Dialog open={showCourseDialog} onOpenChange={setShowCourseDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              {selectedCourse?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedCourse && (
            <div className="py-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span>by {selectedCourse.instructor}</span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  {selectedCourse.rating}
                </span>
                <span>{selectedCourse.duration}</span>
              </div>

              <Progress value={selectedCourse.progress} className="mb-4" />
              <p className="text-sm text-muted-foreground mb-4">
                {selectedCourse.progress}% complete • {selectedCourse.modules.filter(m => m.completed).length}/{selectedCourse.modules.length} modules
              </p>

              <h4 className="font-semibold text-foreground mb-3">Course Modules:</h4>
              <div className="space-y-2">
                {selectedCourse.modules.map((module, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg transition-colors ${
                      module.completed 
                        ? 'bg-success-light' 
                        : currentModule === index 
                          ? 'bg-primary/10 border border-primary/30' 
                          : 'bg-secondary/50 hover:bg-secondary cursor-pointer'
                    }`}
                    onClick={() => !module.completed && startModule(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {module.completed ? (
                          <CheckCircle className="w-5 h-5 text-success" />
                        ) : currentModule === index ? (
                          <Play className="w-5 h-5 text-primary animate-pulse" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                        )}
                        <div>
                          <p className={`text-sm font-medium ${module.completed ? 'text-success' : 'text-foreground'}`}>
                            {module.name}
                          </p>
                          <p className="text-xs text-muted-foreground">{module.duration}</p>
                        </div>
                      </div>
                      {currentModule === index && !module.completed && (
                        <Button size="sm" onClick={(e) => { e.stopPropagation(); completeModule(index); }}>
                          Complete
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};