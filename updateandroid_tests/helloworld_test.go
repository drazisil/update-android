package updateandroid-tests

import (
	"testing"

	"github.com/drazisil/updateandroid"
)

// Tests HelloWorld
func TestHelloWorld(t *testing.T) {
	if updateandroid.HelloWorld() != "Hello, world.\n" {
		t.Errorf("%s is not Hello, world.", updateandroid.HelloWorld())
	}
}
