package services

import (
	"io/ioutil"
	"log"
	"net/http"
)

func MakeCall(url string) []byte {
	log.Println("Making Rest Call")
	response, err := http.Get(url)
	var resp []byte
	if err != nil {
		log.Fatalf("Error making REST Call : %s\n", err)
	} else {
		resp, _ = ioutil.ReadAll(response.Body)
	}
	return resp
}
