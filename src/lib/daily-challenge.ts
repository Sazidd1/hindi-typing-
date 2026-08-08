import { Lesson, lessons } from "@/lib/typing-data";

function getTodayString() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

// Simple seeded random to keep challenges consistent if we need to regenerate
function seedRandom(seed: number) {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function shuffle<T>(array: T[], seedStr: string): T[] {
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) seed += seedStr.charCodeAt(i);
  
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seedRandom(seed++) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateDailyChallenge(userId: string, progressData: Record<string, any>): Lesson {
  const today = getTodayString();
  const cacheKey = `daily_challenge_${userId}`;
  
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed.date === today && parsed.challenge) {
        return parsed.challenge;
      }
    }
  } catch (e) {
    // ignore
  }

  // 1. Determine unlocked lessons and characters
  let previousLessonCompleted = true;
  let highestUnlockedIndex = 0;
  const unlockedKeys = new Set<string>();
  const unlockedWords = new Set<string>();

  for (let i = 0; i < lessons.length; i++) {
    const l = lessons[i];
    if (!previousLessonCompleted) break;
    
    highestUnlockedIndex = i;
    
    // Add keys (ignore spaces)
    if (l.keys) {
      for (const char of l.keys.replace(/\s+/g, '')) {
        unlockedKeys.add(char);
      }
    }
    
    // Add words
    if (l.text) {
      const words = l.text.split(/\s+/).filter(w => w.length > 0);
      words.forEach(w => unlockedWords.add(w));
    }

    const state = progressData[l.slug] || {};
    previousLessonCompleted = !!state.completed;
  }

  // Fallback if no lessons are unlocked (shouldn't happen since first is always unlocked)
  if (unlockedWords.size === 0) {
    unlockedWords.add("रिरि");
    unlockedWords.add("िििि");
  }

  // 2. Identify weak characters from recent valid sessions
  const charMistakes: Record<string, number> = {};
  try {
    const resultsStr = localStorage.getItem(`results_${userId}`);
    if (resultsStr) {
      const results = JSON.parse(resultsStr);
      // Take up to 5 most recent sessions
      const recent = results.slice(0, 5);
      for (const res of recent) {
        if (res.charMistakes) {
          for (const [char, count] of Object.entries(res.charMistakes)) {
            // Only consider mistakes for characters the user has actually unlocked
            if (unlockedKeys.has(char) || Array.from(unlockedWords).some(w => w.includes(char))) {
              charMistakes[char] = (charMistakes[char] || 0) + (count as number);
            }
          }
        }
      }
    }
  } catch (e) {}

  // Sort weaknesses
  const sortedWeaknesses = Object.entries(charMistakes)
    .sort((a, b) => b[1] - a[1])
    .filter(([_, count]) => count > 1) // Must have more than 1 mistake to be considered a weakness
    .map(([char]) => char);
    
  const topWeaknesses = sortedWeaknesses.slice(0, 3);

  // 3. Generate Practice Text
  let practiceWords: string[] = [];
  let challengeTitle = "Daily Challenge";
  let challengeDesc = "Mixed Practice";

  if (topWeaknesses.length > 0) {
    challengeDesc = `Focus on: ${topWeaknesses.join(', ')}`;
    // Find words containing the weak characters
    const focusWords = Array.from(unlockedWords).filter(word => 
      topWeaknesses.some(weakChar => word.includes(weakChar))
    );
    
    if (focusWords.length >= 5) {
      // Use words that contain weak characters
      let pool = focusWords;
      // Add some random words to balance
      pool = pool.concat(Array.from(unlockedWords).slice(0, 10));
      
      const shuffled = shuffle(pool, today + userId);
      // Generate a reasonable length text (around 25-35 words)
      while (practiceWords.length < 30 && shuffled.length > 0) {
        practiceWords.push(shuffled[practiceWords.length % shuffled.length]);
        if (practiceWords.length >= 30) break;
      }
    } else {
      // Not enough words with weak characters, generate some character drills
      const drillWords = [];
      for (let i = 0; i < 30; i++) {
        let word = "";
        for (let j = 0; j < 4; j++) {
          // Mix weak characters with other unlocked keys
          const pickWeak = Math.random() > 0.5;
          if (pickWeak && topWeaknesses.length > 0) {
            word += topWeaknesses[i % topWeaknesses.length];
          } else {
            const arrKeys = Array.from(unlockedKeys);
            word += arrKeys[Math.floor(Math.random() * arrKeys.length)] || 'र';
          }
        }
        drillWords.push(word);
      }
      practiceWords = drillWords;
    }
  } else {
    // No specific weaknesses, general practice
    const shuffled = shuffle(Array.from(unlockedWords), today + userId);
    for (let i = 0; i < 30; i++) {
      practiceWords.push(shuffled[i % shuffled.length]);
    }
  }

  const finalLevel = highestUnlockedIndex < 11 ? "शुरुआती" : highestUnlockedIndex < 21 ? "मध्यम" : "उन्नत";

  const challenge: Lesson = {
    slug: 'daily-challenge',
    title: challengeTitle,
    hindiTitle: 'दैनिक चुनौती',
    description: challengeDesc,
    level: finalLevel,
    keys: topWeaknesses.length > 0 ? topWeaknesses.join(' ') : 'Unlocked Keys',
    minutes: 3,
    text: practiceWords.join(' ')
  };

  // Save for today
  try {
    localStorage.setItem(cacheKey, JSON.stringify({
      date: today,
      challenge
    }));
  } catch(e) {}

  return challenge;
}
