package handlers

import (
	"encoding/json"
	"net/http"

	"knowyourgit/api/helpers"
	"knowyourgit/models"

	"github.com/gin-gonic/gin"
)

var (
	healthCheckResponse models.HealthCheckResponse
)

func HealthCheck(c *gin.Context) {
	healthCheckResponse.Message = "Server is up and running"
	healthCheckResponse.Status = http.StatusOK
	json.NewEncoder(c.Writer).Encode(healthCheckResponse)
}

func GetData(c *gin.Context) {
	username := c.Query("username")
	token := c.Request.Header.Get("token")
	reposList := helpers.FetchRepos(username, token)
	languageList := helpers.LanguageData(username, reposList, token)
	json.NewEncoder(c.Writer).Encode(languageList)
}
