(ns update-android.model.packages_test
  (:require [clojure.test :refer :all]
            [clojure.data.xml :as xml]
            [clojure.java.io :as io]
            [clojure.zip :as zip]
            [update-android.model.packages :refer :all]))

(deftest cache-fetch-type-url
  (testing "Returned type of a url is correct"
    (is (= (1 (type (zip/xml-zip (xml/parse (io/input-stream "https://dl.google.com/android/repository/repository-12.xml")))))))))

(deftest cache-fetch-type-file
  (testing "Returned type of a file is correct"
    (is (= (1 (type (zip/xml-zip (xml/parse (io/input-stream "test-data/repository-12.xml")))))))))
