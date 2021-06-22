package helpers

import (
	"encoding/json"
	"log"

	"knowyourgit/models"
	"knowyourgit/services"
)

var (
	repoArray []models.RepoData
)

func FetchRepos(username string) []models.RepoData {
	reqUrl := "https://api.github.com/users/" + username + "/repos"
	response := services.MakeCall(reqUrl)
	if err := json.Unmarshal(response, &repoArray); err != nil {
		log.Fatalf("Unmarshal Error: %s\n", err)
	}
	return repoArray
}

func languageList(username string, repoData []models.RepoData) {

}
