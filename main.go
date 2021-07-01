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

	"github.com/gin-gonic/gin"
)

//go:embed client/build
var content embed.FS

func main() {
	log.Println("Starting up the App Server!")

	router := gin.Default()
	router.GET("/api/v1/healthCheck", handlers.HealthCheck)
	router.GET("api/v1/getData", handlers.GetData)
	router.GET("/home/*action", rootHandler)

	srv := &http.Server{
		Handler:      router,
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

func rootHandler(c *gin.Context) {
	log.Println("Serving Content")
	upath := c.Request.URL.Path
	if !strings.HasPrefix(upath, "/") {
		upath = "/" + upath
		c.Request.URL.Path = upath
	}
	upath = path.Clean(upath)
	fsys := fs.FS(content)
	contentStatic, _ := fs.Sub(fsys, "client/build")
	if _, err := contentStatic.Open(strings.Replace(upath, "/home", "", -1)); err != nil {
		c.Request.URL.Path = "/"
	}
	http.FileServer(http.FS(contentStatic)).ServeHTTP(c.Writer, c.Request)
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
