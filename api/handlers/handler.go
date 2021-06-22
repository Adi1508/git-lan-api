package handlers

import (
	"encoding/json"
	"log"
	"net/http"

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

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	log.Printf("loading home: %s\n", r.URL.Path)
}

func GetData(w http.ResponseWriter, r *http.Request) {
	log.Printf("Invoking : %s\n", r.URL.Path)
	params := mux.Vars(r)
	username := params["username"]
	reposList := helpers.FetchRepos(username)
	log.Println(reposList)
}
