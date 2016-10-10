package updateandroid

import (
	"encoding/xml"
	"log"
	"net/http"
	"os"
)

var googleRepositoryVersion = "12"
var googleBaseURL = "https://dl.google.com/android/repository/"
var googleRepositoryURL = googleBaseURL + "repository-" + googleRepositoryVersion + " .xml"
var googleAddonsListURL = googleBaseURL + "addons_list-2.xml"

// AddonsLists is an XML structure of a Android SDK addon list
type AddonsLists struct {
	XMLName    xml.Name      `xml:"http://schemas.android.com/sdk/android/addons-list/2 sdk-addons-list"`
	AddonSite  []*addonSite  `xml:"http://schemas.android.com/sdk/android/addons-list/2 sdk-addon-site"`
	SysImgSite []*sysImgSite `xml:"http://schemas.android.com/sdk/android/addons-list/2 sys-img-site"`
}

type addonSite struct {
	Name string `xml:"http://schemas.android.com/sdk/android/addons-list/2 name"`
	URL  string `xml:"http://schemas.android.com/sdk/android/addons-list/2 url"`
}

type sysImgSite struct {
	Name string `xml:"http://schemas.android.com/sdk/android/addons-list/2 name"`
	URL  string `xml:"http://schemas.android.com/sdk/android/addons-list/2 url"`
}

//        <sdk:name>Google Inc.</sdk:name>
//        <sdk:url>addon.xml</sdk:url>

// AddonsListURL retuns the Android SDK Addons List URL
func AddonsListURL() string {
	return googleAddonsListURL
}

// Init does stuff
func Init() ([]AddonsLists, error) {
	var q []AddonsLists

	response, err := http.Get(AddonsListURL())
	if err != nil {
		return nil, err
	}
	defer response.Body.Close()

	xmlFile := response.Body
	if err := xml.NewDecoder(xmlFile).Decode(&q); err != nil {
		log.Fatal(err)
		os.Exit(1)
	}

	return q, nil
	// Display The first strap
	//fmt.Printf("%#v\n", q)
	//fmt.Printf("Key: %s  Value: %s", q[0].Key, q[0].Value)
}
