package updateandroidtests

import (
	"testing"

	"github.com/drazisil/updateandroid"
)

// TestHelloWorld tests HelloWorld
func TestHelloWorld(t *testing.T) {
	if updateandroid.HelloWorld() != "Hello, world.\n" {
		t.Errorf("%s is not Hello, world.", updateandroid.HelloWorld())
	}
}
