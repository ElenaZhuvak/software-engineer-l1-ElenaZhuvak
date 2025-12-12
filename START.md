# 🚀 Ready to Start?

## IMPORTANT: Your Timer Starts When You Run `npm install`

When you run `npm install`, a timestamp file will be **automatically created and committed** to mark your official start time. This ensures fair timing for all candidates.

## Steps to Begin

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd software-engineer-l1-<your-username>
   ```

2. **Read the requirements first** (recommended - understand what you're building)
   - Review `README.md`
   - Check `design/reference.md` for design specs
   - Look at `data.json` to understand the data structure

3. **When you're ready to start the 2-hour timer:**
   ```bash
   npm install
   ```

   This will:
   - Install dependencies
   - **Automatically create `.assessment-start-time` file**
   - **Auto-commit this file to git**
   - ⏰ **START YOUR 2-HOUR TIMER**

4. **Push the timestamp commit immediately:**
   ```bash
   git push
   ```

5. **Start coding:**
   ```bash
   npm run dev
   ```

## Why This System?

The timestamp is created automatically when you first run `npm install` - you can't game the system by doing work before committing. The GitHub Actions workflow checks that your work was completed within 2 hours of this timestamp.

**Good luck!** 🎯
