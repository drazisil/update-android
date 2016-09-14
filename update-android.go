package main

import "fmt"

func main() {
    fmt.Printf(Hello())
}

func Hello() {
	return string("hello, world\n")
}