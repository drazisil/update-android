package main

import (
	"fmt"
	"net/http"
)

func main() {
	addonListUrl := "https://dl.google.com/android/repository/addons_list-2.xml"

	if len(os.Args) != 2 {
        fmt.Fprintf(os.Stderr, "Usage: %s URL\n", os.Args[0])
        os.Exit(1)
    }

    response, err := http.Get(addonListUrl)
        if err != nil {
                log.Fatal(err)
        } else {
                defer response.Body.Close()
                _, err := io.Copy(os.Stdout, response.Body)
                if err != nil {
                        log.Fatal(err)
                }
        }
}

func Hello() string {
	return string("hello, world\n")
}