package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
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

	r.POST("/send-contact", func(c *gin.Context) {
		url := "https://api.telegram.org/bot1030360985:AAFHslArEnqselI_DtJj7T87OBwt9l5IZgI/sendMessage"
		method := "POST"
		name := c.DefaultPostForm("name", "noname")
		email := c.DefaultPostForm("email", "noemail")
		phohe := c.DefaultPostForm("phohe", "nophohe")
		text := c.DefaultPostForm("text", "notext")
		payload := strings.NewReader(fmt.Sprintf(`{
			"chat_id": "-646808773",
			"text": "%s\n%s\n%s\n%s"
		}`, name, email, phohe, text))

		client := &http.Client {}
		req, err := http.NewRequest(method, url, payload)

		if err != nil {
			fmt.Println(err)
			return
		}
		req.Header.Add("Content-Type", "application/json")

		res, err := client.Do(req)
		if err != nil {
			fmt.Println(err)
		}
		defer res.Body.Close()
		c.JSON(http.StatusOK, gin.H{"success": true})
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
