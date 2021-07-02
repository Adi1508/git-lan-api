package handlers

import (
	"encoding/json"
	"net/http"

	"knowyourgit/api/helpers"
	"knowyourgit/models"
)

var (
	healthCheckResponse models.HealthCheckResponse
)

func HealthCheck(w http.ResponseWriter, r *http.Request) {
	healthCheckResponse.Message = "Server is up and running"
	healthCheckResponse.Status = http.StatusOK
	json.NewEncoder(w).Encode(healthCheckResponse)
}

func GetData(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query()
	username := query["username"][0]
	token := r.Header.Get("token")
	reposList := helpers.FetchRepos(username, token)
	languageList := helpers.LanguageData(username, reposList, token)
	json.NewEncoder(w).Encode(languageList)
}
