package main

import "fmt"

func main() {
    fmt.Printf(Hello())
}

func Hello() string {
	return string("hello, world\n")
}