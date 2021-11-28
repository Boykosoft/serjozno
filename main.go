package main

import (
	"context"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
	"github.com/gin-gonic/gin"
	"log"
)

func main() {

	type Test struct {
		ID string `uri:"id" binding:"required,number"`
	}

	r := gin.Default()
	cfg, err := config.LoadDefaultConfig(context.TODO(),
		config.WithRegion("eu-central-1"),
	)
	if err != nil {
		log.Fatalf("unable to load SDK config, %v", err)
	}

	// Using the Config value, create the DynamoDB client
	svc := dynamodb.NewFromConfig(cfg)
	tableName := "Tests"

	r.GET("/tests", func(c *gin.Context) {
		resp, err := svc.Scan(context.TODO(), &dynamodb.ScanInput{
			TableName: &tableName,
		})
		if err != nil {
			c.JSON(500, gin.H{
				"error": err.Error(),
				"data": nil,
			})
		} else {
			c.JSON(200, gin.H{
				"error": nil,
				"data": resp.Items,
			})
		}
	})

	r.GET("/tests/:id", func(c *gin.Context) {
		// Build the request with its input parameters
		var test Test
		if err := c.ShouldBindUri(&test); err != nil {
			c.JSON(400, gin.H{
				"error": err.Error(),
				"data": nil,
			})
			return
		}
		resp, err := svc.GetItem(context.TODO(), &dynamodb.GetItemInput{
			TableName: &tableName,
			Key: map[string]types.AttributeValue{
				"id": &types.AttributeValueMemberN{
					Value: test.ID,
				},
			},
		})
		if err != nil {
			c.JSON(500, gin.H{
				"error": err.Error(),
				"data": nil,
			})
		} else {
			c.JSON(200, gin.H{
				"error": nil,
				"data": resp.Item,
			})
		}
	})

	r.Run(":80")
}
