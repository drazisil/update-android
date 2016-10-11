package updateandroid

import (
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"net/http"
)

var googleRepositoryVersion = "12"
var googleBaseURL = "https://dl.google.com/android/repository/"
var googleRepositoryURL = googleBaseURL + "repository-" + googleRepositoryVersion + " .xml"
var googleAddonsListFile = "addons_list-2.xml"

// AddonsList is an XML structure of a Android SDK addon list
type AddonsList struct {
	XMLName    xml.Name     `xml:"http://schemas.android.com/sdk/android/addons-list/2 sdk-addons-list"`
	AddonSite  []AddonSite  `xml:"http://schemas.android.com/sdk/android/addons-list/2 addon-site"`
	SysImgSite []SysImgSite `xml:"http://schemas.android.com/sdk/android/addons-list/2 sys-img-site"`
}

// AddonSite holds an Android addon site
type AddonSite struct {
	Name string `xml:"http://schemas.android.com/sdk/android/addons-list/2 name",chardata`
	URL  string `xml:"http://schemas.android.com/sdk/android/addons-list/2 url",chardata`
}

// SysImgSite holds an Android system image site
type SysImgSite struct {
	Name string `xml:"http://schemas.android.com/sdk/android/addons-list/2 name",chardata`
	URL  string `xml:"http://schemas.android.com/sdk/android/addons-list/2 url",chardata`
}

//        <sdk:name>Google Inc.</sdk:name>
//        <sdk:url>addon.xml</sdk:url>

// AddonsListURL retuns the Android SDK Addons List URL
func AddonsListURL() string {
	return googleBaseURL + googleAddonsListFile
}

// FetchFromAndroidXML does stuff
func FetchFromAndroidXML(androidXML string) (AddonsList, error) {
	var q AddonsList
	var url string

	switch androidXML {
	case "AddonsList":
		url = googleBaseURL + googleAddonsListFile
	default:
		return q, fmt.Errorf("Unknown xml: %s", androidXML)
	}

	response, err := http.Get(url)
	if err != nil {
		return q, err
	}
	defer response.Body.Close()

	body, err := ioutil.ReadAll(response.Body)

	//r := xml.NewDecoder(body)

	//err = r.Decode(&q)

	//buf := new(bytes.Buffer)
	//buf.ReadFrom(response.Body)
	//s := buf.String() // Does a complete copy of the bytes in the buffer.

	err = xml.Unmarshal([]byte(body), &q)
	if err != nil {
		fmt.Printf("error: %v", err)
		return q, err
	}

	return q, nil
	// Display The first strap
	//fmt.Printf("%#v\n", q)
	//fmt.Printf("Key: %s  Value: %s", q[0].Key, q[0].Value)
}

// AddonSitesList fetched XML from an Android URL
func AddonSitesList() {
	listing, err := FetchFromAndroidXML("AddonsList")
	if err != nil {
		fmt.Printf("Error: %s", err)
	}
	for i := 0; i < len(listing.AddonSite); i++ {
		site := listing.AddonSite[i]
		fmt.Printf("Site: %s, URL: %s\n", site.Name, googleBaseURL+site.URL)
	}
}

// AndroidRepositoryList prints the list of availiable repositiries
func AndroidRepositoryList() {
	listing, err := FetchFromAndroidXML("RepositoryList")
	if err != nil {
		fmt.Printf("Error: %s", err)
	}
	for i := 0; i < len(listing.AddonSite); i++ {
		site := listing.AddonSite[i]
		fmt.Printf("Site: %s, URL: %s\n", site.Name, googleBaseURL+site.URL)
	}
}
