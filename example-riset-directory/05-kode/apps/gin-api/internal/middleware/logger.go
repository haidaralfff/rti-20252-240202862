package middleware

import (
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

func Logger() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		c.Next()
		duration := time.Since(start)
		gin.DefaultWriter.Write([]byte(
			time.Now().Format(time.RFC3339) + " " +
				c.Request.Method + " " + c.Request.URL.Path + " " +
				strconv.Itoa(c.Writer.Status()) + " " + duration.String() + "\n",
		))
	}
}
