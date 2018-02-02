#!/bin/bash
# usage: add_note.sh "Enter your note here"
dconf write /org/gnome/shell/extensions/short-memo/message "'$1'"
