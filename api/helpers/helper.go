package helpers

import (
	"encoding/json"
	"log"

	"knowyourgit/models"
	"knowyourgit/services"
)

var (
	repoArray    []models.RepoData
	languageList []models.LanguageData
)

func FetchRepos(username string) []models.RepoData {
	reqUrl := "https://api.github.com/users/" + username + "/repos"
	response := services.MakeCall(reqUrl)
	if err := json.Unmarshal(response, &repoArray); err != nil {
		log.Fatalf("Unmarshal Error: %s\n", err)
	}
	return repoArray
}

func LanguageData(username string, repoData []models.RepoData) string {

	// WIP
	for _, value := range repoData {
		data := make(chan []byte)
		targetURL := "https://api.github.com/repos/" + username + "/" + value.Name + "/languages"
		go process(data, targetURL)
		response := <-data
		var lanObj models.LanguageData
		if err := json.Unmarshal(response, &lanObj); err != nil {
			log.Fatalf("Error during unmarshal response: %s\n", err)
		}
		languageList = append(languageList, lanObj)
	}
	log.Println(languageList)
	return "WIP"
}

func process(data chan<- []byte, targetURL string) {
	response := services.MakeCall(targetURL)
	data <- response
}
