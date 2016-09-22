(ns update-android.sdk
  (:require [clojure.tools.cli :refer [parse-opts]]
            [clojure.data.xml :as xml]
            [clojure.data.zip.xml :refer [xml->]]
            [clojure.java.io :as io]
            [clojure.pprint :refer [pprint]]
            [clojure.string :as string]
            [clojure.zip :as zip]
            [schema.core :as s])
  (:gen-class))

(def google-sdk-site-url "https://dl.google.com/android/repository/")

(def google-sdk-repository-filename "repository-12.xml")

(def google-sdk-addon-list-filename "addons_list-2.xml")

(defn list-sdk [options]
  (let [google-repository-url "https://dl.google.com/android/repository/repository-12.xml"
        zipper (zip/xml-zip (xml/parse (io/input-stream google-repository-url)))]
    (->> (xml-> zipper :tool :archives :archive :url)
         (map zip/node)
         (mapcat :content))))