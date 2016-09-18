(ns update-android.core
  (:require [clojure.string :as string]
            [clojure.tools.cli :refer [parse-opts]]
            [clj-http.client :as client])
  (:import (java.net InetAddress))
  (:gen-class))

(def google-sdk-site-url "https://dl.google.com/android/repository/")

(def google-sdk-repository-filename "repository-12.xml")

(def google-sdk-addon-list-filename "addons_list-2.xml")

(def cli-options
  [;; First three strings describe a short-option, long-option with optional
   ;; example argument description, and a description. All three are optional
   ;; and positional.
   ["-p" "--port PORT" "Port number"
    :default 80
    :parse-fn #(Integer/parseInt %)
    :validate [#(< 0 % 0x10000) "Must be a number between 0 and 65536"]]
   ["-H" "--hostname HOST" "Remote host"
    :default (InetAddress/getByName "localhost")
    ;; Specify a string to output in the default column in the options summary
    ;; if the default value's string representation is very ugly
    :default-desc "localhost"
    :parse-fn #(InetAddress/getByName %)]
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

(defn list-sdk [options]
	(let [google-repository-url (str google-sdk-site-url google-sdk-repository-filename)]
  	(str "You called list sdk with " options "\n"
  		   (:body (client/get google-repository-url)))))

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
      	"sdk" (println (list-sdk (nthrest arguments 2)))
      	"ndk" (println (list-ndk (nthrest arguments 2)))
      	(exit 0 arguments))
      (exit 0 (usage summary)))))
