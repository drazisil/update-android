package main

import "fmt"

func main() {
    fmt.Printf(main.Hello())
}

func Hello() string {
	return string("hello, world\n")
}