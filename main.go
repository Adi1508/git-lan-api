package main

import (
	"context"
	"embed"
	"io/fs"
	"log"
	"net/http"
	"os"
	"os/signal"
	"path"
	"strings"
	"syscall"
	"time"

	"knowyourgit/api/handlers"
)

//go:embed client/build
var content embed.FS

func main() {
	log.Println("Starting up the App Server!")

	mux := http.NewServeMux()
	mux.HandleFunc("/", rootHandler)
	mux.HandleFunc("/api/v1/healthCheck", handlers.HealthCheck)
	mux.HandleFunc("/api/v1/getData", handlers.GetData)

	srv := &http.Server{
		Handler:      mux,
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

func rootHandler(w http.ResponseWriter, r *http.Request) {
	upath := r.URL.Path
	if !strings.HasPrefix(upath, "/") {
		upath = "/" + upath
		r.URL.Path = upath
	}
	upath = path.Clean(upath)
	fsys := fs.FS(content)
	contentStatic, _ := fs.Sub(fsys, "client/build")
	if _, err := contentStatic.Open(strings.TrimLeft(upath, "/")); err != nil {
		r.URL.Path = "/"
	}
	http.FileServer(http.FS(contentStatic)).ServeHTTP(w, r)
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
