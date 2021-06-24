package models

type HealthCheckResponse struct {
	Message string
	Status  int
}
type RepoData struct {
	Name string `json:"name"`
}

type LanguageData struct {
	Name  string
	Bytes int
}
