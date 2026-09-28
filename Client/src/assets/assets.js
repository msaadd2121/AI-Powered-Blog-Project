import React from "react";
import blog1 from "./blog1.jpg";
import blog2 from "./blog2.jpg";
import blog3 from "./blog3.jpg";
import blog4 from "./blog4.jpg";

export const blog_data = [
  {
    _id: 1,
    title: "A detailed step by step guide to manage your lifestyle",
    description:
      "A simple guide to managing your lifestyle and building better daily habits.",
    image: blog1,
    category: "Lifestyle",
    Content: `
# The Future of Artificial Intelligence

Artificial intelligence is rapidly becoming a part of everyday life. From smart assistants and recommendation systems to advanced business tools, AI is helping people solve problems faster and make better decisions.

## 1. AI in Everyday Life

Many of the applications we use every day already depend on artificial intelligence. Search engines, navigation apps, online shopping platforms, and streaming services use AI to understand user behavior and provide personalized experiences.

## 2. AI and Businesses

Businesses are using AI to automate repetitive tasks, analyze large amounts of data, and improve customer experiences. These tools can help organizations save time and focus more on creative and strategic work.

## 3. The Future of Work

As AI continues to develop, the workplace is also changing. Some routine tasks may become automated, while new roles and opportunities can emerge around managing, developing, and working alongside AI systems.

## 4. Using AI Responsibly

AI can be powerful, but it also comes with challenges. Privacy, security, accuracy, and responsible use are important considerations when developing and using intelligent systems.

## Final Thoughts

Artificial intelligence will continue to influence technology and society. Understanding how these tools work and learning how to use them responsibly can help people make better use of the opportunities they provide.
`,
    createdAt: "2026-09-18T10:30:00.000Z",
  },
  {
    _id: 2,
    title: "The future of artificial intelligence",
    description:
      "Explore how artificial intelligence is changing our daily lives.",
    image: blog2,
    category: "Technology",
    createdAt: "2026-09-18T10:30:00.000Z",
  },
  {
    _id: 3,
    title: "How to build a successful startup",
    description:
      "Important things every new entrepreneur should know before starting.",
    image: blog3,
    category: "Startup",
    Content: `
# A Simple Step-by-Step Guide to Managing Your Lifestyle

If you're looking to improve your health, boost productivity, and create a balanced life, managing your lifestyle intentionally is key. Here's a short guide to help you take control of your daily habits and overall well-being.

## 1. Assess Your Current Lifestyle

Track your habits for a week. Note your energy levels, sleep, diet, and daily routines. Reflect on what’s working and what needs change.

## 2. Focus on Health

Eat balanced meals, stay hydrated, get enough sleep, and move your body daily. Mental health matters too—set boundaries and practice mindfulness.

## 3. Set Clear Goals

Break your goals into categories like health, career, and relationships. Make them specific and achievable.

## 4. Create Daily Routines

Establish morning and evening routines. Plan your days and weeks with intention using a planner or digital calendar.

## 5. Manage Time Wisely

Prioritize important tasks, limit distractions, and take regular breaks. Learn to say no when needed.

## 6. Handle Finances Smartly

Track your spending, set a budget, save regularly, and build financial literacy. Financial stability supports overall peace of mind.

## 7. Build Strong Relationships

Surround yourself with supportive people. Communicate openly and maintain healthy boundaries.

## 8. Keep Learning

Read, take online courses, or explore new hobbies. Personal growth keeps life fulfilling and dynamic.

## 9. Declutter Regularly

Simplify your physical and digital spaces. Clear surroundings help reduce stress and increase focus.

## 10. Celebrate Small Wins

Track your progress, reflect often, and reward yourself for sticking to positive habits. Consistency is more important than perfection.

**Final Tip**: Start small, stay consistent, and review your lifestyle regularly. With steady effort, a well-managed life becomes a natural way of living.
`,
    createdAt: "2026-09-18T10:30:00.000Z",
  },
  {
    _id: 4,
    title: "Simple ways to manage your finances",
    description:
      "Easy financial habits that can help you save and manage your money.",
    image: blog4,
    category: "Finance",
    createdAt: "2026-09-18T10:30:00.000Z",
  },
  {
    _id: 5,
    title: "Simple ways to manage your finances",
    description:
      "Easy financial habits that can help you save and manage your money.",
    image: blog4,
    category: "Finance",
    createdAt: "2026-09-18T10:30:00.000Z",
  },
  {
    _id: 6,
    title: "Simple ways to manage your finances",
    description:
      "Easy financial habits that can help you save and manage your money.",
    image: blog4,
    category: "Finance",
  },
];
export const comments_data = [
  {
    _id: 1,
    blog: 1,
    name: "Saad",
    comment: "Honestly, I did not expect this to work, but it totally did. Saved my project!",
    createdAt: "2025-05-28T10:30:00.000Z",
    isApproved: true,
  },
  {
    _id: 2,
    blog: 1,
    name: "Asad",
    comment: "Hi this blog is must to read",
    createdAt: "2025-05-28T12:00:00.000Z",
    isApproved: false,

  },
  {
    _id: 3,
    blog: 3,
    name: "Faizan",
    comment: "Very informative and easy to understand.",
    createdAt: "2026-05-29T09:15:00.000Z",
    isApproved: true,
  },
   {
    _id: 4,
    blog: 1,
    name: "Faizan",
    comment: "Very informative and easy to understand.",
    createdAt: "2026-05-29T09:15:00.000Z",
    isApproved: true,
  },
];
export const dashboard_data = {
  blogs: 12,
  comments: 24,
  drafts: 3,
};
