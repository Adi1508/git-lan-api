package helpers

import (
	"encoding/json"
	"log"
	"sync"

	"knowyourgit/models"
	"knowyourgit/services"
)

var (
	repoArray    []models.RepoData
	languageList []map[string]interface{}
	wg           sync.WaitGroup
)

func FetchRepos(username string, token string) []models.RepoData {
	reqUrl := "https://api.github.com/users/" + username + "/repos"
	response := services.MakeCall(reqUrl, token)
	if err := json.Unmarshal(response, &repoArray); err != nil {
		log.Fatalf("Unmarshal Error: %s\n", err)
	}
	return repoArray
}

func LanguageData(username string, repoData []models.RepoData, token string) []map[string]interface{} {
	for _, value := range repoData {
		wg.Add(1)
		targetURL := "https://api.github.com/repos/" + username + "/" + value.Name + "/languages"
		go process(&wg, targetURL, token)
	}
	wg.Wait()
	return languageList
}

func process(wg *sync.WaitGroup, targetURL string, token string) {
	response := services.MakeCall(targetURL, token)
	var lanObj map[string]interface{}
	if err := json.Unmarshal(response, &lanObj); err != nil {
		log.Fatalf("Error during unmarshal response: %s\n", err)
	}
	languageList = append(languageList, lanObj)
	wg.Done()
}
