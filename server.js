const express = require("express");
const { connectDB } = require("./config/db");
const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

// Initialize Express App
const app = express();

// Server Port
const PORT = process.env.PORT || 5000;



// Middleware
app.use(express.json());

// Connect to Database
(async () => {
  try {
    await connectDB();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit with failure
  }
})();

// Routes
app.use("/api/movies", movieRoutes);
app.use("/api/users", userRoutes);

// Error Handling Middleware
app.use(errorMiddleware);

// Start Server
app.listen(PORT, () =>
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
);

//Debugging Information
console.log("Current working directory:", process.cwd());
console.log("Process ID:", process.pid);
console.log("Process Uptime (seconds):", process.uptime());
console.log("Process Memory Usage (MB):", process.memoryUsage().rss / 1024 / 1024);



