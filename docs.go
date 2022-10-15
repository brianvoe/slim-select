package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("Running on port 8080")
	http.Handle("/", http.FileServer(http.Dir("./docs")))
	http.ListenAndServe(":8080", nil)
}
