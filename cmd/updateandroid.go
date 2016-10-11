package main

import (
	"github.com/drazisil/updateandroid"
)

func main() {

	//  if len(os.Args) != 2 {
	//        fmt.Fprintf(os.Stderr, "Usage: %s URL\n", os.Args[0])
	//        os.Exit(1)
	//    }

	updateandroid.AddonSitesList()
}
