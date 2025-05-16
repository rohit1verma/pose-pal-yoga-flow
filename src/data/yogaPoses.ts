import { YogaPose } from "@/types/yoga";

// Expanded yoga poses data based on Kaggle dataset
export const yogaPoses: YogaPose[] = [
  {
    id: 1,
    name: "Mountain Pose",
    sanskritName: "Tadasana",
    difficulty: "beginner",
    benefits: ["Improves posture", "Strengthens thighs", "Steadies breathing"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1770&auto=format&fit=crop",
    description: "The foundation of all standing poses, Mountain Pose helps improve posture, balance, and calm focus."
  },
  {
    id: 2,
    name: "Tree Pose",
    sanskritName: "Vrikshasana",
    difficulty: "beginner",
    benefits: ["Improves balance", "Strengthens legs", "Calms mind"],
    imageUrl: "https://images.unsplash.com/photo-1566501206188-5dd0cf160a0e?q=80&w=1887&auto=format&fit=crop",
    description: "A balancing pose that strengthens your legs and core while improving your focus and concentration."
  },
  {
    id: 3,
    name: "Warrior II",
    sanskritName: "Virabhadrasana II",
    difficulty: "intermediate",
    benefits: ["Opens hips", "Builds stamina", "Strengthens legs"],
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=1964&auto=format&fit=crop",
    description: "A powerful standing pose that builds strength and stamina in the legs and opens the hips and chest."
  },
  {
    id: 4,
    name: "Downward-Facing Dog",
    sanskritName: "Adho Mukha Svanasana",
    difficulty: "beginner",
    benefits: ["Strengthens arms", "Stretches hamstrings", "Energizes body"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1820&auto=format&fit=crop",
    description: "An energizing pose that stretches the hamstrings, shoulders and calves while strengthening the arms and legs."
  },
  {
    id: 5,
    name: "Chair Pose",
    sanskritName: "Utkatasana",
    difficulty: "intermediate",
    benefits: ["Strengthens legs", "Tones core", "Improves balance"],
    imageUrl: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1170&auto=format&fit=crop",
    description: "A powerful pose that strengthens the thighs, calves, and spine while challenging your balance and endurance."
  },
  {
    id: 6,
    name: "Cobra Pose",
    sanskritName: "Bhujangasana",
    difficulty: "beginner",
    benefits: ["Strengthens spine", "Opens chest", "Improves posture"],
    imageUrl: "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?q=80&w=1770&auto=format&fit=crop",
    description: "A gentle backbend that opens the chest and strengthens the spine while stretching the shoulders and abdomen."
  },
  {
    id: 7,
    name: "Warrior I",
    sanskritName: "Virabhadrasana I",
    difficulty: "intermediate",
    benefits: ["Strengthens shoulders", "Stretches groins", "Opens chest and lungs"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1820&auto=format&fit=crop",
    description: "A standing pose that strengthens the legs and opens the hips, chest, and lungs."
  },
  {
    id: 8,
    name: "Triangle Pose",
    sanskritName: "Trikonasana",
    difficulty: "intermediate",
    benefits: ["Stretches legs", "Reduces stress", "Improves digestion"],
    imageUrl: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?q=80&w=1887&auto=format&fit=crop",
    description: "A standing pose that stretches and strengthens the legs, opens the hips, and stretches the sides of the torso."
  },
  {
    id: 9,
    name: "Plank Pose",
    sanskritName: "Phalakasana",
    difficulty: "beginner",
    benefits: ["Builds core strength", "Tones arms", "Improves posture"],
    imageUrl: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?q=80&w=1887&auto=format&fit=crop",
    description: "A pose that strengthens the arms, wrists, and spine while toning the abdomen."
  },
  {
    id: 10,
    name: "Child's Pose",
    sanskritName: "Balasana",
    difficulty: "beginner",
    benefits: ["Relaxes back muscles", "Calms mind", "Relieves stress"],
    imageUrl: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?q=80&w=1887&auto=format&fit=crop",
    description: "A resting pose that gently stretches the hips, thighs, and ankles while calming the brain and relieving stress."
  },
  {
    id: 11,
    name: "Bridge Pose",
    sanskritName: "Setu Bandha Sarvangasana",
    difficulty: "intermediate",
    benefits: ["Opens chest", "Strengthens back", "Reduces anxiety"],
    imageUrl: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?q=80&w=1887&auto=format&fit=crop",
    description: "A backbend that stretches the chest, neck, and spine while strengthening the back, buttocks, and hamstrings."
  },
  {
    id: 12,
    name: "Corpse Pose",
    sanskritName: "Savasana",
    difficulty: "beginner",
    benefits: ["Deep relaxation", "Calms nervous system", "Reduces blood pressure"],
    imageUrl: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?q=80&w=1887&auto=format&fit=crop",
    description: "A pose of total relaxation, allowing the body and mind to rest and rejuvenate."
  }
];

// Helper functions for filtering and searching poses
export const getPosesByDifficulty = (difficulty: "beginner" | "intermediate" | "advanced"): YogaPose[] => {
  return yogaPoses.filter(pose => pose.difficulty === difficulty);
};

export const searchPoses = (query: string): YogaPose[] => {
  const lowercaseQuery = query.toLowerCase();
  return yogaPoses.filter(pose => 
    pose.name.toLowerCase().includes(lowercaseQuery) || 
    pose.sanskritName.toLowerCase().includes(lowercaseQuery)
  );
};
