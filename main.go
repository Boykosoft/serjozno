package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {

	type Test struct {
		ID string `uri:"id" binding:"required,number"`
	}

	r := gin.Default()
	r.Use(CORSMiddleware())
	r.Use(gin.Recovery())
	r.LoadHTMLFiles("index.html", "faq.html", "contacts.html")
	r.Static("/style", "./style")
	r.Static("/images", "./images")
	r.Static("/App", "./App")

	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{
			"title": "Serjozno",
		})
	})

	r.GET("/faq", func(c *gin.Context) {
		c.HTML(http.StatusOK, "faq.html", gin.H{
			"title": "FAQ",
		})
	})

	r.GET("/contacts", func(c *gin.Context) {
		c.HTML(http.StatusOK, "contacts.html", gin.H{
			"title": "Contacts",
		})
	})

	r.Run(":80")
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
