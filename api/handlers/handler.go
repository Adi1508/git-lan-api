package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"knowyourgit/api/helpers"
	"knowyourgit/models"

	"github.com/gorilla/mux"
)

var (
	healthCheckResponse models.HealthCheckResponse
)

func HealthCheck(w http.ResponseWriter, r *http.Request) {
	log.Printf("Invoking Health Checks : %s\n", r.URL.Path)
	healthCheckResponse.Message = "Server is up and running"
	healthCheckResponse.Status = http.StatusOK
	json.NewEncoder(w).Encode(healthCheckResponse)
}

func GetData(w http.ResponseWriter, r *http.Request) {
	start := time.Now()
	params := mux.Vars(r)
	username := params["username"]
	token := params["token"]
	reposList := helpers.FetchRepos(username, token)
	languageList := helpers.LanguageData(username, reposList, token)
	log.Printf("Request Complete in : %v\n", time.Since(start))
	json.NewEncoder(w).Encode(languageList)
}
