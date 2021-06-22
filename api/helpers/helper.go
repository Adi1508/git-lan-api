package helpers

import (
	"encoding/json"
	"fmt"
	"log"

	"knowyourgit/models"
	"knowyourgit/services"
)

var (
	repoArray []models.RepoData
)

func FetchRepos(username string) string {
	reqUrl := "https://api.github.com/users/" + username + "/repos"
	response := services.MakeCall(reqUrl)
	if err := json.Unmarshal(response, &repoArray); err != nil {
		log.Fatalf("Unmarshal Error: %s\n", err)
	}
	for _, value := range repoArray {
		log.Println(value.Name)
		break
	}

	return fmt.Sprintf("hello")
}
