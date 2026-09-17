export function formatLessonTitle(title?: string, subtitle?: string): string {
  if (!title) return subtitle || "";
  if (!subtitle) return title;
  
  // Clean up any trailing parentheses from title and subtitle
  let cleanTitle = title.replace(/\s*\(\s*.*\s*\)\s*$/, "").trim();
  let cleanSubtitle = subtitle.replace(/\s*\(\s*.*\s*\)\s*$/, "").trim();

  // If title already starts with or includes subtitle (e.g. "Home Row: d k" and "Home Row")
  if (cleanTitle.toLowerCase().includes(cleanSubtitle.toLowerCase())) {
    return cleanTitle;
  }
  
  // If subtitle already includes title
  if (cleanSubtitle.toLowerCase().includes(cleanTitle.toLowerCase())) {
    return cleanSubtitle;
  }

  // Determine which is the group and which is the topic.
  // Generally, if title has "Lesson" it's the group, otherwise subtitle is usually the group (e.g., "Home Row").
  if (cleanTitle.toLowerCase().startsWith("lesson") && !cleanSubtitle.toLowerCase().startsWith("lesson")) {
      return `${cleanTitle}: ${cleanSubtitle}`;
  }
  
  return `${cleanSubtitle}: ${cleanTitle}`;
}
