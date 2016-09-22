(ns update-android.core
  (:require [clojure.tools.cli :refer [parse-opts]]
            [clojure.data.xml :as xml]
            [clojure.data.zip.xml :refer [xml->]]
            [clojure.java.io :as io]
            [clojure.pprint :refer [pprint]]
            [clojure.string :as string]
            [clojure.zip :as zip]
            [update-android.sdk :as sdk])
  (:gen-class))

;; An example is what we want to end up with is here:
;; https://1-68182287-gh.circle-artifacts.com/0//tmp/circle-artifacts.BoeNcdM/sdkListing.txt

;; one of the more conplex xml files is here:
;; https://dl.google.com/android/repository/addon.xml

;; The Android SDk install instructions say to
;; Unpack the .zip file you downloaded to an appropriate location for your applications, 
;; such as within /usr/local/ for your user profile, or /opt/ for shared users.

;; CircleCi installs SDK to /usr/local/android-sdk-linux and exports as $ANDROID_HOME
;; CircleCi installs NDK to /usr/local/android-ndk and exports as $ANDROID_NDK

;; This data can be checked by exporting, or at
;; https://43-48019445-gh.circle-artifacts.com/0//tmp/circle-artifacts.bI61cKr/env.txt

;; In addition to the sourse code at https://android.googlesource.com/platform/tools/swt/+/master/sdkmanager/app/src/main/java/com/android/sdkmanager/Main.java
;; the Android SDK tools also use https://mvnrepository.com/artifact/com.android.tools/sdklib

;; command syntax that needs to be supported is as follows
;;    - android list sdk --all --extended
;;    # Android SDK Platform 24
;;    - echo y | android update sdk --no-ui --all --filter "android-24"
;;    # Android SDK Build-tools, revision 24.0.1
;;    - echo y | android update sdk --no-ui --all --filter "build-tools-24.0.1"
;;    # Android Support Repository, revision 35 / Local Maven repository for Support Libraries
;;    - echo y | android update sdk --no-ui --all --filter "extra-android-m2repository"

(def cli-options
  [;; First three strings describe a short-option, long-option with optional
   ;; example argument description, and a description. All three are optional
   ;; and positional.
   ["-p" "--port PORT" "Port number"
    :default 80
    :parse-fn #(Integer/parseInt %)
    :validate [#(< 0 % 0x10000) "Must be a number between 0 and 65536"]]
   ;; If no required argument description is given, the option is assumed to
   ;; be a boolean option defaulting to nil
   [nil "--detach" "Detach from controlling process"]
   ["-v" nil "Verbosity level; may be specified multiple times to increase value"
    ;; If no long-option is specified, an option :id must be given
    :id :verbosity
    :default 0
    ;; Use assoc-fn to create non-idempotent options
    :assoc-fn (fn [m k _] (update-in m [k] inc))]
   ["-h" "--help"]])

(defn usage [options-summary]
  (->> ["This is my program. There are many like it, but this one is mine."
        ""
        "Usage: program-name [options] action"
        ""
        "Options:"
        options-summary
        ""
        "Actions:"
        "  start    Start a new server"
        "  stop     Stop an existing server"
        "  status   Print a server's status"
        ""
        "Please refer to the manual page for more information."]
       (string/join \newline)))

(defn error-msg [errors]
  (str "The following errors occurred while parsing your command:\n\n"
       (string/join \newline errors)))

(defn exit [status msg]
  (println msg)
  (System/exit status))

(defn list-ndk [options]
  (str "You called list ndk with " options))

(defn -main [& args]
  (let [{:keys [options arguments errors summary]} (parse-opts args cli-options)]
    ;; Handle help and error conditions
    (cond
      (:help options) (exit 0 (usage summary))
      (< (count arguments) 1) (exit 1 (usage summary))
      errors (exit 1 (error-msg errors)))
    ;; Execute program with options
    (case (first arguments)
      "list" (case (first (rest arguments))
      	"sdk" (println (sdk/list-sdk (nthrest arguments 2)))
      	"ndk" (println (list-ndk (nthrest arguments 2)))
      	(exit 0 arguments))
      (exit 0 (usage summary)))))
