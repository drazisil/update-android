package main

import "testing"

func TestHello(t *testing.T) {
	cases := []struct {
		want string
	}{
		{"hello, world\n"},
	}
	for _, c := range cases {
		got := Hello()
		if got != c.want {
			t.Errorf("Hello() == %q, want %q", got, c.want)
		}
	}
}