(defproject update-android "0.1.0-SNAPSHOT"
  :description "An independent Android SDK / NDK updater"
  :url "https://github.com/drazisil/update-android#readme"
  :license {:name "Apache License, Version 2.0"
            :url "https://opensource.org/licenses/Apache-2.0"}
  :dependencies [[org.clojure/clojure "1.8.0"]
  				 [org.clojure/tools.cli "0.3.5"]]
  :main ^:skip-aot update-android.core
  :target-path "target/%s"
  :profiles {:uberjar {:aot :all}})
