package services

import (
	"io/ioutil"
	"log"
	"net/http"
	"time"
)

func MakeCall(url string, token string) []byte {
	client := &http.Client{
		Timeout: time.Second * 10,
	}
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Fatalf("Error Generating new Request : %s\n", err)
	}
	req.Header.Set("Authorization", "token "+token)
	response, err := client.Do(req)
	var resp []byte
	if err != nil {
		log.Fatalf("Error making REST Call : %s\n", err)
	} else {
		resp, _ = ioutil.ReadAll(response.Body)
	}
	return resp
}
