package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/drazisil/updateandroid"
)

func main() {

	//  if len(os.Args) != 2 {
	//        fmt.Fprintf(os.Stderr, "Usage: %s URL\n", os.Args[0])
	//        os.Exit(1)
	//    }

	response, err := http.Get(updateandroid.AddonsListUrl())
	if err != nil {
		log.Fatal(err)
		os.Exit(1)
	}

	fmt.Printf("%#v\n", response)
}
