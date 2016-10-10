package updateandroid

var googleRepositoryVersion = "12"
var googleBaseUrl = "https://dl.google.com/android/repository/"
var googleRepositoryUrl = googleBaseUrl + "repository-" + googleRepositoryVersion + " .xml"
var googleAddonsListUrl = googleBaseUrl + "addons_list-2.xml"

func AddonsListUrl() string {
	return googleAddonsListUrl
}
