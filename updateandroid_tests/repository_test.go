package updateandroidtests

import (
	"reflect"
	"testing"

	"github.com/drazisil/updateandroid"
)

// TestFetchFromAndroidXML tests FetchFromAndroidXML
func TestFetchFromAndroidXML(t *testing.T) {
	var err error
	var fetchgood updateandroid.AddonsList
	var fetchbad updateandroid.AddonsList

	fetchgood, err = updateandroid.FetchFromAndroidXML("AddonsList")
	if err != nil {
		t.Errorf("%s", err)
	}
	if !reflect.DeepEqual(fetchgood.AddonSite, []updateandroid.AddonSite{{"Google Inc.", "addon.xml"}, {"Glass Development Kit, Google Inc.", "glass/addon.xml"}, {"Intel HAXM", "extras/intel/addon.xml"}}) {
		t.Errorf("fetchgood %s is not Hello, world.", fetchgood)
	}

	fetchbad, err = updateandroid.FetchFromAndroidXML("moo")
	if err.Error() != "Unknown xml: moo" {
		t.Errorf("fetchbad %s is not Unknown xml: moo", fetchbad)
	}
}
