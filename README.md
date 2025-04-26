# 📸 Stories Feature Project

This project is a **client-side stories feature**, inspired by Instagram, Snapchat, and other popular apps — built according to the [Roadmap.sh Stories Feature Project](https://roadmap.sh/projects/stories-feature) description.

---

## 🚀 Features

- Upload and display **stories** (images).
- **Stories automatically expire after 24 hours**.
- **Progress bar** while viewing a story.
- **Swipe left/right** or use **arrow buttons** to navigate between stories.
- **Tap to pause/resume** story timer.
- **Delete** a story manually before it expires.
- **Responsive design** for desktop, tablet, and mobile.
- **Image upload constrained to maximum dimensions** of **1080px width** and **1920px height** (with aspect ratio preserved).
- **LocalStorage** used for persistence (client-side only).

---

## 📋 How It Works

- When a user **uploads a story**, the image is resized to max **1080×1920** dimensions.
- The story is saved into `localStorage` along with a `createdAt` timestamp.
- When **viewing** stories:
  - A **progress bar** shows for each story.
  - After **3 seconds**, the next story automatically plays.
  - The user can **swipe left/right** (drag) to change stories manually.
- An **interval** checks every **60 seconds** and deletes expired stories automatically.

---

## ✨ Live Demo

(Deploy it using Vercel, Netlify, or any static hosting service and put the link here!)

---

## 🧑‍💻 How To Run Locally

1. Clone the repository:

```bash
git clone https://github.com/Ritiksh0h/stories-feature
cd stories-feature
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the local development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and go to `http://localhost:3000`.

---

## 📄 Requirements Met

✅ Use any frontend framework → **Next.js (React)**  
✅ Any libraries/tools allowed → **Framer Motion, TailwindCSS**  
✅ Client-side only → **Fully client-side** (localStorage)  
✅ Responsive → **Fully responsive**  
✅ Image constraint → **Max 1080px x 1920px on upload**  
✅ Stories expire after 24 hours → **Implemented**

---

## 📚 Resources

- [Roadmap.sh - Stories Feature Project](https://roadmap.sh/projects/stories-feature)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

---

## 🏆 License

This project is open-source.  
Feel free to fork, improve, and share!

---

# 🚀 Happy Coding!

---

Would you also like me to generate a **cooler version** (for example, adding badges like "Next.js", "Framer Motion", "Responsive", etc.) if you want to make it look even more fancy on GitHub? 🎖  
I can create that too if you want! 🔥  
Let me know!# stories-feature
