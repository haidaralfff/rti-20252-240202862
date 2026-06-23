package main

import (
	"log"
	"time"

	"gin-api/internal/config"
	"gin-api/internal/database"
	"gin-api/internal/handlers"
	"gin-api/internal/middleware"
	"gin-api/internal/services"

	"github.com/gin-gonic/gin"
)

func main() {
	cfg := config.Load()

	if err := database.Init(cfg.DatabaseURL); err != nil {
		log.Fatalf("Database init failed: %v", err)
	}
	defer database.Close()

	r := gin.New()
	gin.SetMode(gin.ReleaseMode)
	r.Use(gin.Recovery())
	r.Use(middleware.Logger())

	userService := services.NewUserService()
	userHandler := handlers.NewUserHandler(userService)

	api := r.Group("/api")
	{
		api.GET("/simple", userHandler.SimpleGet)
		api.GET("/users/stats", userHandler.GetStats)
		api.GET("/users/:id", userHandler.GetByID)
		api.POST("/users", userHandler.Create)
		api.PUT("/users/:id", userHandler.Update)
		api.DELETE("/users/:id", userHandler.Delete)
		api.GET("/users/invalid-id", func(c *gin.Context) {
			c.JSON(400, gin.H{"error": "Invalid ID format"})
		})
	}

	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok", "framework": "gin", "timestamp": time.Now().UTC().Format(time.RFC3339)})
	})

	if err := r.Run(":" + cfg.Port); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}
