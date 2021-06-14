package handlers

import (
	"log"
	"net/http"
)

func HealthCheck(w http.ResponseWriter, r *http.Request) {
	log.Printf("Invoking Health Checks : %s\n", r.URL.Path)
	w.WriteHeader(http.StatusOK)
}

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	log.Printf("loading home: %s\n", r.URL.Path)
}
