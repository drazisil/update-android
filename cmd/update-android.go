package main

import (
	"encoding/xml"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/drazisil/updateandroid"
)

type AddonsLists struct {
	XMLName    xml.Name      `xml:"http://schemas.android.com/sdk/android/addons-list/2 sdk-addons-list"`
	AddonSite  []*AddonSite  `xml:"http://schemas.android.com/sdk/android/addons-list/2 sdk-addon-site"`
	SysImgSite []*SysImgSite `xml:"http://schemas.android.com/sdk/android/addons-list/2 sys-img-site"`
}

type AddonSite struct {
	Name string `xml:"http://schemas.android.com/sdk/android/addons-list/2 name"`
	Url  string `xml:"http://schemas.android.com/sdk/android/addons-list/2 url"`
}

type SysImgSite struct {
	Name string `xml:"http://schemas.android.com/sdk/android/addons-list/2 name"`
	Url  string `xml:"http://schemas.android.com/sdk/android/addons-list/2 url"`
}

//        <sdk:name>Google Inc.</sdk:name>
//        <sdk:url>addon.xml</sdk:url>

func main() {

	//  if len(os.Args) != 2 {
	//        fmt.Fprintf(os.Stderr, "Usage: %s URL\n", os.Args[0])
	//        os.Exit(1)
	//    }

	response, err := http.Get(updateandroid.AddonsListUrl())
	if err != nil {
		log.Fatal(err)
	} else {
		defer response.Body.Close()

		var q AddonsLists
		xmlFile := response.Body
		if err := xml.NewDecoder(xmlFile).Decode(&q); err != nil {
			log.Fatal(err)
			os.Exit(1)
		}

		// Display The first strap
		fmt.Printf("%#v\n", q)
		//fmt.Printf("Key: %s  Value: %s", q[0].Key, q[0].Value)
	}
}
