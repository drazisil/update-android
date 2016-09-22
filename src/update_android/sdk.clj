(ns update-android.sdk
  (:require [clojure.tools.cli :refer [parse-opts]]
            [clojure.data.xml :as xml]
            [clojure.data.zip.xml :refer [xml->]]
            [clojure.java.io :as io]
            [clojure.pprint :refer [pprint]]
            [clojure.string :as string]
            [clojure.zip :as zip]
            [schema.core :as s]
            [update-android.model.packages :as packages])
  (:gen-class))

(def google-sdk-site-url "https://dl.google.com/android/repository/")

(def google-sdk-repository-filename "repository-12.xml")

(def google-sdk-addon-list-filename "addons_list-2.xml")

(defn list-sdk [options]
  (->> 
    (xml-> (packages/cache-fetch) :tool :archives :archive :url)
    (map zip/node)
    (mapcat :content)))
