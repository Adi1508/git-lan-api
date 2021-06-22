package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"knowyourgit/api/handlers"

	"github.com/gorilla/mux"
)

func main() {
	log.Println("Starting up the App Server!")

	// TODO : Add Schemes (http, https)

	r := mux.NewRouter()
	apiRouterV1 := r.PathPrefix("/api/v1").Subrouter()
	apiRouterV1.HandleFunc("/healthCheck", handlers.HealthCheck).Methods("GET")
	apiRouterV1.HandleFunc("/getData/{username}", handlers.GetData).Methods("GET")
	homeRouter := r.PathPrefix("/home").Subrouter()
	homeRouter.HandleFunc("/", handlers.HomeHandler).Methods("GET")

	srv := &http.Server{
		Handler:      r,
		Addr:         ":9090",
		ReadTimeout:  20 * time.Second,
		WriteTimeout: 20 * time.Second,
	}

	go func() {
		log.Println("Server Started")
		if err := srv.ListenAndServe(); err != nil {
			log.Fatalln(err)
		}
	}()

	waitForShutDown(srv)
}

func waitForShutDown(srv *http.Server) {
	interruptChan := make(chan os.Signal, 1)
	signal.Notify(interruptChan, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)
	<-interruptChan
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()
	srv.Shutdown(ctx)
	log.Println("Shutting Down")
	os.Exit(0)
}
