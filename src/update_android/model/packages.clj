(ns update-android.model.packages
  (:require [clojure.tools.cli :refer [parse-opts]]
            [clojure.data.xml :as xml]
            [clojure.data.zip.xml :refer [xml->]]
            [clojure.java.io :as io]
            [clojure.pprint :refer [pprint]]
            [clojure.string :as string]
            [clojure.zip :as zip]
            [schema.core :as s])
  (:gen-class))

(def google-repository-url "https://dl.google.com/android/repository/repository-12.xml")

(def google-sdk-site-url "https://dl.google.com/android/repository/")

(def google-sdk-repository-filename "repository-12.xml")

(def google-sdk-addon-list-filename "addons_list-2.xml")

(def cache-file-addon-list "test.txt")

(defn cache-write [package-xml]
  (with-open [out-file (java.io.FileWriter. cache-file-addon-list)]
    (xml/emit package-xml out-file)))

(defn cache-fetch []
  (if (.exists (io/file cache-file-addon-list))
    (zip/xml-zip (xml/parse (io/input-stream cache-file-addon-list)))
    (let [xml-str (xml/parse (io/input-stream google-repository-url))]
      (cache-write xml-str)
      (zip/xml-zip (xml/parse (io/input-stream cache-file-addon-list))))))

